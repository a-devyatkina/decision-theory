import { generate } from './gen'
import * as firebase from 'firebase'

export function checkLab () {
  console.log(this)
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
