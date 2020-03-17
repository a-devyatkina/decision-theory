import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('students')
    }
    return reference
  }

  class StudentsRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          sid: snapshot.key,
          student: {
            name: val.name,
            group: val.group,
            email: val.email,
            phone: val.phone,
            address: val.address,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('students child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          sid: snapshot.key,
          student: {
            name: val.name,
            group: val.group,
            email: val.email,
            phone: val.phone,
            address: val.address,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('students child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('students child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async find (email) {
      const snapshot = await ref().orderByChild('email').equalTo(email).once('value')
      let ret = null
      snapshot.forEach(function (child) {
        const val = child.val()
        ret = {
          sid: child.key,
          student: {
            name: val.name,
            group: val.group,
            email: val.email,
            phone: val.phone,
            address: val.address,
            outdated: val.outdated
          }
        }
      })
      return ret
    }

    async create (name, group, email, phone, address, outdated) {
      let snapshot = await ref().push({
        name: name,
        group: group,
        email: email,
        phone: phone,
        address: address,
        outdated: outdated
      })
      return snapshot.key
    }

    async update (sid, name, group, email, phone, address, outdated) {
      await ref().child(sid).set({
        name: name,
        group: group,
        email: email,
        phone: phone,
        address: address,
        outdated: outdated
      })
    }

    async remove (sid) {
      await ref().child(sid).remove()
    }
  }

  if (!instance) {
    instance = new StudentsRef()
  }

  return instance
}())
