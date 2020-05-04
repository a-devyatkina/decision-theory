<template>
    <div class="goal">
        <div class="finalquest">
            <p><b>{{ question.question }}</b></p>
        </div>
        <img v-if="question.path" :src="question.path"/>
        <div class="q-pa-md">
            <div class="q-gutter-md">
                <q-input type="textarea" autogrow outlined v-model="question.answer" label="Ответ" color="secondary"/>
            </div>
        </div>
        <q-btn class='q-px-lg' color="secondary" style='margin: 15px 17px' @click="$emit('answer')" label="Ответить"/>
        <q-btn flat class='q-px-lg' color="secondary" style='margin: 15px 17px' @click="$emit('back')" label="Назад"/>
    </div>
</template>

<script>
export default {
  props: ['question'],
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
