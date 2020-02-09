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
        :name='1'
        title='Create an ad'
        icon='add_comment'
        :header-nav='step > 1'
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 2 }' color='secondary' label='Continue' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in example.criterion" v-bind:key='index'
        :name='Number(index + 2)'
        :title='`Вычисление значений критерия С${index + 1}`'
        icon='create_new_folder'
        :done='doneStep > index + 1'
        :header-nav='doneStep > index'
      >
        <FirstStep
        :data = 'item'
        :alternative = 'example.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='doneStep > 1 + index'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 3 + index }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 1' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step  v-for="(item, index) in example.criterion" v-bind:key='index'
        :name='Number(index + 6)'
        :title='`Нечеткое отношения критерия С${index + 1}`'
        icon='create_new_folder'
        :done='doneStep > 5 + index'
        :header-nav='doneStep > 4 + index'
      >
        <SecondStep
        :rightMatrix = 'matrixStep2[index]'
        :alternative = 'example.alternative'
        :index = 'index'
        :answers = 'funcAnswers[index]'
        :done='doneStep > 5 + index'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 7 + index }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 1' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='10'
        title='Нечеткое отношение'
        icon='create_new_folder'
        :done='doneStep > 11'
        :header-nav='doneStep > 10'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix   = 'matrixStep3'
        :alternative = 'example.alternative'
        :done='doneStep > 11'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 11 }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 9' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='11'
        title='Подмножество недоминируемых альтернатив'
        icon='create_new_folder'
        :done='doneStep > 12'
        :header-nav='doneStep > 11'
      >
        <FourthStep
        :showMatrix = 'matrixStep3'
        :rightMatrix   = 'matrixStep4'
        :alternative = 'example.alternative'
        :done='doneStep > 12'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 12 }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 10' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='12'
        title='Create an ad group'
        icon='create_new_folder'
        :done='doneStep > 13'
        :header-nav='doneStep > 12'
      >
        <ThirdStep
        :showMatrix = 'matrixStep2'
        :rightMatrix = 'matrixStep5'
        :weigth = 'example.weigth'
        :alternative = 'example.alternative'
        :done='doneStep > 13'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 13 }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 11' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='13'
        title='Create an ad group'
        icon='create_new_folder'
        :done='doneStep > 14'
        :header-nav='doneStep > 13'
      >
        <FourthStep
        :showMatrix = 'matrixStep5'
        :rightMatrix   = 'matrixStep6'
        :alternative = 'example.alternative'
        :done='doneStep > 14'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 14 }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 12' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name='14'
        title='Create an ad group'
        icon='create_new_folder'
        :done='doneStep > 15'
        :header-nav='doneStep > 14'
      >
        <LastStep
        :showMatrix1 = '[matrixStep4[2], matrixStep4[5], matrixStep4[8]]'
        :showMatrix2 = '[matrixStep6[2], matrixStep6[5], matrixStep6[8]]'
        :rightMatrix   = 'lastMatrix'
        :done='doneStep > 15'
        @success = 'Answer()'
        />
        <q-stepper-navigation>
          <q-btn @click='() => { done2 = true; step = 15 }' color='secondary' label='Continue' />
          <q-btn flat @click='step = 13' color='secondary' label='Back' class='q-ml-sm' />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      doneStep: 1,
      example: {
        goal: 'Выбрать город, наиболее пригодный для жизни, по значениям заданных критериев и их функциям принадлежности',
        criterion: [
          {
            title: 'С1 Население',
            description: 'С1 Население – количество человек (в млн), проживающих в данном городе',
            function: '../statics/1.11.png',
            path: '../statics/1.1.png',
            count: 3,
            graphic: '',
            koef: [-0.02, 0.286, 0],
            functioncompute: '-0.02*x**2+0.286*x'
          },
          {
            title: 'С2 Средняя з/п',
            description: 'С2 Средняя з/п – показатель средней заработной платы (в тысячах рублей) по профессии нашего клиента',
            function: '../statics/1.12.png',
            path: '../statics/1.2.png',
            count: 3,
            graphic: '',
            koef: [0.125, 2, 1],
            functioncompute: 'Math.log(x+1)/(8*Math.log(2))'
          },
          {
            title: 'С3 Количество свободных вакансий',
            description: 'С3 Количество свободных вакансий – показатель относительного количества свободных вакансий по профессии нашего клиента',
            function: '../statics/1.13.png',
            path: '../statics/1.3.png',
            count: 0,
            graphic: '',
            koef: [],
            functioncompute: 'x**2/16'
          },
          {
            title: 'С4 Уровень загрязнения',
            description: 'С4 Уровень загрязнения – показатель содержания вредных примесей в атмосфере, почве и воде',
            function: '../statics/1.14.png',
            path: '../statics/1.4.png',
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
        weigth: [0.17, 0.25, 0.5, 0.08],
        rules: {
          d1str: 'Если и С3 = подходящее, и (или С1 = неподходящее, или С2 = неподходящее), то Y = удовлетворительный',
          d2str: 'Если и С2 = неподходящее, и С3 = неподходящее, то Y = неудовлетворительный',
          d3str: 'Если и С1 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный',
          d: ['Math.min(m[2],Math.max(1-m[0],1-m[1]))', 'Math.min(1-m[1],1-m[2])', 'Math.min(m[0],m[2],m[3])']
        }
      }
    }
  },
  computed: {
    funcAnswers: function () {
      const answerArr = []
      for (let i = 1; i < 5; i++) {
        const arr = []
        for (let j = 0; j < this.example.alternative.length; j++) {
          if (i === 3 || i === 4) {
            arr.push(Number(eval(this.example.criterion[i - 1].functioncompute.replace(/x/g, this.example.alternative[j][i][1])).toFixed(2)))
          } else {
            arr.push(Number(eval(this.example.criterion[i - 1].functioncompute.replace(/x/g, this.example.alternative[j][i])).toFixed(2)))
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
          arr[i] += this.matrixStep2[j][i] * this.example.weigth[j]
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
    }
  }
}
</script>
