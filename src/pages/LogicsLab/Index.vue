<template>
  <div class='q-pa-md'>
    <q-stepper
      v-model='current_step'
      header-nav
      color='secondary'
      animated
    >
      <q-step
        :name='0'
        title='Условие'
        icon='assignment'
        :header-nav='true'
        :done='correctStep > 0'
      >
        <condition-logics
          :condition='condition'
          :total_step='correctStep'
          :current_step='current_step'
        />
      </q-step>

      <q-step v-for='(item, index) of question.slice(0,2)'
        :key='index'
        :title='`Вопрос ${index + 1}`'
        :name='index + 1'
        icon='assignment'
        :header-nav='correctStep > index'
        :done='correctStep > index + 1'
      >
        <question-logics
          :question='item'
          :total_step='correctStep'
          :current_step='current_step'
          :user_answer='user_answer[index]'
          @error='question_error($event, index)'
          @right='question_right($event, index)'
        />
      </q-step>

      <q-step v-for='index of range(this.condition.criterion.length)'
        :key='index'
        :title='`Критерий ${index + 1}`'
        :name='index+3'
        icon='assignment'
        :header-nav='correctStep > index + 2'
        :done='correctStep > index + 3'
      >
        <function-logics
          :total_step='correctStep'
          :current_step='current_step'
          :criterion='condition.criterion[index]'
          :alternative='condition.alternative'
          :array='first_value[index]'
          @criterion='criterion(index)'
          @error='marking(5,1)'
        />
      </q-step>

      <q-step v-for='(item, index) of question.slice(2,4)'
        :key='index + 2'
        :title='`Вопрос ${index + 3}`'
        :name='index + 7'
        icon='assignment'
        :header-nav='correctStep > index + 6'
        :done='correctStep > index + 7'
      >
        <question-logics
          :question='item'
          :total_step='correctStep'
          :current_step='current_step'
          :user_answer='user_answer[index + 2]'
          @error='question_error($event, index + 2)'
          @right='question_right($event, index + 2)'
        />
      </q-step>

      <q-step v-for='index of range(this.condition.alternative.length)'
        :key='index'
        :title='`Альтернатива ${index + 1}`'
        :name='index + 9'
        icon='assignment'
        :header-nav='correctStep > index + 8'
        :done='correctStep > index + 9'
      >
      <alternative-logics
        :total_step='correctStep'
        :current_step='current_step'
        :array1='second_value[index]'
        :array2='third_value[index]'
        :array3='fourth_value[index]'
        :array4='fifth_value[index]'
        :alternative='condition.alternative[index]'
        :criterion='condition.criterion'
        :rules='condition.rules.text'
        @error='marking($event[0], $event[1])'
      />
      </q-step>

      <q-step
        :name='12'
        title='Ответ'
        icon='assignment'
        :header-nav='correctStep > 11'
        :done='correctStep > 12'
      >
        <assessment
          :total_step='correctStep'
          :current_step='current_step'
          :alternative='condition.alternative'
          :array1='fifth_value'
          :array2='sixth_value'
          :attempt='work3.work.attempt'
          @error='marking($event[0], $event[1])'
          @finish='finish'
          @remake='remake'
        />
      </q-step>
    </q-stepper>
     <q-dialog v-model="alert"  prevent-close @ok='handlerOk'>
      <span slot="title">Неудача</span>
      <span slot="message">К сожалению, вы набрали меньше 60% процентов от максиамльного количества баллов.</span>
    </q-dialog>
    <div class="lab-info">
      <div class="mark">
        Количество баллов: {{ realScore }}. Попытка №{{ work3.work.attempt + 1 }}. Штрафной балл {{ maxScore *10 * work3.work.attempt / 100 }} Прогресс
      </div>
       <div class="step">
          {{current_step}}/16
      </div>
    </div>
    <q-dialog v-model="alert"  prevent-close @ok='handlerOk'>
      <span slot="title">Неудача</span>
      <span slot="message">К сожалению, вы набрали меньше 60% процентов от максиамльного количества баллов.</span>
    </q-dialog>
  </div>
</template>

<script>
/* eslint no-eval: 0 */
import { bus } from '../../router/index.js'
import { checkLab } from '../../function/workWithFirebase'

