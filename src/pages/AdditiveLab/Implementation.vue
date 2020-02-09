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
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <q-step
         :name='2'
         title='Критерий'
         icon='assignment'
         :done='correctStep > 2'
      >
          <quantitativefunc @right='test()' @back='currentstep -= 1' @err='count += 1' :number='0' :condition='condition' />
          <q-stepper-navigation><q-btn @click='test()' color='secondary' label='Продолжить без ответа' /></q-stepper-navigation>
      </q-step>

      <q-step
        :name='3'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 2'
      >
        <quantitativefunc @right='test()' @back='currentstep -= 1' @err='count += 1' :number='1' :condition='condition' />
        <q-stepper-navigation><q-btn @click='test()' color='secondary' label='Продолжить без ответа' /></q-stepper-navigation>
      </q-step>
      <q-step
        :name='4'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 2'
      >
        <categoricalfunc
          @right='test()'
          @back='back()'
          @err='count += 1'
          :number='2'
          :condition='condition'
        >
        </categoricalfunc>
        <q-stepper-navigation>
          <q-btn @click='test()' color='secondary' label='Продолжить без ответа' />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name='5'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 2'
      >
        <categoricalfunc @right='test()' @back='back()' @err='count += 1' :number='3' :condition='condition'/>
        <q-stepper-navigation><q-btn @click='test()' color='secondary' label='Продолжить без ответа' /></q-stepper-navigation>
      </q-step>
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <q-step
        :name='6'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 3'
      >
        <alternatives-evaluation :cr='0' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='7'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 4'
      >
        <alternatives-evaluation :cr='1' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='8'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 5'
      >
        <alternatives-evaluation :cr='2' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='9'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 6'
      >
        <alternatives-evaluation :cr='3' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='10'
        title='Теория'
        :done='correctStep > 7'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back()' ></theoretical-choice>
      </q-step>

      <q-step
        :name='11'
        title='Нечеткие'
        icon='assignment'
      >
        <r-functions :altsEvals='altsEvals' :step='step' :correctStep='correctStep' :condition='condition' @answer='getFunctions' @back='back()'></r-functions>
      </q-step>

      <q-step
        :name='12'
        title='Теория'
        :done='correctStep > 9'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[0]' @back='back()'></theoretical-choice>
      </q-step>

      <q-step
        :name='13'
        title='Площади'
        icon='assignment'
        :done='correctStep > 10'
      >
        <squares :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getSquares' @back='back()'></squares>
      </q-step>

      <q-step
        :name='14'
        title='Теория'
        :done='correctStep > 11'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back()'></theoretical-choice>
      </q-step>

      <q-step
        :name='15'
        title='Ответ'
        icon='assignment'
        :done='correctStep > 12'
      >
        <coords-and-answer :squares='squares' :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getAnswer' @back='back()'></coords-and-answer>
      </q-step>

      <q-step
        :name='16'
        title='Теория'
        icon='assignment'
        :done='correctStep > 13'
      >
        <theoretical-input @back='back()'></theoretical-input>
      </q-step>
    </q-stepper>
    {{ error }}
    {{ mark }}
  </div>
</template>

<script>
import { checkLab } from '../../function/workWithFirebase'
export default {
  data () {
    return {
      step: 0,
      correctStep: 20,
      error: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      altsEvals: [],
      r_functions: [],
      squares: [],
      condition: {},
      mark: 100,
      question: [],
      uid: ''
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
      if (this.step > this.correctStep && this.r_functions.length < 3) {
        this.r_functions = functions
        this.correctStep++
      }
      this.step++
    },
    getSquares (squares) {
      if (this.step > this.correctStep && this.squares.length < 1) {
        this.squares = squares
        this.correctStep++
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
      first = Math.round(first * 100) / 100
      let cur = 0
      for (let i = 0; i < 4; i++) {
        linguistic.push(first)
        // first += 0.2
        cur = Math.random() * (0.25 - 0.15) + 0.15
        first += Math.round(cur * 100) / 100
      }

      let importance = []
      first = Math.random() * (0.2 - 0.1) + 0.1
      first = Math.round(first * 100) / 100

      for (let i = 0; i < 3; i++) {
        importance.push(first)
        cur = Math.random() * (0.3 - 0.2) + 0.2
        first += Math.round(cur * 100) / 100
      }
      return {
        importance,
        linguistic
      }
    },
    err (penalty) {
      this.error[this.step - 1] += 1
      this.mark -= penalty
    }
  },
  created () {
    this.uid = this.$store.getters['data/getUser']().id
    checkLab.call(this)
  },
  watch: {
    correctStep: {
      handler: function (oldStep, newStep) {
        // firebase.database().ref('lab3/current/' + this.uid).update({step: newStep})
      }
    },
    step: {
      handler: function (oldStep, newStep) {
        console.log(`step: ${this.step}, correctStep: ${this.correctStep}`)
      }
    }
  }
}
</script>
