<template>
    <div>
        <p>Ранее в процессе выполнения были получены итоговое функциональное решение альтернатив:</p>
        <q-table
          class='table'
          title='Итоговое функциональное решение'
          :columns='columns'
          :data='data'
          separator='cell'
          hide-bottom
        >
        </q-table>
        <div v-if='step === 0'>
          <p>С помощью итогового функционального решения найти оценки каждой альтернативы и выделить среди них лучшую (указать её номер) </p>
          <q-input v-for='index of range(user_answer.length)'
            :key='index'
            outlined
            :label='`A${index}`'
            v-model="user_answer[index]"
            placeholder='0.000'
            class='input'
            @change='building()'
          />
          <div class="clr"></div>
          <q-input
            label='Лучшая альтернатива'
            outlined
            v-model="final_answer"
            placeholder='0'
            class='input'
            @change='building()'
          />
          <div class="clr"></div>
          <q-btn v-if='step === 0' @click='check()' color='secondary' label='Проверить'/>
        </div>
        <div v-else>
          <p>Оценки альтернатив</p>
          <p v-for='(item, index) of array2'
            :key='item'
          >
          {{ alternative[index].description }} : {{ item }}
          </p>
          <p>Лучшая альтернатива: {{ alternative[array2.indexOf(Math.max.apply(null, array2))].description }}</p>
        </div>
        <p v-if='error' style='color: red'>Неверно</p>
        <p v-if='validation' style='color: red'>Проверьте корректность ввода всех полей</p>
        <q-btn class='q-px-lg' color="secondary" label="Завершить" @click="$emit('finish')"/>
        <q-btn :disable="attempt > 4" class='q-px-lg' color="secondary" label="Переделать" style='margin: 25px' @click="$emit('remake')"/>
    </div>
</template>

<script>
export default {
  name: 'assessment',
  data () {
    return {
      step: this.total_step === this.current_step ? 0 : 1,
      error: false,
      validation: false,
      Y: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      columns: [],
      data: [],
      user_answer: [],
      final_answer: ''
    }
  },
  props: ['total_step', 'current_step', 'alternative', 'array1', 'array2', 'attempt'],
  created () {
    this.columns = this.Y.map((item, index) => { return index ? { name: 'value' + item.toString(), label: 'x = ' + item.toString(), field: row => row['value' + item.toString()], align: 'right' } : { name: 'name', required: true, label: 'Альтернатива', field: row => row.name, align: 'left' } })
    this.data = this.array1.map((item, index) => {
      const dict = {}
      dict.name = this.alternative[index].description
      for (const [index, value] of item.entries()) {
        dict['value' + this.Y[index + 1].toString()] = value
      }
      return dict
    })
    this.user_answer = this.array2.map(item => '')
  },
  methods: {
    range (n) {
      return [...Array(n).keys()]
    },
    compare (a, b) {
      if (Math.abs(a) < 1) {
        if (b < a + 0.1 && b > a - 0.1) { return false } else { return true }
      } else {
        if ((a / b < 1.1 && a / b > 0.9) || (b / a < 1.1 && b / a > 0.9)) { return false } else { return true }
      }
    },
    valid (answer) {
      this.error = false
      if (answer.every(elem => (+elem || +elem === 0) && elem[elem.length - 1] !== '.' && elem[0] !== '.')) {
        this.validation = false
        return false
      } else {
        this.validation = true
        return true
      }
    },
    empty_check (answer) {
      if (answer.some(elem => elem === '')) {
        this.validation = true
        return true
      }
    },
    building () {
      const array = []
      for (const i of this.user_answer) {
        array.push(i)
      }
      array.push(this.final_answer)
      this.valid(array)
    },
    check () {
      const array = []
      for (const i of this.user_answer) {
        array.push(i)
      }
      array.push(this.final_answer)
      this.empty_check(array)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.user_answer.length; i++) {
        if (this.compare(this.array2[i], this.user_answer[i])) {
          this.error = true
          this.$emit('error', [9, 0.5])
          return
        }
      }
      if ((this.array2.indexOf(Math.max.apply(null, this.array2) + 1) === +this.final_answer)) {
        this.error = true
        this.$emit('error', [9, 0.5])
        return
      }
      this.step++
    }
  }
}
</script>
