<template lang="html">
<div class="">
  {{settings.question}}<br>
  <input type="checkbox" v-model = 'message' id = '1' value = '1'> {{settings.answer1}}<br>
  <input type="checkbox" v-model = 'message' id = '2' value = '2'> {{settings.answer2}}<br>
  <input type="checkbox" v-model = 'message' id = '3' value = '3'> {{settings.answer3}}<br>
  <input type="checkbox" v-model = 'message' id = '4' value = '4'> {{settings.answer4}}<br>
  <button type="submit" class="knopka" name="check" value="true" @click = 'onAnswer(message)'>Проверить</button>{{text}}
</div>
</template>

<script>
export default {
  props: ['settings'],
  data () {
    return {
      message: [],
      text: ''
    }
  },
  methods: {
    onAnswer (ok) {
      console.log(ok)
      this.text = ok
      ok = ok.sort()
      if (ok.toString() === this.settings.rightanswer.toString()) {
        this.text = 'Правильно'
      } else {
        this.text = ok
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
