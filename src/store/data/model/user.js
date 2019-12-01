import * as firebase from 'firebase'
import axios from 'axios'

export default (function () {
  let instance = null
  let reference = null

  function roles () {
    if (!reference) {
      reference = firebase.database().ref('roles')
    }
    return reference
  }

  class UserRef {
    async updateUserRole (authId, userId, role) {
      await roles().child(authId).set({
        role: role,
        id: userId
      })
    }

    async loginByPassword (email, password) {
      const cred = await firebase.auth().signInWithEmailAndPassword(email, password)
      let req = {
        idToken: await cred.user.getIdToken()
      }
      const response = await axios.post('auth/token', req)
      if (response.status !== 200) {
        throw new Error('error: ' + response.status)
      }
      return { role: 'root', id: cred.user.uid, email: cred.user.email }
    }

    async loginWithCustomToken (token) {
      const result = await firebase.auth().signInWithCustomToken(token)
      const uid = result.user.uid
      let snapshot = await firebase.database().ref('/students/' + uid).once('value')
      if (snapshot.exists()) {
        let student = {...snapshot.val()}
        student.id = uid
        student.role = 'student'
        console.log(student)
        return student
      } else {
        let snapshot = await firebase.database().ref('/teachers/' + uid).once('value')
        if (snapshot.exists()) {
          let teacher = {...snapshot.val()}
          teacher.id = uid
          teacher.role = 'teacher'
          return teacher
        }
        throw new Error('user not found')
      }
    }

    async logout () {
      await firebase.auth().signOut()
    }
  }

  if (!instance) {
    instance = new UserRef()
  }

  return instance
}())
