<template>
  <div class='q-pa-md'>
    <q-stepper
      v-model='step'
      animated
      keep-alive
      bordered
      contractable
      no-header-nav
      color='secondary'
    >
       <q-step
        :name='0'
        title='Условие'
        icon='assignment'
        >
        <condition :condition='condition'></condition>
        <q-stepper-navigation>
          <q-btn @click='step += 1' color='secondary' label='Продолжить' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='1'
        icon='assignment'
        title='Вопрос'
        :done='correctStep > step - 1'
      >
        <theoretical-choice @success='correctChoice' :step='step' :correctStep='correctStep' :question='question[0]' @error='err' @back='back'></theoretical-choice>
      </q-step>

      <q-step v-for="(item, index) in condition.criterion" v-bind:key='index' :name='Number(index + 2)' :title='`Значения С${index + 1}`' icon='assignment' :done='correctStep > 1 + index'>
        <FirstStep :data = 'item' :alternative = 'condition.alternative' :index = 'index' :answers = 'funcAnswers[index]' :done='correctStep > 1 + index' @success = 'Answer()' @error="err"/>
        <q-stepper-navigation>
          <q-btn v-if='correctStep > index + 1' @click='() => { done2 = true; step = 3 + index }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > index + 1' flat @click='step = 1' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>

      <q-step v-for="index in 4" v-bind:key="index" :name='6 + (index - 1)' :title='`Оценка для C${index}`' icon='assignment' :done='correctStep > step - 1'>
        <alternatives-evaluation :cr='index - 1' :step='step' :correctStep='correctStep' :condition='condition' :funcAnswers='funcAnswers' @answer='getEvals' @back='back' @error="err" />
      </q-step>

      <q-step
        :name='10'
        title='Вопрос'
        :done='correctStep > step - 1'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back' @error="err"></theoretical-choice>
      </q-step>

      <q-step
        :name='11'
        title='Нечеткие оценки'
        icon='assignment'
      >
        <r-functions :altsEvals='altsEvals' :step='step' :correctStep='correctStep' :condition='condition' @answer='getFunctions' @back='back' @error="err"></r-functions>
      </q-step>

      <q-step
        :name='12'
        title='Вопрос'
        :done='correctStep > step - 1'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[2]' @back='back' @error="err"></theoretical-choice>
      </q-step>

      <q-step
        :name='13'
        title='Площади'
        icon='assignment'
        :done='correctStep > step - 1'
      >
        <squares :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getSquares' @back='back' @error="err"></squares>
      </q-step>

      <q-step
        :name='14'
        title='Вопрос'
        :done='correctStep > step - 1'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[3]' @back='back' @error="err"></theoretical-choice>
      </q-step>

      <q-step
        :name='15'
        title='Ответ'
        icon='assignment'
        :done='correctStep > step - 1'
      >
        <coords-and-answer :squares='squares' :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getAnswer' @back='back' @finish='finish' @error="err"></coords-and-answer>
      </q-step>

      <q-step
        :name='16'
        title='Защита'
        icon='assignment'
        :done='correctStep > step - 1'
      >
        <theoretical-input :question='question[4]' @back='back' @answer='step++'></theoretical-input>
      </q-step>
      <q-step
        :name='17'
        title='Итог'
        icon='assignment'
        :done='correctStep > step - 1'
      >
        <results :attempt='work3.work.attempt' :error='error' :penalties='penalties' :limits='limits' @finish="finish" @remake='remake'/>
      </q-step>
    </q-stepper>
    <div class="lab-info">
      <div class="mark">
        Количество баллов: {{ realScore }}. Попытка №{{ work3.work.attempt + 1 }}. Штрафной балл {{ maxScore *10 * work3.work.attempt / 100 }} Прогресс
      </div>
       <div class="step">
          {{step}}/16
      </div>
    </div>
    <q-dialog v-model="alert"  prevent-close @ok='handlerOk'>
      <span slot="title">Неудача</span>
      <span slot="message">К сожалению, вы набрали меньше 60% процентов от максиамльного количества баллов.</span>
    </q-dialog>
  </div>
</template>

