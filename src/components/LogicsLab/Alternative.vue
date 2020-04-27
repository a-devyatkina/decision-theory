<template>
  <div class="goal">
    <p>Ранее в процессе выполнения были получены оценки альтернативы {{ alternative.description }} по всем критериям:</p>
    <q-table
      class='table'
      :title='alternative.description'
      :columns='columns1'
      :data='data1'
      separator='cell'
      hide-bottom
    >
    </q-table>
    <div class="clr"></div>
    <p>Представленные значения отражают принадлежность соответствующего свойства альтернативы к множеству μ<sub>A</sub> «Подходящее  (подходящая,  подходящий)». Для расчета функции принадлежности свойства альтернативы к множеству «неподходящее» использовать классическое отрицание.</p>
    <p v-if='step === 0'>Получить оценку принадлежности каждого свойства к обоим классам</p>
    <q-table
      class='table'
      :title='alternative.description'
      :columns='columns2'
      :data='data2'
      separator='cell'
      hide-bottom
    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="first_value" :props="props">
            {{ props.row.first_value }}
            <q-popup-edit v-if='step === 0' v-model="props.row.first_value">
              <q-input @change='first_building()' placeholder='0.000' v-model="props.row.first_value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="second_value" :props="props">
            {{ props.row.second_value }}
            <q-popup-edit v-if='step === 0' v-model="props.row.second_value">
              <q-input @change='first_building()' placeholder='0.000' v-model="props.row.second_value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="clr"></div>
    <q-btn v-if='step === 0' @click='first_check()' color='secondary' label='Проверить'/>
    <div v-if='step >= 1'>
      <p>Правила:</p>
      <p v-for='(item, index) of rules' :key='item'>
        d<sub>{{ index + 1 }}</sub> : {{ item }}
      </p>
    </div>
    <div v-if='step === 1'>
      <p>Найти числовые значения μ<sub>A</sub> функций принадлежности d<sub>1</sub>,  d<sub>2</sub>,  d<sub>3</sub></p>
      <q-input v-for='index of range(rules.length)'
        :key='index'
        outlined
        v-model="user_answer[index]"
        :label='`d${index + 1}`'
        placeholder='0.000'
        class='input'
        @change='valid(user_answer)'
      />
      <q-btn @click='second_check()' color='secondary' label='Проверить'/>
    </div>
    <div v-if='step >= 2'>
      <p>На основе данных правил получены значение μ<sub>A</sub> функций принадлежности:</p>
      <p v-for='(item, index) of array2' :key='index'>
        μ<sub>A</sub>(d<sub>{{ index + 1 }}</sub>) = {{ item }}
      </p>
      <p>Переменная Y задана на множестве J = {0; 0, 1; 0, 2; ...; 1}.<p>
      <p>Значения переменной Y заданы с помощью следующих функций принадлежности:</p>
      <p>S = удовлетворительный             μ<sub>B</sub> (x) = х;</p>
      <p>US = неудовлетворительный           μ<sub>B</sub> (x) = 1 – х;</p>
      <p>Р = безупречный                    μ<sub>B</sub> (х) = 1,  если х = 1,  иначе 0.</p>
      <p>Здесь x - элемент множества J</p>
      <p  v-if='step === 2'>Используя для преобразования правил импликацию Лукасевича, получить нечёткие отношения D<sub>1</sub>,  D<sub>2</sub>,  D<sub>3</sub></p>
      <p>Правило Лукасевича: μ<sub>A->B</sub>=min{1;1-μ<sub>A</sub> + μ<sub>B</sub>}</p>
      <q-table
        class='table_D'
        title='Функциональное решение'
        :columns='columns3'
        :data='data3'
        separator='cell'
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td v-for='index of range(Y.length - 1)' :key='number_value(index)' :props="props">
              {{ props.row[number_value(index)] }}
              <q-popup-edit v-if='step === 2' v-model="props.row[number_value(index)]">
                <q-input @change='second_building()' placeholder='0.000' v-model="props.row[number_value(index)]" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="clr"></div>
      <q-btn v-if='step === 2' @click='third_check()' color='secondary' label='Проверить'/>
      <p v-if='step === 3'>На основе полученных функциональных решений получить итоговое функциональное решение</p>
      <q-table v-if='step > 2'
        class='table_D'
        title='Итоговое функциональное решение'
        :columns='columns3'
        :data='data4'
        separator='cell'
        hide-header
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td v-for='index of range(Y.length - 1)' :key='number_value(index)' :props="props">
              {{ props.row[number_value(index)] }}
              <q-popup-edit v-if='step === 3' v-model="props.row[number_value(index)]">
                <q-input @change='third_building()' placeholder='0.000' v-model="props.row[number_value(index)]" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="clr"></div>
      <q-btn v-if='step === 3' @click='fourth_check()' color='secondary' label='Проверить'/>
      <button-next v-if='step === 4' label='Продолжить'/>
    </div>
    <p v-if='error' style='color: red'>Неверно</p>
    <p v-if='validation' style='color: red'>Проверьте корректность ввода всех полей</p>
  </div>
</template>

