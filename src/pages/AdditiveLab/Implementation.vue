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
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[0]' @back='back' @error='error[step - 1] += 1'></theoretical-choice>
      </q-step>
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <q-step
         :name='2'
         title='Критерий'
         icon='assignment'
         :done='correctStep > 2'
      >
          <quantitativefunc @right='test()' @back='currentstep -= 1' @err='count += 1' :number='0' :condition='condition' @error='error[step - 1] += 1' />
          <q-stepper-navigation><q-btn @click='test()' color='secondary' label='Продолжить без ответа' /></q-stepper-navigation>
      </q-step>

      <q-step
        :name='3'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 2'
      >
        <quantitativefunc @right='test()' @back='currentstep -= 1' @err='count += 1' :number='1' :condition='condition' @error='error[step - 1] += 1' />
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
          @error='error[step - 1] += 1'
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
        <categoricalfunc @right='test()' @back='back()' @err='count += 1' :number='3' :condition='condition' @error='error[step - 1] += 1'/>
        <q-stepper-navigation><q-btn @click='test()' color='secondary' label='Продолжить без ответа' /></q-stepper-navigation>
      </q-step>
<!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <q-step
        :name='6'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 3'
      >
        <alternatives-evaluation :cr='0' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()' @error='error[step - 1] += 1'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='7'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 4'
      >
        <alternatives-evaluation :cr='1' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()' @error='error[step - 1] += 1'></alternatives-evaluation>
      </q-step>
      <q-step
        :name='8'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 5'
      >
        <alternatives-evaluation :cr='2' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()' @error='error[step - 1] += 1'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='9'
        title='Критерий'
        icon='assignment'
        :done='correctStep > 6'
      >
        <alternatives-evaluation :cr='3' :step='step' :correctStep='correctStep' :condition='condition' @answer='getEvals' @back='back()' @error='error[step - 1] += 1'></alternatives-evaluation>
      </q-step>

      <q-step
        :name='10'
        title='Теория'
        :done='correctStep > 7'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back()'  @error='error[step - 1] += 1'></theoretical-choice>
      </q-step>

      <q-step
        :name='11'
        title='Нечеткие'
        icon='assignment'
      >
        <r-functions :altsEvals='altsEvals' :step='step' :correctStep='correctStep' :condition='condition' @answer='getFunctions' @back='back()' @error='error[step - 1] += 1'></r-functions>
      </q-step>

      <q-step
        :name='12'
        title='Теория'
        :done='correctStep > 9'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[0]' @back='back()' @error='error[step - 1] += 1'></theoretical-choice>
      </q-step>

      <q-step
        :name='13'
        title='Площади'
        icon='assignment'
        :done='correctStep > 10'
      >
        <squares :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getSquares' @back='back()' @error='error[step - 1] += 1'></squares>
      </q-step>

      <q-step
        :name='14'
        title='Теория'
        :done='correctStep > 11'
        icon='assignment'
      >
        <theoretical-choice @answer='correctChoice' :step='step' :correctStep='correctStep' :question='question[1]' @back='back()' @error='error[step - 1] += 1'></theoretical-choice>
      </q-step>

      <q-step
        :name='15'
        title='Ответ'
        icon='assignment'
        :done='correctStep > 12'
      >
        <coords-and-answer :squares='squares' :r_functions='r_functions' :step='step' :correctStep='correctStep' @answer='getAnswer' @back='back()' @error='error[step - 1] += 1'></coords-and-answer>
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
  </div>
</template>

