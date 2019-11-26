<template>
  <q-btn :icon="icon" :color="color" round :flat="flat" @click="opened=true">
    <q-modal v-model="opened">
      <div class="q-pa-lg" style="width: 400px">
        <div class="column">
          <div class="row self-center">
            {{title}}
          </div>
        </div>
        <q-input :stack-label="$t('Name')" v-model="name" />
        <q-input :stack-label="$t('E-mail')" v-model="email" />
        <q-input :stack-label="$t('Phone')" v-model="phone" />
        <q-input :stack-label="$t('Address')" v-model="address" />
        <div class="row q-mt-lg">
          <q-btn slot="footer" color="secondary" @click="apply()" :label="title" class="col q-ma-sm"/>
          <q-btn slot="footer" color="secondary" @click="cancel()" :label="$t('Cancel')" class="col q-ma-sm"/>
        </div>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>
export default {
  props: ['icon', 'color', 'flat', 'title', 'gid', 'student'],
  data () {
    return {
      opened: false,
      id: this.student ? this.student.id : '',
      name: this.student ? this.student.name : '',
      group: this.student ? this.student.group : this.gid,
      outdated: this.student ? this.student.outdated : false,
      email: this.student ? this.student.email : '',
      address: this.student ? this.student.address : '',
      phone: this.student ? this.student.phone : ''
    }
  },
  methods: {
    apply () {
      this.opened = false
      let student = {
        name: this.name,
        group: this.group,
        outdated: this.outdated,
        email: this.email,
        address: this.address,
        phone: this.phone
      }
      if (this.id === '') {
        this.$store.dispatch('data/createStudent', {
          ...student
        }).catch(error => {
          this.$q.notify(error.message)
        })
      } else {
        this.$store.dispatch('data/updateStudent', {
          sid: this.id,
          ...student
        }).catch(error => {
          this.$q.notify(error.message)
        })
      }
    },
    cancel () {
      this.opened = false
      this.id = this.student ? this.student.id : ''
      this.name = this.student ? this.student.name : ''
      this.group = this.student ? this.student.group : this.gid
      this.outdated = this.student ? this.student.outdated : ''
      this.email = this.student ? this.student.email : ''
      this.address = this.student ? this.student.address : ''
      this.phone = this.student ? this.student.phone : ''
    }
  }
}
</script>

<style>
</style>
