<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :data="data"
      bordered
      :columns="columns"
      row-key="name"
      hide-bottom
      virtual-scroll
    />
  </div>
</template>

<script>
export default {
  props: ['data', 'columns', 'title']
}
</script>
