<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="q-mt-xl">
        <div class="column login-form">
          <q-card class="q-ma-sm">
            <q-card-title class="column items-center">
              {{ $t('Registration on MEPhI-lab') }}
            </q-card-title>
            <q-card-main>
              <q-input :error="$v.name.$error" color="secondary" v-model="name" type="text" :stack-label="$t('Name')" />
              <q-input color="secondary" v-model="phone" type="text" :stack-label="$t('Phone')" />
              <q-input color="secondary" v-model="address" type="text" :stack-label="$t('Address')" />
              <q-select color="secondary" v-model="role" :options="roles" :stack-label="$t('Role')" />
              <q-select color="secondary" v-model="group" :options="groups" :stack-label="$t('Group')" />
            </q-card-main>
            <q-card-actions class="column items-center">
              <div class="q-caption text-center text-grey q-my-xs"> {{ $t('Register with:') }} </div>
              <div class="row self-center justify-between">
                <q-btn class="social-auth" @click="onSubmit('google')" :loading="loading" :disabled="loading">
                  <img src="../assets/google-logo.svg" />
                </q-btn>
                <q-btn class="social-auth" @click="onSubmit('yandex')" :loading="loading" :disabled="loading">
                  <img src="../assets/yandex-logo.svg" />
                </q-btn>
                <q-btn class="social-auth" @click="onSubmit('mailru')" :loading="loading" :disabled="loading">
                  <img src="../assets/mailru-logo.svg" />
                </q-btn>
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  required
} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      role: 'student',
      group: '',
      roles: [
        { value: 'teacher', label: this.$t('teacher') },
        { value: 'student', label: this.$t('student') }
      ]
    }
  },
  validations: {
    name: {
      required
    }
  },
  computed: {
    error () {
      return this.$v.name.$error
    },
    loading () {
      return this.$store.getters['data/loading']()
    },
    groups () {
      let list = [{ label: 'none', value: '' }]
      let groups = this.$store.getters['data/getGroups']()
      for (let gid in groups) {
        list.push({
          value: gid,
          label: groups[gid].name
        })
      }
      return list
    }
  },
  methods: {
    onSubmit (provider) {
      this.$v.name.$touch()
      if (this.error) {
        return
      }
      window.location = `/regrequest/${provider}?name=${this.name}&phone=${this.phone}&address=${this.address}&role=${this.role}&group=${this.group}`
    }
  },
  beforeCreate () {
    this.$store.dispatch('data/listGroups')
  },
  mounted () {
    if (this.$router.currentRoute.query.rid) {
      this.$q.notify({
        message: this.$t('Wait a while for administrator checks the data'),
        timeout: 5000,
        color: 'green',
        textColor: 'white',
        position: 'center',
        icon: 'how_to_reg',
        actions: [{
          icon: 'close'
        }]
      })
    }
  }
}
</script>
<style scoped>
  .login-form {
    width: 400px;
    margin: auto;
  }
  .submit-btn {
    width: 120px;
    height: 40px;
  }
  .social-auth {
    width: 35px;
    height: 35px;
    margin: 10px 0px 10px 0px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: none;
  }
  img {
    width: 35px;
    height: 35px;
    position: absolute;
    border-radius: 10px;
    padding: 5px;
  }
</style>
