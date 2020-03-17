<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg" style="width: 400px">
      <div class="column">
        <div class="row self-center">
          {{title}}
        </div>
      </div>
      <q-input v-if="action==='close'" :stack-label="$t('Штраф')" type="number" v-model="penalty" />
      <div class="row q-mt-lg">
        <router-link v-if="action==='resolve' && (work.stage==='assign' || work.stage==='resolve')" :to="work.lab">
          <q-btn color="secondary" @click="apply" :label="$t('Resolve')" class="col q-ma-sm"/>
        </router-link>
        <q-btn v-else-if="action==='resolve'" slot="footer" color="secondary" :label="$t('Resolve')" class="col q-ma-sm" :disable="true"/>
        <q-btn v-else slot="footer" color="secondary" @click="apply" :label="$t('Apply')" class="col q-ma-sm"/>
        <q-btn slot="footer" color="secondary" @click="cancel" :label="$t('Cancel')" class="col q-ma-sm"/>
      </div>
    </div>
  </q-modal>
</template>

<script>
export default {
  props: [ 'action', 'title', 'callback', 'penalty', 'work' ],
  data () {
    return {
      opened: false
    }
  },
  methods: {
    apply () {
      if (
        (this.action === 'close' && !this.penalty)) {
        this.$q.notify({
          message: 'Please, fill the gaps',
          timeout: 3000,
          color: 'red',
          textColor: 'black',
          position: 'bottom',
          actions: [{
            icon: 'close'
          }]
        })
        return
      }
      this.opened = false
      this.callback(
        {
          action: this.action,
          penalty: this.penalty
        }
      )
    },
    cancel () {
      this.opened = false
    }
  }
}
</script>
