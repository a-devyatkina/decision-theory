<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="q-mt-xl">
        <div class="column login-form">
          <q-card class="q-ma-sm">
            <q-card-title class="column items-center">
              {{ $t('MEPhI-lab') }}
            </q-card-title>
            <q-card-main>
              <q-input :error="$v.email.$error" color="secondary" v-model="email" type="text" :stack-label="$t('E-mail')" />
              <q-input :error="$v.password.$error" color="secondary" v-model="password" type="password" :stack-label="$t('Password')" />
            </q-card-main>
            <q-card-actions class="column items-center">
              <q-btn no-caps glossy color="secondary" @click="onSubmit" :loading="loading" :disabled="loading"
                type="submit" class="submit-btn" text-color="white" :label="$t('Login')">
                <q-icon class="q-pr-md absolute-right" name="arrow_right" />
              </q-btn>
              <div class="row self-center justify-between">
                <q-btn class="social-auth" @click="onGoogleSignIn" :loading="loading" :disabled="loading" >
                  <img src="../assets/google-logo.svg" />
                </q-btn>
                <q-btn class="social-auth" @click="onYandexSignIn" :loading="loading" :disabled="loading">
                  <img src="../assets/yandex-logo.svg" />
                </q-btn>
                <q-btn class="social-auth" @click="onMailruSignIn" :loading="loading" :disabled="loading">
                  <img src="../assets/mailru-logo.svg" />
                </q-btn>
              </div>
              <router-link class="row justify-center text-secondary q-caption q-my-sm cursor-pointer" to="/registration" tag="span">{{ $t('registration') }}</router-link>
            </q-card-actions>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  required,
  email
} from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    error () {
      return (this.$v.email.$error || this.$v.password.$error)
    },
    loading () {
      return this.$store.getters['data/loading']()
    }
  },
  methods: {
    onSubmit () {
      this.$v.email.$touch()
      this.$v.password.$touch()
      if (this.error) {
        return
      }
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('data/loginUser', user)
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            timeout: 3000,
            color: 'red',
            textColor: 'black',
            position: 'bottom',
            actions: [{
              icon: 'close'
            }]
          })
        })
    },
    onYandexSignIn () {
      window.location = '/auth/yandex/custom-token'
    },
    onMailruSignIn () {
      window.location = '/auth/mailru/custom-token'
    },
    onGoogleSignIn () {
      window.location = '/auth/google/custom-token'
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
