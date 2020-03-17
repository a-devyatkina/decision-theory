<template>
  <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" :filter="filter" :filter-method="doFilter" class="q-ma-md">
    <template slot="top-left" slot-scope="props">
      <q-search hide-underline v-model="filter"/>
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="name" :props="props">
        {{ props.row.name }}
      </q-td>
      <q-td key="desc" :props="props">
        <div style="white-space:pre-wrap">{{ props.row.description }}</div>
      </q-td>
      <q-td key="link" :props="props">
        <router-link class="q-btn" :to="props.row.link">{{ props.row.name }}</router-link>
      </q-td>
    </q-tr>
  </q-table>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      links: {},
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
        name: 'link',
        required: true,
        label: 'Обзор',
        align: 'left',
        field: 'link',
        sortable: true,
        classes: '',
        style: ''
      }
      ]
    }
  },
  computed: {
    content () {
      let labs = this.$store.getters['data/getHierarchiesLabs']()
      let content = []
      for (let lid in labs) {
        let lab = labs[lid]
        content.push({
          id: lid,
          name: lab.name,
          description: lab.description
        })
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
    }
  }
}
</script>

<style>

</style>
