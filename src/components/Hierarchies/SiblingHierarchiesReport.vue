<template>
    <q-list class="q-ma-md round-borders shadow-2 bg-grey-2">
        <q-item>
            <h4>Отчет о выполнении</h4>
        </q-item>
        <q-item>
            <q-select
                    v-model="session"
                    float-label="Выберите одну из сессий"
                    radio
                    :options="sessions"
                    color="secondary"/>
        </q-item>
        <div v-if="session">
            <q-item>
                <h5>Задание</h5>
            </q-item>
            <div class=matrix v-for="matrix in session.variant.data" :key="matrix.id">
                <q-item>
                    <matrix-view :matrix="matrix"/>
                </q-item>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Вводный тест - Этап {{ session.intro.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="questions" v-for="question in session.intro.questions" :key="question.id">
                <q-item>
                    <question-report :question="question" :type="'intro'"/>
                </q-item>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Практический тест - Этап {{ session.practice.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="questions" v-for="question in session.practice.questions" :key="question.id">
                <q-item>
                    <question-report :question="question" :type="'practice'"/>
                </q-item>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Целевая матрица - Этап {{ session.target_matrix.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="matrix_step" v-for="answer in session.target_matrix.answers" :key="answer.id">
                <div v-if="session.target_matrix.answers.length">
                    <q-item>
                        <matrixstep-view :answer="answer"/>
                    </q-item>
                </div>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Матрица по первому критерию - Этап {{ session.criterion_matrix1.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="matrix_step" v-for="answer in session.criterion_matrix1.answers" :key="answer.id">
                <div v-if="session.criterion_matrix1.answers.length">
                    <q-item>
                        <matrixstep-view :answer="answer"/>
                    </q-item>
                </div>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Матрица по второму критерию - Этап {{ session.criterion_matrix2.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="matrix_step" v-for="answer in session.criterion_matrix2.answers" :key="answer.id">
                <div v-if="session.criterion_matrix2.answers.length">
                    <q-item>
                        <matrixstep-view :answer="answer"/>
                    </q-item>
                </div>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Матрица по третьему критерию - Этап {{ session.criterion_matrix3.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="matrix_step" v-for="answer in session.criterion_matrix3.answers" :key="answer.id">
                <div v-if="session.criterion_matrix3.answers.length">
                    <q-item>
                        <matrixstep-view :answer="answer"/>
                    </q-item>
                </div>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Матрица по четвертому критерию - Этап {{ session.criterion_matrix4.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div class="matrix_step" v-for="answer in session.criterion_matrix4.answers" :key="answer.id">
                <div v-if="session.criterion_matrix4.answers.length">
                    <q-item>
                        <matrixstep-view :answer="answer"/>
                    </q-item>
                </div>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Иерархический синтез - Этап {{ session.hierarchical_synthesis.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <div v-for="answer in session.hierarchical_synthesis.answers" :key="answer.id">
                <q-list class="q-ma-md round-borders shadow-2 bg-white" id="list">
                    <q-item>
                        <matrix-view :matrix="answer.matrix"/>
                    </q-item>
                    <q-item>
                        <q-item-main>Вектор приоритетов критериев</q-item-main>
                        <q-item-side>&lt;{{ answer.criterion_priority.join(', ') }}&gt;</q-item-side>
                    </q-item>
                    <q-item>
                        <q-item-main>Вектор глобальных приоритетов</q-item-main>
                        <q-item-side>&lt;{{ answer.global_priority.join(', ') }}&gt;</q-item-side>
                    </q-item>
                    <q-item>
                        <q-item-main>Альтернатива</q-item-main>
                        <q-item-side>&lt;{{ answer.alternative }}&gt;</q-item-side>
                    </q-item>
                </q-list>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Дополнительный вопрос - Этап {{ session.add_test.done ? "завершен" : "не завершен" }}</h6>
                </q-item-main>
            </q-item>
            <q-item>
                <question-report :question="session.add_test" :type="'add'"/>
            </q-item>
            <q-item>
                <q-item-main v-if="this.session.mark">Оценка: {{ this.session.mark }}</q-item-main>
            </q-item>
        </div>
    </q-list>
</template>

<script>
const axios = require('axios')
export default {
  props: [ 'sid' ],
  data () {
    return {
      sessions: [],
      session: null
    }
  },
  mounted () {
    let body = {
      user_id: this.sid
    }
    axios.post(
      'restapi/hierarchies/get_user_sessions',
      body
    ).then(response => {
      for (let i in response.data) {
        let date = new Date(response.data[i].timestamp)
        date = date.toLocaleString()
        delete response.data[i].timestamp
        let session = {
          label: date,
          value: response.data[i]
        }
        for (let i in session.value.hierarchical_synthesis.answers) {
          let matrix = {
            name: 'Итоговая матрица',
            value: session.value.hierarchical_synthesis.answers[i].matrix
          }
          session.value.hierarchical_synthesis.answers[i].matrix = matrix
        }
        this.sessions.push(session)
      }
    })
  }
}
</script>

<style scoped>
    .matrix {
        width: 300px;
    }
    #list {
        width: 600px;
    }
</style>
