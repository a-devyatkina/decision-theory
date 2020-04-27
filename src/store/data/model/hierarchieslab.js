import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('hierarchieslab/labinfo')
    }
    return reference
  }

  class HierarchieslabRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          lid: snapshot.key,
          lab: {
            name: val.name,
            description: val.description,
            maxscore: val.maxscore,
            teacher: val.teacher
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
            maxscore: val.maxscore,
            teacher: val.teacher
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
          maxscore: val.maxscore,
          teacher: val.teacher
        }
      })
      return labs
    }

    async create (name, description, maxscore, teacher) {
      let snapshot = await ref().push({
        name: name,
        description: description,
        maxscore: maxscore,
        teacher: teacher
      })
      return snapshot.key
    }

    async update (lid, name, description, maxscore, teacher) {
      await ref().child(lid).set({
        name: name,
        description: description,
        maxscore: maxscore,
        teacher: teacher
      })
    }

    async remove (lid) {
      await ref().child(lid).remove()
    }
  }

  if (!instance) {
    instance = new HierarchieslabRef()
  }

  return instance
}())
