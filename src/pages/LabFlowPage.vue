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
                    <workflow-action action="assign" ref="assign" :title="$t('Assign Task')" :files="lab.files" :callback="addNewStage" />
                    <q-item-side icon="list_alt" />
                    <q-item-main :label="$t('Assign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.unassign.opened = true">
                    <workflow-action action="unassign" ref="unassign" :title="$t('Unassign Task')" :callback="addNewStage" />
                    <q-item-side icon="block" />
                    <q-item-main :label="$t('Unassign')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.improve.opened = true">
                    <workflow-action action="improve" ref="improve" :title="$t('Improve Task')" :callback="addNewStage" />
                    <q-item-side icon="spellcheck" />
                    <q-item-main :label="$t('Improve')" />
                  </q-item>
                  <q-item v-if="isStudentSession()" v-close-overlay @click.native="$refs.resolve.opened = true">
                    <workflow-action action="resolve" ref="resolve" :title="$t('Resolve Task')" :callback="addNewStage"/>
                    <q-item-side icon="done_all" />
                    <q-item-main :label="$t('Resolve')" />
                  </q-item>
                  <q-item v-if="isTeacherSession()" v-close-overlay @click.native="$refs.close.opened = true">
                    <workflow-action action="close" ref="close" :title="$t('Estimate Task')" :maxScore="maxScore" :callback="addNewStage" />
                    <q-item-side icon="star_border" />
                    <q-item-main :label="$t('Estimate')" />
                  </q-item>
                  <q-item v-close-overlay @click.native="$refs.comment.opened = true">
                    <workflow-action action="comment" ref="comment" :title="$t('Comment Task')" :callback="addNewStage" />
                    <q-item-side icon="chat_bubble_outline" />
                    <q-item-main :label="$t('Comment')" />
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
              <q-item>
                <q-item-main :sublabel="$t('Task')" />
                <q-item-side right><router-link to="" @click.native="getLink(work.task, work.teacher)" :download="work.task">{{work.task}}</router-link></q-item-side>
              </q-item>
              <q-item>
                <q-item-main :sublabel="$t('Solution')" />
                <q-item-side right><router-link to="" @click.native="getLink(work.solution, work.student)" :download="work.solution">{{work.solution}}</router-link></q-item-side>
              </q-item>
              <q-item>
                <q-item-main :sublabel="$t('Score')" />
                <q-item-side right><q-chip round class="q-subheading" color="grey-3" text-color="grey-9">{{work.score}}</q-chip></q-item-side>
              </q-item>
            </q-list>
          </q-item-main>
        </q-item>
      </q-list>
      <q-item>
        <q-item-main>
          <q-collapsible :label="$t('Flowing')" collapse-icon="expand_more">
            <div v-for="(stage, ind) in history.slice().reverse()" :key="ind">
              <q-collapsible class="shadow-2 q-mb-md round-borders bg-grey-2" :opened="ind===0">
                <template slot="header">
                  <q-item-side :icon="getStageIcon(stage.action)" />
                  <q-item-main :label="getAuthorName(stage.author)" :sublabel="new Date(stage.date).toLocaleString()" class="text-teal-9"/>
                  <q-item-side right>
                    <q-btn v-if="isDeletableStage(ind, stage.author)" icon="delete" round dense color="secondary" class="unseen q-mr-xs" @click.stop="delLastStage()" />
                  </q-item-side>
                </template>
                <q-item-separator />
                <div v-if="stage.comment && stage.comment.length > 0" class="q-body-1" style="white-space:pre-wrap">{{stage.comment}}</div>
                <div v-if="stage.file && stage.file.length > 0" class="text-grey-8 q-mt-sm q-body-1">{{ $t('Attachment') }}: <router-link to="" @click.native="getLink(stage.file, stage.action === 'resolve'? work.student : work.teacher)" :download="stage.file">{{stage.file}}</router-link></div>
                <div v-if="stage.action === 'close'" class="text-grey-8 q-mt-sm q-body-1">{{ $t('Score') }}: <span>{{stage.score}}</span></div>
              </q-collapsible>
            </div>
          </q-collapsible>
        </q-item-main>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

export default {
  computed: {
    wid () {
      return this.$router.currentRoute.query.wid
    },
    lab () {
      return this.$store.getters['data/getLab'](this.work.lab)
    },
    work () {
      return this.$store.getters['data/getWork'](this.wid)
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
    },
    maxScore () {
      return this.course.groups[this.student.group].labs[this.work.lab].maxScore
    },
    history () {
      return this.$store.getters['data/getHistory'](this.wid)
    },
    links () {
      let links = {}
      links[this.work.task] = this.$store.getters['data/getLink'](this.work.teacher, this.work.task)
      links[this.work.solution] = this.$store.getters['data/getLink'](this.work.student, this.work.solution)
      for (let stage of this.history) {
        links[stage.file] = this.$store.getters['data/getLink'](stage.author, stage.file)
      }
      return links
    }
  },
  created () {
    this.$store.dispatch('data/listenHistory', { wid: this.wid })
  },
  destroyed () {
    this.$store.dispatch('data/unlistenHistory', { wid: this.wid })
  },
  methods: {
    addNewStage (stage) {
      this.history.push(stage)
      this.updateWork()
    },
    delLastStage () {
      this.history.splice(this.history.length - 1, 1)
      this.updateWork()
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
    updateWork () {
      this.work.score = 0
      this.work.task = ''
      this.work.solution = ''
      this.work.stage = 'unassign'
      for (let stage of this.history) {
        if (stage.action === 'close') {
          this.work.score = stage.score
          this.work.stage = stage.action
        } else if (stage.action === 'resolve') {
          this.work.solution = stage.file
          this.work.stage = stage.action
          this.work.score = 0
        } else if (stage.action === 'assign') {
          this.work.task = stage.file
          this.work.stage = stage.action
          this.work.score = 0
        } else if (stage.action === 'improve') {
          this.work.score = 0
          this.work.stage = stage.action
        } else if (stage.action === 'unassign') {
          this.work.score = 0
          this.work.task = ''
          this.work.solution = ''
          this.work.stage = stage.action
        }
      }
      this.$store.dispatch('data/updateWork', {
        wid: this.wid,
        work: this.work,
        history: this.history
      })
    },
    getLink (file, tid) {
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
