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
        :done='total_step > 0'
      >
        <condition-logics
          :condition='condition'
          :total_step='total_step'
          :current_step='current_step'
        />
      </q-step>

      <q-step v-for='(item, index) of question.slice(0,2)'
        :key='index'
        :title='`Вопрос ${index + 1}`'
        :name='index + 1'
        icon='assignment'
        :header-nav='total_step > index'
        :done='total_step > index + 1'
      >
        <question-logics
          :question='item'
          :total_step='total_step'
          :current_step='current_step'
          :user_answer='user_answer[index]'
          @error='question_error($event, index)'
          @right='question_right($event, index)'
        />
      </q-step>

      <q-step v-for='index of range(4)'
        :key='index'
        :title='`Критерий ${index + 1}`'
        :name='index+3'
        icon='assignment'
        :header-nav='total_step > index + 2'
        :done='total_step > index + 3'
      >
        <function-logics
          :total_step='total_step'
          :current_step='current_step'
          :criterion='condition.criterion[index]'
          :alternative='condition.alternative'
          :internal_step='user_criterion[index]'
          @criterion='criterion(index)'
        />
      </q-step>
      <q-step v-for='index of range(3)'
        :key='index'
        :title='`Альтернатива ${index + 1}`'
        :name='index+7'
        icon='assignment'
        :header-nav='total_step > index + 6'
        :done='total_step > index + 7'
      >
      <alternative-logics
        :number='index'
        :condition='condition'
      />
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
// import { bus } from '../../router/index.js'
import { checkLab } from '../../function/workWithFirebase'
export default {
  name: 'main_page',
  data () {
    return {
      total_step: 0,
      current_step: 0,
      mark: [8, 8, 12, 12, 12, 12],
      user_answer: [0, 0, 0, 0, 0],
      user_criterion: [0, 0, 1, 1],
      user_alternative: [0, 0, 0],
      condition: {
        goal: 'Выбрать город, наиболее пригодный для жизни, по значениям заданных критериев и их функциям принадлежности',
        criterion: [
          {
            title: 'С1 Население',
            description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
            path: '../statics/image/1.1.png',
            function: '../statics/image/1.11.png',
            count: 3,
            graphic: '',
            koef: [-0.02, 0.286, 0],
            functioncompute: '-0.02*x**2+0.286*x'
          },
          {
            title: 'С2 Средняя з/п',
            description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
            path: '../statics/image/1.2.png',
            function: '../statics/image/1.12.png',
            count: 3,
            graphic: '',
            koef: [0.125, 2],
            functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
          },
          {
            title: 'С3 Количество свободных вакансий',
            description: 'С3 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
            path: '../statics/image/1.3.png',
            function: '../statics/image/1.13.png',
            count: 0,
            graphic: '',
            koef: [],
            functioncompute: 'x**2/16'
          },
          {
            title: 'С4 Уровень загрязнения',
            description: 'С4 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
            path: '../statics/image/1.4.png',
            function: '../statics/image/1.14.png',
            count: 0,
            graphic: '',
            koef: [],
            functioncompute: '1-x/4'
          }
        ],
        alternative: [
          {
            description: 'А1 Москва',
            1: 13,
            2: 120,
            3: ['низкое', 1],
            4: ['средний', 2]
          },
          {
            description: 'А2 Питер',
            1: 4,
            2: 52,
            3: ['среднее', 2],
            4: ['высокий', 3]
          },
          {
            description: 'А3 Краснодар',
            1: 0.9,
            2: 40,
            3: ['среднее', 2],
            4: ['средний', 2]
          }
        ],
        weight: [0.17, 0.25, 0.5, 0.08],
        rules: {
          text: ['Если и С3 = подходящее, и (или С1 = неподходящее, или С2 = неподходящее), то Y = удовлетворительный', 'Если и С2 = неподходящее, и С3 = неподходящее, то Y = неудовлетворительный', 'Если и С1 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
          formula: ['Math.min(m[2],Math.max(1-m[0],1-m[1]))', 'Math.min(1-m[1],1-m[2])', 'Math.min(m[0],m[2],m[3])']
        }
      },
      question: [
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        },
        {
          block: 1,
          number: 9,
          question: 'Что является достоинством применения нечетких моделей?',
          answer: [
            'большая прозрачность',
            'нечеткие высказывания',
            'непрозрачность',
            'зеркальность'
          ],
          right: 0
        }
      ]
    }
  },
  created () {
    // bus.$on('next_step', () => {
    //   this.total_step += 1
    //   this.current_step += 1
    // })
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
    }
  },
  methods: {
    range (n) {
      return [...Array(n).keys()]
    },
    marking (k) {
      this.mark[this.total_step - 1] -= k
    },
    question_error (array, index) {
      this.user_answer[index] = array
      this.marking(8)
    },
    question_right (array, index) {
      this.user_answer[index] = array
    },
    criterion (index) {
      this.user_criterion[index]++
    }
  }
}
</script>

<style scoped>
  * {
    font-size: 20px;
  }
</style>
