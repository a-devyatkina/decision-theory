<template>
    <q-list class="q-ma-md round-borders shadow-2 bg-white" id="list">
        <q-item-main> {{ question.question }} </q-item-main>
        <div v-for="answer in question.answers" :key="answer.id">
            <div v-if="question.user_answers && question.user_answers.includes(answer)">
                <q-item> {{ answer }} &#10004; </q-item>
            </div>
            <div v-else>
                <q-item> {{ answer }}</q-item>
            </div>
        </div>
        <q-item-side>{{ result }}</q-item-side>
    </q-list>
</template>

<script>
const axios = require('axios')
export default {
  props: ['question', 'type'],
  // data: () => {
  //   return {
  //     question: null
  //   }
  // },
  computed: {
    result () {
      return 'Правильный ответ - ' + this.question.correct
    }
  },
  mounted () {
    console.log(this.question)
    let url, body
    if (this.type === 'intro') {
      url = 'restapi/hierarchies/get_intro_question'
      body = {id: this.question._id}
    } else if (this.type === 'practice') {
      url = 'restapi/hierarchies/get_practice_question'
      body = {
        type: this.question.type,
        id: this.question._id
      }
    } else {
      url = 'restapi/hierarchies/get_add_question'
      body = {id: this.question.question}
    }
    axios.post(
      url,
      body
    ).then(response => {
      let userAnswers = this.question.answers
      this.question = response.data
      this.question.user_answers = userAnswers
    })
  }
}
</script>

<style scoped>
    #list {
        width: 600px;
        padding-left: 10px;
    }
</style>
