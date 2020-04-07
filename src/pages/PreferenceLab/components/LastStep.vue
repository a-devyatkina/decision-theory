<template>
  <div class="q-pa-md">
    <h3>
      Найдите наилучшую альтернативу
    </h3>
    <div class="content">
      <FillTable
      :data = 'matrixData1'
      :columns = 'columns'
      :title = '`Значения критерия`'
      />
      <FillTable
      :data = 'matrixData2'
      :columns = 'columns'
      :title = '`Значения критерия`'
      />
    </div>
    <div class="content" v-if='!done'>
      <InputTable
      :data = 'inputMatrix'
      :columns = 'columns'
      :title = '"Значения альтернатив"'
      />
      <InputTable
      :data = 'answer'
      :columns = 'columnsAnswer'
      :title='"Ответ"'
      />
    </div>
    <div class="content" v-else>
      <FillTable
      :data = 'rightMatrixTable'
      :columns = 'columns'
      :title = '"Значения альтернатив"'
      />
      <FillTable
      :data = 'answerTable'
      :columns = 'columnsAnswer'
      :title = '"Ответ"'
      />
    </div>
    <q-btn color="secondary" v-if='!done' type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
    <p v-if='error' style="font-size: 16px; color: red">Вы допустили ошибку</p>
  </div>
</template>

<script>
import { rightMatrixFill } from '../functions/workWithQuasarTable.js'
export default {
  props: ['showMatrix1', 'showMatrix2', 'rightMatrix', 'done'],
  data () {
    return {
      error: false,
      columnsAnswer: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'a1', label: '', field: 'a1' }
      ],
      answerTabel: [
        {
          name: '',
          a1: this.rightAnswer
        }
      ],
      inputMatrix: [
        {
          name: `Альтернативы`,
          a1: '',
          a2: '',
          a3: ''
        }
      ],
      answer: [
        {
          name: '',
          a1: 0
        }
      ],
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'a1', label: 'a1', field: 'a1' },
        { name: 'a2', label: 'a2', field: 'a2' },
        { name: 'a3', label: 'a3', field: 'a3' }
      ]
    }
  },
  computed: {
    matrixData1: function () {
      const matrixArr = []
      console.log(this.showMatrix1)
      matrixArr.push({
        name: ``,
        a1: this.showMatrix1[0],
        a2: this.showMatrix1[1],
        a3: this.showMatrix1[2]
      })
      console.log(matrixArr)
      return matrixArr
    },
    matrixData2: function () {
      const matrixArr = []
      matrixArr.push({
        name: ``,
        a1: this.showMatrix2[0],
        a2: this.showMatrix2[1],
        a3: this.showMatrix2[2]
      })
      return matrixArr
    },
    rightAnswer: function () {
      return this.rightMatrix.indexOf(Math.max(...this.rightMatrix)) + 1
    },
    rightMatrixTable: rightMatrixFill
  },
  methods: {
    onAnswer: function () {
      console.log(this.rightAnswer)
      this.error = false
      console.log(this.inputMatrix)
      for (let i = 0; i < 3; i++) {
        if (Number(this.inputMatrix[0][`a${i + 1}`]) !== this.rightMatrix[i]) {
          this.error = true
          this.$emit('error')
        }
      }
      console.log(Number(this.answer[0]['a1']))
      console.log(this.rightAnswer)
      console.log(Number(this.answer[0]['a1']) === (this.rightAnswer))
      if (Number(this.answer[0]['a1']) !== this.rightAnswer) {
        this.error = true
        this.$emit('error')
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
