<template>
  <div class='q-pa-md'>
    <q-stepper
      v-model='step'
      header-nav
      ref='stepper'
      color='secondary'
      animated
    >
      <q-step
        :name='-1'
        title='Условие'
        icon='assignment'
        :header-nav='true'
        :done='true'
      >
      <ConditionPref
        :condition="condition"
      />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 0 }' color='secondary' label='Продолжить' />
        </q-stepper-navigation>
      </q-step>
      <q-step v-for="index in 2" v-bind:key='index'
        :name='index - 1'
        :title='`Вопрос ${index}`'
        icon='assignment'
        :header-nav='doneStep > index - 3'
        :done='doneStep > index - 2'
      >
      <QuestionPref
        :question="question[index - 1]"
        :done='doneStep > index - 2'
        @success = 'Answer()'
        @error = 'errorMethod'
      />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > index - 2 ' @click='() => { done2 = true; step = step + 1 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > index - 2 ' flat @click='step = step - 1' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in condition.criterion" v-bind:key='index'
        :name='Number(index + 2)'
        :title='`Значения С${index + 1}`'
        icon='assignment'
        :done='doneStep > index + 1'
        :header-nav='doneStep > index'
      >
        <FirstStep
        :data = 'item'
        :alternative = 'condition.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='doneStep > 1 + index'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > index + 1 ' @click='() => { done2 = true; step = 3 + index }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > index + 1 ' flat @click='step = 1 + index' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in condition.criterion" v-bind:key='index'
        :name='Number(index + 6)'
        :title='`Отношение С${index + 1}`'
        icon='assignment'
        :done='doneStep > 5 + index'
        :header-nav='doneStep > 4 + index'
      >
        <SecondStep
        :rightMatrix = 'matrixStep2[index]'
        :alternative = 'condition.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='doneStep > 5 + index'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 5 + index ' @click='() => { done2 = true; step = 7 + index }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 5 + index ' flat @click='step = 5 + index' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='10'
        title='Нечеткое отношение'
        icon='assignment'
        :done='doneStep > 9'
        :header-nav='doneStep > 8'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix   = 'matrixStep3'
        :alternative = 'condition.alternative'
        :done='doneStep > 9'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 9 ' @click='() => { done2 = true; step = 11 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 9 ' flat @click='step = 9' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='11'
        title='Подмножество альтернатив'
        icon='assignment'
        :done='doneStep > 10'
        :header-nav='doneStep > 9'
      >
        <FourthStep
        :showMatrix = 'matrixStep3'
        :rightMatrix   = 'matrixStep4'
        :alternative = 'condition.alternative'
        :done='doneStep > 10'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 10 ' @click='() => { done2 = true; step = 12 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 10 ' flat @click='step = 10' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='12'
        title='Нечеткое отношение'
        icon='assignment'
        :done='doneStep > 11'
        :header-nav='doneStep > 10'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix = 'matrixStep5'
        :weight = 'condition.weight'
        :alternative = 'condition.alternative'
        :done='doneStep > 11'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 11 ' @click='() => { done2 = true; step = 13 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 11 ' flat @click='step = 11' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step v-for="index in 2" v-bind:key='index'
        :name='13 + index - 1'
        :title='`Вопрос ${index + 2}`'
        icon='assignment'
        :header-nav='doneStep > 13 + index - 3'
        :done='doneStep > 13 + index - 2'
      >
      <QuestionPref
        :question="question[index + 1]"
        :done='doneStep > 13 + index - 2'
        @success = 'Answer()'
        @error = 'errorMethod'
      />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 13 + index - 2 ' @click='() => { done2 = true; step = step + 1 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 13 + index - 2 ' flat @click='step = step - 1' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='15'
        title='Подмножество альтернатив'
        icon='assignment'
        :done='doneStep > 14'
        :header-nav='doneStep > 13'
      >
        <FourthStep
        :showMatrix = 'matrixStep5'
        :rightMatrix   = 'matrixStep6'
        :alternative = 'condition.alternative'
        :done='doneStep > 14'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 14 ' @click='() => { done2 = true; step = 16 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 14 ' flat @click='step = 14' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='16'
        title='Лучшая альтернатива'
        icon='assignment'
        :done='doneStep > 15'
        :header-nav='doneStep > 14'
      >
        <LastStep
        :showMatrix1 = '[matrixStep4[2], matrixStep4[5], matrixStep4[8]]'
        :showMatrix2 = '[matrixStep6[2], matrixStep6[5], matrixStep6[8]]'
        :rightMatrix   = 'lastMatrix'
        :done='doneStep > 15'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 15 ' @click='() => { done2 = true; step = 17 }' color='secondary' label='Продолжить' />
          <q-btn v-if='doneStep > 15 ' flat @click='step = 15' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='17'
        title='Последний вопрос'
        icon='assignment'
        :done='doneStep > 16'
        :header-nav='doneStep > 15'
      >
        <QuestionInput
        :question   = 'question[4]'
        :done='doneStep > 16'
        @finish = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='doneStep > 15 ' @click='() => { done2 = true; step = 15 }' color='secondary' label='Назад' />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    {{mark}}
    {{error}}
  </div>
</template>

<script>
import { checkLab } from '../../function/workWithFirebase'
export default {
  data () {
    return {
      teacherMode: true,
      step: -1,
      doneStep: -1,
      error: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      condition: {},
      question: []
    }
  },
  computed: {
    mark: function () {
      return this.error.reduce(function (acc, val) {
        acc += val
        return acc
      }, 0)
    },
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
      console.log(answerArr)
      return answerArr
    },
    matrixStep2: function () {
      const matrixArr = []
      for (let i = 0; i < this.funcAnswers.length; i++) {
        let arr = []
        arr[0] = 1
        arr[4] = 1
        arr[8] = 1
        if (this.funcAnswers[i][0] > this.funcAnswers[i][1]) {
          arr[1] = Math.round((this.funcAnswers[i][0] - this.funcAnswers[i][1]) * 100) / 100
          arr[3] = 0
        } else {
          arr[1] = 0
          arr[3] = Math.round((this.funcAnswers[i][1] - this.funcAnswers[i][0]) * 100) / 100
        }
        if (this.funcAnswers[i][0] > this.funcAnswers[i][2]) {
          arr[2] = Math.round((this.funcAnswers[i][0] - this.funcAnswers[i][2]) * 100) / 100
          arr[6] = 0
        } else {
          arr[2] = 0
          arr[6] = Math.round((this.funcAnswers[i][2] - this.funcAnswers[i][0]) * 100) / 100
        }
        if (this.funcAnswers[i][1] > this.funcAnswers[i][2]) {
          arr[5] = Math.round((this.funcAnswers[i][1] - this.funcAnswers[i][2]) * 100) / 100
          arr[7] = 0
        } else {
          arr[5] = 0
          arr[7] = Math.round((this.funcAnswers[i][2] - this.funcAnswers[i][1]) * 100) / 100
        }
        matrixArr.push(arr)
      }
      return matrixArr
    },
    matrixStep3: function () {
      const arr = []
      for (let i = 0; i < 9; i++) {
        const min = Math.min(this.matrixStep2[0][i], this.matrixStep2[1][i], this.matrixStep2[2][i], this.matrixStep2[3][i])
        arr.push(min)
      }
      return arr
    },
    matrixStep4: function () {
      const arr = []
      arr[0] = Math.round((this.matrixStep3[3] - this.matrixStep3[1]) * 100) / 100
      arr[3] = Math.round((this.matrixStep3[1] - this.matrixStep3[3]) * 100) / 100
      arr[6] = Math.round((this.matrixStep3[2] - this.matrixStep3[6]) * 100) / 100
      arr[1] = Math.round((this.matrixStep3[6] - this.matrixStep3[2]) * 100) / 100
      arr[4] = Math.round((this.matrixStep3[7] - this.matrixStep3[5]) * 100) / 100
      arr[7] = Math.round((this.matrixStep3[5] - this.matrixStep3[7]) * 100) / 100
      arr[2] = Math.round((1 - Math.max(arr[0], arr[1])) * 100) / 100
      arr[5] = Math.round((1 - Math.max(arr[3], arr[4])) * 100) / 100
      arr[8] = Math.round((1 - Math.max(arr[6], arr[7])) * 100) / 100
      return arr
    },
    matrixStep5: function () {
      let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 4; j++) {
          arr[i] += this.matrixStep2[j][i] * this.condition.weight[j]
        }
        arr[i] = Number(arr[i].toFixed(2))
      }
      console.log(arr)
      return arr
    },
    matrixStep6: function () {
      const arr = []
      arr[0] = Math.round((this.matrixStep5[3] - this.matrixStep5[1]) * 100) / 100
      arr[3] = Math.round((this.matrixStep5[1] - this.matrixStep5[3]) * 100) / 100
      arr[6] = Math.round((this.matrixStep5[2] - this.matrixStep5[6]) * 100) / 100
      arr[1] = Math.round((this.matrixStep5[6] - this.matrixStep5[2]) * 100) / 100
      arr[4] = Math.round((this.matrixStep5[7] - this.matrixStep5[5]) * 100) / 100
      arr[7] = Math.round((this.matrixStep5[5] - this.matrixStep5[7]) * 100) / 100
      arr[2] = Math.round((1 - Math.max(arr[0], arr[1])) * 100) / 100
      arr[5] = Math.round((1 - Math.max(arr[3], arr[4])) * 100) / 100
      arr[8] = Math.round((1 - Math.max(arr[6], arr[7])) * 100) / 100
      return arr
    },
    lastMatrix: function () {
      const arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(Math.min(this.matrixStep4[2 + i * 3], this.matrixStep6[2 + i * 3]))
      }
      console.log(arr)
      return arr
    }
  },
  methods: {
    Answer: function () {
      this.doneStep++
    },
    errorMethod () {
      this.error.splice(this.step, 1, this.error[this.step] + 1)
    }
  },
  created () {
    let user = this.$store.getters['data/getUser']()
    this.work3 = this.$store.getters['data/getStudentWork3'](user.id, 'additiveLab')
    checkLab.call(this, 'additiveLab')
  }
}
</script>
