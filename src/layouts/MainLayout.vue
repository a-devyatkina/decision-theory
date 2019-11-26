<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="secondary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn v-if="isTeacher" flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" />
        <q-btn v-if="isStudent" flat dense round to="/works" icon="menu"/>

        <q-toolbar-title>
          {{ $t('MEPhI') }}
          <div slot="subtitle">{{ $t('Managment And Watching For Labs Execution') }}</div>
        </q-toolbar-title>
        <q-btn-dropdown flat no-caps >
          <q-list link>
            <q-item @click.native="signOut">
              <q-item-main>
                <q-item-tile label>{{ $t('Logout') }}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-if="isDrawerVisible" v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-list-header>{{ $t('Sections') }}</q-list-header>
        <q-item to="/labs" exact>
          <q-item-side icon="work_outline" />
          <q-item-main :label="$t('Tasks')" :sublabel="$t('Tasks for laboratory works')" />
        </q-item>
        <q-item to="/groups" exact>
          <q-item-side icon="people_outline" />
          <q-item-main :label="$t('Groups')" :sublabel="$t('Students by groups')" />
        </q-item>
        <q-item to="/curriculum" exact>
          <q-item-side icon="list_alt" />
          <q-item-main :label="$t('Сurriculum')" :sublabel="$t('Sessions plans')" />
        </q-item>
        <q-item to="/archive" exact>
          <q-item-side icon="history" />
          <q-item-main :label="$t('Archive')" :sublabel="$t('Archive of laboratory works')" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    user () {
      return this.$store.getters['data/getUser']()
    },
    isAdmin () {
      return this.user && this.user.role === 'root'
    },
    isTeacher () {
      return this.user && this.user.role === 'teacher'
    },
    isStudent () {
      return this.user && this.user.role === 'student'
    },
    isDrawerVisible () {
      return this.isTeacher && this.$route.path !== '/steplab'
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('data/signOut')
        .then(() => {
          this.$router.push('/login')
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            timeout: 3000,
            color: 'red',
            textColor: 'black',
            position: 'bottom',
            actions: [{
              icon: 'close'
            }]
          })
        })
    }
  },
  beforeDestroy () {
    this.$store.dispatch('data/signOut')
  }
}
</script>

<style scope>
</style>
