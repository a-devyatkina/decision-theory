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
  props: ['attempt', 'limits', 'penalties', 'error'],
  data () {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: '№', label: '№', field: 'id' },
        { name: 'Задание', label: 'Задание', field: 'title' },
        { name: 'Балл', label: 'Балл', field: 'point' },
        { name: 'Штраф', label: 'Штраф', field: 'penalty' },
        { name: 'Кол-во ошибок', label: 'Кол-во ошибок', field: 'errorNum' },
        { name: 'Максимальный балл', label: 'Максимальный балл', field: 'max_points' }
      ]
    }
  },
  computed: {
    data () {
      let totalPenalties = []
      let totalErrors = []
      let limits = [...this.limits]
      for (let i = 1; i < this.error.length; i++) {
        let limitsIndex // index in limits for tasks
        switch (i) {
          // indexes for theoreticalChoice steps
          case 1: limitsIndex = 0; break
          case 10: limitsIndex = 3; break
          case 12: limitsIndex = 5; break
          case 14: limitsIndex = 7; break

            // indexes for funcAnswers steps
          case 2:
          case 3:
          case 4:
          case 5: limitsIndex = 1; break

            // indexes for AlternativesEvaluation steps
          case 6:
          case 7:
          case 8:
          case 9: limitsIndex = 2; break

            // indexes for RFunctions steps
          case 11: limitsIndex = 4; break

            // indexes for Squares steps
          case 13: limitsIndex = 6; break

            // indexes for CoordsAndAnswer steps
          case 15: limitsIndex = 8; break
        }
        totalPenalties[limitsIndex] = 0
        totalErrors[limitsIndex] = 0
        for (let j = 0; j < this.error[i]; j++) {
          limits[limitsIndex] -= this.penalties[i]
          totalPenalties[limitsIndex] += this.penalties[i]
          totalErrors[limitsIndex]++
          if (limits[limitsIndex] < 0) {
            limits[limitsIndex] = 0
            // break
          }
        }
      }
      const arr = []
      for (let i = 0; i < this.limits.length; i++) {
        arr.push({
          id: i + 1,
          point: limits[i],
          penalty: totalPenalties[i],
          errorNum: totalErrors[i],
          max_points: this.limits[i]
        })
      }
      arr[0].title = 'Первый теоретический вопрос'
      arr[1].title = 'Значения критериев'
      arr[2].title = 'Оценки для критериев'
      arr[3].title = 'Второй теоретический вопрос'
      arr[4].title = 'Нечеткие оценки'
      arr[5].title = 'Третий теоретический вопрос'
      arr[6].title = 'Площади'
      arr[7].title = 'Четвертый теоретический вопрос'
      arr[8].title = 'Ответ'
      return arr
    }
  }
}
</script>
