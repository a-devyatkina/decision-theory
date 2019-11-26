<template>
  <q-page>
    <q-list no-border>
      <q-item>
        <q-item-main :label="$t('Сurriculum')" :sublabel="$t('Sessions plans')" />
        <q-item-side right>
          <q-btn icon="add" round color="secondary" class="q-ml-lg q-my-sm">
            <q-popover @show="courseName=''">
              <q-input :stack-label="$t('New course')" class="q-ma-lg" color="light" v-model="courseName"/>
              <div class="row">
                <q-btn color="secondary" :label="$t('Add')" v-close-overlay class="col q-ml-lg q-mb-lg" @click.native="createCourse()"/>
                <q-btn color="secondary" :label="$t('Cancel')" v-close-overlay class="col q-ml-lg q-mb-lg q-mr-lg"/>
              </div>
            </q-popover>
          </q-btn>
        </q-item-side>
      </q-item>
      <q-list no-border v-for="(course, cid) in courses" :key="cid">
        <q-item>
          <q-item-side>
            <q-btn icon="library_books" round color="secondary">
              <q-popover>
                <q-list link>
                  <q-item v-close-overlay @click.native="archiveCourse(cid, course.name)">
                    <q-item-side icon="archive" />
                    <q-item-main :label="$t('To Archive')"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="removeCourse(cid, course.name)">
                    <q-item-side icon="delete" />
                    <q-item-main :label="$t('Remove')"/>
                  </q-item>
                  <q-item v-close-overlay @click.native="addGroupToCourse(cid)">
                    <q-item-side icon="group_add" />
                    <q-item-main :label="$t('Add group')"/>
                  </q-item>
                  <q-item v-close-overlay >
                    <q-item-side icon="edit" />
                    <q-item-main :label="$t('Rename')" >
                      <q-popover touch-position @show="courseName=course.name">
                        <q-input :stack-label="$t('Rename course')" class="q-ma-lg" color="light" v-model="courseName"/>
                        <div class="row">
                          <q-btn color="secondary" :label="$t('Rename')" v-close-overlay class="col q-ml-lg q-mb-lg" @click.native="renameCourse(cid)"/>
                          <q-btn color="secondary" :label="$t('Cancel')" v-close-overlay class="col q-ml-lg q-mb-lg q-mr-lg"/>
                        </div>
                      </q-popover>
                    </q-item-main>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-item-side>
          <q-item-main :label="course.name" />
        </q-item>
        <q-collapsible inset-separator v-for="(plan, gid) in course.groups" :key="gid" icon="group" collapse-icon="expand_more" :label="getGroupName(gid)">
          <report-table :cid="cid" :gid="gid" :plan="plan" editable/>
        </q-collapsible>
      </q-list>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      courseName: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters['data/getUser']()
    },
    courses () {
      return this.$store.getters['data/getCurrentCourses'](this.user.id)
    }
  },
  methods: {
    getGroupName (gid) {
      let group = this.$store.getters['data/getGroup'](gid)
      return group ? group.name : ''
    },
    createCourse () {
      this.$store.dispatch('data/createCourse', { name: this.courseName, teacher: this.user.id })
    },
    archiveCourse (cid, name) {
      this.$q.dialog({
        title: 'Archive',
        message: 'Do you want to archive ' + name + ' course?',
        ok: 'Yes',
        cancel: 'Cancel'
      }).then(() => {
        this.$store.dispatch('data/archiveCourse', { cid })
      })
    },
    removeCourse (cid, name) {
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Do you want to remove course') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/removeCourse', { cid })
      })
    },
    renameCourse (cid) {
      this.courses[cid].name = this.courseName
      this.$store.dispatch('data/updateCourse', { cid, ...this.courses[cid] })
    },
    addGroupToCourse (cid) {
      let groups = this.$store.getters['data/getGroups']()
      let items = []
      for (let gid in groups) {
        items.push({
          label: groups[gid].name,
          value: gid
        })
      }
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Select group'),
        options: {
          type: 'radio',
          model: items.length > 0 ? items[0].value : '',
          items: items
        },
        ok: this.$t('Add'),
        cancel: this.$t('Cancel')
      }).then((gid) => {
        this.$store.dispatch('data/addGroupToCourse', { cid, gid })
      })
    }
  }
}
</script>

<style scope>

</style>
