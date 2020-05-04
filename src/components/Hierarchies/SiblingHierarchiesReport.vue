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
                <h6>Начальный балл - {{ session.base_score }}</h6>
            </q-item>
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
                    <h6>Вводный тест - Этап {{ intro }}</h6>
                </q-item-main>
            </q-item>
            <div class="questions" v-for="question in session.intro.questions" :key="question.id">
                <q-item>
                    <question-report :question="question" :type="'intro'"/>
                </q-item>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Практический тест - Этап {{ practice }}</h6>
                </q-item-main>
            </q-item>
            <div class="questions" v-for="question in session.practice.questions" :key="question.id">
                <q-item>
                    <question-report :question="question" :type="'practice'"/>
                </q-item>
            </div>
            <q-item>
                <q-item-main>
                    <h6>Целевая матрица - Этап {{ target_matrix }}</h6>
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
                    <h6>Матрица по первому критерию - Этап {{ criterion_matrix1 }}</h6>
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
                    <h6>Матрица по второму критерию - Этап {{ criterion_matrix2 }}</h6>
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
                    <h6>Матрица по третьему критерию - Этап {{ criterion_matrix3 }}</h6>
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
                    <h6>Матрица по четвертому критерию - Этап {{ criterion_matrix4 }}</h6>
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
                    <h6>Иерархический синтез - Этап {{ hierarchical_synthesis }}</h6>
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
                    <h6>Дополнительный вопрос - Этап {{ add_test }}</h6>
                </q-item-main>
            </q-item>
            <q-item>
                <question-report :question="session.add_test" :type="'add'"/>
            </q-item>
            <!--<q-item>-->
                <!--<q-item-main v-if="this.session.mark">Оценка: {{ score }}</q-item-main>-->
            <!--</q-item>-->
        </div>
    </q-list>
</template>

<script>
const axios = require('axios')
export default {
  props: [ 'sid', 'max_score' ],
  data () {
    return {
      sessions: [],
      session: null
    }
  },
  computed: {
    intro () {
      let intro = this.session.intro
      let points = this.session.base_score * (intro.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.05
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = intro.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    practice () {
      let practice = this.session.practice
      let points = this.session.base_score * (practice.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.15
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = practice.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    target_matrix () {
      let targetMatrix = this.session.target_matrix
      let points = this.session.base_score * (targetMatrix.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = targetMatrix.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    criterion_matrix1 () {
      let criterionMatrix1 = this.session.criterion_matrix1
      let points = this.session.base_score * (criterionMatrix1.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = criterionMatrix1.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    criterion_matrix2 () {
      let criterionMatrix2 = this.session.criterion_matrix2
      let points = this.session.base_score * (criterionMatrix2.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = criterionMatrix2.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    criterion_matrix3 () {
      let criterionMatrix3 = this.session.criterion_matrix3
      let points = this.session.base_score * (criterionMatrix3.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = criterionMatrix3.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    criterion_matrix4 () {
      let criterionMatrix4 = this.session.criterion_matrix4
      let points = this.session.base_score * (criterionMatrix4.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = criterionMatrix4.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    hierarchical_synthesis () {
      let hierarchicalSynthesis = this.session.hierarchical_synthesis
      let points = this.session.base_score * (hierarchicalSynthesis.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.2
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = hierarchicalSynthesis.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    add_test () {
      let addTest = this.session.add_test
      let points = this.session.base_score * (addTest.points / 100)
      points = Math.round(points * 10) / 10
      let maxPoints = this.session.base_score * 0.1
      maxPoints = Math.round(maxPoints * 10) / 10
      let message = addTest.done ? 'завершен (' + points + '/' + maxPoints + ')' : 'не завершен'
      return message
    },
    score () {
      let score = this.session.mark / 100 * this.session.base_score
      score = Math.round(score * 10) / 10
      return score
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
        response.data[i].date = date
        let label = 'Попытка ' + (response.data[i].try + 1)
        let baseScore = (this.max_score * (100 - response.data[i].try * 10) / 100)
        baseScore = Math.round(baseScore * 10) / 10
        response.data[i].base_score = baseScore
        let mark
        if (response.data[i].mark) {
          mark = baseScore * response.data[i].mark / 100
          mark = Math.round(mark * 10) / 10
        } else {
          mark = '?'
        }
        label += ' (' + mark + ' /' + this.max_score + ')'
        let session = {
          label: label,
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
