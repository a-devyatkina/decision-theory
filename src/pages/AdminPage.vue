<template>
  <q-page>
    <q-item class="q-mt-sm">
      <q-item-main :label="$t('Teachers')" :sublabel="$t('Teachers of Labs Explorer')" />
    </q-item>
    <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0"
      hide-bottom :filter="filter" class="q-ma-md">
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>
      <template slot="top-right" slot-scope="props">
        <teacher-button icon="add" :title="$t('Add teacher')" color="secondary" />
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="phone" :props="props">
          <pre>{{ props.row.phone }}</pre>
        </q-td>
        <q-td key="email" :props="props">
          <pre>{{ props.row.email }}</pre>
        </q-td>
        <q-td key="actions" :props="props">
          <teacher-button icon="edit" :title="$t('Edit teacher')" flat :tid="props.row.id" :teacher="props.row" />
          <q-btn icon="delete" round flat @click="removeTeacher(props.row.id, props.row.name)" />
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      filter: '',
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
        name: 'phone',
        required: false,
        label: this.$t('Phone'),
        align: 'left',
        field: 'phone',
        sortable: false,
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
        style: 'width: 100px'
      },
      {
        name: 'actions',
        required: true,
        label: '',
        align: 'center',
        field: 'actions',
        sortable: false,
        classes: '',
        style: 'width:50px'
      }
      ]
    }
  },
  computed: {
    content () {
      let teachers = this.$store.getters['data/getTeachers']()
      let content = []
      for (let tid in teachers) {
        content.push(
          {
            id: tid,
            name: teachers[tid].name,
            phone: teachers[tid].phone,
            email: teachers[tid].email,
            outdated: teachers[tid].outdated
          }
        )
      }
      return content
    }
  },
  methods: {
    removeTeacher (tid, name) {
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Do you want to remove teacher') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/removeTeacher', { tid })
      }).catch(() => {
      })
    }
  }
}
</script>
<style></style>
