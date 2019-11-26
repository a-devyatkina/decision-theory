<template>
  <q-page>
    <q-list no-border>
      <q-item class="q-mb-md">
        <q-item-main :label="$t('Groups')" :sublabel="$t('Students by groups')" />
        <q-item-side right>
          <q-btn icon="add" round color="secondary" class="q-ml-lg q-my-sm">
            <q-popover>
              <q-input :stack-label="$t('New group')" class="q-ma-lg" color="light" v-model="newGroupName"/>
              <div class="row">
                <q-btn color="secondary" :label="$t('Add')" v-close-overlay class="col q-ml-lg q-mb-lg" @click.native="createGroup()" />
                <q-btn color="secondary" :label="$t('Cancel')" v-close-overlay class="col q-ml-lg q-mb-lg q-mr-lg" />
              </div>
            </q-popover>
          </q-btn>
        </q-item-side>
      </q-item>
      <q-collapsible inset-separator v-for="(group, gid) in groups" :key="gid" icon="group" collapse-icon="expand_more" :label="group.name">
        <group-table :gid="gid" :group="group" />
      </q-collapsible>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      newGroupName: ''
    }
  },
  computed: {
    groups () {
      return this.$store.getters['data/getGroups']()
    }
  },
  methods: {
    createGroup () {
      this.$store.dispatch('data/createGroup', { name: this.newGroupName, description: '', outdated: false })
    }
  }
}
</script>

<style scope>

</style>
