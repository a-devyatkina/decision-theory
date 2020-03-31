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
                    <work3flow-action action="assign" ref="assign" :title="$t('Assign Task')" :callback="addNewStage" />
                    <q-item-side icon="list_alt" />
                    <q-item-main :label="$t('Assign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.unassign.opened = true">
                    <work3flow-action action="unassign" ref="unassign" :title="$t('Unassign Task')" :callback="addNewStage" />
                    <q-item-side icon="block" />
                    <q-item-main :label="$t('Unassign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.improve.opened = true">
                    <work3flow-action action="improve" ref="improve" :title="$t('Improve Task')" :callback="addNewStage" />
                    <q-item-side icon="spellcheck" />
                    <q-item-main :label="$t('Improve')" />
                  </q-item>
                  <q-item v-if="isStudentSession()" v-close-overlay @click.native="$refs.resolve.opened = true">
                    <work3flow-action action="assign" ref="resolve" :title="$t('Resolve Task')" :callback="addNewStage" :work="work"/>
                    <q-item-side icon="done_all" />
                    <q-item-main :label="$t('Resolve')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.close.opened = true">
                    <work3flow-action action="close" ref="close" :title="$t('Estimate Task')" :callback="addNewStage" :penalty="work.penalty"/>
                    <q-item-side icon="star_border" />
                    <q-item-main :label="$t('Estimate')" />
                  </q-item>
                  <!-- <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.remove.opened = true">
                    <work3flow-action action="remove" ref="remove" :title="$t('Recreate Task')" :callback="addNewStage"/>
                    <q-item-side icon="autorenew" />
                    <q-item-main :label="$t('Recreate')" />
                  </q-item> -->
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
              <!-- <q-item>
                <q-item-main :sublabel="$t('Task')" />
                <q-item-side right><router-link to="" @click.native="getLink(work.task, work.teacher)" :download="work.task">{{work.task}}</router-link></q-item-side>
              </q-item>
              <q-item>
                <q-item-main :sublabel="$t('Solution')" />
                <q-item-side right><router-link to="" @click.native="getLink(work.solution, work.student)" :download="work.solution">{{work.solution}}</router-link></q-item-side>
              </q-item> -->
              <q-item>
                <q-item-main :sublabel="$t('Score')" />
                <q-item-side right><q-chip round class="q-subheading" color="grey-3" text-color="grey-9">{{work.score - work.penalty}}</q-chip></q-item-side>
              </q-item>
              <q-item v-if="isTeacherSession()">
                    <div><b>{{work.finalquestion.question}}</b></div>
                    <img v-if="work.finalquestion.path" :src="work.finalquestion.path"/>
              </q-item>
                    <div>
                      {{work.finalquestion.answer}}
                    </div>
            </q-list>
          </q-item-main>
        </q-item>
      </q-list>
    </q-list>
  </q-page>
</template>

<script>

export default {
  computed: {
    wid () {
      return this.$router.currentRoute.query.wid
    },
    cid () {
      return this.$router.currentRoute.query.cid
    },
    lab () {
      return this.$store.getters['data/getLab3'](this.work.lab)
    },
    work () {
      return this.$store.getters['data/getWork3'](this.wid)
    },
    student () {
      return this.$store.getters['data/getStudent'](this.work.student)
    },
    archived () {
      return this.course.archived
    },
    course () {
      return this.$store.getters['data/getCourse'](this.cid)
    },
    user () {
      return this.$store.getters['data/getUser']()
    }
    /* history () {
      return this.$store.getters['data/getHistory'](this.wid)
    } */
    /* links () {
      let links = {}
      links[this.work.task] = this.$store.getters['data/getLink'](this.work.teacher, this.work.task)
      links[this.work.solution] = this.$store.getters['data/getLink'](this.work.student, this.work.solution)
      for (let stage of this.history) {
        links[stage.file] = this.$store.getters['data/getLink'](stage.author, stage.file)
      }
      return links
    } */
  //   },
  /* created () {
    this.$store.dispatch('data/listenHistory', { wid: this.wid })
  },
  destroyed () {
    this.$store.dispatch('data/unlistenHistory', { wid: this.wid })
    */
  },
  methods: {
    addNewStage ({action, penalty}) {
      this.updateWork(action, penalty)
    },
    /*
    delLastStage () {
      this.history.splice(this.history.length - 1, 1)
      this.updateWork()
    }, */
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
      if (stage === 'unassign') {
        this.work.step = 0
        // this.work.stage = 'unassign'
        this.work.condition = ''
        this.work.score = 0
        this.work.attempt = 0
        this.work.error = ''
        this.work.question = ''
        this.work.penalty = 0
        this.work.finalquestion = ''
        console.log(this.work)
      }
      if (stage === 'close') {
        this.work.penalty = penalty
      }
      console.log(this.work)
      this.$store.dispatch('data/updateWork3', {
        wid: this.wid,
        work: this.work
      })
    }
    /* getLink (file, tid) {
      let newWindow = window.open('', '_blank')
      if (!this.links[file]) {
        this.$store.dispatch('data/fillFileLinkForDownload', {owner: tid, file})
          .then(response => {
            const url = this.$store.getters['data/getLink'](tid, file)
            newWindow.location.href = url
          })
      } else {
        newWindow.location.href = this.links[file]
      }
    } */
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
