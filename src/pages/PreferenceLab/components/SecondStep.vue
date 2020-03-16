<template>
  <div class="q-pa-md">
    <h3>
      Постройте нечеткое отношение критерия C{{index + 1}}
    </h3>
    <FillTable
    :data = 'answerValue'
    :columns = 'columns'
    :title = '`Значения альтернативы C${index + 1}`'
    />
    <InputTable v-if = '!done'
    :data = 'inputMatrix'
    :columns = 'inputColumns'
    :title = '"Постройте нечеткое отношение"'
    />
    <FillTable v-else
    :data = 'rightMatrixTable'
    :columns = 'inputColumns'
    :title = '"Значения нечеткого отношения"'
    />
    <q-btn color="secondary" v-if='!done' type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
    <p v-if='error' style="font-size: 16px; color: red">Вы допустили ошибку</p>
  </div>
</template>

<script>
import { rightMatrixFill } from '../functions/workWithQuasarTable.js'
export default {
  props: ['alternative', 'answers', 'rightMatrix', 'index', 'done'],
  data () {
    return {
      error: false,
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'Значение', label: 'Значение', field: 'value' }
      ],
      inputColumns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'a1', label: 'a1', field: 'a1' },
        { name: 'a2', label: 'a2', field: 'a2' },
        { name: 'a3', label: 'a3', field: 'a3' }
      ],
      inputMatrix: [
        {
          name: `a1`,
          a1: 0,
          a2: 0,
          a3: 0
        },
        {
          name: `a2`,
          a1: 0,
          a2: 0,
          a3: 0
        },
        {
          name: 'a3',
          a1: 0,
          a2: 0,
          a3: 0
        }
      ]
    }
  },
  computed: {
    answerValue: function () {
      const arr = []
      for (let i = 0; i < this.answers.length; i++) {
        arr.push({
          name: this.alternative[i].description,
          value: this.answers[i]
        })
      }
      return arr
    },
    rightMatrixTable: rightMatrixFill
  },
  methods: {
    onAnswer: function () {
      console.log(this.rightMatrix)
      this.error = false
      for (let i = 0; i < 3; i++) {
        if (Number(this.inputMatrix[i].a1) !== this.rightMatrix[i * 3 + 0]) {
          this.error = true
          this.$emit('error')
        }
        if (Number(this.inputMatrix[i].a2) !== this.rightMatrix[i * 3 + 1]) {
          this.error = true
          this.$emit('error')
        }
        if (Number(this.inputMatrix[i].a3) !== this.rightMatrix[i * 3 + 2]) {
          this.error = true
          this.$emit('error')
        }
      }
      if (!this.error) {
        this.$emit('success')
      } else {
        console.log('mistake')
      }
    }
  }
}
</script>
