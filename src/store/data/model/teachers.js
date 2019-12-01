import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('teachers')
    }
    return reference
  }

  class StudentsRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          tid: snapshot.key,
          teacher: {
            name: val.name,
            email: val.email,
            phone: val.phone,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('teachers child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          tid: snapshot.key,
          teacher: {
            name: val.name,
            email: val.email,
            phone: val.phone,
            outdated: val.outdated
          }
        })
      }, error => {
        console.log('teachers child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('teachers child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async list () {
      let snapshot = await ref().orderByChild('name').once('value')
      let teachers = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        teachers[child.key] = {
          name: val.name,
          email: val.email,
          phone: val.phone,
          outdated: val.outdated
        }
      })
      return teachers
    }

    async find (email) {
      const snapshot = await ref().orderByChild('email').equalTo(email).once('value')
      let ret = null
      snapshot.forEach(function (child) {
        const val = child.val()
        ret = {
          tid: child.key,
          teacher: {
            name: val.name,
            email: val.email,
            phone: val.phone,
            address: val.address ? val.address : '',
            outdated: val.outdated
          }
        }
      })
      return ret
    }

    async create (name, email, phone, address, outdated) {
      let snapshot = await ref().push({
        name: name,
        email: email,
        phone: phone,
        address: address,
        outdated: outdated
      })
      return snapshot.key
    }

    async update (tid, name, email, phone, address, outdated) {
      await ref().child(tid).set({
        name: name,
        email: email,
        phone: phone,
        address: address,
        outdated: outdated
      })
    }

    async remove (tid) {
      await ref().child(tid).remove()
    }
  }

  if (!instance) {
    instance = new StudentsRef()
  }

  return instance
}())
