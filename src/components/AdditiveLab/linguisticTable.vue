<template>
  <q-table
      title="Лингвистические значения"
      :data="linguistic"
      :columns="linguisticColumns"
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
      linguisticColumns: [
        { name: 'level', align: 'left', field: 'level' },
        { name: 'abbr', align: 'center', field: 'abbr' },
        { name: 'begin', align: 'center', label: '0', field: 'begin' },
        { name: 'top', align: 'center', label: '1', field: 'top' },
        { name: 'end', align: 'center', label: '0', field: 'end' }
      ]
      /* linguistic: [
        { level: 'Очень низкий', abbr: 'ОН', begin: 0, top: this.table[0], end: this.table[1] },
        { level: 'Низкий', abbr: 'Н', begin: this.table[0], top: this.table[1], end: this.table[2] },
        { level: 'Средний', abbr: 'С', begin: this.table[1], top: this.table[2], end: this.table[3] },
        { level: 'Высокий', abbr: 'В', begin: this.table[2], top: this.table[3], end: 1 },
        { level: 'Очень высокий', abbr: 'ОВ', begin: this.table[3], top: 1, end: 1 }
      ] */
    }
  },
  computed: {
    linguistic () {
      console.log(this.table)
      let linguistic = []
      if (this.table.length === 4) {
        linguistic = [
          { level: 'Очень низкий', abbr: 'ОН', begin: 0, top: this.table[0], end: this.table[1] },
          { level: 'Низкий', abbr: 'Н', begin: this.table[0], top: this.table[1], end: this.table[2] },
          { level: 'Средний', abbr: 'С', begin: this.table[1], top: this.table[2], end: this.table[3] },
          { level: 'Высокий', abbr: 'В', begin: this.table[2], top: this.table[3], end: 1 },
          { level: 'Очень высокий', abbr: 'ОВ', begin: this.table[3], top: 1, end: 1 }
        ]
      } else {
        linguistic = [
          { level: 'Очень низкий', abbr: 'ОН', begin: this.table[0], top: this.table[1], end: this.table[2] },
          { level: 'Низкий', abbr: 'Н', begin: this.table[1], top: this.table[2], end: this.table[3] },
          { level: 'Средний', abbr: 'С', begin: this.table[2], top: this.table[3], end: this.table[4] },
          { level: 'Высокий', abbr: 'В', begin: this.table[3], top: this.table[4], end: 1 },
          { level: 'Очень высокий', abbr: 'ОВ', begin: this.table[4], top: 1, end: 1 }
        ]
      }
      return linguistic
    }
  }
}
</script>
