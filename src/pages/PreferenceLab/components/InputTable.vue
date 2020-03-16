<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      row-key="name"
      bordered
      separator="cell"
      hide-bottom
      virtual-scroll
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="a1" :props="props">
            <!-- <input v-model="props.row.a1"/> -->
            {{ props.row.a1  }}
            <q-popup-edit v-model="props.row.a1" title="Введите значение">
              <q-input v-model="props.row.a1" dense autofocus counter color="secondary"/>
            </q-popup-edit>
          </q-td>
          <q-td key="a2" :props="props">
            {{ props.row.a2 }}
            <q-popup-edit v-model="props.row.a2" title="Введите значение">
              <q-input type="number" v-model="props.row.a2" dense autofocus counter color="secondary"/>
            </q-popup-edit>
          </q-td>
          <q-td key="a3" :props="props">
            {{ props.row.a3 }}
            <q-popup-edit v-model="props.row.a3" title="Введите значение">
              <q-input type="number" v-model="props.row.a3" dense autofocus counter color="secondary" />
            </q-popup-edit>
          </q-td>
        </q-tr>
    </q-table>
  </div>
</template>

<script>
debugger
export default {
  props: ['data', 'columns', 'title']
}
</script>
