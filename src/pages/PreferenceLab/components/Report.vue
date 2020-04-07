<template>
    <div>
    <div class="q-pa-md">
      <q-table
        title="Отчет"
        :data="data"
        bordered
        :columns="columns"
        row-key="name"
        virtual-scroll
      />
  </div>
   <q-btn class='q-px-lg' color="secondary" label="Завершить" @click="$emit('finish')"/>
   <q-btn :disable="attempt > 4" class='q-px-lg' color="secondary" label="Переделать" style='margin: 25px' @click="$emit('remake')"/>
    </div>
</template>

<script>
export default {
  props: ['max_points', 'penalty', 'errors', 'attempt'],
  data () {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'Номер шага', label: 'Номер шага', field: 'id' },
        { name: 'Название шага', label: 'Название шага', field: 'title' },
        { name: 'Балл', label: 'Баллы', field: 'point' },
        { name: 'Штраф', label: 'Штраф', field: 'penalty' },
        { name: 'Максимальный балл', label: 'Максимальный балл', field: 'max_points' }
      ]
    }
  },
  computed: {
    data () {
      const arr = []
      for (let i = 0; i < this.max_points.length; i++) {
        arr.push({
          id: i + 1,
          title: `i + ${i}`,
          point: this.max_points[i] - this.errors[i] * this.penalty[i],
          penalty: this.penalty[i],
          max_points: this.max_points[i]
        })
      }
      return arr
    }
  }
}
</script>
