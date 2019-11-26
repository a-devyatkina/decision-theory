import * as firebase from 'firebase'

export default (function () {
  let instance = null

  class StorageRef {
    async upload (owner, file) {
      let res = await firebase.storage().ref(`files/${owner}/${file.name}`).put(file)
      let url = await res.ref.getDownloadURL()
      return url
    }

    async url (owner, file) {
      let url
      try {
        url = await firebase.storage().ref(`files/${owner}/${file}`).getDownloadURL()
      } catch (error) {
        console.log(error.message)
      }
      return url
    }

    async delete (owner, file) {
      await firebase.storage().ref(`files/${owner}/${file}`).delete()
    }
  }

  if (!instance) {
    instance = new StorageRef()
  }

  return instance
}())
