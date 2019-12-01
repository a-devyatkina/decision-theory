<template>
  <dev>
    <q-item class="q-mt-sm">
      <q-item-main :label="$t('Pended users')" :sublabel="$t('Users waiting to register')" />
    </q-item>
    <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" :filter="filter" class="q-ma-md">
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline v-model="filter" />
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="role" :props="props">
          <pre>{{ props.row.role }}</pre>
        </q-td>
        <q-td key="group" :props="props">
          <pre>{{ props.row.group }}</pre>
        </q-td>
        <q-td key="phone" :props="props">
          <pre>{{ props.row.phone }}</pre>
        </q-td>
        <q-td key="email" :props="props">
          <pre>{{ props.row.email }}</pre>
        </q-td>
        <q-td key="address" :props="props">
          <pre>{{ props.row.address }}</pre>
        </q-td>
        <q-td key="actions" :props="props">
          <q-btn icon="how_to_reg" round flat @click="accept(props.row.id, props.row.name)" />
          <q-btn icon="cancel" round flat @click="reject(props.row.id, props.row.name)" />
        </q-td>
      </q-tr>
    </q-table>
  </dev>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
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
        name: 'role',
        required: true,
        label: this.$t('Role'),
        align: 'left',
        field: 'role',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'group',
        required: false,
        label: this.$t('Group'),
        align: 'left',
        field: 'group',
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
        style: 'width:50px'
      }]
    }
  },
  computed: {
    content () {
      let requests = this.$store.getters['data/getRegistrations']()
      let content = []
      for (let rid in requests) {
        let group = this.$store.getters['data/getGroup'](requests[rid].group)
        content.push({
          id: rid,
          name: requests[rid].name,
          phone: requests[rid].phone,
          email: requests[rid].email,
          address: requests[rid].address,
          role: this.$t(requests[rid].role),
          group: group ? group.name : ''
        })
      }
      return content
    }
  },
  methods: {
    accept (rid, name) {
      this.$q.dialog({
        title: this.$t('Accept'),
        message: this.$t('Do you want to accept registration of') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(async () => {
        await this.$store.dispatch('data/acceptRegistration', {
          rid
        })
      }).catch(() => {})
    },
    reject (rid, name) {
      this.$q.dialog({
        title: this.$t('Reject'),
        message: this.$t('Do you want to reject registration of') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(async () => {
        await this.$store.dispatch('data/rejectRegistration', {
          rid
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scope>
</style>
