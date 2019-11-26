import * as firebase from 'firebase'

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
      const auth = await firebase.auth().signInWithEmailAndPassword(email, password)
      return { role: 'root', id: auth.user.uid, email: auth.user.email }
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
