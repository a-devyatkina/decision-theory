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
        :header-nav='correctStep > index - 2'
        :done='correctStep > index - 1'
      >
      <QuestionPref
        :question="question[index - 1]"
        :done='correctStep > index - 1'
        @success = 'Answer()'
        @error = 'errorMethod'
      />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > index - 1 || teacherMode' @click='() => { done2 = true; step = step + 1 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > index - 1 || teacherMode' flat @click='step = step - 1' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in condition.criterion" v-bind:key='index'
        :name='Number(index + 2)'
        :title='`Значения С${index + 1}`'
        icon='assignment'
        :done='correctStep > index + 2'
        :header-nav='correctStep > index + 1'
      >
        <FirstStep
        :data = 'item'
        :alternative = 'condition.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='correctStep > 2 + index'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > index + 2 || teacherMode' @click='() => { done2 = true; step = 3 + index }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > index + 2 || teacherMode' flat @click='step = 1 + index' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in condition.criterion" v-bind:key='index'
        :name='Number(index + 6)'
        :title='`Отношение С${index + 1}`'
        icon='assignment'
        :done='correctStep > 6 + index'
        :header-nav='correctStep > 5 + index'
      >
        <SecondStep
        :rightMatrix = 'matrixStep2[index]'
        :alternative = 'condition.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='correctStep > 6 + index'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 6 + index || teacherMode' @click='() => { done2 = true; step = 7 + index }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 6 + index || teacherMode' flat @click='step = 5 + index' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='10'
        title='Нечеткое отношение'
        icon='assignment'
        :done='correctStep > 10'
        :header-nav='correctStep > 9'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix   = 'matrixStep3'
        :alternative = 'condition.alternative'
        :done='correctStep > 10'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 10 || teacherMode' @click='() => { done2 = true; step = 11 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 10 || teacherMode' flat @click='step = 9' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='11'
        title='Подмножество альтернатив'
        icon='assignment'
        :done='correctStep > 11'
        :header-nav='correctStep > 10'
      >
        <FourthStep
        :showMatrix = 'matrixStep3'
        :rightMatrix   = 'matrixStep4'
        :alternative = 'condition.alternative'
        :done='correctStep > 11'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 11 || teacherMode' @click='() => { done2 = true; step = 12 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 11 || teacherMode' flat @click='step = 10' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='12'
        title='Нечеткое отношение'
        icon='assignment'
        :done='correctStep > 12'
        :header-nav='correctStep > 11'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix = 'matrixStep5'
        :weight = 'condition.weight'
        :alternative = 'condition.alternative'
        :done='correctStep > 12'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 12 || teacherMode' @click='() => { done2 = true; step = 13 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 12 || teacherMode' flat @click='step = 11' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step v-for="index in 2" v-bind:key='index'
        :name='13 + index - 1'
        :title='`Вопрос ${index + 2}`'
        icon='assignment'
        :header-nav='correctStep > 14 + index - 3'
        :done='correctStep > 14 + index - 2'
      >
      <QuestionPref
        :question="question[index + 1]"
        :done='correctStep > 14 + index - 2'
        @success = 'Answer()'
        @error = 'errorMethod'
      />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 14 + index - 2 || teacherMode' @click='() => { done2 = true; step = step + 1 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 14 + index - 2 || teacherMode' flat @click='step = step - 1' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='15'
        title='Подмножество альтернатив'
        icon='assignment'
        :done='correctStep > 15'
        :header-nav='correctStep > 14'
      >
        <FourthStep
        :showMatrix = 'matrixStep5'
        :rightMatrix   = 'matrixStep6'
        :alternative = 'condition.alternative'
        :done='correctStep > 15'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 15 || teacherMode' @click='() => { done2 = true; step = 16 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 15 || teacherMode' flat @click='step = 14' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='16'
        title='Лучшая альтернатива'
        icon='assignment'
        :done='correctStep > 16'
        :header-nav='correctStep > 15'
      >
        <LastStep
        :showMatrix1 = '[matrixStep4[2], matrixStep4[5], matrixStep4[8]]'
        :showMatrix2 = '[matrixStep6[2], matrixStep6[5], matrixStep6[8]]'
        :rightMatrix   = 'lastMatrix'
        :done='correctStep > 16'
        @success = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 16 || teacherMode' @click='() => { done2 = true; step = 17 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 16 || teacherMode' flat @click='step = 15' color='secondary' label='Назад' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='17'
        title='Последний вопрос'
        icon='assignment'
        :done='correctStep > 17'
        :header-nav='correctStep > 16'
      >
        <QuestionInput
        :question   = 'question[4]'
        :done='correctStep > 17'
        @finish = 'Answer()'
        @error = 'errorMethod'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 16 || teacherMode' @click='() => { done2 = true; step = 18 }' color='secondary' label='Продолжить' />
          <q-btn v-if='correctStep > 16 || teacherMode' @click='() => { done2 = true; step = 16 }' color='secondary' label='Назад' />
        </q-stepper-navigation>
      </q-step>
       <q-step
        :name='18'
        title='Отчет'
        icon='assignment'
        :done='correctStep > 17'
        :header-nav='correctStep > 16'
      >
        <Report
        :errors='error'
        :max_points='max_points'
        :penalty='penalty'
        :attempt='work3.work.attempt'
        @finish="finish"
        @remake='remake'
        />
        <q-stepper-navigation>
          <q-btn v-if='correctStep > 16 || teacherMode' @click='() => { done2 = true; step = 16 }' color='secondary' label='Назад' />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
     <div class="lab-info">
      <div class="mark">
        Количество баллов: {{ realScore }}. Попытка №{{ work3.work.attempt + 1 }}. Штрафной балл {{ maxScore *10 * work3.work.attempt / 100 }} Прогресс
      </div>
       <div class="step">
          {{step + 2}}/20
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
// import condition from '../Variki/10-12final'
export default {
  data () {
    return {
      teacherMode: false,
      step: -1,
      correctStep: -1,
      error: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      max_points: [6, 6, 6, 6, 3, 3, 3, 3, 5, 5, 6, 10, 10, 6, 6, 10, 6],
      penalty: [6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 6, 6, 2, 2],
      condition: {},
      question: []
    }
  },
  computed: {
    score: function () {
      return this.error.reduce((acc, val, index) => {
        if (val * this.penalty[index] > this.max_points[index]) {
          acc += 0
        } else {
          acc += this.max_points[index] - val * this.penalty[index]
        }
        return acc
      }, 0)
    },
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
    },
    realScore: function () {
      console.log(this.maxScore * this.score / 100)
      return this.maxScore * (this.score - 10 * this.work3.work.attempt) / 100
    }
  },
  created () {
    // let user = this.$store.getters['data/getUser']()
    // this.work3 = this.$store.getters['data/getStudentWork3'](user.id, 'additiveLab')
    checkLab.call(this, 'preferenceLab')
  },
  methods: {
    Answer: function () {
      this.correctStep++
    },
    errorMethod () {
      this.error.splice(this.step, 1, this.error[this.step] + 1)
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
    handlerOk () {
      this.$router.push('/works')
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
    }
  }
}
</script>
<style>
  .content {
      display: flex;
      justify-content: center;
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
