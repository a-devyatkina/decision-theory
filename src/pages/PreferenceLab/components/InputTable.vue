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
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="a1" :props="props">
            <!-- <input v-model="props.row.a1"/> -->
            {{ props.row.a1  }}
            <q-popup-edit v-model="props.row.a1" title="Edit the Name">
              <q-input type="number" v-model="props.row.a1" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="a2" :props="props">
            {{ props.row.a2 }}
            <q-popup-edit v-model="props.row.a2" title="Edit the Name">
              <q-input type="number" v-model="props.row.a2" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="a3" :props="props">
            {{ props.row.a3 }}
            <q-popup-edit v-model="props.row.a3" title="Edit the Name">
              <q-input type="number" v-model="props.row.a3" dense autofocus counter />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: ['data', 'columns', 'title']
}
</script>