<script>
import { checkLab } from '../../function/workWithFirebase'
// import func from '../../../vue-temp/vue-editor-bridge'
export default {
  data () {
    return {
      step: 0,
      correctStep: 0,
      error: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      penalties: [ 0, 8, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 8, 2, 8, 3 ],
      altsEvals: [],
      r_functions: [],
      squares: [],
      condition: {},
      score: 100,
      question: [],
      work3: {},
      limits: [ 8, 15, 15, 8, 12, 8, 6, 8, 20 ],
      alert: false,
      // limits: [ 8, 13, 13, 13, 13, 13, 13, 13, 13, 10, 5, 19 ]
      // limits: [ 8, 15, 15, 8, 12, 8, 6, 8, 20 ]
      // user: {}
      maxScore: 1000
    }
  },
  computed: {
    funcAnswers: function () {
      const answerArr = []
      for (let i = 1; i < 5; i++) {
        const arr = []
        for (let j = 0; j < this.condition.alternative.length; j++) {
          if (i === 3 || i === 4) {
            arr.push(Math.round(eval(this.condition.criterion[i - 1].functioncompute.replace(/x/g, this.condition.alternative[j][i][1])) * 100) / 100)
          } else {
            arr.push(Math.round(eval(this.condition.criterion[i - 1].functioncompute.replace(/x/g, this.condition.alternative[j][i])) * 100) / 100)
          }
        }
        answerArr.push(arr)
      }
      console.log('answerArr')
      console.log(answerArr)
      return answerArr
    },
    realScore: function () {
      console.log(this.maxScore * this.score / 100)
      return this.maxScore * (this.score - 10 * this.work3.work.attempt) / 100
    }
  },
  methods: {
    handlerOk () {
      this.$router.push('/works')
    },
    back () {
      this.step--
    },
    Answer () {
      this.correctStep++
    },
    correctChoice () {
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      this.step++
    },
    getEvals (evals) {
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      let evalsPush = evals[evals.length - 1]
      let isExists = this.altsEvals.find(obj => {
        return obj.criterion === evalsPush.criterion
      })
      if (!isExists) { this.altsEvals.push(evalsPush) }
      this.step++
      console.log('getEvals:')
      console.log(this.altsEvals)
    },
    getFunctions (functions) {
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      if (this.r_functions.length < 3) {
        this.r_functions = functions
      }
      this.step++
    },
    getSquares (squares) {
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      if (this.squares.length < 1) {
        this.squares = squares
      }
      this.step++
    },
    getAnswer () {
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      this.step++
    },
    generateVariant () {
      let linguistic = []
      let first = Math.random() * (0.2 - 0.1) + 0.1
      // first = Math.round(first * 100) / 100
      first = Number(first.toFixed(2))

      let cur = 0
      for (let i = 0; i < 4; i++) {
        linguistic.push(first.toFixed(2))
        // first += 0.2
        cur = Math.random() * (0.25 - 0.15) + 0.15
        // first += Math.round(cur * 100) / 100
        first += Number(cur.toFixed(2))
      }

      let importance = []
      first = Math.random() * (0.2 - 0.1) + 0.1
      // first = Math.round(first * 100) / 100

      for (let i = 0; i < 3; i++) {
        importance.push(first.toFixed(2))
        cur = Math.random() * (0.3 - 0.2) + 0.2
        // first += Math.round(cur * 100) / 100
        first += Number(cur.toFixed(2))
      }
      return {
        importance,
        linguistic
      }
    },
    err (penalty, taskNum) {
      // console.log('ERR CHANGED')
      this.error.splice(this.step, 1, this.error[this.step] + 1)

      /*  this.limits[taskNum] -= penalty
      if (this.limits[this.step] < 0) {
        this.limits[this.step] = 0
      }
      this.score -= penalty */
      /* this.work3.work.score = this.score
      this.work3.work.error = this.error
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      }) */
      /*  console.log('err signal handler')
      console.log(this.error) */
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
  },
  created () {
    // let user = this.$store.getters['data/getUser']()
    // this.work3 = this.$store.getters['data/getStudentWork3'](user.id, 'additiveLab')
    checkLab.call(this, 'additiveLab')
  },
  watch: {
    correctStep: {
      handler: function (newStep) {
        this.work3.work.step = newStep
        console.log(newStep)
        console.log(this.work3)
        this.$store.dispatch('data/updateWork3', {
          wid: this.work3.wid,
          work: this.work3.work
        })
      }
    },
    step: {
      handler: function (newStep, oldStep) {
        console.log(`step: ${this.step}, correctStep: ${this.correctStep}`)
      }
    },
    error: {
      handler: function (newError, oldError) {
        console.log('ERROR WATCHER')
        console.log(newError)
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
          for (let j = 0; j < this.error[i]; j++) {
            limits[limitsIndex] -= this.penalties[i]
            if (limits[limitsIndex] < 0) {
              console.log('меньше нуля')
              console.log(limits[limitsIndex])
              limits[limitsIndex] = 0
              break
            }
          }
        }
        const arrSum = arr => arr.reduce((a, b) => a + b, 0)
        this.score = arrSum(limits)
        console.log(this.score)
        console.log(limits)
        // this.work3.work.score = this.score
        this.work3.work.error = this.error
        if (this.score - this.work3.work.attempt * 10 < 60) {
          this.alert = true
          this.work3.work.stage = 'improve'
          this.work3.work.attempt += 1
        }
        this.$store.dispatch('data/updateWork3', {
          wid: this.work3.wid,
          work: this.work3.work
        })
      },
      deep: true
    }
  }
}
</script>
<style>
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
