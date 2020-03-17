import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('histories')
    }
    return reference
  }

  class LabsRef {
    listen (wid, onAdded, onChanged, onRemoved) {
      ref().orderByKey().startAt(wid).endAt(wid).on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          wid: snapshot.key,
          history: val
        })
      }, error => {
        console.log('histories child_changed failed: ' + error.code)
      })

      ref().orderByKey().startAt(wid).endAt(wid).on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          wid: snapshot.key,
          history: val
        })
      }, error => {
        console.log('histories child_added failed: ' + error.code)
      })

      ref().orderByKey().startAt(wid).endAt(wid).on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('histories child_removed failed: ' + error.code)
      })
    }

    unlisten (wid) {
      ref().orderByKey().startAt(wid).endAt(wid).off()
    }

    async get (wid) {
      let snapshot = await ref().child(wid).once('value')
      let history = {}
      history[snapshot.key] = snapshot.val()
      return history
    }

    async update (wid, history) {
      await ref().child(wid).set(history)
    }

    async remove (wid) {
      await ref().child(wid).remove()
    }
  }

  if (!instance) {
    instance = new LabsRef()
  }

  return instance
}())
