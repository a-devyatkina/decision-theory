<template>
  <q-table
      title="Важность критериев"
      :data="importance"
      :columns="importanceColumns"
      row-key="name"
      hide-bottom
      hide-header
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="level" :props="props">
          {{ props.row.level }}
        </q-td>
        <q-td key="abbr" :props="props">
          {{ props.row.abbr }}
        </q-td>
        <q-td key="begin" :props="props">
          {{ props.row.begin }}
        </q-td>
        <q-td key="top" :props="props">
          {{ props.row.top }}
        </q-td>
        <q-td key="end" :props="props">
          {{ props.row.end }}
        </q-td>
      </q-tr>
  </q-table>
</template>
<script>
export default {
  props: ['table'],
  data () {
    return {
      importanceColumns: [
        { name: 'level', align: 'left', field: 'level' },
        { name: 'abbr', align: 'center', field: 'abbr' },
        { name: 'begin', align: 'center', label: '0', field: 'begin' },
        { name: 'top', align: 'center', label: '1', field: 'top' },
        { name: 'end', align: 'center', label: '0', field: 'end' }
      ],
      importance: [
        { level: 'Важный', abbr: 'В', begin: this.table[1], top: this.table[2], end: 1 },
        { level: 'Очень важный', abbr: 'ОВ', begin: this.table[2], top: 1, end: 1 },
        { level: 'Не очень важный', abbr: 'НОВ', begin: this.table[0], top: this.table[1], end: this.table[2] }
      ]
    }
  }
  // computed: {
  //   importance: function () {
  //     return [
  //       { level: 'Важный', abbr: 'В', begin: this.table[1], top: this.table[2], end: 1 },
  //       { level: 'Очень важный', abbr: 'ОВ', begin: this.table[2], top: 1, end: 1 },
  //       { level: 'Не очень важный', abbr: 'НОВ', begin: this.table[0], top: this.table[1], end: this.table[2] }
  //     ]
  //   }
  // }
}
</script>
