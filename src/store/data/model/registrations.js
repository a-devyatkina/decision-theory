import * as firebase from 'firebase'
import axios from 'axios'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('registrations')
    }
    return reference
  }

  class RegistrationRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({
          uid: snapshot.key,
          request: {
            name: val.name,
            group: val.group,
            email: val.email,
            phone: val.phone,
            address: val.address,
            role: val.role
          }
        })
      }, error => {
        console.log('ragistration child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({
          rid: snapshot.key,
          request: {
            name: val.name,
            group: val.group,
            email: val.email,
            phone: val.phone,
            address: val.address,
            role: val.role
          }
        })
      }, error => {
        console.log('ragistration child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('ragistration child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async list () {
      let snapshot = await ref().orderByChild('email').once('value')
      let requests = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        requests[child.key] = {
          name: val.name,
          group: val.group,
          email: val.email,
          phone: val.phone,
          address: val.address,
          role: val.role
        }
      })
      return requests
    }

    async acceptRegRequest (rid) {
      const response = await axios.post('/regrequest/accept', null, {
        params: {
          rid: rid
        }
      })
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
    }

    async rejectRegRequest (rid) {
      const response = await axios.post('/regrequest/reject', null, {
        params: {
          rid: rid
        }
      })
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
    }
  }

  if (!instance) {
    instance = new RegistrationRef()
  }

  return instance
}())
