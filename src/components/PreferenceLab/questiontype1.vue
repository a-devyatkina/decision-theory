<template lang="html">
<div class="">
  {{settings.question}}<br>
  <input type="radio" v-model = 'message' name="question" value = '1'> {{settings.answer1}}<br>
  <input type="radio" v-model = 'message' name="question" value = '2'> {{settings.answer2}}<br>
  <input type="radio" v-model = 'message' name="question" value = '3'> {{settings.answer3}}<br>
  <input type="radio" v-model = 'message' name="question" value = '4'> {{settings.answer4}}<br>
  <button type="submit" class="knopka" name="check" value="true" @click = 'onAnswer(message)'>Проверить</button>{{text}}
</div>
</template>

<script>
export default {
  props: ['settings'],
  data () {
    return {
      message: '',
      text: ''
    }
  },
  methods: {
    onAnswer (ok) {
      console.log(ok)
      this.text = ok
      if (ok === this.settings.rightanswer[0]) {
        this.text = 'Правильно'
      } else {
        this.text = 'Неправильно'
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
