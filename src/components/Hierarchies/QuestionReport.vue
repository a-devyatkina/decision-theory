<template>
        <q-list class="q-ma-md round-borders shadow-2 bg-grey-2" id="list">
            <q-item-main> {{ text }} </q-item-main>
            <div v-if="question.answers.length">
                <div v-for="answer in question.answers" :key="answer.id">
                    <q-item> {{ answer }} </q-item>
                </div>
            </div>
            <div v-else>
                <q-item>(На этот вопрос студент не отвечал)</q-item>
            </div>
        </q-list>
</template>

<script>
const axios = require('axios')
export default {
  props: [ 'question', 'type' ],
  data: () => {
    return {
      text: null
    }
  },
  mounted () {
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
      this.text = response.data.question
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
