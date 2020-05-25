import { generate } from './gen'
import * as firebase from 'firebase'
import variants from './variants'

const usersWithVariants = {
  '-M3laaK6mM7HWas1EMDw': 0,
  '-M0S_7Mu7gv6HU8r7GZo': 13,
  '-M63orwMramoZQpgjjCk': 0,
  '-M4Q1b80w6kBbGOWuk1G': 1,
  '-M4Pn67BYX5Daensy7ve': 2,
  '-M4PmenQPUPCZHL5rycY': 3,
  '-M4PmZCB_KCPLK53e1ml': 6,
  '-M3Ad--2oHBITF0JqmKA': 7,
  '-M4Pnb2MQr6eNKSs4T7O': 10,
  '-M4PmnGjorSfmhM1Yr3z': 11,
  '-M4PmxFijtvj0uC70zFQ': 12,
  '-M3D7r6RZsgrQ0UeEg8P': 13
}

export function checkLab (labName) {
  let user = this.$store.getters['data/getUser']()
  let cid = this.$router.currentRoute.query.cid
  let work3 = this.$store.getters['data/getStudentWork3'](user.id, labName, cid)
  this.maxScore = this.$store.getters['data/getCourse'](cid).groups[user.group].lab3[work3.work.lab].maxScore
  if (work3) {
    if (work3.work.stage !== 'improve' && work3.work.condition !== '') {
      this.correctStep = work3.work.step
      this.condition = work3.work.condition
      this.question = work3.work.question
      this.work3 = work3
      if (work3.work.error !== '') {
        this.error = work3.work.error
      }
      return
    }
  } else if (user.role === 'student') {
    console.log('FATAL 404')
  }

  firebase.database().ref('lab3/variants/1').once('value', snapshot => {
    let variant = snapshot.val()
    // let variantNumber = usersWithVariants.findIndex(function (e) { return e === user.id })
    let variantNumber = usersWithVariants[user.id]
    if (variantNumber !== undefined) {
      this.condition = variants[variantNumber]
    } else if (user.id === '-M3laaK6mM7HWas1EMDw') {
      this.condition = variants[0]
    } else {
      this.condition = generate(variant, variant['dict1'], variant['dict2'])
    }
    if (labName === 'logicsLab') {
      labName = 'preferenceLab'
    }
    firebase.database().ref('lab3/questions/' + labName).once('value').then((snapshot) => {
      let questions = snapshot.val()

      this.question.push(questions.initial[Math.floor(Math.random() * questions.initial.length)])
      this.question.push(questions.first[Math.floor(Math.random() * questions.first.length)])
      this.question.push(questions.second[Math.floor(Math.random() * questions.second.length)])
      this.question.push(questions.third[Math.floor(Math.random() * questions.third.length)])
      this.question.push(questions.final[Math.floor(Math.random() * questions.final.length)])

      if (user.role === 'student') {
        work3.work.condition = this.condition
        work3.work.question = this.question
        if (!work3.work.condition.weight) {
          work3.work.condition.weight = [0.25, 0.25, 0.25, 0.25]
        }
        work3.work.step = 0
        this.correctStep = work3.work.step
        work3.work.stage = 'opened'
        work3.work.error = ''
        work3.work.penalty = 0
        work3.work.score = 0
        this.work3 = work3
        this.$store.dispatch('data/updateWork3', {
          wid: work3.wid,
          work: work3.work
        })
      } else {
        this.correctStep = 20
        this.teacherMode = true
      }
    })
  })
}
