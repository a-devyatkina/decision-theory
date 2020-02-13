import { generate } from './gen'
import * as firebase from 'firebase'

export function checkLab () {
  let updates = {}
  updates['/0'] = {
    answer: [
      'Нечеткое число — это нечеткое подмножество универсального множества действительных чисел, имеющее нормальную функцию принадлежности',
      'Нечеткое число — это нечеткое подмножество универсального множества действительных чисел, имеющее нормальную и выпуклую функцию принадлежности',
      'Нечеткое число — это нечеткое подмножество универсального множества действительных чисел, имеющее выпуклую функцию принадлежности',
      'Нечеткое число — это нечеткое надмножество универсального множества действительных чисел, имеющее нормальную и выпуклую функцию принадлежности'
    ],
    question: 'Выберите правильное суждение.',
    right: 1
  }
  updates['/1'] = {
    answer: [
      'Существует значение носителя, в котором функция принадлежности не равна единице',
      'Существует значение носителя, в котором функция принадлежности больше единице',
      'Существует значение носителя, в котором функция принадлежности равна единице',
      'Существует значение носителя, в котором функция принадлежности меньше единице'
    ],
    question: 'Выберите правильное условие нормальности функции.',
    right: 2
  }
  updates['/2'] = {
    answer: [
      'При отступлении от своего максимума влево или вправо функция принадлежности не возрастает',
      'При отступлении от своего минимума влево или вправо функция принадлежности не возрастает',
      'При отступлении от своего максимума влево или вправо функция принадлежности возрастает',
      'При отступлении от своего минимума влево или вправо функция принадлежности возрастает'
    ],
    question: 'Выберите правильное условие выпуклости функции',
    right: 0
  }
  updates['/3'] = {
    answer: [
      'Мода, степень размытости нечеткого числа',
      'Нечеткое значение треугольного числа, степень размытости четкого числа',
      'Мода, степень размытости четкого числа',
      'Четкое значение треугольного числа, степень размытости нечеткого числа'
    ],
    question: 'Как обычно называют число b тройки <a,b,c> и что характеризуют числа a и c',
    right: 2
  }
  updates['/4'] = {
    answer: [
      '<9702, 10302, 11130>',
      '<9777, 11350, 12362>',
      '<1000, 10302, 10304>',
      '<11130, 10302, 9702>'
    ],
    question: 'Чему равно произведение треугольных чисел <98, 101, 105> и <99, 102, 106>?',
    right: 0
  }
  updates['/5'] = {
    answer: [
      'При отступлении от своего максимума влево или вправо функция принадлежности не возрастает',
      'При отступлении от своего минимума влево или вправо функция принадлежности не возрастает',
      'При отступлении от своего максимума влево или вправо функция принадлежности возрастает',
      'При отступлении от своего минимума влево или вправо функция принадлежности возрастает '
    ],
    question: 'Выберите правильное условие выпуклости функции',
    right: 0
  }
  firebase.database().ref('lab3/questions/additiveLab/initial').update(updates)
  firebase.database().ref('lab3/current/' + this.uid).once('value', snapshot => {
    if (snapshot.exists()) {
      console.log('exists: ' + snapshot.val())
      this.condition = snapshot.val().condition
      console.log(this.condition)
      console.log(snapshot.val())
      this.question = snapshot.val().question
      this.error = snapshot.val().error
    } else {
      firebase.database().ref('lab3/variants/1').once('value', snapshot => {
        let variant = snapshot.val()
        this.condition = generate(variant, variant['dict1'], variant['dict2'])
        this.condition['tables'] = this.generateVariant()
        firebase.database().ref('lab3/questions').once('value').then((snapshot) => {
          let questions = snapshot.val()
          this.question.push(questions[0])
          this.question.push(questions[1])
          firebase.database().ref('lab3/current/' + this.uid).set({
            condition: this.condition,
            question: this.question,
            error: this.error,
            numberOfLab: 3,
            step: 0,
            try: 0
          })
        })
      })
    }
  })
}
