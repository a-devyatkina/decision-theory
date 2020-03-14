<template>
  <q-page>
    <q-list no-border>
      <q-item class="q-my-sm">
        <q-item-main :label="$t('Archive')" :sublabel="$t('Archive of laboratory works')" />
      </q-item>
      <q-list no-border v-for="(course, cid) in courses" :key="cid">
        <q-item>
          <q-item-side>
            <q-btn icon="library_books" round color="secondary">
              <q-popover>
                <q-list link>
                  <q-item v-close-overlay @click.native="unarchiveCourse(cid, course.name)">
                    <q-item-side icon="archive" />
                    <q-item-main :label="$t('From Archive')"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-item-side>
          <q-item-main :label="course.name" :sublabel="getTeacherName(course.teacher)"/>
        </q-item>
        <q-collapsible inset-separator v-for="(plan, gid) in course.groups" :key="gid" icon="group" collapse-icon="expand_more" :label="getGroupName(gid)">
          <report-table :cid="cid" :gid="gid" :plan="plan" />
        </q-collapsible>
      </q-list>
    </q-list>
  </q-page>
</template>

<script>
export default {
  computed: {
    courses () {
      return this.$store.getters['data/getArchivedCourses']()
    }
  },
  methods: {
    getGroupName (id) {
      let group = this.$store.getters['data/getGroup'](id)
      return group ? group.name : this.$t('none')
    },
    getTeacherName (tid) {
      let teacher = this.$store.getters['data/getTeacher'](tid)
      return teacher.name
    },
    unarchiveCourse (cid, name) {
      this.$q.dialog({
        title: this.$t('From Archive'),
        message: this.$t('Do you want to unarchive course') + ' "' + name + '"?',
        cancel: this.$t('Cancel'),
        ok: this.$t('Yes')
      }).then(() => {
        this.$store.dispatch('data/unarchiveCourse', { cid })
      })
    }
  }
}
</script>

<style scope>

</style>
