<template>
  <div class="q-pa-md">
    <h3>
      Вариант 1
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
          {{ matrix.name }}
          <div v-for="(row) in matrix.value" :key="row.id">
            <span v-for="(element) in row" :key="element.id">
              {{ element }}
            </span>
          </div>
          <br>
        </div>
        <div class=matrix v-for="(matrix) in info.data" :key="matrix.id">
          <div class="q-pa-md">
            <q-table
                    :title="matrix.name"
                    :data="matrix.value"
                    :columns="columns"
                    color="primary"
                    row-key="id"
            >
            </q-table>
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
        <q-item id="question">{{intro_test.info.question}}<br></q-item>
        <div class="q-pa-md q-gutter-sm">
          <div v-for="(answer) in intro_test.info.answers" :key="answer" class="answer">
            <q-radio v-model="intro_test.shape" :val="answer" dense> {{answer}} </q-radio>
          </div>
          <q-btn @click="someAction()" color="secondary" :disabled="true" label="Проверить"/>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="secondary" label="Continue" class="q-ml-sm"/>
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
        <q-item id="question">{{practice_test.info.question}}<br></q-item>
        <div class="q-pa-md q-gutter-sm">
          <div id="answerid" v-for="(answer) in practice_test.info.answers" :key="answer" class="answer">
            <q-radio v-model="practice_test.shape" :val="answer" dense> {{answer}} </q-radio>
          </div>
          <q-btn @click=someAction() color="secondary" :disabled="true" label="Проверить"/>
        </div>

        <q-stepper-navigation>
          <q-btn @click="step = 4" color="secondary" label="Continue" class="q-ml-sm"/>
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
          <q-btn @click="step = 5" color="secondary" label="Continue" class="q-ml-sm" />
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
          <q-btn @click="step = 6" color="secondary" label="Continue" class="q-ml-sm"/>
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
            <q-btn @click="step = 7" color="secondary" label="Continue" class="q-ml-sm"/>
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
          <q-btn @click="step = 8" color="secondary" label="Continue" class="q-ml-sm" />
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
          <q-btn @click="step = 9" color="secondary" label="Continue" class="q-ml-sm" />
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
          <q-btn @click="step = 10" color="secondary" label="Continue" class="q-ml-sm" />
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
        <q-item id="question">{{add_test.info.question}}<br></q-item>
        <div class="q-pa-md q-gutter-sm">
          <div id="answerid" v-for="(answer) in add_test.info.answers" :key="answer" class="answer">
            <q-radio v-model="add_test.shape" :val="answer" dense> {{answer}} </q-radio>
          </div>
          <q-btn @click="someAction()" color="secondary" :disabled="true" label="Проверить"/>
        </div>

        <q-stepper-navigation>
          <q-btn color="secondary" label="Finish" @click="labpage()"/>
          <q-btn flat @click="step = 9" color="secondary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
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
</style>

<script>
import { varPreview, introTestPreview, practiceTestPreview, addTestPreview } from '../store/data/hierarchy/test_var.js'
export default {
  data: () => {
    return {
      info: varPreview,
      session_id: 0,
      step: 1,
      inner_step: 2,
      intro_test: {
        shape: '',
        info: introTestPreview
      },
      practice_test: {
        shape: '',
        info: practiceTestPreview
      },
      add_test: {
        shape: '',
        info: addTestPreview
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
  methods: {
    labpage () {
      this.$q.dialog({
        message: 'Вернуться обратно?',
        ok: 'Да',
        cancel: 'Нет'
      }).then(() => {
        this.$router.push('/labs')
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
    }
  }
}
</script>
