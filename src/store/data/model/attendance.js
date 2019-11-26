import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('attendance')
    }
    return reference
  }

  class LabsRef {
    listen (user, onAdded, onChanged, onRemoved) {
      ref().orderByChild(user.role).equalTo(user.id).on('child_changed', snapshot => {
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
        console.log('attendance child_changed failed: ' + error.code)
      })

      ref().orderByChild(user.role).equalTo(user.id).on('child_added', snapshot => {
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
        console.log('attendance child_added failed: ' + error.code)
      })

      ref().orderByChild(user.role).equalTo(user.id).on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('attendance child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async list (teacher) {
      let snapshot = await ref().orderByChild('teacher').equalTo(teacher).once('value')
      let attendance = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        attendance[child.key] = {
          student: val.student,
          teacher: val.teacher,
          course: val.course,
          score: val.score
        }
      })
      return attendance
    }

    async create (student, teacher, course, score) {
      let snapshot = await ref().push({
        student: student,
        teacher: teacher,
        course: course,
        score: score
      })
      return snapshot.key
    }

    async update (aid, student, teacher, course, score) {
      await ref().child(aid).set({
        student: student,
        teacher: teacher,
        course: course,
        score: score
      })
    }

    async remove (aid) {
      await ref().child(aid).remove()
    }
  }

  if (!instance) {
    instance = new LabsRef()
  }

  return instance
}())
