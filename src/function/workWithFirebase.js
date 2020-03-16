import { generate } from './gen'
import * as firebase from 'firebase'

export function checkLab (labName) {
  let user = this.$store.getters['data/getUser']()
  let work3 = this.$store.getters['data/getStudentWork3'](user.id, 'additiveLab')
  if (work3) {
    if (work3.work.step !== 0) {
      this.correctStep = work3.work.step
      this.condition = work3.work.condition
      this.condition.weight = [0.25, 0.25, 0.25, 0.25]
      console.log(this.condition)
      this.question = work3.work.question
      console.log(this.question)
      this.score = work3.work.score
      console.log('work3.work.error:')
      console.log(work3.work.error)
      if (work3.work.error !== '') {
        this.error = work3.work.error
        console.log('empty string true')
      }
      return
    }
  } else if (user.role === 'student') {
    console.log('FATAL 404')
  }
  /* firebase.database().ref('lab3/current/' + this.user.id).once('value', snapshot => {
    if (snapshot.exists()) {
      console.log('exists: ' + snapshot.val())
      this.condition = snapshot.val().condition
      console.log(this.condition)
      console.log(snapshot.val())
      this.question = snapshot.val().question
      this.error = snapshot.val().error
    } else { */
  firebase.database().ref('lab3/variants/1').once('value', snapshot => {
    let variant = snapshot.val()
    this.condition = generate(variant, variant['dict1'], variant['dict2'])
    if (labName === 'additiveLab') {
      this.condition['tables'] = this.generateVariant()
    }
    firebase.database().ref('lab3/questions/' + labName).once('value').then((snapshot) => {
      let questions = snapshot.val()
      /* this.question.push(questions[0])
      this.question.push(questions[1]) */
      // console.log(questions)
      this.question.push(questions.initial[Math.floor(Math.random() * questions.initial.length)])
      this.question.push(questions.first[Math.floor(Math.random() * questions.first.length)])
      this.question.push(questions.second[Math.floor(Math.random() * questions.second.length)])
      this.question.push(questions.third[Math.floor(Math.random() * questions.third.length)])
      this.question.push(questions.final[Math.floor(Math.random() * questions.final.length)])
      // console.log(this.question)
      console.log(user.role)
      if (user.role === 'student') {
        work3.work.condition = this.condition
        work3.work.question = this.question
        this.correctStep = work3.work.step
        this.$store.dispatch('data/updateWork3', {
          wid: work3.wid,
          work: work3.work
        })
      } else {
        this.correctStep = 20
        this.teacherMode = true
      }
      // firebase.database().ref('lab3/current/' + this.uid).set({
      //   condition: this.condition,
      //   question: this.question,
      //   error: this.error,
      //   numberOfLab: 3,
      //   step: 0,
      //   try: 0
      // })
    })
  })
// }
  // })
}
