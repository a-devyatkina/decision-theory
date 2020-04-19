<template>
  <div class="q-pa-md">
    <div v-if="this.step < 1">
      <q-btn @click="getVar()" color="secondary" label="Начать"/>
    </div>
    <div v-else>
    <h3>
      Вариант {{info.var}}
    </h3>
    <q-btn @click="showInstruction()" color="secondary" label="Инструкция"/>
    <q-modal v-model="instruction" minimized ref="modalRef">
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md">Инструкция</div>
        <p>
          1. При заполнении данных в качестве разделителя используются "."<br>
          2. Процент вводить в виде дроби. Например 8%=0,08<br>
          3. Если в матрице производится корректировка, необходимо вводить значения,полученные после корректировки<br>
          4. Если что-то пошло не так и вы прервали процесс выполнения работы, продолжить можно будет с того шага, на котором вы остановились<br>
          5. Просмотреть данные на пройденных шагах можно нажав на название
        </p>
        <q-btn color="secondary" v-close-overlay label="Close" />
      </div>
    </q-modal>
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
          <matrix-view :matrix="matrix"/>
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
          <h4>Этап пройден</h4>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="secondary" label="Skip" class="skip_btn"/>
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
          <h4>Этап пройден</h4>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="secondary" label="Skip" class="skip_btn"/>
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
        <div class="lab">
          <div class="matrix" v-for="(lab, index) in info.input.target_matrix" :key="lab.id">
            <div>
              <q-item id="question">
                {{lab.field}}
                {{info.input.target_matrix[index].name}}
              </q-item>
              <div class="q-pa-md q-gutter-sm">
                <div class="vector">
                  <input v-for="(answer, aId) in info.input.target_matrix[index].answer" :key="answer"
                         id="matrices"
                         v-model="matrices[0][index][aId]"
                         data-vv-as="вектор приоритетов"
                         name="matrices[]"
                         :disabled="target_matrix_done"
                  >
                </div>
              </div>
            </div>
          </div>
          <q-btn @click="labIntermediate(matrices[0], 'target_matrix')" color="secondary" :disabled="target_matrix_done" label="Проверить"/>
        </div>
        <q-stepper-navigation>
          <q-btn @click="step = 5" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn @click="step = 5" color="secondary" label="Continue" :disabled="!target_matrix_done" class="q-ml-sm"/>
          <q-btn flat @click="step = 3" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="5"
        title="Матрица по 1 критерию"
        icon="assignment"
        :done="step>5"
      >
          <div class="lab">
            <div class="matrix" v-for="(lab, index) in info.input.criterion_matrix1" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix1[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix1[index].answer" :key="answer"
                           id="matrices"
                           v-model="matrices[1][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="matrices[]"
                           :disabled="criterion_matrix1_done"
                    >
                  </div>
                </div>
              </div>
            </div>
            <q-btn @click="labIntermediate(matrices[1], 'criterion_matrix1')" color="secondary" :disabled="criterion_matrix1_done" label="Проверить"/>
          </div>
        <q-stepper-navigation>
          <q-btn @click="step = 6" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn @click="step = 6" color="secondary" label="Continue" :disabled="!criterion_matrix1_done" class="q-ml-sm"/>
          <q-btn flat @click="step = 4" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="6"
        title="Матрица по 2 критерию"
        icon="assignment"
        :done="step>6"
      >
          <div class="lab">
            <div class="matrix" v-for="(lab, index) in info.input.criterion_matrix2" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix2[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix2[index].answer" :key="answer"
                           id="matrices"
                           v-model="matrices[2][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="matrices[]"
                           :disabled="criterion_matrix2_done"
                    >
                  </div>
                </div>
              </div>
            </div>
            <q-btn @click="labIntermediate(matrices[2], 'criterion_matrix2')" color="secondary" :disabled="criterion_matrix2_done" label="Проверить"/>
          </div>
        <q-stepper-navigation>
          <q-btn @click="step = 7" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn @click="step = 7" color="secondary" label="Continue" :disabled="!criterion_matrix2_done" class="q-ml-sm"/>
          <q-btn flat @click="step = 5" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="7"
        title="Матрица по 3 критерию"
        icon="assignment"
        :done="step>7"
      >
          <div class="lab">
            <div class="matrix" v-for="(lab, index) in info.input.criterion_matrix3" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix3[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix3[index].answer" :key="answer"
                           id="matrices"
                           v-model="matrices[3][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="matrices[]"
                           :disabled="criterion_matrix3_done"
                    >
                  </div>
                </div>
              </div>
            </div>
            <q-btn @click="labIntermediate(matrices[3], 'criterion_matrix3')" color="secondary" :disabled="criterion_matrix3_done" label="Проверить"/>
          </div>
        <q-stepper-navigation>
          <q-btn @click="step = 8" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn @click="step = 8" color="secondary" label="Continue" :disabled="!criterion_matrix3_done" class="q-ml-sm"/>
          <q-btn flat @click="step = 5" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="8"
        title="Матрица по 4 критерию"
        icon="assignment"
        :done="step>8"
      >
          <div class="lab">
            <div class="matrix" v-for="(lab, index) in info.input.criterion_matrix4" :key="lab.id">
              <div>
                <q-item id="question">
                  {{lab.field}}
                  {{info.input.criterion_matrix4[index].name}}
                </q-item>
                <div class="q-pa-md q-gutter-sm">
                  <div class="vector">
                    <input v-for="(answer, aId) in info.input.criterion_matrix4[index].answer" :key="answer"
                           id="matrices"
                           v-model="matrices[4][index][aId]"
                           data-vv-as="вектор приоритетов"
                           name="matrices[]"
                           :disabled="criterion_matrix4_done"
                    >
                  </div>
                </div>
              </div>
            </div>
            <q-btn @click="labIntermediate(matrices[4], 'criterion_matrix4')" color="secondary" :disabled="criterion_matrix4_done" label="Проверить"/>
          </div>
        <q-stepper-navigation>
          <q-btn @click="step = 9" color="secondary" label="Skip" class="q-ml-sm"/>
          <q-btn @click="step = 9" color="secondary" label="Continue" :disabled="!criterion_matrix4_done" class="q-ml-sm"/>
          <q-btn flat @click="step = 7" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="9"
        title="Иерархический синтез"
        icon="assignment"
        :done="step>9"
      >
          <div class="field">
            <label for="matrices">
              Итоговая матрица
            </label>
            <div class="matrix">
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[0][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[0][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[0][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[0][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <br>
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[1][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[1][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[1][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[1][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <br>
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[2][0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[2][1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[2][2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="matrix"
                    type="text"
                    v-model="hierarchical_synthesis.matrix[2][3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="matrix"
                    :disabled="hierarchical_synthesis_done"
            >
            </div>
          </div>
          <div class="field">
            <label for="matrices">
              Вектор приоритетов критериев
            </label>
            <input
                    id="criterion_priority"
                    type="text"
                    v-model="hierarchical_synthesis.criterion_priority[0]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="criterion_priority"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="criterion_priority"
                    type="text"
                    v-model="hierarchical_synthesis.criterion_priority[1]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="criterion_priority"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="criterion_priority"
                    type="text"
                    v-model="hierarchical_synthesis.criterion_priority[2]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="criterion_priority"
                    :disabled="hierarchical_synthesis_done"
            >
            <input
                    id="criterion_priority"
                    type="text"
                    v-model="hierarchical_synthesis.criterion_priority[3]"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="criterion_priority"
                    :disabled="hierarchical_synthesis_done"
            >
          </div>
        <div class="field">
          <label for="matrices">
            Вектор глобальных приоритетов
          </label>
          <input
                  id="global_priority"
                  type="text"
                  v-model="hierarchical_synthesis.global_priority[0]"
                  v-validate.continues="{ required: true, max: 10 }"
                  data-vv-as="вектор приоритетов"
                  name="global_priority"
                  :disabled="hierarchical_synthesis_done"
          >
          <input
                  id="global_priority"
                  type="text"
                  v-model="hierarchical_synthesis.global_priority[1]"
                  v-validate.continues="{ required: true, max: 10 }"
                  data-vv-as="вектор приоритетов"
                  name="global_priority"
                  :disabled="hierarchical_synthesis_done"
          >
          <input
                  id="global_priority"
                  type="text"
                  v-model="hierarchical_synthesis.global_priority[2]"
                  v-validate.continues="{ required: true, max: 10 }"
                  data-vv-as="вектор приоритетов"
                  name="global_priority"
                  :disabled="hierarchical_synthesis_done"
          >
        </div>
          <div class="field">
            <label for="matrices">
              Выбранная альтернатива
            </label>
            <input
                    id="5"
                    type="alternative"
                    v-model="hierarchical_synthesis.alternative"
                    v-validate.continues="{ required: true, max: 10 }"
                    data-vv-as="вектор приоритетов"
                    name="alternative"
                    :disabled="hierarchical_synthesis_done"
            >
          </div>
          <q-btn @click="labIntermediate(hierarchical_synthesis)" color="secondary" :disabled="hierarchical_synthesis_done" label="Проверить"/>
        <q-stepper-navigation>
          <q-btn @click="step = 10" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn @click="step = 10" color="secondary" label="Continue" :disabled="!hierarchical_synthesis_done" class="q-ml-sm"/>
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
        <div v-else>
          <h4>Этап пройден</h4>
        </div>
        <q-stepper-navigation>
          <q-btn @click="step = 11" color="secondary" label="Skip" class="skip_btn"/>
          <q-btn color="secondary" :disabled="!this.add_test.isOver" label="Finish" @click="finishLab()"/>
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
  /*.skip_btn {*/
    /*display: none;*/
  /*}*/
  #matrix_table {
    width: 450px;
  }
</style>

<script>
const axios = require('axios')
export default {
  data: () => {
    return {
      instruction: false,
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
      matrices: [
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []],
        [[], [], [], [], [], [], []]
      ],
      target_matrix_done: false,
      criterion_matrix1_done: false,
      criterion_matrix2_done: false,
      criterion_matrix3_done: false,
      criterion_matrix4_done: false,
      hierarchical_synthesis_done: false,
      hierarchical_synthesis: {
        matrix: [[], [], []],
        criterion_priority: [],
        global_priority: [],
        alternative: null,
        done: false
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
    user () {
      return this.$store.getters['data/getUser']()
    },
    work () {
      return this.$store.getters['data/getStudentHierarchieswork'](this.user.id, 'siblinghierarchies')
    },
    maxscore () {
      return this.$store.getters['data/getCourse'](this.work.work.course).groups[this.user.group].hierarchieslab.siblinghierarchies.maxScore
    },
    isFormValid () {
      return Object.keys(this.fields).every(field => this.fields[field].valid)
    }
  },
  methods: {
    showInstruction () {
      this.instruction = true
    },
    getVar: function () {
      if (this.work.work.stage === 'opened') {
        axios.post(
          'restapi/hierarchies/get_session',
          {user_id: this.user.id}
        ).then(response => {
          this.info = response.data.data
          this.intro_test.isLoaded = response.data.intro_started
          this.intro_test.isOver = response.data.intro_done
          this.practice_test.isLoaded = response.data.practice_started
          this.practice_test.isOver = response.data.practice_done
          this.add_test.isLoaded = response.data.add_test_started
          this.add_test.isOver = response.data.add_test_done
          this.target_matrix_done = response.data.target_matrix_done
          this.mark = response.data.mark
          if (response.data.target_matrix) {
            this.matrices[0] = response.data.target_matrix
          }
          this.criterion_matrix1_done = response.data.criterion_matrix1_done
          if (response.data.criterion_matrix1) {
            this.matrices[1] = response.data.criterion_matrix1
          }
          this.criterion_matrix2_done = response.data.criterion_matrix2_done
          if (response.data.criterion_matrix2) {
            this.matrices[2] = response.data.criterion_matrix2
          }
          this.criterion_matrix3_done = response.data.criterion_matrix3_done
          if (response.data.criterion_matrix3) {
            this.matrices[3] = response.data.criterion_matrix3
          }
          this.criterion_matrix4_done = response.data.criterion_matrix4_done
          if (response.data.criterion_matrix4) {
            this.matrices[4] = response.data.criterion_matrix4
          }
          this.hierarchical_synthesis = response.data.hierarchical_synthesis
          if (this.intro_test.isLoaded && !this.intro_test.isOver) {
            this.intro_test.info = response.data.question
          } else if (this.practice_test.isLoaded && !this.practice_test.isOver) {
            this.practice_test.info = response.data.question
          } else if (this.add_test.isLoaded && !this.add_test.isOver) {
            this.add_test.info = response.data.question
          }
          this.session_id = response.data.session_id
          this.step++
        })
      } else {
        axios.post(
          'restapi/hierarchies/siblinghierarchies',
          {user_id: this.user.id}
        ).then(response => {
          this.info = response.data.data
          this.work.work.stage = 'opened'
          this.work.work.session = this.session_id
          this.$store.dispatch('data/updateHierarchieswork', {
            wid: this.work.wid,
            work: this.work.work
          })
          this.session_id = response.data.session_id
          this.step++
        })
      }
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
      let data = {
        question_id: this.intro_test.info._id,
        answer: this.intro_test.shape,
        session_id: this.session_id
      }
      axios.post(
        '/restapi/hierarchies/validate_intro_test',
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
            this.$q.dialog({
              title: 'Ошибка!',
              ok: 'Продолжить'
            })
            break
          case 'over':
            this.finishLab()
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
      let data = {
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
            this.$q.dialog({
              title: 'Ошибка!',
              ok: 'Продолжить'
            })
            break
          case 'over':
            this.finishLab()
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
      let data = {
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
          case 'wrong':
            this.add_test.info = response.data.question
            this.$q.dialog({
              title: 'Ошибка!',
              ok: 'Продолжить'
            })
            break
          case 'over':
            this.$q.dialog({
              title: 'Ошибка!',
              ok: 'Продолжить'
            })
            this.add_test.isOver = true
            this.mark = response.data.mark
            break
        }
      })
    },
    labIntermediate (value, step) {
      let data = {
        session_id: this.session_id,
        id: this.info._id,
        value: value,
        step: step
      }
      if (!step) {
        for (let i = 0; i < 3; i++) {
          let row = value.matrix[i]
          for (let j = 0; j < 4; j++) {
            if (row[j].indexOf(',') > -1) {
              this.$q.dialog({
                title: 'Ошибка!',
                message: 'Используйте точки вместо запятых в десятичных дробях. Балл за эту ошибку не снизится',
                ok: 'Продолжить'
              })
              return
            }
          }
        }
        for (let i = 0; i < value.alternative.length; i++) {
          if (value.alternative[i].indexOf(',') > -1) {
            this.$q.dialog({
              title: 'Ошибка!',
              message: 'Используйте точки вместо запятых в десятичных дробях. Балл за эту ошибку не снизится',
              ok: 'Продолжить'
            })
            return
          }
        }
      } else {
        for (let i = 0; i < 4; i++) {
          for (let j in value[i]) {
            if (value[i][j].indexOf(',') > -1) {
              this.$q.dialog({
                title: 'Ошибка!',
                message: 'Используйте точки вместо запятых в десятичных дробях. Балл за эту ошибку не снизится',
                ok: 'Продолжить'
              })
              return
            }
          }
        }
        for (let i = 4; i < 7; i++) {
          if (value[i][0].indexOf(',') > -1) {
            this.$q.dialog({
              title: 'Ошибка!',
              message: 'Используйте точки вместо запятых в десятичных дробях. Балл за эту ошибку не снизится',
              ok: 'Продолжить'
            })
            return
          }
        }
      }
      axios.post(
        '/restapi/hierarchies/lab_validate',
        data
      ).then(response => {
        switch (response.data.status) {
          case 'right':
            switch (step) {
              case 'target_matrix':
                this.target_matrix_done = true
                break
              case 'criterion_matrix1':
                this.criterion_matrix1_done = true
                break
              case 'criterion_matrix2':
                this.criterion_matrix2_done = true
                break
              case 'criterion_matrix3':
                this.criterion_matrix3_done = true
                break
              case 'criterion_matrix4':
                this.criterion_matrix4_done = true
                break
              default:
                this.hierarchical_synthesis_done = true
                break
            }
            this.step++
            break
          case 'wrong':
            this.$q.dialog({
              title: 'Ошибка!',
              message: response.data.body,
              ok: 'Продолжить'
            })
            break
          case 'over':
            this.$q.dialog({
              title: 'Вы допустили слишком много ошибок',
              message: 'Попробуйте еще раз позже',
              ok: 'Продолжить'
            }).then(() => {
              this.finishLab()
            })
            break
        }
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
    async finishLab () {
      let dialog
      let mark = (((this.mark - this.work.work.tries * 10) * this.maxscore) / 100) - this.work.work.penalty
      if (mark < 0) mark = 0
      if (mark) {
        dialog = {
          title: 'Вы успешно выполнили задание',
          message: 'Ваша оценка: ' + mark + '. ',
          ok: 'Продолжить'
        }
      } else {
        dialog = {
          title: 'Вы допустили слишком много ошибок',
          message: '',
          ok: 'Продолжить'
        }
      }
      if (this.work.work.tries < 3) {
        dialog.message += 'Вы можете попробовать повысить свою оценку, при этом максимальный былл будет снижен на 10%'
        dialog.cancel = 'Попробовать снова'
      }
      dialog.preventClose = true
      await this.$q.dialog(
        dialog
      ).then(() => {
        this.work.work.stage = 'resolve'
        this.work.work.score = this.mark
      }).catch(() => {
        this.work.work.stage = 'improve'
        this.work.work.score = 0
      })
      this.work.work.tries += 1
      this.$store.dispatch('data/updateHierarchieswork', {
        wid: this.work.wid,
        work: this.work.work
      })
      this.$router.push('/works')
    }
  }
}
</script>
