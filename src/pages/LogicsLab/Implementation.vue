<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="currentstep"
      vertical
      color="primary"
      animated
    >
      {{consition}}
      <q-step
        :name="1"
        title="Условие"
        icon="assignment"
        :done="totalstep>1"
      >
        <logics-condition
          :condition='condition'
          @continue='test()'
        >
        </logics-condition>
      </q-step>

      <q-step
        :name="2"
        title="Первый теоритический вопрос"
        icon="assignment"
        :done="totalstep>2"
      >
        <question
          @forward='test()'
          @back='currentstep -= 1'
          @continue='step += 1'
          :question="question[0]"
          :number="1"
          :mark="mark"
          :step="step"
        >
        </question>
      </q-step>

      <q-step
        :name="3"
        title="Второй теоритический вопрос"
        icon="assignment"
        :done="totalstep>3"
      >
        <question
          @forward='test()'
          @back='currentstep -= 1'
          @continue='step += 1'
          :question="question[1]"
          :number="2"
          :mark="mark"
          :step="step"
        >
        </question>
      </q-step>

      <q-step
        :name="4"
        title="Первый критерий"
        icon="assignment"
        :done="totalstep>4"
      >
        <quantitativefunc
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="0"
          :condition='condition'
          :error='mark'
        >
        </quantitativefunc>
      </q-step>

      <q-step
        :name="5"
        title="Второй критерий"
        icon="assignment"
        :done="totalstep>5"
      >
        <quantitativefunc
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="1"
          :condition='condition'
          :error='mark'
        >
        </quantitativefunc>
      </q-step>

      <q-step
        :name="6"
        title="Третий критерий"
        icon="assignment"
        :done="totalstep>6"
      >
        <categoricalfunc
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="2"
          :condition='condition'
        >
        </categoricalfunc>
      </q-step>

      <q-step
        :name="7"
        title="Четвёртый критерий"
        icon="assignment"
        :done="totalstep>7"
      >
        <categoricalfunc
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="3"
          :condition='condition'
        >
        </categoricalfunc>
      </q-step>

      <q-step
        :name="8"
        title="Третий теоритический вопрос"
        icon="assignment"
        :done="totalstep>8"
      >
        <thirdquest
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="3"
        >
      </thirdquest>
      </q-step>

      <q-step
        :name="9"
        title="Первая альтернатива"
        icon="assignment"
        :done="totalstep>9"
      >
        <alternative
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="0"
          :condition='condition'
        >
        </alternative>
      </q-step>

      <q-step
        :name="10"
        title="Вторая альтернатива"
        icon="assignment"
        :done="totalstep>10"
      >
        <alternative
          @right='test()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="1"
          :condition='condition'
        >
        </alternative>
      </q-step>

      <q-step
        :name="11"
        title="Третья альтернатива"
        icon="assignment"
        :done="totalstep>11"
      >
        <alternative
          @right='tofinish()'
          @back='currentstep -= 1'
          @err='mark += 1'
          :number="2"
          :condition='condition'
        >
        </alternative>
        <q-stepper-navigation>
          <router-link @click.native="tofinish()" to="/finish"  color="secondary" class="q-btn">Завершить</router-link>
        </q-stepper-navigation>
      </q-step>

    </q-stepper>
  </div>
</template>

<script>
// import axios from 'axios'
import * as firebase from 'firebase'
export default {
  props: ['name'],
  data () {
    return {
      condition: {},
      // question: {
      //   block: 1,
      //   number: 9,
      //   question: 'Что является достоинством применения нечетких моделей?',
      //   answer: [
      //     'большая прозрачность',
      //     'нечеткие высказывания',
      //     'непрозрачность',
      //     'зеркальность'
      //   ],
      //   right: 0
      // },
      question: [],
      totalstep: 1,
      currentstep: 1,
      step: 0,
      mark: 0
    }
  },
  methods: {
    error (number, minus) {
      this.mark[number] = this.mark[number] - minus
    },
    plustep () {
      this.step += 1
    },
    test () {
      if (this.currentstep === this.totalstep) {
        this.totalstep++
        this.currentstep++
      } else {
        this.currentstep++
      }
    },
    tofinish () {
      sessionStorage.mark = this.mark
    }
  },
  mounted () {
    // axios
    //   .get(`http://localhost:3000/condition?name=${this.name}`)
    //   .then(responce => (this.condition = responce.data))
    // axios
    //   .get(`http://localhost:3000/question?name=${this.name}`)
    //   .then(responce => (this.question = responce.data))
    // axios
    //   .get(`http://localhost:3000/step?name=${this.name}`)
    //   .then(responce => (this.step = responce.data.step))
    firebase.database().ref('additiveLab/labs/-Lva3uarXMw2tB94Vsrb').once('value').then((snapshot) => {
      this.condition = snapshot.val().data
    })
    firebase.database().ref('additiveLab/questions/-LvaTxZrprNh8XEPGBGm').once('value').then((snapshot) => {
      this.question.push(snapshot.val())
    })
    firebase.database().ref('additiveLab/questions/-LvaTxZrprNh8XEPGBGn').once('value').then((snapshot) => {
      this.question.push(snapshot.val())
    })
  }
}
</script>

<style scoped>
</style>
