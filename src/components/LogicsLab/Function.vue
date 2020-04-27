<template>
  <div>
    <p>Критерий: {{ criterion.description }}</p>
    <p>График функции принадлежности данного критерия:</p>
    <img :src="criterion.path" alt="график" align="middle" width="700"/>
    <p>Вид функции:</p>
    <img :src="criterion.function">
    <div v-if='step === 0'>
      <p>Необходимо по графику функции принадлежности и её общему виду восстановить неизвестные коэффициенты</p>
      <q-input v-for='(item, index) of letter'
        :key='index'
        class='input'
        outlined
        v-model="user_answer[index]"
        placeholder='0.000'
        :label='item'
        @change='valid(user_answer)'
      />
      <div class="clr"></div>
      <q-btn @click='first_check()' color='secondary' label='Проверить'/>
    </div>
    <div v-else-if='step === 1'>
      <p v-for='(item, index) of letter'
        :key='index'
        class='alternative'
      >
        {{ item }} = {{ criterion.koef[index] }};&nbsp;
      </p>
      <div class="clr"></div>
      <p>Получите оценку альтернатив по данному критерию</p>
      <q-table
        class='table'
        :title='criterion.title'
        :columns='columns'
        :data='data'
        separator='cell'
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="first_value" :props="props">{{ props.row.first_value }}</q-td>
            <q-td key="second_value" :props="props">
              {{ props.row.second_value }}
              <q-popup-edit v-model="props.row.second_value">
                <q-input @change='building()' placeholder='0.000' v-model="props.row.second_value" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="clr"></div>
      <q-btn @click='second_check()' color='secondary' label='Проверить'/>
    </div>
    <div v-else>
      <p v-for='(item, index) of letter'
        :key='index'
        class='alternative'
      >
        {{ item }} = {{ criterion.koef[index] }};&nbsp;
      </p>
      <div class="clr"></div>
      <q-table
        class='table'
        :title='criterion.title'
        :columns='columns'
        :data='data'
        separator='cell'
        hide-bottom
      >
      </q-table>
      <div class="clr"></div>
      <button-next label='Продолжить'/>
    </div>
    <p v-if='error' style='color: red'>Неверно</p>
    <p v-if='validation' style='color: red'>Проверьте корректность ввода всех полей</p>
  </div>
</template>

<script>
export default {
  name: 'function',
  data () {
    return {
      step: this.total_step > this.current_step ? 2 : this.total_step === 5 || this.total_step === 6 ? 1 : 0,
      letter: ['a', 'b', 'c'].slice(0, this.criterion.koef.length),
      user_answer: ['', '', ''].slice(0, this.criterion.koef.length),
      error: false,
      validation: false,
      columns: [
        { name: 'name', required: true, label: 'Альтернатива', field: row => row.name, align: 'left' },
        { name: 'first_value', label: 'Значение данного критерия', field: row => row.first_value, align: 'right' },
        { name: 'second_value', label: 'Оценка альтернативы по данному критерию', field: row => row.second_value, align: 'right' }
      ],
      data: []
    }
  },
  props: ['total_step', 'current_step', 'criterion', 'alternative', 'array'],
  created () {
    for (let i = 0; i < this.alternative.length; i++) {
      this.data.push({ name: this.alternative[i].description, first_value: typeof this.alternative[i][this.current_step - 2] === 'number' ? this.alternative[i][this.current_step - 2] : this.alternative[i][this.current_step - 2][0], second_value: this.total_step === this.current_step ? '' : this.array[i] })
    }
  },
  methods: {
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
      const answer = []
      for (const i of this.data) {
        answer.push(i.second_value)
      }
      this.valid(answer)
    },
    first_check () {
      this.empty_check(this.user_answer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.user_answer.length; i++) {
        if (this.compare(this.criterion.koef[i], +this.user_answer[i])) {
          this.error = true
          this.$emit('error')
          return
        }
      }
      this.step++
    },
    second_check () {
      const answer = []
      for (const i of this.data) {
        answer.push(i.second_value)
      }
      this.empty_check(answer)
      if (this.validation) {
        return
      }
      for (let i = 0; i < this.data.length; i++) {
        if (this.compare(this.array[i], +this.data[i].second_value)) {
          this.error = true
          this.$emit('error')
          return 0
        }
      }
      for (let i = 0; i < this.array.length; i++) {
        this.data[i].second_value = this.array[i]
      }
      this.step++
    }
  }
}
</script>

<style scoped>
  .alternative {
    display: inline-block;
    font-family: 'Time Roman Italic';
  }
</style>