<script>
// import { generate } from '../../function/gen'
// import axios from 'axios'
// import * as firebase from 'firebase'
import { checkLab } from '../../function/workWithFirebase'
export default {
  data () {
    return {
      step: 0,
      correctStep: 0,
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
    /*
      if (this.step < this.correctStep + 1 && this.altsEvals.length < 4) {
      if (this.step > this.correctStep && this.altsEvals.length < 4) {
        console.log('in step<')
        this.altsEvals.push(evals[evals.length - 1])
        this.correctStep++
      }
    */
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
      // if (this.step < this.correctStep && this.r_functions.length < 3) {
      if (this.step > this.correctStep && this.r_functions.length < 3) {
        this.r_functions = functions
        this.correctStep++
      }
      this.step++
    },
    getSquares (squares) {
      // if (this.step < this.correctStep && this.squares.length < 1) {
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
    }
    // error1 () {
    //   this.error[this.step - 1] += 1
    //   console.log(this.error)
    // }
  },
  created () {
    /*
      // let variant = this.generateVariant()
      // axios
      //   .get('http://localhost:3000/condition')
      //   .then(responce => (this.condition = responce.data))
      // reference = firebase.database().ref('additiveLab')
      // let newQuestKey = firebase.database().ref('additiveLab/questions').push().key
      // let updates = {}
      // updates['/questions/' + newQuestKey] = {
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
      // }
      // let questKey = firebase.database().ref('additiveLab/questions').push().key
      // updates['/questions/' + questKey] = {
      //   block: 1,
      //   number: 1,
      //   question: 'Что такое высота нечёткого множества?',
      //   answer: [
      //     'наименьшее значение функции принадлежности',
      //     'разность между наименьшим и наибольшим значением функции принадлежности',
      //     'чёткое подмножество универсального множества, на котором функция принадлежности равна еденице',
      //     'наибольшее значение функции принадлежности'
      //   ],
      //   right: 3
      // }
      // firebase.database().ref('additiveLab').update(updates)
      // console.log(this.$store.getters['data/getUser']())
      // let uid = this.$store.getters['data/getUser']().id
      // firebase().database().ref('additiveLab/students').once('value', (snapshot) => {
      //   console.log(snapshot.val())
      // })

      // firebase.database().ref('additiveLab/labs/-Lva3uarXMw2tB94Vsrb').once('value', (snapshot) => {
      //   this.condition = snapshot.val().data
      //   console.log(this.condition.goal)
      // })
      // firebase.database().ref('additiveLab/questions/-LvaTxZrprNh8XEPGBGm').once('value', (snapshot) => {
      //   this.question.push(snapshot.val())
      // })
      // firebase.database().ref('additiveLab/questions/-LvaTxZrprNh8XEPGBGn').once('value', (snapshot) => {
      //   this.question.push(snapshot.val())
      // })
      // firebase.storage().ref('theoreticalQuestions/disney.jpg').getDownloadURL().then((url) => {
      //   console.log(url)
      // })
      // const dict1 = {
      //   0: 'очень низкая',
      //   1: 'низкая',
      //   2: 'средняя',
      //   3: 'высокая',
      //   4: 'очень высокая'
      // }

      // const dict2 = {
      //   0: 'очень далеко',
      //   1: 'далеко',
      //   2: 'средне',
      //   3: 'близко',
      //   4: 'очень близко'
      // }
      // const variant = {
      //   'data': {
      //     'goal': 'Выбрать жилую застройку, наиболее пригодную для жизни, по значениям заданных критериев и их функциям принадлежности',
      //     'criterion': [
      //       {
      //         'tytle': 'С1 Этажность',
      //         'description': 'С1 Этажность - показатель среднего количества этажей в домах комплекса',
      //         'function': '../statics/2.11.png',
      //         'path': '../statics/2.1.png',
      //         'count': 3,
      //         'koef': [0.2, 1, 0.5],
      //         'functioncompute': '0.2*(x+1)**0.5',
      //         'typeof': ['undependent']
      //       },
      //       {
      //         'tytle': 'С2 Стоимость квартир',
      //         'description': 'С2 Стоимость квартир - средняя стоимость квартиры в застройке (в млн рублей)',
      //         'function': '../statics/2.12.png',
      //         'path': '../statics/2.2.png',
      //         'count': 2,
      //         'koef': [2, 2],
      //         'functioncompute': '2/(x+2)',
      //         'typeof': ['undependent']
      //       },
      //       {
      //         'tytle': 'С3 Плотность заселения',
      //         'description': 'С3 Плотность заселения – показатель плотности заселения ',
      //         'function': '../statics/3.13.png',
      //         'path': '../statics/3.3.png',
      //         'functioncompute': '1-x/4',
      //         'typeof': ['dependent', {'criterion': 1, 'weight': 1}]
      //       },
      //       {
      //         'tytle': 'С4 Расположение учреждений',
      //         'description': ';С4 Расположение учреждений – показатель близости медицинских учреждений, школ, садиков, магазинов и т.д.',
      //         'function': '../statics/2.14.png',
      //         'path': '../statics/2.4.png',
      //         'functioncompute': '1-2**(-1*x-0.5)',
      //         'typeof': ['dependent', {'criterion': 1, 'weight': 2}, {'criterion': 2, 'weight': 1}]
      //       }
      //     ],
      //     'alternative': [
      //       {
      //         'description': 'А1 Радуга',
      //         1: [
      //           {'begin': 16, 'end': 18},
      //           {'begin': 18, 'end': 20},
      //           {'begin': 20, 'end': 22},
      //           {'begin': 22, 'end': 24}
      //         ],
      //         2: [
      //           {'begin': 14, 'end': 15},
      //           {'begin': 15, 'end': 16},
      //           {'begin': 16, 'end': 17},
      //           {'begin': 17, 'end': 18}
      //         ],
      //         3: {'begin': 0, 'end': 2},
      //         4: {'begin': 2, 'end': 4}
      //       },
      //       {
      //         'description': 'А2 Зиларт',
      //         1: [
      //           {'begin': 15, 'end': 16},
      //           {'begin': 16, 'end': 17},
      //           {'begin': 17, 'end': 18},
      //           {'begin': 18, 'end': 19}
      //         ],
      //         2: [
      //           {'begin': 8, 'end': 9},
      //           {'begin': 9, 'end': 10},
      //           {'begin': 10, 'end': 11},
      //           {'begin': 11, 'end': 12}
      //         ],
      //         3: {'begin': 1, 'end': 4},
      //         4: {'begin': 0, 'end': 3}
      //       },
      //       {
      //         'description': 'А3 Английский квартал',
      //         1: [
      //           {'begin': 12, 'end': 15},
      //           {'begin': 15, 'end': 18},
      //           {'begin': 18, 'end': 21},
      //           {'begin': 21, 'end': 24}
      //         ],
      //         2: [
      //           {'begin': 3.5, 'end': 4},
      //           {'begin': 4, 'end': 4.5},
      //           {'begin': 4.5, 'end': 5},
      //           {'begin': 5, 'end': 5.5}
      //         ],
      //         3: {'begin': 2, 'end': 4},
      //         4: {'begin': 0, 'end': 2}
      //       }
      //     ],
      //     'rules': {
      //       'text': ['Если С3 = подходящее, и С2 = подходящее, и С1 = неподходящее, то Y = удовлетворительный', 'Если С2= неподходящее, и С3 = неподходящее или С4 = неподходящее, то Y = неудовлетворительный',
      //         'Если С1 = подходящее, С2 = подходящее, и С3 = подходящее, и С4 = подходящее, то Y = безупречный'],
      //       'formula': ['min(1-m[0],m[1],m[2])', 'min(1-m[1],max(1-m[2],1-m[3]))', 'min(m[0],m[1],m[2],m[3])']
      //     }
      //   }
      // }
      // variant['dict1'] = dict1
      // variant['dict2'] = dict2
      // let updates = {}
      // updates['/variants/2'] = variant
      // firebase.database().ref('lab3').update(updates)
      // let variant = {}
      // firebase.database().ref('lab3/variants/1').once('value', (snapshot) => {
      //   variant = snapshot.val()
      // })
      */

    // function randomInteger (min, max) {
    //   // случайное число от min до (max+1)
    //   let rand = min + Math.random() * (max + 1 - min)
    //   return Math.floor(rand)
    // }
    // function generate (variant, dict1, dict2) {
    //   let alt = [0, 0, 0]
    //   let sup = [0, 0, 0]
    //   for (let i = 0; i < variant['data']['alternative'].length; i++) {
    //     alt[i] = [0, 0, 0, 0]
    //     sup[i] = [0, 0, 0, 0]
    //     for (let k = 1; k < 5; k++) {
    //       if (variant['data']['criterion'][k - 1]['typeof'][0] === 'undependent') {
    //         if (k === 1 || k === 2) {
    //           let newRandom = randomInteger(0, 4)
    //           if (newRandom === 4) {
    //             newRandom = 3
    //           }
    //           sup[i][k - 1] = newRandom
    //           let begin = variant['data']['alternative'][i][k][newRandom]['begin']
    //           let end = variant['data']['alternative'][i][k][newRandom]['end']
    //           let arr = []
    //           for (let j = begin; j < end; j += (end - begin) / 100) {
    //             arr.push(+j.toFixed(2))
    //           }
    //           let randomChoice = randomInteger(0, arr.length - 1)
    //           alt[i][k - 1] = arr[randomChoice]
    //         } else {
    //           let begin = variant['data']['alternative'][i][k]['begin']
    //           let end = variant['data']['alternative'][i][k]['end']
    //           let arr = []
    //           for (let j = begin; j < end; j += (end - begin) / 100) {
    //             arr.push(+j.toFixed(2))
    //           }
    //           let randomChoice = randomInteger(0, arr.length - 1)
    //           alt[i][k - 1] = Math.floor(arr[randomChoice])
    //           sup[i][k - 1] = alt[i][k - 1]
    //         }
    //       }
    //     }
    //   }

    //   for (let i = 0; i < variant['data']['alternative'].length; i++) {
    //     for (let k = 1; k < 5; k++) {
    //       let buf = variant['data']['criterion'][k - 1]['typeof']
    //       let numb = 0
    //       let weight = 0
    //       if (buf[0] === 'dependent') {
    //         for (let key = 0; key < buf.length; key++) {
    //           if (key !== 0) {
    //             numb += buf[key]['weight'] * sup[i][buf[key]['criterion']]
    //             weight += buf[key]['weight']
    //           }
    //         }
    //         let arr = []
    //         numb = Math.round(numb / weight)
    //         if (numb === 0) {
    //           arr = [0, 1]
    //         } else if ((numb === 3 || numb === 4) && (k === 1 || k === 2)) {
    //           arr = [2, 3]
    //         } else if ((numb === 4) && (k === 1 || k === 2)) {
    //           arr = [3, 4]
    //         } else {
    //           arr = [numb - 1, numb, numb + 1]
    //         }
    //         let newRandom = randomInteger(0, arr.length)
    //         sup[i][k - 1] = arr[newRandom]
    //         if (k === 1 || k === 2) {
    //           let begin = variant['data']['alternative'][i][k][newRandom]['begin']
    //           let end = variant['data']['alternative'][i][k][newRandom]['end']
    //           let arrChoice = []
    //           for (let j = begin; j < end; j += (end - begin) / 100) {
    //             arrChoice.push(+j.toFixed(2))
    //           }
    //           let randomChoice = randomInteger(0, arrChoice.length - 1)
    //           alt[i][k - 1] = arrChoice[randomChoice]
    //           sup[i][k - 1] = alt[i][k - 1]
    //         } else {
    //           let begin = variant['data']['alternative'][i][k]['begin']
    //           let end = variant['data']['alternative'][i][k]['end']
    //           let arrChoice = []
    //           for (let j = begin; j < end; j += (end - begin) / 100) {
    //             arrChoice.push(+j.toFixed(2))
    //           }
    //           let randomChoice = randomInteger(0, arrChoice.length - 1)
    //           alt[i][k - 1] = Math.floor(arrChoice[randomChoice])
    //           sup[i][k - 1] = alt[i][k - 1]
    //         }
    //       }
    //     }
    //   }

    //   let newVariant = { ...variant['data'] }
    //   for (let i = 0; i < 3; i++) {
    //     for (let j = 1; j < 5; j++) {
    //       if (j === 1 || j === 2) {
    //         newVariant['alternative'][i][j] = alt[i][j - 1]
    //       } else if (j === 3) {
    //         newVariant['alternative'][i][j] = [dict1[alt[i][j - 1]], alt[i][j - 1]]
    //       } else {
    //         newVariant['alternative'][i][j] = [dict2[alt[i][j - 1]], alt[i][j - 1]]
    //       }
    //     }
    //   }
    //   return newVariant
    // }

    this.uid = this.$store.getters['data/getUser']().id
    checkLab.call(this)
    // firebase.database().ref('lab3/current/' + this.uid).once('value', snapshot => {
    //   if (snapshot.exists()) {
    //     console.log('exists: ' + snapshot.val())
    //     this.condition = snapshot.val().condition
    //     console.log(this.condition)
    //     console.log(snapshot.val())
    //     this.question = snapshot.val().question
    //     this.error = snapshot.val().error
    //   } else {
    //     firebase.database().ref('lab3/variants/1').once('value', snapshot => {
    //       let variant = snapshot.val()
    //       this.condition = generate(variant, variant['dict1'], variant['dict2'])
    //       this.condition['tables'] = this.generateVariant()
    //       firebase.database().ref('lab3/questions').once('value').then((snapshot) => {
    //         let questions = snapshot.val()
    //         this.question.push(questions[0])
    //         this.question.push(questions[1])
    //         firebase.database().ref('lab3/current/' + this.uid).set({
    //           condition: this.condition,
    //           question: this.question,
    //           error: this.error,
    //           numberOfLab: 3,
    //           step: 0,
    //           try: 0
    //         })
    //       })
    //     })
    //   }
    // })
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
