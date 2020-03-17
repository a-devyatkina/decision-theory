<script src="../store/data/model/attendance.js"></script>
<template>
  <q-table separator="cell" :data="content" :columns="columns" row-key="sid" rows-per-page-options="0" :pagination.sync="pagination" hide-bottom class="bg-grey-2">
    <template slot="top-right" slot-scope="props">
      <change-plan-button v-if="editable!=undefined" icon="edit" :title="$t('Edit plan')" :cid="cid" :gid="gid" />
      <q-btn v-if="editable!=undefined" icon="delete" color="secondary" round @click="delGroupFromCourse(gid)" class="q-ml-sm" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="name" :props="props">
        {{ props.row.name }}
      </q-td>
      <q-td v-for="work in props.row.works" :key="work.lid" :props="props">
        <router-link :to="`workflow?wid=${work.wid}`">
          <q-chip color="secondary" style="width:110px" class="cursor-pointer">{{$t(work.stage)}}</q-chip>
        </router-link>
      </q-td>
      <q-td v-for="lab in props.row.steplabs" :key="lab.lid" :props="props">
        <router-link :to="`steplab?lab=${lab.lid}&user=${lab.uid}`">
          <q-chip color="secondary" style="width:110px" class="cursor-pointer">{{$t(lab.state)}}</q-chip>
        </router-link>
      </q-td>
      <q-td key="attendance" :props="props">
        <q-chip color="secondary" style="width:50px" class="cursor-pointer">{{props.row.attendance}}
          <q-popover v-if="editable!=undefined">
            <q-input :stack-label="$t('Attendance')" class="q-ma-lg" color="light" type="number" :value="props.row.attendance" v-model="attendence" />
            <div class="row">
              <q-btn color="secondary" :label="$t('Estimate')" v-close-overlay class="col q-ml-lg q-mb-lg" @click.native="updateAttendance(props.row.sid)"/>
              <q-btn color="secondary" :label="$t('Cancel')" v-close-overlay class="col q-ml-lg q-mb-lg q-mr-lg"/>
            </div>
          </q-popover>
        </q-chip>
      </q-td>
      <q-td key="score" :props="props">
        {{props.row.score}}
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>

export default {
  props: [ 'cid', 'gid', 'plan', 'editable' ],
  data () {
    return {
      attendence: 0,
      pagination: { rowsPerPage: 0, page: 1 }
    }
  },
  computed: {
    columns () {
      let cols = [{
        name: 'name',
        required: true,
        label: this.$t('Name'),
        align: 'left',
        field: 'name',
        sortable: true,
        classes: '',
        style: ''
      }]
      for (let lid in this.plan.labs) {
        let lab = this.$store.getters['data/getLab'](lid)
        if (lab) {
          cols.push({
            name: lid,
            required: true,
            label: lab.name,
            align: 'center',
            field: lid,
            sortable: true,
            classes: '',
            style: ''
          })
        }
      }
      for (let lid in this.plan.steplabs) {
        let steplab = this.$store.getters['data/getSteplabHandle'](lid)
        if (steplab) {
          cols.push({
            name: lid,
            required: true,
            label: steplab.name,
            align: 'center',
            field: lid,
            sortable: true,
            classes: '',
            style: ''
          })
        }
      }
      for (let lid in this.plan.hierarchieslab) {
        let lab = this.$store.getters['data/getHierarchieslabHandle'](lid)
        if (lab) {
          cols.push({
            name: lid,
            required: true,
            label: lab.name,
            align: 'center',
            field: lid,
            sortable: true,
            classes: '',
            style: ''
          })
        }
      }
      if (this.plan.attendance !== undefined) {
        cols.push({
          name: 'attendance',
          required: true,
          label: this.$t('Attendance'),
          align: 'center',
          field: 'attendance',
          sortable: true,
          classes: '',
          style: ''
        })
      }
      cols.push({
        name: 'score',
        required: true,
        label: this.$t('Score'),
        align: 'center',
        field: 'score',
        sortable: true,
        classes: '',
        style: 'width:50px'
      })
      return cols
    },
    content () {
      let rows = []
      let students = this.$store.getters['data/getGroupStudents'](this.gid)
      for (let sid in students) {
        let student = this.$store.getters['data/getStudent'](sid)
        let row = {
          sid: sid,
          name: student.name,
          score: 0,
          works: [],
          steplabs: []
        }
        for (let lid in this.plan.labs) {
          let data = this.$store.getters['data/getStudentWork'](sid, lid)
          if (data) {
            row.score += data.work.score
            row.works.push({ lid: lid, stage: data.work.stage, wid: data.wid })
          } else {
            row.works.push({ lid: lid, stage: '', wid: '' })
          }
        }
        for (let lid in this.plan.steplabs) {
          let steplab = this.$store.getters['data/getSteplabHandle'](lid)
          if (steplab && steplab[sid]) {
            row.score += steplab[sid].score
            row.steplabs.push({ lid: lid, state: steplab[sid].state, uid: sid })
          } else {
            row.works.push({ lid: lid, state: '' })
          }
        }
        if (this.plan.attendance !== undefined) {
          row.attendance = this.$store.getters['data/getAttendance'](sid, this.cid)
          row.score += row.attendance
        }
        rows.push(row)
      }
      return rows
    },
    user () {
      return this.$store.getters['data/getUser']()
    },
    group () {
      return this.$store.getters['data/getGroup'](this.gid)
    }
  },
  methods: {
    updateAttendance (sid) {
      this.$store.dispatch('data/updateAttendance', {
        cid: this.cid,
        sid: sid,
        tid: this.user.id,
        score: this.attendence
      })
    },
    delGroupFromCourse (gid) {
      this.$q.dialog({
        title: this.$t('Exclude'),
        message: this.$t('Do you want to exclude group') + ' "' + this.group.name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/delGroupFromCourse', {
          cid: this.cid,
          gid: gid
        })
      })
    }
  }
}
</script>

<style>

</style>
