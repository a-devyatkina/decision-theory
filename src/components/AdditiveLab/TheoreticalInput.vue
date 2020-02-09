<template>
    <div class="goal">
        <div class="finalquest">
            <p><b>Какое из утверждений является условием нормальности функции?</b></p>
        </div>
        <div class="q-pa-md">
            <div class="q-gutter-md">
                <q-input type="textarea" autogrow outlined v-model="finalAnswer" label="Ответ" color="secondary"/>
            </div>
        </div>
        <q-btn class='q-px-lg' color="secondary" style='margin: 15px 17px' label="Завершить"/>
    </div>
</template>

<script>
export default {
  data () {
    return {
      finalAnswer: ''
    }
  },
  mounted () {
    if (localStorage.finalAnswer) {
      this.finalAnswer = localStorage.finalAnswer
    }
  },
  watch: {
    finalAnswer: {
      handler: function (oldAnswer, newAnswer) {
        localStorage.finalAnswer = newAnswer
      }
    }
  }
}
</script>
<style scoped>
    .finalquest{
        margin: 50px 50px 50px 17px;
    }
</style>
