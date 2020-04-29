<template>
  <q-btn :icon="icon" color="secondary" round @click="open">
    <q-modal v-model="opened" @open="notify('open')">
      <div class="q-pa-lg" style="width: 400px">
        <div class="column q-mb-md">
          <div class="row self-center">{{title}}</div>
        </div>
        <q-table :data="content" :columns="columns" row-key="lid" rows-per-page-options="0" :pagination.sync="pagination">
          <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="name" :props="props">
              <q-checkbox :label="props.row.name" v-model="props.row.selected"/>
            </q-td>
            <q-td key="maxScore" :props="props">
              <q-input hide-underline v-model="props.row.maxScore" />
            </q-td>
          </q-tr>
        </q-table>
        <div class="row q-mt-lg">
          <q-btn slot="footer" color="secondary" @click="apply(false)" :label="'Изменить план'" class="col q-ma-sm"/>
          <q-btn slot="footer" color="secondary" @click="apply(true)" :label="'Удалить старые работы'" class="col q-ma-sm"/>
          <q-btn slot="footer" color="secondary" @click="cancel()" :label="$t('Cancel')" class="col q-ma-sm"/>
        </div>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>
export default {
  props: ['icon', 'color', 'flat', 'title', 'cid', 'gid'],
  data () {
    return {
      opened: false,
      content: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: this.$t('Lab Name'),
          align: 'left',
          field: 'name',
          sortable: true,
          classes: '',
          style: ''
        },
        {
          name: 'maxScore',
          required: true,
          label: this.$t('Max Score'),
          align: 'left',
          field: 'maxScore',
          sortable: true,
          classes: '',
          style: ''
        }
      ],
      pagination: { rowsPerPage: 4, page: 1 }
    }
  },
  computed: {
    course () {
      return this.$store.getters['data/getCourse'](this.cid)
    },
    group () {
      return this.course.groups[this.gid]
    }
  },
  methods: {
    open () {
      this.opened = true
      let content = []
      let labs = this.$store.getters['data/getLabs']()
      for (let lid in labs) {
        let selected = this.group.labs !== undefined && this.group.labs[lid] !== undefined
        let maxScore = selected ? this.group.labs[lid].maxScore : 0
        content.push({
          lid: lid,
          name: labs[lid].name,
          maxScore: maxScore,
          selected: selected
        })
      }
      let steplabs = this.$store.getters['data/getSteplabsHandles']()
      for (let lid in steplabs) {
        let selected = this.group.steplabs !== undefined && this.group.steplabs[lid] !== undefined
        let maxScore = selected ? this.group.steplabs[lid].maxScore : 0
        content.push({
          lid: lid,
          name: steplabs[lid].name,
          maxScore: maxScore,
          selected: selected,
          isStepLab: true
        })
      }
      let hierarchieslab = this.$store.getters['data/getHierarchieslabs']()
      for (let lid in hierarchieslab) {
        let selected = this.group.hierarchieslab !== undefined && this.group.hierarchieslab[lid] !== undefined
        let maxScore = selected ? this.group.hierarchieslab[lid].maxScore : 0
        content.push({
          lid: lid,
          name: hierarchieslab[lid].name,
          maxScore: maxScore,
          selected: selected,
          isHierarchieslab: true
        })
      }
      let selected = this.group.attendance !== undefined
      let maxScore = selected ? this.group.attendance.maxScore : 0
      content.push({
        lid: 'attendance',
        name: 'Attendance',
        maxScore: maxScore,
        selected: selected
      })
      this.content = content
    },
    apply (update) {
      this.opened = false
      let labs = {}
      let steplabs = {}
      let hierarchieslab = {}
      let attendance = null
      for (let item of this.content) {
        if (item.selected) {
          if (item.lid === 'attendance') {
            attendance = item.maxScore
          } else if (item.isStepLab) {
            steplabs[item.lid] = { maxScore: item.maxScore }
          } else if (item.isHierarchieslab) {
            hierarchieslab[item.lid] = { maxScore: item.maxScore }
          } else {
            labs[item.lid] = { maxScore: item.maxScore }
          }
        }
      }
      this.$store.dispatch('data/updatePlanLabs', {
        cid: this.cid,
        gid: this.gid,
        labs: labs,
        steplabs: steplabs,
        hierarchieslab: hierarchieslab,
        attendance: attendance !== null ? { maxScore: attendance } : undefined,
        update: update
      })
    },
    cancel () {
      this.opened = false
    }
  }
}
</script>

<style>
</style>
