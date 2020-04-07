<template>
  <q-btn @click='next_step' color='secondary' :label='label'/>
</template>

<script>
import { bus } from '../../router/index.js'
export default {
  name: 'button_next',
  props: ['label'],
  methods: {
    next_step: function () {
      bus.$emit('next_step')
    }
  }
}
</script>
