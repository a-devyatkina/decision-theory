<template>
  <q-list no-border>
    <q-item class="q-my-sm">
      <q-item-main :label="$t('Curriculum')"/>
    </q-item>
    <q-collapsible inset-separator v-for="(item, cid) in courses" :key="cid" collapse-icon="expand_more">
      <template slot="header">
        <q-item-side><q-icon name="layers" color="secondary" size="24px" /></q-item-side>
        <q-item-main :label="item.course.name" :sublabel="item.teacher.name" />
      </template>
      <q-table separator="cell" :data="item.works" :columns="columns" row-key="wid" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" class="bg-grey-2 q-ma-md">
        <template slot="top-right" slot-scope="props">
          <q-list no-border dense>
            <q-item>
              <q-item-main :label="$t('Attendance')" class="q-body-1" />
              <q-item-side right>{{ item.attendance }}</q-item-side>
            </q-item>
            <q-item>
              <q-item-main :label="$t('Total Score')" class="q-body-1" />
              <q-item-side right>{{ item.score }}</q-item-side>
            </q-item>
          </q-list>
        </template>
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="description" :props="props">
            <div style="white-space:pre-wrap">{{ props.row.description }}</div>
          </q-td>
          <q-td key="stage" :props="props">
            <router-link to="" @click.native="view(props.row.wid)">
              <q-chip color="secondary" style="width:110px" class="cursor-pointer">{{ $t(props.row.stage) }}</q-chip>
            </router-link>
          </q-td>
          <q-td key="score" :props="props">
            {{ props.row.score }}
          </q-td>
        </q-tr>
      </q-table>
    </q-collapsible>
  </q-list>
</template>

<script>

export default {
  data () {
    return {
      pagination: { rowsPerPage: 0, page: 1 },
      columns: [
        {
          name: 'name',
          required: true,
          label: this.$t('Lab Name'),
          align: 'left',
          field: 'name',
          sortable: true,
          classes: '',
          style: ''
        },
        {
          name: 'description',
          required: true,
          label: this.$t('Description'),
          align: 'left',
          field: 'description',
          sortable: true,
          classes: '',
          style: ''
        },
        {
          name: 'stage',
          required: true,
          label: this.$t('Stage'),
          align: 'center',
          field: 'stage',
          sortable: true,
          classes: '',
          style: 'width:150px'
        },
        {
          name: 'score',
          required: true,
          label: this.$t('Score'),
          align: 'center',
          field: 'score',
          sortable: true,
          classes: '',
          style: 'width:50px'
        }
      ]
    }
  },
  computed: {
    courses () {
      let courses = {}
      for (let wid in this.works) {
        let work = this.works[wid]
        let cid = work.course
        if (courses[cid] === undefined) {
          let course = this.$store.getters['data/getCourse'](cid)
          if (course !== undefined) {
            courses[cid] = {
              course: course,
              attendance: this.$store.getters['data/getAttendance'](this.user.id, cid),
              teacher: this.$store.getters['data/getTeacher'](course.teacher),
              works: [],
              score: 0
            }
          }
        }
        if (courses[cid] !== undefined) {
          courses[cid].score += work.score
          let lab = this.$store.getters['data/getLab'](work.lab) || this.$store.getters['data/getSteplabHandle'](work.lab)
          courses[cid].works.push({
            wid: wid,
            name: lab ? lab.name : '',
            description: lab ? lab.description : '',
            stage: work.stage,
            score: work.score
          })
        }
      }
      return courses
    },
    user () {
      return this.$store.getters['data/getUser']()
    },
    works () {
      return this.$store.getters['data/getStudentWorks'](this.user.id)
    }
  },
  methods: {
    view (wid) {
      let work = this.works[wid]
      let lab = this.$store.getters['data/getLab'](work.lab)
      let steplab = this.$store.getters['data/getSteplabHandle'](work.lab)
      if (typeof lab !== 'undefined') {
        this.$router.push(`/workflow?wid=${wid}`)
      } else if (typeof steplab !== 'undefined') {
        this.$router.push(`/steplab?lab=${work.lab}&user=${this.user.id}`)
      }
    }
  }
}
</script>

<style>

</style>
