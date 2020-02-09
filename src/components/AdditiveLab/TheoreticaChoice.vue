<template>
  <div>
    <div class="goal">
      <p><b>{{ question.question }}</b></p>
      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-radio v-model="answer" val="val0" :disable="checked" :label="question.answer[0]" color="secondary"/><br><br>
          <q-radio v-model="answer" val="val1" :disable="checked" :label="question.answer[1]" color="secondary"/><br><br>
          <q-radio v-model="answer" val="val2" :disable="checked" :label="question.answer[2]" color="secondary"/><br><br>
          <q-radio v-model="answer" val="val3" :disable="checked" :label="question.answer[3]" color="secondary"/><br>
        </div>
      </div>
    </div>
    <br>
    <h5 v-if="mistake">Проверьте ответы. У вас ошибка!</h5>
    <br>
    <q-btn class='q-px-lg' color="secondary" label="Продолжить" @click="check"/>
    <q-btn flat class='q-px-lg' color="secondary" label="Назад" style='margin: 25px' @click="$emit('back')"/>
  </div>
</template>

<script>
export default {
  props: ['question', 'step', 'correctStep'],
  data () {
    return {
      answer: '',
      mistake: false,
      checked: false
    }
  },
  methods: {
    check () {
      if (this.answer === ('val' + this.question.right)) {
        this.mistake = false
        this.checked = true
        console.log('in answer')
        this.$emit('answer')
      } else {
        this.mistake = true
        this.$emit('error')
      }
    }
  },
  mounted () {
    if (this.correctStep >= this.step) {
      this.mistake = false
      this.checked = true
      this.answer = 'val' + this.question.right
    }
  }
}
</script>

<style>
</style>
