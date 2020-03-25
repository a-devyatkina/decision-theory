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
        title='Теория'
        :done='correctStep > 2'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[0]' @back='back'></theoretical-choice>
      </q-step>

      <q-step v-for="(item, index) in condition.criterion" v-bind:key='index'
        :name='Number(index + 2)'
        :title='`Вычисление значений критерия С${index + 1}`'
        icon='assignment'
        :done='correctStep > index + 1'
      >
        <FirstStep
        :data = 'item'
        :alternative = 'condition.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='correctStep > 1 + index'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > index + 1' @click='() => { done2 = true; step = 3 + index }' color='secondary' label='Continue' />
          <q-btn v-if='correctStep > index + 1' flat @click='step = 1' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <q-step
        :name='6'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 3'
      >
        <alternatives-evaluation :cr='0' :step='step' :correctStep='correctStep' :condition='condition' :funcAnswers='funcAnswers' @answer='getEvals' @back='back'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='7'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 4'
      >
        <alternatives-evaluation :cr='1' :step='step' :correctStep='correctStep' :condition='condition' :funcAnswers='funcAnswers' @answer='getEvals' @back='back'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='8'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 5'
      >
        <alternatives-evaluation :cr='2' :step='step' :correctStep='correctStep' :condition='condition' :funcAnswers='funcAnswers' @answer='getEvals' @back='back'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='9'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 6'
      >
        <alternatives-evaluation :cr='3' :step='step' :correctStep='correctStep' :condition='condition' :funcAnswers='funcAnswers' @answer='getEvals' @back='back'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='10'
        title='Теория'
        :done='correctStep > 7'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back' ></theoretical-choice>
      </q-step>

      <q-step
        :name='11'
        title='Нечеткие'
        icon='assignment'
      >
        <r-functions :altsEvals='altsEvals' :step='step' :correctStep='correctStep' :condition='condition' @answer='getFunctions' @back='back'></r-functions>
      </q-step>

      <q-step
        :name='12'
        title='Теория'
        :done='correctStep > 9'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[2]' @back='back'></theoretical-choice>
      </q-step>

      <q-step
        :name='13'
        title='Площади'
        icon='assignment'
        :done='correctStep > 10'
      >
        <squares :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getSquares' @back='back'></squares>
      </q-step>

      <q-step
        :name='14'
        title='Теория'
        :done='correctStep > 11'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[3]' @back='back'></theoretical-choice>
      </q-step>

      <q-step
        :name='15'
        title='Ответ'
        icon='assignment'
        :done='correctStep > 12'
      >
        <coords-and-answer :squares='squares' :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getAnswer' @back='back' @finish='finish'></coords-and-answer>
      </q-step>

      <q-step
        :name='16'
        title='Теория'
        icon='assignment'
        :done='correctStep > 13'
      >
        <theoretical-input :question='question[4]' @back='back' @finish="finish"></theoretical-input>
      </q-step>
    </q-stepper>
    <div class="lab-info">
      <div class="mark">
        Количество баллов: {{ score }}. Прогресс
      </div>
      <div class="step">
        {{step}}/16
      </div>
    </div>
  </div>
</template>

<script>
import { checkLab } from '../../function/workWithFirebase'
export default {
  data () {
    return {
      step: 0,
      correctStep: 0,
      error: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      altsEvals: [],
      r_functions: [],
      squares: [],
      condition: {},
      score: 100,
      question: [],
      work3: {},
      limits: [ 8, 13, 13, 13, 13, 13, 13, 13, 13, 10, 5, 19 ]
      // user: {}
    }
  },
  computed: {
    funcAnswers: function () {
      const answerArr = []
      for (let i = 1; i < 5; i++) {
        const arr = []
        for (let j = 0; j < this.condition.alternative.length; j++) {
          if (i === 3 || i === 4) {
            arr.push(Number(eval(this.condition.criterion[i - 1].functioncompute.replace(/x/g, this.condition.alternative[j][i][1])).toFixed(2)))
          } else {
            arr.push(Number(eval(this.condition.criterion[i - 1].functioncompute.replace(/x/g, this.condition.alternative[j][i])).toFixed(2)))
          }
        }
        answerArr.push(arr)
      }
      console.log('answerArr')
      console.log(answerArr)
      return answerArr
    }
  },
  methods: {
    back () {
      this.step--
    },
    test () {
      this.step++
      // this.correctStep++
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
      /* if (this.step > this.correctStep && this.r_functions.length < 3) {
        this.r_functions = functions
        console.log('getFunctions:')
        console.log(this.r_functions)
        this.correctStep++
      }
      this.step++ */
      if (this.step > this.correctStep) {
        this.correctStep++
      }
      if (this.r_functions.length < 3) {
        this.r_functions = functions
      }
      this.step++
    },
    getSquares (squares) {
      /* if (this.step > this.correctStep && this.squares.length < 1) {
        this.squares = squares
        this.correctStep++
        console.log('in getSquares')
      }
      this.step++ */
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
    err (penalty) {
      this.error.splice(this.step, 1, this.error[this.step] + 1)
      this.limits[this.step] -= penalty
      if (this.limits[this.step] < 0) {
        this.limits[this.step] = 0
      }
      this.score -= penalty
      this.work3.work.score = this.score
      this.work3.work.error = this.error
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      })
      console.log('err signal handler')
      console.log(this.error)
    },
    finish () {
      this.work3.work.stage = 'done'
      console.log(this.question[4])
      this.work3.work.finalquestion = {...this.question[4]}
      this.$store.dispatch('data/updateWork3', {
        wid: this.work3.wid,
        work: this.work3.work
      })
    }
  },
  created () {
    let user = this.$store.getters['data/getUser']()
    this.work3 = this.$store.getters['data/getStudentWork3'](user.id, 'additiveLab')
    checkLab.call(this, 'additiveLab')
  },
  watch: {
    correctStep: {
      handler: function (newStep) {
        // firebase.database().ref('lab3/current/' + this.uid).update({step: newStep})
        console.log('correctStep watcher')
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
