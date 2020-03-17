import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('works')
    }
    return reference
  }

  class WorksRef {
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
            stage: val.stage,
            task: val.task,
            solution: val.solution,
            score: val.score
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
            stage: val.stage,
            task: val.task,
            solution: val.solution,
            score: val.score
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

    async create (student, course, teacher, lab, stage, task, solution, score) {
      let snapshot = await ref().push({
        student: student,
        course: course,
        teacher: teacher,
        lab: lab,
        stage: stage,
        task: task,
        solution: solution,
        score: score
      })
      return snapshot.key
    }

    async update (wid, student, course, teacher, lab, stage, task, solution, score) {
      await ref().child(wid).set({
        student: student,
        course: course,
        teacher: teacher,
        lab: lab,
        stage: stage,
        task: task,
        solution: solution,
        score: score
      })
    }

    async remove (wid) {
      await ref().child(wid).remove()
    }
  }

  if (!instance) {
    instance = new WorksRef()
  }

  return instance
}())
