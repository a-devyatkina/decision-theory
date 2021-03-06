import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('labs')
    }
    return reference
  }

  class LabsRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          lid: snapshot.key,
          lab: {
            name: val.name,
            description: val.description,
            teacher: val.teacher,
            files: val.files,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('labs child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          lid: snapshot.key,
          lab: {
            name: val.name,
            description: val.description,
            teacher: val.teacher,
            files: val.files,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('labs child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('labs child_removed failed: ' + error.code)
      })
    }

    unlisten (wid) {
      ref().off()
    }

    async list () {
      let snapshot = await ref().once('value')
      let labs = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        labs[child.key] = {
          name: val.name,
          description: val.description,
          teacher: val.teacher,
          files: val.files,
          outdated: val.outdated
        }
      })
      return labs
    }

    async create (name, description, teacher, files, outdated) {
      let snapshot = await ref().push({
        name: name,
        description: description,
        teacher: teacher,
        files: files,
        outdated: outdated
      })
      return snapshot.key
    }

    async update (lid, name, description, teacher, files, outdated) {
      await ref().child(lid).set({
        name: name,
        description: description,
        teacher: teacher,
        files: files,
        outdated: outdated
      })
    }

    async remove (lid) {
      await ref().child(lid).remove()
    }
  }

  if (!instance) {
    instance = new LabsRef()
  }

  return instance
}())
