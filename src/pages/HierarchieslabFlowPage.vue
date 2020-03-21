<template>
  <q-page>
    <q-list no-border>
      <q-item>
        <q-item-main :label="student.name" :sublabel="course.name"/>
      </q-item>
      <q-list class="q-ma-md round-borders shadow-2 bg-grey-2">
        <q-item>
          <q-item-side>
            <q-btn icon="library_books" round color="secondary">
              <q-popover v-if="!archived">
                <q-list link>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.assign.opened = true">
                    <hierarchiesworkflow-action action="assign" ref="assign" :title="$t('Assign Task')" :callback="addNewStage" />
                    <q-item-side icon="list_alt" />
                    <q-item-main :label="$t('Assign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.unassign.opened = true">
                    <hierarchiesworkflow-action action="unassign" ref="unassign" :title="$t('Unassign Task')" :callback="addNewStage" />
                    <q-item-side icon="block" />
                    <q-item-main :label="$t('Unassign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.improve.opened = true">
                    <hierarchiesworkflow-action action="improve" ref="improve" :title="$t('Improve Task')" :callback="addNewStage" />
                    <q-item-side icon="spellcheck" />
                    <q-item-main :label="$t('Improve')" />
                  </q-item>
                  <q-item v-if="isStudentSession()" v-close-overlay @click.native="$refs.resolve.opened = true">
                    <hierarchiesworkflow-action action="resolve" ref="resolve" :title="$t('Resolve Task')" :callback="addNewStage" :work="work"/>
                    <q-item-side icon="done_all" />
                    <q-item-main :label="$t('Resolve')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.close.opened = true">
                    <hierarchiesworkflow-action action="close" ref="close" :title="$t('Estimate Task')" :callback="addNewStage" :penalty="work.penalty"/>
                    <q-item-side icon="star_border" />
                    <q-item-main :label="$t('Estimate')" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-item-side>
          <q-item-main :label="lab.name" />
          <q-item-side right>
            <q-chip color="secondary">{{$t(work.stage)}}</q-chip>
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main>
            <q-list no-border inset-separator>
              <q-item>
                <q-item-main>
                  <div style="white-space: pre-wrap">{{lab.description}}</div>
                </q-item-main>
              </q-item>
              <q-item v-if="work.lab === 'layeredhierarchies' && work.stage === 'resolve'">
                <q-item-main :sublabel="$t('Chosen theme')" />
                <q-item-side right><q-chip round class="q-subheading" color="grey-3" text-color="grey-9">{{value}}</q-chip></q-item-side>
              </q-item>
              <q-item>
                <q-item-main :sublabel="$t('Score')" />
                <q-item-side right><q-chip round class="q-subheading" color="grey-3" text-color="grey-9">{{work.score-work.penalty}}</q-chip></q-item-side>
              </q-item>
            </q-list>
          </q-item-main>
        </q-item>
      </q-list>
    </q-list>
  </q-page>
</template>

<script>
const axios = require('axios')
export default {
  data: () => {
    return {
      value: ''
    }
  },
  computed: {
    wid () {
      return this.$router.currentRoute.query.wid
    },
    lab () {
      return this.$store.getters['data/getHierarchieslab'](this.work.lab)
    },
    work () {
      return this.$store.getters['data/getHierarchieswork'](this.wid)
    },
    student () {
      return this.$store.getters['data/getStudent'](this.work.student)
    },
    archived () {
      return this.course.archived
    },
    course () {
      return this.$store.getters['data/getCourse'](this.work.course)
    },
    user () {
      return this.$store.getters['data/getUser']()
    }
  },
  methods: {
    addNewStage ({action, penalty}) {
      this.updateWork(action, penalty)
    },
    isDeletableStage (ind, author) {
      return ind === 0 && !this.archived && author === this.user.id
    },
    isStudentSession () {
      return this.user.role === 'student' && this.user.id === this.work.student
    },
    isTeacherSession () {
      return this.user.role === 'teacher' && this.user.id === this.course.teacher
    },
    getStageIcon (stage) {
      if (stage === 'close') {
        return 'star_border'
      } else if (stage === 'assign') {
        return 'list_alt'
      } else if (stage === 'improve') {
        return 'spellcheck'
      } else if (stage === 'unassign') {
        return 'block'
      } else if (stage === 'resolve') {
        return 'done_all'
      }
      return 'chat_bubble_outline'
    },
    getAuthorName (id) {
      if (id === this.user.id) {
        return this.user.name
      }
      let author = this.$store.getters['data/getStudent'](id) || this.$store.getters['data/getTeacher'](id)
      return author ? author.name : 'unknown'
    },
    updateWork (stage, penalty) {
      this.work.stage = stage
      if (stage === 'close') {
        this.work.penalty = penalty
      }
      this.$store.dispatch('data/updateHierarchieswork', {
        wid: this.wid,
        work: this.work
      })
    }
  },
  mounted () {
    let data = {
      user_id: this.work.student
    }
    if (this.work.stage === 'resolve') {
      axios.post(
        'restapi/hierarchies/get_theme',
        data
      ).then(response => {
        this.value = response.data.theme
      })
    }
  }
}
</script>

<style scope>
  .unseen {
    visibility: hidden;
  }
  :hover > .unseen {
    visibility: visible;
  }
</style>
