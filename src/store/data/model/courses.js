import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('courses')
    }
    return reference
  }

  class CoursesRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          cid: snapshot.key,
          course: {
            name: val.name,
            teacher: val.teacher,
            groups: val.groups === undefined ? {} : val.groups,
            archived: val.archived
          }
        })
      }, error => {
        console.log('courses child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          cid: snapshot.key,
          course: {
            name: val.name,
            teacher: val.teacher,
            groups: val.groups === undefined ? {} : val.groups,
            archived: val.archived
          }
        })
      }, error => {
        console.log('courses child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('courses child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async list () {
      let snapshot = await ref().once('value')
      let courses = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        courses[child.key] = {
          name: val.name,
          teacher: val.teacher,
          groups: val.groups === undefined ? {} : val.groups,
          archived: val.archived
        }
      })
      return courses
    }

    async create (name, teacher, groups, archived) {
      let snapshot = await ref().push({
        name: name,
        teacher: teacher,
        groups: groups,
        archived: archived
      })
      return snapshot.key
    }

    async update (cid, name, teacher, groups, archived) {
      await ref().child(cid).set({
        name: name,
        teacher: teacher,
        groups: groups,
        archived: archived
      })
    }

    async remove (cid) {
      await ref().child(cid).remove()
    }
  }

  if (!instance) {
    instance = new CoursesRef()
  }

  return instance
}())
