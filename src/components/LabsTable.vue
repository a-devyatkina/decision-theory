<template>
  <q-table :data="content" :columns="columns" row-key="id" rows-per-page-options="0" hide-bottom :pagination.sync="pagination" :filter="filter" :filter-method="doFilter" class="q-ma-md">
    <template slot="top-left" slot-scope="props">
      <q-search hide-underline v-model="filter" />
    </template>
    <template slot="top-right" slot-scope="props">
      <lab-button icon="add" :title="$t('Add lab')" color="secondary" />
    </template>
    <q-tr slot="body" slot-scope="props" :props="props">
      <q-td key="name" :props="props">
        {{ props.row.name }}
      </q-td>
      <q-td key="desc" :props="props">
        <div style="white-space:pre-wrap">{{ props.row.description }}</div>
      </q-td>
      <q-td key="files" :props="props">
        <q-chip icon-right="attachment" color="secondary">{{ $t('Files') }}</q-chip>
        <q-popover>
          <q-list link>
            <q-item v-for="file in props.row.files" @click.native="getLink(file, props.row.teacher)" :key="file" :download="file">
              <q-item-side icon="picture_as_pdf" />
              <q-item-main :label="file" />
            </q-item>
          </q-list>
        </q-popover>
      </q-td>
      <q-td key="actions" :props="props">
        <lab-button icon="edit" :title="$t('Edit lab')" flat :lid="props.row.id" />
        <q-btn icon="delete" round flat @click="removeLab(props.row.id, props.row.name)" />
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
        name: 'files',
        required: true,
        label: this.$t('Tasks'),
        align: 'left',
        field: 'files',
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
      }
      ]
    }
  },
  computed: {
    content () {
      let labs = this.$store.getters['data/getLabs']()
      let content = []
      for (let lid in labs) {
        let lab = labs[lid]
        if (lab !== undefined && lab.outdated === false) {
          if (lab.files !== undefined) {
            for (let file of lab.files) {
              let url = this.$store.getters['data/getLink'](lab.teacher, file)
              this.$set(this.links, file, url)
            }
          }
          content.push({
            id: lid,
            name: lab.name,
            description: lab.description,
            teacher: lab.teacher,
            outdated: lab.outdated,
            files: lab.files
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
    removeLab (lid, name) {
      this.$q.dialog({
        title: this.$t('Remove'),
        message: this.$t('Do you want to remove laboratory task') + ' "' + name + '"?',
        ok: this.$t('Yes'),
        cancel: this.$t('Cancel')
      }).then(() => {
        this.$store.dispatch('data/removeLab', {
          lid
        })
      })
    },
    getLink (file, tid) {
      let newWindow = window.open('', '_blank')
      if (!this.links[file]) {
        this.$store.dispatch('data/fillFileLinkForDownload', {
          owner: tid,
          file
        }).then(response => {
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

<style>

</style>
