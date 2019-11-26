<template>
  <q-btn :icon="icon" :color="color" round :flat="flat" @click="opened=true">
    <q-modal v-model="opened" @open="notify('open')">
      <div class="q-pa-lg" style="width: 400px">
        <div class="column">
          <div class="row self-center">{{title}}</div>
        </div>
        <q-input :stack-label="$t('Name')" v-model="name" :error="$v.name.$error" />
        <q-input :stack-label="$t('Phone')" v-model="phone" />
        <q-input :stack-label="$t('E-mail')" v-model="email" :error="$v.email.$error" />
        <div class="row q-mt-lg">
          <q-btn slot="footer" color="secondary" @click="apply()" :label="title" class="col q-ma-sm" :loading="loading"
            :disabled="error || loading" />
          <q-btn slot="footer" color="secondary" @click="cancel()" :label="$t('Cancel')" class="col q-ma-sm" />
        </div>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>

import {
  required,
  email
} from 'vuelidate/lib/validators'

export default {
  props: ['icon', 'color', 'flat', 'title', 'tid', 'teacher'],
  data () {
    return {
      opened: false,
      name: this.teacher ? this.teacher.name : '',
      phone: this.teacher ? this.teacher.phone : '',
      email: this.teacher ? this.teacher.email : '',
      outdated: this.teacher ? this.teacher.outdated : false
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    }
  },
  computed: {
    error () {
      return (this.$v.email.$error || this.$v.name.$error)
    },
    loading () {
      return this.$store.getters['data/loading']()
    }
  },
  methods: {
    apply () {
      this.$v.email.$touch()
      this.$v.name.$touch()
      if (this.error) {
        return
      }
      this.opened = false
      let teacher = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        outdated: this.outdated
      }
      if (this.tid) {
        this.$store.dispatch('data/updateTeacher', {
          tid: this.tid,
          teacher: teacher
        })
      } else {
        this.$store.dispatch('data/createTeacher', {
          teacher: teacher
        })
      }
    },
    cancel () {
      this.opened = false
      this.name = this.teacher ? this.teacher.name : ''
      this.phone = this.teacher ? this.teacher.phone : ''
      this.email = this.teacher ? this.teacher.email : ''
      this.outdated = this.teacher ? this.teacher.outdated : false
    }
  }
}
</script>

<style>
</style>
