import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('lab3/work3')
    }
    return reference
  }

  class Work3 {
    listen (user, onAdded, onChanged, onRemoved) {
      let fetch = user.role === 'student' ? ref().orderByChild('student').equalTo(user.id) : ref()
      fetch.on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          wid: snapshot.key,
          work: {
            student: val.student,
            course: val.course,
            teacher: val.teacher,
            lab: val.lab,
            step: val.step,
            condition: val.condition,
            score: val.score,
            attempt: val.attempt,
            error: val.error
          }
        })
      }, error => {
        console.log('works child_changed failed: ' + error.code)
      })

      fetch.on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          wid: snapshot.key,
          work: {
            student: val.student,
            course: val.course,
            teacher: val.teacher,
            lab: val.lab,
            step: val.step,
            condition: val.condition,
            score: val.score,
            attempt: val.attempt,
            error: val.error
          }
        })
      }, error => {
        console.log('works child_added failed: ' + error.code)
      })

      fetch.on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('works child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async create (student, course, teacher, lab, step, condition, score, attempt, error) {
      let snapshot = await ref().push({
        student: student,
        course: course,
        teacher: teacher,
        lab: lab,
        step: step,
        condition: condition,
        score: score,
        attempt: attempt,
        error: error
      })
      return snapshot.key
    }

    async update (wid, student, course, teacher, lab, step, condition, score, attempt, error) {
      await ref().child(wid).set({
        student: student,
        course: course,
        teacher: teacher,
        lab: lab,
        step: step,
        condition: condition,
        score: score,
        attempt: attempt,
        error: error
      })
    }

    async remove (wid) {
      await ref().child(wid).remove()
    }
  }

  if (!instance) {
    instance = new Work3()
  }

  return instance
}())
