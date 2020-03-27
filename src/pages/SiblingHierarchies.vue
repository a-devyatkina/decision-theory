<template>
  <div class="q-pa-md">
    <div v-if="this.step < 1">
      <q-btn @click="getVar()" color="secondary" label="Начать"/>
    </div>
    <div v-else>
    <h3>
      Вариант {{info.var}}
    <q-btn label="Инструкция" color="primary">
      <q-tooltip>
        Some text as content of Tooltip
      </q-tooltip>
    </q-btn>
    </h3>
    <q-stepper
            v-model="step"
            vertical
            color="secondary"
            animated
    >
      <q-step
              :name="1"
              title="Задание"
              icon="assignment"
              :done="step > 1"
      >
        <div class=matrix v-for="(matrix) in info.data" :key="matrix.id">
          <div class="q-pa-md" id="matrix_table">
            <q-table
              :title="matrix.name"
              :data="matrix.value"
              :columns="columns"
              color="primary"
              row-key="id"
              hide-header
              hide-bottom
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="secondary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="2"
              title="Вводная часть"
              caption="Optional"
              icon="assignment"
              :done="step > 2"
      >

        <div v-if="!intro_test.isLoaded">
          <q-btn @click="getIntroTest()" color="secondary" label="Начать тест"/>
        </div>
        <div v-else-if="!intro_test.isOver">
          <q-item id="question">{{intro_test.info.question}}<br></q-item>
          <div class="q-pa-md q-gutter-sm">
            <div id="answerid" v-for="(answer) in intro_test.info.answers" :key="answer" class="answer">
              <q-radio v-model="intro_test.shape" :val="answer" dense> {{answer}} </q-radio>
            </div>
            <q-btn @click="checkIntroAnswer()" color="secondary" :disabled="!isTestFormValid(intro_test.shape)" label="Проверить"/>
          </div>
        </div>
        <div v-else>
          <h3>Тест успешно пройден!</h3>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="step = 3" color="secondary" label="Continue" :disabled="!intro_test.isOver" class="q-ml-sm"/>
          <q-btn flat @click="step = 1" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="3"
              title="Практическая часть"
              caption="Optional"
              icon="assignment"
              :done="step > 3"
      >

        <div v-if="!practice_test.isLoaded">
          <q-btn @click="getPracticeTest()" color="secondary" label="Начать тест"/>
        </div>
        <div v-else-if="!practice_test.isOver">
          <q-item id="question">{{practice_test.info.question}}<br></q-item>
          <div class="q-pa-md q-gutter-sm">
            <div id="answerid" v-for="(answer) in practice_test.info.answers" :key="answer" class="answer">
              <q-radio v-model="practice_test.shape" :val="answer" dense> {{answer}} </q-radio>
            </div>
            <q-btn @click="checkPracticeAnswer()" color="secondary" :disabled="!isTestFormValid(practice_test.shape)" label="Проверить"/>
          </div>
        </div>
        <div v-else>
          <h3>Тест успешно пройден!</h3>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="step = 4" color="secondary" label="Continue" :disabled="!practice_test.isOver" class="q-ml-sm"/>
          <q-btn flat @click="step = 2" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="4"
              title="Матрица по цели"
              icon="assignment"
              :done="step>4"
      >

        <form @submit.prevent="someAction()">
          <div class="lab">
            <div class="intro_test" v-for="(lab, index) in info.input.target_matrix" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.target_matrix[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.target_matrix[index].answer" :key="answer"
                           id="passport_data"
                           v-model="passport_data[0][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="passport_data[]"
                           v-on:input="changed(index)"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 5" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(passport_data[0], 'target_matrix')" color="secondary" label="Continue" class="q-ml-sm" />
          <q-btn flat @click="step = 3" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

      </q-step>

      <q-step
        :name="5"
        title="Матрица по 1 критерию"
        icon="assignment"
        :done="step>5"
      >

        <form @submit.prevent="someAction()">
          <div class="lab">
            <div class="intro_test" v-for="(lab, index) in info.input.criterion_matrix1" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix1[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix1[index].answer" :key="answer"
                           id="passport_data"
                           v-model="passport_data[1][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="passport_data[]"
                           v-on:input="changed(index)"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 6" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(passport_data[1], 'criterion_matrix1')" color="secondary" label="Continue" class="q-ml-sm"/>
          <q-btn flat @click="step = 4" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

      </q-step>

      <q-step
        :name="6"
        title="Матрица по 2 критерию"
        icon="assignment"
        :done="step>6"
      >

        <form @submit.prevent="someAction()">
          <div class="lab">
            <div class="intro_test" v-for="(lab, index) in info.input.criterion_matrix2" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix2[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix2[index].answer" :key="answer"
                           id="passport_data"
                           v-model="passport_data[2][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="passport_data[]"
                           v-on:input="changed(index)"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 7" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(passport_data[2], 'criterion_matrix2')" color="secondary" label="Continue" class="q-ml-sm"/>
          <q-btn flat @click="step = 5" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="7"
        title="Матрица по 3 критерию"
        icon="assignment"
        :done="step>7"
      >

        <form @submit.prevent="someAction()">
          <div class="lab">
            <div class="intro_test" v-for="(lab, index) in info.input.criterion_matrix3" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix3[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix3[index].answer" :key="answer"
                           id="passport_data"
                           v-model="passport_data[3][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="passport_data[]"
                           v-on:input="changed(index)"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 8" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(passport_data[3], 'criterion_matrix3')" color="secondary" label="Continue" class="q-ml-sm"/>
          <q-btn flat @click="step = 6" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

      </q-step>

      <q-step
        :name="8"
        title="Матрица по 4 критерию"
        icon="assignment"
        :done="step>8"
      >

        <form @submit.prevent="someAction()">
          <div class="lab">
            <div class="intro_test" v-for="(lab, index) in info.input.criterion_matrix4" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix4[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix4[index].answer" :key="answer"
                           id="passport_data"
                           v-model="passport_data[4][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="passport_data[]"
                           v-on:input="changed(index)"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 9" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(passport_data[4], 'criterion_matrix4')" color="secondary" label="Continue" class="q-ml-sm"/>
          <q-btn flat @click="step = 7" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="9"
        title="Иерархический синтез"
        icon="assignment"
        :done="step>9"
      >
        <form @submit.prevent="someAction()">
          <div class="field">
            <label for="passport_data">
              Итоговая матрица
            </label>
            <div class="matrix">
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[0][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[0][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[0][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[0][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <br>
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[1][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[1][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[1][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[1][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <br>
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[2][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[2][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[2][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_syntech.matrix[2][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
            >
            </div>
          </div>
          <div class="field">
            <label for="passport_data">
              Вектор глобальных приоритетов
            </label>
            <input
                    id="vector"
                    type="text"
                    v-model="hierarchical_syntech.vector[0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="vector"
            >
            <input
                    id="vector"
                    type="text"
                    v-model="hierarchical_syntech.vector[1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="vector"
            >
            <input
                    id="vector"
                    type="text"
                    v-model="hierarchical_syntech.vector[2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="vector"
            >
            <input
                    id="vector"
                    type="text"
                    v-model="hierarchical_syntech.vector[3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="vector"
            >
          </div>
          <div class="field">
            <label for="passport_data">
              Выбранная альтернатива
            </label>
            <input
                    id="5"
                    type="alternative"
                    v-model="hierarchical_syntech.alternative"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="alternative"
            >
          </div>
        </form>

        <q-stepper-navigation>
          <q-btn @click="step = 10" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="labIntermediate(hierarchical_syntech)" color="secondary" label="Continue" class="q-ml-sm"/>
          <q-btn flat @click="step = 8" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
              :name="10"
              title="Дополнительный вопрос"
              caption="Optional"
              icon="assignment"
              :done="step > 10"
      >

      <div v-if="!add_test.isLoaded">
          <q-btn @click="getAddTest()" color="secondary" label="Начать тест"/>
        </div>
      <div v-else-if="!add_test.isOver">
        <q-item id="question">{{add_test.info.question}}<br></q-item>
        <div class="q-pa-md q-gutter-sm">
          <div id="answerid" v-for="(answer) in add_test.info.answers" :key="answer" class="answer">
            <q-radio v-model="add_test.shape" :val="answer" dense> {{answer}} </q-radio>
          </div>
          <q-btn @click="checkAddAnswer(index)" color="secondary" :disabled="!isTestFormValid(add_test.shape)" label="Проверить"/>
        </div>
      </div>

        <q-stepper-navigation>
          <q-btn @click="step = 11" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn color="secondary" :disabled="!this.add_test.isOver" label="Finish" @click="labpage()"/>
          <q-btn flat @click="step = 9" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    </div>
  </div>
</template>

<style>
  input{
    width: 50px;
  }
  .field {
    margin-bottom: 24px;
  }
  .field > label {
    margin-right: 8px;
  }
  .error {
    color: red;
  }
  .vector{
    display: flex;
    flex-direction: row;
  }
  #matrix_table{
    width: 450px;
  }
</style>

<script>
const axios = require('axios')
export default {
  data: () => {
    return {
      session_id: 0,
      step: 0,
      inner_step: 2,
      info: null,
      intro_test: {
        shape: '',
        info: null,
        isLoaded: false,
        isOver: false
      },
      practice_test: {
        shape: '',
        info: null,
        isLoaded: false,
        isOver: false
      },
      add_test: {
        shape: '',
        info: null,
        isLoaded: false,
        isOver: false
      },
      passport_data: [
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}]
      ],
      hierarchical_syntech: {
        matrix: [[], [], []],
        vector: [],
        alternative: null
      },
      columns: [
        {
          name: '1',
          field: row => row[0]
        },
        {
          name: '2',
          field: row => row[1]
        },
        {
          name: '3',
          field: row => row[2]
        },
        {
          name: '4',
          field: row => row[3]
        }
      ],
      mark: 0
    }
  },
  computed: {
    userId () {
      return this.$store.getters['data/getUser']().id
    },
    work () {
      return this.$store.getters['data/getStudentHierarchieswork'](this.userId, 'siblinghierarchies')
    },
    isFormValid () {
      return Object.keys(this.fields).every(field => this.fields[field].valid)
    }
  },
  methods: {
    getVar () {
      axios.post(
        'restapi/hierarchies/lab1a',
        {user_id: this.userId}
      ).then(response => {
        this.info = response.data.data
        this.session_id = response.data.session_id
        this.step++
        this.work.work.session = this.session_id
        this.$store.dispatch('data/updateHierarchieswork', {
          wid: this.work.wid,
          work: this.work.work
        })
      })
    },
    isTestFormValid (shape) {
      return shape !== ''
    },
    getIntroTest () {
      axios.post(
        '/restapi/hierarchies/intro_test',
        {session_id: this.session_id}
      ).then(response => {
        this.intro_test.info = response.data
        this.intro_test.isLoaded = true
      })
    },
    checkIntroAnswer () {
      var data = {
        question_id: this.intro_test.info._id,
        answer: this.intro_test.shape,
        session_id: this.session_id
      }
      axios.post(
        '/restapi/hierarchies/intro_test_validate',
        data
      ).then(response => {
        switch (response.data.status) {
          case 'done':
            this.intro_test.isOver = true
            break
          case 'right':
            this.intro_test.info = response.data.question
            break
          case 'wrong':
            this.intro_test.info = response.data.question
            alert('Ошибка!')
            break
          case 'over':
            this.$q.dialog({
              title: 'Вы допустили слишком много ошибок',
              message: 'Попробуйте еще раз позже',
              ok: 'Продолжить'
            }).then(() => {
              this.finishLab(0)
            })
            break
        }
      })
    },
    getPracticeTest () {
      axios.post(
        '/restapi/hierarchies/practice_test',
        {session_id: this.session_id}
      ).then(response => {
        this.practice_test.info = response.data
        this.practice_test.isLoaded = true
      })
    },
    checkPracticeAnswer () {
      var data = {
        question_id: this.practice_test.info._id,
        answer: this.practice_test.shape,
        session_id: this.session_id
      }
      axios.post(
        '/restapi/hierarchies/practice_test_validate',
        data
      ).then(response => {
        switch (response.data.status) {
          case 'done':
            this.practice_test.isOver = true
            break
          case 'right':
            this.practice_test.info = response.data.question
            break
          case 'wrong':
            this.practice_test.info = response.data.question
            alert('Ошибка!')
            break
          case 'over':
            this.$q.dialog({
              title: 'Вы допустили слишком много ошибок',
              message: 'Попробуйте еще раз позже',
              ok: 'Продолжить'
            }).then(() => {
              this.finishLab(0)
            })
            break
        }
      })
    },
    getAddTest () {
      axios.post(
        '/restapi/hierarchies/add_test',
        {session_id: this.session_id}
      ).then(response => {
        this.add_test.info = response.data
        this.add_test.isLoaded = true
      })
    },
    checkAddAnswer () {
      var data = {
        question_id: this.add_test.info._id,
        answer: this.add_test.shape,
        session_id: this.session_id
      }
      axios.post(
        '/restapi/hierarchies/add_test_validate',
        data
      ).then(response => {
        switch (response.data.status) {
          case 'done':
            this.add_test.isOver = true
            this.mark = response.data.mark
            break
          case 'right':
            this.add_test.info = response.data.question
            break
          case 'wrong':
            this.add_test.info = response.data.question
            alert('Ошибка!')
            break
          case 'over':
            this.$q.dialog({
              title: 'Вы допустили слишком много ошибок',
              message: 'Попробуйте еще раз позже',
              ok: 'Продолжить'
            }).then(() => {
              this.finishLab(0)
            })
            break
        }
      })
    },
    labIntermediate (value, step) {
      var data = {
        session_id: this.session_id,
        id: this.info._id,
        value: value,
        step: step
      }
      axios.post(
        '/restapi/hierarchies/lab_validate',
        data
      ).then(response => {
        switch (response.data.status) {
          case 'right':
            this.step++
            break
          case 'wrong':
            alert('Ошибка\n' + response.data.body)
            break
          case 'over':
            this.$q.dialog({
              title: 'Вы допустили слишком много ошибок',
              message: 'Попробуйте еще раз позже',
              ok: 'Продолжить'
            }).then(() => {
              this.finishLab(0)
            })
            break
        }
      })
    },
    labpage () {
      this.$q.dialog({
        title: 'Ваша оценка ' + this.mark,
        ok: 'Продолжить'
      }).then(() => {
        this.finishLab(this.mark)
      })
    },
    compare: function (arr1, arr2) {
      if (!arr1 || !arr2) {
        return false
      }
      if (arr1.length !== arr2.length) {
        return false
      }
      for (let i = 0, l = arr1.length; i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
          if (!arr1[i].compare(arr2[i])) {
            return false
          }
        } else if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    },
    finishLab (mark) {
      this.work.work.stage = 'resolve'
      this.work.work.score = mark
      this.$store.dispatch('data/updateHierarchieswork', {
        wid: this.work.wid,
        work: this.work.work
      })
      this.$router.push('/works')
    }
  }
}
</script>
