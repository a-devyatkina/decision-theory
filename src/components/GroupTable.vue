<template>
  <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" class="bg-grey-2">
    <template slot="top-left" slot-scope="props">
      <q-btn icon="library_books" round color="secondary" class="q-ml-sm" >
        <q-popover touch-position>
          <q-list link>
            <q-item v-close-overlay @click.native="removeGroup()">
              <q-item-side icon="delete" />
              <q-item-main :label="$t('Remove')"/>
            </q-item>
            <q-item v-close-overlay >
              <q-item-side icon="edit" />
              <q-item-main :label="$t('Rename')" >
                <q-popover touch-position>
                  <q-input :stack-label="$t('Rename group')" class="q-ma-lg" color="light" v-model="name"/>
                  <div class="row">
                    <q-btn color="secondary" :label="$t('Rename')" v-close-overlay class="col q-ml-lg q-mb-lg" @click.native="renameGroup()"/>
                    <q-btn color="secondary" :label="$t('Cancel')" v-close-overlay class="col q-ml-lg q-mb-lg q-mr-lg"/>
                  </div>
                </q-popover>
              </q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </template>
    <template slot="top-right" slot-scope="props">
      <student-button :title="$t('Add student')" icon="add" color="secondary" :gid="gid" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="name" :props="props">
        {{ props.row.name }}
      </q-td>
      <q-td key="email" :props="props">
        {{ props.row.email }}
      </q-td>
      <q-td key="phone" :props="props">
        {{ props.row.phone }}
      </q-td>
      <q-td key="address" :props="props">
        {{ props.row.address }}
      </q-td>
      <q-td key="actions">
        <student-button :title="$t('Edit student')" icon="edit" flat :student="props.row" />
        <q-btn icon="delete" round flat @click="removeStudent(props.row.id, props.row.name)"/>
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>
export default {
  props: ['gid', 'group'],
  data () {
    return {
      filter: '',
      name: this.group.name,
      pagination: { rowsPerPage: 0, page: 1 },
      columns: [{
        name: 'name',
        required: true,
        label: this.$t('Name'),
        align: 'left',
        field: 'name',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'email',
        required: true,
        label: this.$t('E-mail'),
        align: 'left',
        field: 'email',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'phone',
        required: true,
        label: this.$t('Phone'),
        align: 'left',
        field: 'phone',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'address',
        required: true,
        label: this.$t('Address'),
        align: 'left',
        field: 'address',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'actions',
        required: true,
        label: '',
        align: 'center',
        field: 'actions',
        sortable: false,
        classes: '',
        style: 'width: 20px'
      }]
    }
  },
  computed: {
    content () {
      let content = []
      let students = this.$store.getters['data/getGroupStudents'](this.gid)
      for (let sid in students) {
        if (!students[sid].outdated) {
          content.push(
            {
              id: sid,
              ...students[sid]
            }
          )
        }
      }
      return content
    }
  },
  methods: {
    removeGroup () {
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Do you want to remove group') + ' "' + this.group.name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/removeGroup', { gid: this.gid })
      })
    },
    renameGroup () {
      this.$store.dispatch('data/updateGroup', { gid: this.gid, name: this.name, description: this.group.description, outdated: this.group.outdated })
    },
    removeStudent (sid, name) {
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Do you want to remove student') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/removeStudent', { sid })
      })
    }
  }
}
</script>

<style>

</style>
