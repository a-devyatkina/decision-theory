import axios from 'axios'
import * as firebase from 'firebase'

axios.defaults.baseURL = process.env.API

export default (function () {
  let instance = null
  let reference = null

  function ref () {
    if (!reference) {
      reference = firebase.database().ref('steplabs')
    }
    return reference
  }

  class SteplabsRef {
    async getSteplabSchema (lab, user) {
      const response = await axios.get('restapi/steplab/instance/schema', {
        params: {
          lab: lab,
          user: user
        }
      })
      return response.data
    }

    async createSteplab (lab, user) {
      await axios.post('restapi/steplab/instance/create', null, {
        params: {
          lab: lab,
          user: user
        }
      })
    }

    async removeSteplab (lab, user) {
      await axios.delete('restapi/steplab/instance/remove', {
        params: {
          lab: lab,
          user: user
        }
      })
    }

    async updateSteplab (lab, user, steplab) {
      let req = {}
      for (let step of steplab.steps) {
        req[step.name] = JSON.parse(JSON.stringify(step))
      }
      await axios.put('restapi/steplab/instance/data', req, {
        params: {
          lab: lab,
          user: user
        }
      })
    }

    async getSteplab (lab, user) {
      let schema = await this.getSteplabSchema(lab, user)
      let req = {}
      for (let step of schema) {
        req[step.name] = step
      }
      req.state = ''
      req.score = 0
      const response = await axios.post('restapi/steplab/instance/data', req, {
        params: {
          lab: lab,
          user: user
        }
      })
      let steplab = {}
      steplab.steps = schema
      for (let name in response.data) {
        if (name === 'state' || name === 'score') {
          steplab[name] = response.data[name]
        } else {
          let item = steplab.steps.find(o => o.name === name)
          if (item) {
            item.content = response.data[name].content
            item.state = response.data[name].state
          }
        }
      }
      return steplab
    }

    listen (onAdded, onChanged, onRemoved) {
      ref().on('child_changed', snapshot => {
        onChanged({
          lid: snapshot.key,
          handle: snapshot.val()
        })
      }, error => {
        console.log('steplabs child_changed failed: ' + error.code)
      })

      ref().on('child_added', snapshot => {
        onAdded({
          lid: snapshot.key,
          handle: snapshot.val()
        })
      }, error => {
        console.log('steplabs child_added failed: ' + error.code)
      })

      ref().on('child_removed', snapshot => {
        onRemoved(snapshot.key)
      }, error => {
        console.log('steplabs child_removed failed: ' + error.code)
      })
    }

    async createSteplabHandle (handle) {
      let snapshot = await ref().push(handle)
      return snapshot.key
    }

    async getSteplabHandle (lab) {
      let snapshot = await ref().child(lab).once('value')
      return snapshot.val()
    }

    async listSteplabHandles () {
      let snapshot = await ref().once('value')
      let steplabs = {}
      snapshot.forEach(function (child) {
        steplabs[child.key] = child.val()
      })
      return steplabs
    }

    async updateSteplabHandle (lab, handle) {
      let updates = {}
      updates['/' + lab + '/name'] = handle.name
      updates['/' + lab + '/description'] = handle.description
      updates['/' + lab + '/outdated'] = handle.outdated
      await ref().update(updates)
    }

    async removeSteplabHandle (lab) {
      await ref().child(lab).remove()
    }

    async getSteplabPatternSchema (lab) {
      const response = await axios.get('restapi/steplab/pattern/schema', {
        params: {
          lab: lab
        }
      })
      return response.data
    }

    async setSteplabPatternSchema (lab, schema) {
      const response = await axios.put('restapi/steplab/pattern/schema', schema, {
        params: {
          lab: lab
        }
      })
      return response.data
    }

    async uploadSteplabPattern (lab, file) {
      let form = new FormData()
      form.append('pattern', file)
      await axios.post('restapi/steplab/pattern/file', form, {
        params: {
          lab: lab
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }

    async removeSteplabPattern (lab) {
      await axios.delete('restapi/steplab/pattern/file', {
        params: {
          lab: lab
        }
      })
    }
  }

  if (!instance) {
    instance = new SteplabsRef()
  }

  return instance
}())
