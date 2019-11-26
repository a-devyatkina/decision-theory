<template>
  <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" :filter="filter" :filter-method="doFilter" class="q-ma-md">
    <template slot="top-left" slot-scope="props">
      <q-search hide-underline v-model="filter" />
    </template>
    <template slot="top-right" slot-scope="props">
      <steplab-button icon="add" :title="$t('Add lab')" color="secondary" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="name" :props="props">
        {{ props.row.name }}
      </q-td>
      <q-td key="desc" :props="props">
        <div style="white-space:pre-wrap">{{ props.row.description }}</div>
      </q-td>
      <q-td key="preview">
        <q-btn icon-right="find_in_page" color="secondary" no-caps no-wrap :label="$t('View')" rounded @click="previewSteplab(props.row.id)" />
      </q-td>
      <q-td key="actions" :props="props">
        <steplab-button icon="edit" :title="$t('Edit lab')" flat :lab="props.row.id" />
        <q-btn icon="delete" round flat @click="removeSteplab(props.row.id, props.row.name)" />
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 0,
        page: 1
      },
      columns: [{
        name: 'name',
        required: true,
        label: this.$t('Label'),
        align: 'left',
        field: 'name',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'desc',
        required: true,
        label: this.$t('Description'),
        align: 'left',
        field: 'description',
        sortable: true,
        classes: '',
        style: ''
      },
      {
        name: 'preview',
        required: true,
        label: this.$t('View'),
        align: 'left',
        sortable: false,
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
      }]
    }
  },
  computed: {
    content () {
      let handles = this.$store.getters['data/getSteplabsHandles']()
      let content = []
      for (let lid in handles) {
        let handle = handles[lid]
        if (handle !== undefined && handle.outdated === false) {
          content.push({
            id: lid,
            name: handle.name,
            description: handle.description
          })
        }
      }
      return content
    },
    user () {
      return this.$store.getters['data/getUser']()
    }
  },
  methods: {
    doFilter (rows, terms, cols, cellValue) {
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
      )
    },
    async previewSteplab (lid) {
      try {
        await this.$store.dispatch('data/removeSteplab', { lid, uid: this.user.id })
        await this.$store.dispatch('data/createSteplab', { lid, uid: this.user.id })
        this.$router.push('/steplab?lab=' + lid + '&user=' + this.user.id)
      } catch (error) {
        this.$q.notify(error.message)
      }
    },
    async removeSteplab (lid, name) {
      try {
        await this.$q.dialog({
          title: this.$t('Remove'),
          message: this.$t('Do you want to remove laboratory task') + ' "' + name + '"?',
          ok: this.$t('Yes'),
          cancel: this.$t('Cancel')
        })
        let handle = this.content.find(item => item.id === lid)
        handle.outdated = true
        await this.$store.dispatch('data/updateSteplabHandle', { lid, handle })
        await this.$store.dispatch('data/removeSteplabPattern', { lid })
      } catch (error) {
        this.$q.notify(error.message)
      }
    }
  }
}
</script>

<style>

</style>