export default {
  name: 'main_page',
  data () {
    return {
      correctStep: 0,
      current_step: 0,
      mark: [8, 8, 8, 8, 8, 12, 12, 12, 12, 12],
      user_answer: [0, 0, 0, 0],
      condition: {},
      question: []
    }
  },
  computed: {
    realScore: function () {
      const score = this.mark.reduce((acc, val) => acc + val, 0)
      return this.maxScore * (score - 10 * this.work3.work.attempt) / 100
    },
    first_value () {
      const matrix = []
      for (let i = 0; i < this.condition.criterion.length; i++) {
        matrix.push([])
      }
      for (let i = 0; i < this.condition.criterion.length; i++) {
        for (let j = 0; j < this.condition.alternative.length; j++) {
          matrix[i].push(+eval(this.condition.criterion[i].functioncompute.replace(/x/g, typeof this.condition.alternative[j][i + 1] === 'number' ? this.condition.alternative[j][i + 1] : this.condition.alternative[j][i + 1][1])).toFixed(3))
        }
      }
      return matrix
    },
    second_value () {
      const matrix = []
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
      }
      for (let i = 0; i < this.condition.criterion.length; i++) {
        for (let j = 0; j < this.condition.alternative.length; j++) {
          matrix[j][i] = this.first_value[i][j]
        }
      }
      return matrix
    },
    third_value () {
      const matrix = []
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
        for (let j = 0; j < this.condition.rules.formula.length; j++) {
          matrix[i].push(+eval(this.condition.rules.formula[j].replace(/q/g, 'this.second_value[' + i.toString() + ']')).toFixed(3))
        }
      }
      return matrix
    },
    fourth_value () {
      const matrix = []
      let kk
      for (let i = 0; i < this.condition.alternative.length; i++) {
        matrix.push([])
        for (const [index, j] of this.third_value[i].entries()) {
          for (let k = 0; k <= 1; k += 0.1) {
            kk = +k.toFixed(3)
            matrix[i].push(+Math.min(1, 1 - j + (index === 0 ? kk : index === 1 ? (1 - kk) : kk === 1 ? 1 : 0)).toFixed(3))
          }
        }
      }
      return matrix
    },
    fifth_value () {
      const matrix = []
      for (let i = 0; i < this.fourth_value.length; i++) {
        matrix.push([])
        for (const j of this.range(11)) {
          matrix[i].push(Math.min(this.fourth_value[i][j], this.fourth_value[i][j + 11], this.fourth_value[i][j + 22]))
        }
      }
      return matrix
    },
    sixth_value () {
      let sortArray
      const Y = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      const array = this.fifth_value.map(item => {
        let mark = 0
        const copyArray = Object.assign([], item)
        sortArray = copyArray.sort().filter((value, index) => copyArray.indexOf(value) === index)
        for (let i = 0; i < sortArray.length; i++) {
          let sum = 0
          let k = 0
          for (let j = 0; j < item.length; j++) {
            if (sortArray[i] <= item[j]) {
              sum += Y[j]
              k += 1
            }
          }
          mark += sum / k * (i === 0 ? sortArray[0] : sortArray[i] - sortArray[i - 1])
        }
        mark = mark / sortArray[sortArray.length - 1]
        return +mark.toFixed(3)
      })
      return array
    }
  },
  async created () {
    bus.$on('next_step', () => {
      if (this.correctStep === this.current_step) {
        this.correctStep += 1
        this.work3.work.step = this.correctStep
        this.$store.dispatch('data/updateWork3', {
          wid: this.work3.wid,
          work: this.work3.work
        })
      }
      this.current_step += 1
    })
    await checkLab.call(this, 'logicsLab')
    for (let i = 0; i < this.condition.criterion.length; i++) {
      if (!this.condition.criterion[i].koef) {
        this.condition.criterion[i].koef = []
      }
    }
    if (this.work3.work.error !== '') {
      this.mark = this.work3.work.error
    }
  },
  methods: {
    handlerOk () {
      this.$router.push('/works')
    },
    range (n) {
      return [...Array(n).keys()]
    },
    marking (n, k) {
      this.mark.splice(n, 1, this.mark[n] ? this.mark[n] - k : 0)
      this.work3.work.error = this.mark
      const score = this.mark.reduce((acc, val) => acc + val)
      if (score - this.work3.work.attempt * 10 < 60) {
        this.alert = true
        this.work3.work.stage = 'improve'
        this.work3.work.attempt += 1
      }
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      })
    },
    question_error (array, index) {
      this.user_answer[index] = array
      this.marking(index, 8)
    },
    question_right (array, index) {
      this.user_answer[index] = array
    },
    finish () {
      this.work3.work.stage = 'resolve'
      console.log(this.question[4])
      this.work3.work.finalquestion = {...this.question[4]}
      this.work3.work.score = this.realScore
      // this.work3.work.attempt += 1
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      })
      this.$router.push('/works')
    },
    remake () {
      this.work3.work.stage = 'improve'
      this.work3.work.attempt += 1
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      })
      this.$router.push('/works')
    }
  }
}
</script>

<style>
  * {
    font-size: 20px;
  }

  .clr {
    clear: both;
  }

  .input {
    display: inline-block;
    margin: 30px 100px 40px 0;
  }

  .table {
    display: inline-table;
    margin-bottom: 30px;
  }
  .lab-info{
    display: flex;
    align-items: center;
  }
  .mark{
    color: #26a69a;
    font-size: 20px;
    margin: 5px;
  }
  .step{
    border: 1px solid #26a69a;
    border-radius: 50%;
    margin: 5px;
    padding: 5px;
    color: #26a69a;
    height: 45px;
    padding-top: 10px;
  }
</style>
