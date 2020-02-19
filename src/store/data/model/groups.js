import * as firebase from 'firebase'

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('groups')
    }
    return reference
  }

  class GroupsRef {
    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        let val = snapshot.val()
        onChanged({ gid: snapshot.key, group: { name: val.name, description: val.description, outdated: val.outdated } })
      }, error => {
        console.log('groups child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        let val = snapshot.val()
        onAdded({ gid: snapshot.key, group: { name: val.name, description: val.description, outdated: val.outdated } })
      }, error => {
        console.log('groups child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('groups child_removed failed: ' + error.code)
      })
    }

    unlisten () {
      ref().off()
    }

    async list () {
      let snapshot = await ref().once('value')
      let groups = {}
      snapshot.forEach(function (child) {
        const val = child.val()
        groups[child.key] = {
          name: val.name,
          description: val.description,
          outdated: val.outdated
        }
      })
      return groups
    }

    async create (name, description, outdated) {
      let snapshot = await ref().push({
        name: name,
        description: description,
        outdated: outdated
      })
      return snapshot.key
    }

    async update (gid, name, description, outdated) {
      await ref().child(gid).set({
        name: name,
        description: description,
        outdated: outdated
      })
    }

    async remove (gid) {
      await ref().child(gid).remove()
    }

    async get (gid) {
      let snapshot = await ref().child(gid).once('value')
      const val = snapshot.val()
      return {
        gid: gid,
        group: {
          name: val.name,
          description: val.description,
          outdated: val.outdated
        }
      }
    }
  }

  if (!instance) {
    instance = new GroupsRef()
  }

  return instance
}())
