<template>
  <q-list no-border>
    <q-item class="q-my-sm">
      <q-item-main :label="$t('Curriculum')"/>
    </q-item>
    <q-collapsible inset-separator v-for="(item, cid) in sessions" :key="cid" collapse-icon="expand_more">
      <template slot="header">
        <q-item-side><q-icon name="layers" color="secondary" size="24px" /></q-item-side>
        <q-item-main :label="item.course.name" :sublabel="item.teacher.name" />
      </template>
      <q-table separator="cell" :data="item.tasks" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" class="bg-grey-2 q-ma-md">
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
            <router-link to="" v-if="props.row.stage==='assign' || props.row.stage==='improve' || props.row.stage==='opened' || props.row.stage==='assigned'" @click.native="view(props.row, cid)">
              <q-chip color="secondary" style="width:110px" class="cursor-pointer">{{ $t(props.row.stage) }}</q-chip>
            </router-link>
            <span v-else :disabled="true">
              <q-chip color="secondary" style="width:130px" class="cursor-pointer">{{ $t(props.row.stage) }}</q-chip>
            </span>
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
    sessions () {
      let sessions = {}
      let courses = this.$store.getters['data/getGroupCourses'](this.user.group)
      for (let cid in courses) {
        let course = courses[cid].groups[this.user.group]
        if (course) {
          sessions[cid] = {
            course: courses[cid],
            teacher: this.$store.getters['data/getTeacher'](courses[cid].teacher),
            attendance: this.$store.getters['data/getAttendance'](this.user.id, cid),
            tasks: [],
            score: 0
          }
          sessions[cid].score = sessions[cid].attendance
          for (let lid in course.labs) {
            let data = this.$store.getters['data/getStudentWork'](this.user.id, lid)
            if (data) {
              sessions[cid].score += data.work.score
              let lab = this.$store.getters['data/getLab'](lid)
              sessions[cid].tasks.push({
                id: data.wid,
                name: lab ? lab.name : '',
                description: lab ? lab.description : '',
                stage: data.work.stage,
                score: data.work.score
              })
            }
          }
          for (let lid in course.steplabs) {
            let steplab = this.$store.getters['data/getSteplabHandle'](lid)
            if (steplab && steplab[this.user.id]) {
              sessions[cid].score += steplab[this.user.id].score
              sessions[cid].tasks.push({
                id: lid,
                name: steplab.name,
                description: steplab.description,
                stage: steplab[this.user.id].state,
                score: steplab[this.user.id].score,
                isSteplab: true
              })
            }
          }
          for (let lid in course.lab3) {
            let data = this.$store.getters['data/getStudentWork3'](this.user.id, lid, cid)
            if (data) {
              sessions[cid].score += data.work.score
              let lab = this.$store.getters['data/getLab3'](lid)
              sessions[cid].tasks.push({
                id: data.wid,
                name: lab ? lab.name : '',
                description: lab ? lab.description : '',
                stage: data.work.stage,
                score: data.work.score,
                isLab3: true,
                labName: data.work.lab
              })
            }
          }
          for (let lid in course.hierarchieslab) {
            let data = this.$store.getters['data/getStudentHierarchieswork'](this.user.id, lid)
            let maxscore = course.hierarchieslab[lid].maxScore
            if (data) {
              let lab = this.$store.getters['data/getHierarchieslab'](lid)
              let score = Math.floor(((data.work.score - data.work.tries * 10) * maxscore) / 100) - data.work.penalty
              if (score < 0) score = 0
              sessions[cid].score += score
              sessions[cid].tasks.push({
                id: data.wid,
                lid: lid,
                name: lab ? lab.name : '',
                description: lab ? lab.description : '',
                stage: data.work.stage,
                score: score,
                isHierarchieslab: true
              })
            }
          }
        }
      }
      return sessions
    },
    user () {
      return this.$store.getters['data/getUser']()
    }
  },
  methods: {
    view (lab, cid) {
      if (lab.isSteplab) {
        this.$router.push(`/steplab?lab=${lab.task}&user=${this.user.id}`)
      } else if (lab.isLab3) {
        // this.$router.push(`/work3flow?wid=${task}&cid=${cid}`)
        this.$router.push(`/${lab.labName}?cid=${cid}`)
      } else if (lab.isHierarchieslab) {
        if ((lab.lid === 'siblinghierarchies' ||
             lab.lid === 'layeredhierarchies') &&
             lab.stage !== 'assigned' &&
             lab.stage !== 'improve' &&
             lab.stage !== 'opened') {
          this.$q.dialog({
            title: 'Лабораторная работа недоступна',
            message: 'Обратитесь к переподавателю',
            ok: 'Продолжить'
          })
        } else {
          this.$router.push(`/${lab.lid}`)
        }
      } else {
        this.$router.push(`/workflow?wid=${lab.task}`)
      }
    }
  }
}
</script>

<style>

</style>
