<template>
  <div class="q-pa-md">
    <h3>
      Постройте нечеткое отношение
    </h3>
    <div class="content">
      <FillTable v-for = "(item, index) in matrixData" v-bind:key='index'
      :data = 'item'
      :columns = 'columns'
      :title = '`Значения критерия С${index + 1}`'
      />
    </div>
    <div class="content">
      <FillTable v-if = 'weight'
      :data = 'weightValue'
      :columns = 'weightColumns'
      :title = '"Значения весов"'
      />
      <InputTable v-if='!done'
      :data = 'inputMatrix'
      :columns = 'columns'
      :title = '"Постройте нечеткое отношение"'
      />
      <FillTable v-else
      :data = 'rightMatrixTable'
      :columns = 'columns'
      :title = '"Значения нечеткого отношения"'
      />
    </div>
    <q-btn color="secondary" v-if='!done' type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
    <p v-if='error' style="font-size: 16px; color: red">Вы допустили ошибку</p>
  </div>
</template>

<script>
import { rightMatrixFill } from '../functions/workWithQuasarTable.js'
export default {
  props: ['alternative', 'answers', 'showMatrix', 'rightMatrix', 'weight', 'done'],
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
        { name: 'a1', label: 'a1', field: 'a1' },
        { name: 'a2', label: 'a2', field: 'a2' },
        { name: 'a3', label: 'a3', field: 'a3' }
      ],
      weightColumns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'value', label: 'Значения весов', field: 'value' }
      ],
      inputMatrix: [
        {
          name: `a1`,
          a1: '',
          a2: '',
          a3: ''
        },
        {
          name: `a2`,
          a1: '',
          a2: '',
          a3: ''
        },
        {
          name: 'a3',
          a1: '',
          a2: '',
          a3: ''
        }
      ]
    }
  },
  computed: {
    matrixData: function () {
      console.log(this.weight)
      const matrixArr = []
      for (let i = 0; i < this.showMatrix.length; i++) {
        const arr = []
        for (let j = 0; j < 3; j++) {
          arr.push({
            name: `a${j + 1}`,
            a1: this.showMatrix[i][j * 3 + 0],
            a2: this.showMatrix[i][j * 3 + 1],
            a3: this.showMatrix[i][j * 3 + 2]
          })
        }
        matrixArr.push(arr)
      }
      return matrixArr
    },
    weightValue: function () {
      const arr = []
      console.log(this.weight)
      if (this.weight) {
        for (let i = 0; i < this.weight.length; i++) {
          arr.push({
            name: `C${i + 1}`,
            value: this.weight[i]
          })
        }
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
        if (Math.abs(Number(this.inputMatrix[i].a1) - this.rightMatrix[i * 3 + 0]) > 0.05) {
          this.error = true
          this.$emit('error')
        }
        if (Math.abs(Number(this.inputMatrix[i].a2) - this.rightMatrix[i * 3 + 1]) > 0.05) {
          this.error = true
          this.$emit('error')
        }
        if (Math.abs(Number(this.inputMatrix[i].a3) - this.rightMatrix[i * 3 + 2]) > 0.05) {
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