<script>
export default {
  name: 'alternative',
  data  () {
    return {
      step: this.total_step > this.current_step ? 4 : 2,
      user_answer: [],
      error: false,
      validation: false,
      columns1: [
        { name: 'name', required: true, label: 'Критерий', field: row => row.name, align: 'left' },
        { name: 'value', label: 'Оценка альтернативы по данному критерию', field: row => row.value, align: 'right' }
      ],
      data1: [],
      columns2: [
        { name: 'name', required: true, label: 'Критерий', field: row => row.name, align: 'left' },
        { name: 'first_value', label: 'Подходящее', field: row => row.first_value, align: 'right' },
        { name: 'second_value', label: 'Неподходящее', field: row => row.second_value, align: 'right' }
      ],
      data2: [],
      Y: [-1, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      columns3: [],
      data3: [],
      data4: []
    }
  },
  props: ['total_step', 'current_step', 'alternative', 'criterion', 'array1', 'array2', 'array3', 'array4', 'rules'],
  created () {
    this.data1 = this.criterion.map((item, index) => { return { name: item.title, value: this.array1[index] } })
    this.data2 = this.criterion.map((item, index) => { return { name: item.title, first_value: this.total_step === this.current_step ? '' : this.array1[index], second_value: this.total_step === this.current_step ? '' : +(1 - this.array1[index]).toFixed(3) } })
    this.columns3 = this.Y.map((item, index) => { return index ? { name: 'value' + item.toString(), label: 'x = ' + item.toString(), field: row => row['value' + item.toString()], align: 'right' } : { name: 'name', required: true, label: 'Y', field: row => row.name, align: 'left' } })
    this.data3 = this.array2.map((item, index) => {
      const dict = {}
      dict.name = 'D' + (index + 1).toString()
      for (const i of this.Y.slice(1)) {
        dict['value' + i.toString()] = this.total_step === this.current_step ? '' : this.array3[i * 10 + index * 11]
      }
      return dict
    })
    const dict = {}
    dict.name = 'D'
    for (const i of this.Y.slice(1)) {
      dict['value' + i.toString()] = this.total_step === this.current_step ? '' : this.array4[i * 10]
    }
    this.data4.push(dict)
    this.user_answer = this.rules.map(elem => '')
  },
  methods: {
    range (n) {
      return [...Array(n).keys()]
    },
    number_value (index) {
      return 'value' + (index / 10).toString()
    },
    compare (a, b) {
      if (Math.abs(a) < 1) {
        if (b < a + 0.1 && b > a - 0.1) { return false } else { return true }
      } else {
        if ((a / b < 1.1 && a / b > 0.9) || (b / a < 1.1 && b / a > 0.9)) { return false } else { return true }
      }
    },
    valid (answer) {
      console.log(answer)
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
    first_building () {
      const answer = []
      for (const i of this.data2) {
        answer.push(i.first_value)
        answer.push(i.second_value)
      }
      this.valid(answer)
    },
    second_building () {
      const answer = []
      for (const i of this.data3) {
        for (const j of Object.values(i).slice(1)) {
          answer.push(j)
        }
      }
      this.valid(answer)
    },
    third_building () {
      const answer = []
      for (const i of Object.values(this.data4[0]).slice(1)) {
        answer.push(i)
      }
      this.valid(answer)
    },
    first_check () {
      const userAnswer = []
      const rightAnswer = []
      for (let i = 0; i < this.array1.length; i++) {
        userAnswer.push(this.data2[i].first_value)
        userAnswer.push(this.data2[i].second_value)
        rightAnswer.push(this.array1[i])
        rightAnswer.push(+(1 - this.array1[i]).toFixed(3))
      }
      this.empty_check(userAnswer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < userAnswer.length; i++) {
        if (this.compare(rightAnswer[i], userAnswer[i])) {
          this.error = true
          this.$emit('error', [6, 1])
          return
        }
      }
      for (let i = 0; i < this.criterion.length; i++) {
        this.data2[i].first_value = rightAnswer[2 * i]
        this.data2[i].second_value = rightAnswer[2 * i + 1]
      }
      this.step++
    },
    second_check () {
      this.empty_check(this.user_answer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.array2.length; i++) {
        if (this.compare(this.array2[i], this.user_answer[i])) {
          this.error = true
          this.$emit('error', [7, 2])
          return
        }
      }
      this.step++
    },
    third_check () {
      const userAnswer = []
      for (let i = 0; i < this.rules.length; i++) {
        for (const j of this.range(this.Y.length).slice(1)) {
          userAnswer.push(Object.values(this.data3[i])[j])
        }
      }
      this.empty_check(userAnswer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.array3.length; i++) {
        if (this.compare(this.array3[i], userAnswer[i])) {
          this.error = true
          this.$emit('error', [7, 0.5])
          return
        }
      }
      for (let i = 0; i < this.rules.length; i++) {
        for (const j of this.range(this.Y.length - 1)) {
          this.data3[i][this.number_value(j % 11)] = this.array3[j + i * 11]
        }
      }
      this.step++
    },
    fourth_check () {
      const userAnswer = []
      for (const i of Object.values(this.data4[0]).slice(1)) {
        userAnswer.push(i)
      }
      this.empty_check(userAnswer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.array4.length; i++) {
        if (this.compare(this.array4[i], userAnswer[i])) {
          this.error = true
          this.$emit('error', [8, 2])
          return
        }
      }
      for (let i = 0; i < this.array4.length; i++) {
        this.data4[0][this.number_value(i)] = this.array4[i]
      }
      this.step++
    }
  }
}
</script>

<style scoped>
  .table_D {
    margin-bottom: 30px;
  }
</style>
