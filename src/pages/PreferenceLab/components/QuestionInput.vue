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
    </div>
</template>

<script>
export default {
  props: ['question'],
  data () {
    return {
      finalAnswer: ''
    }
  }
}
</script>
<style scoped>
    .finalquest{
        margin: 50px 50px 50px 17px;
    }
</style>
