<template>
    <div class="matrix" id="matrix_table">
        <q-table
                :title="matrix.name"
                :data="matrix.value"
                :columns="columns"
                color="primary"
                row-key="id"
                hide-header
                hide-bottom
        />
    </div>
</template>

<script>
export default {
  props: [ 'matrix' ],
  data: () => {
    return {
      columns: [
        {
          name: '1',
          field: row => row[0]
        },
        {
          name: '2',
          field: row => row[1]
        },
        {
          name: '3',
          field: row => row[2]
        },
        {
          name: '4',
          field: row => row[3]
        }
      ]
    }
  }
}
</script>

<style scoped>
    #matrix_table {
        width: 400px;
    }
</style>
