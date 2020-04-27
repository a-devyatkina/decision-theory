<template>
  <div class="q-pa-md">
    <h3>
      Найдите подмножество недоминируемых альтернатив
    </h3>
    <FillTable
    :data = 'answerValue'
    :columns = 'columns'
    :title = '"Значения альтернатив"'
    />
    <InputTable v-if="!done"
    :data = 'inputMatrix'
    :columns = 'columns'
    :title = '"Значения альтернатив"'
    />
    <FillTable v-else
    :data = 'rightMatrixTable'
    :columns = 'columns'
    :title = '"Значения альтернатив"'
    />
    <q-btn color="secondary" v-if='!done' type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
    <p v-if='error' style="font-size: 16px; color: red">Вы допустили ошибку</p>
  </div>
</template>

<script>
import { rightMatrixFill } from '../functions/workWithQuasarTable.js'
export default {
  props: ['alternative', 'answers', 'rightMatrix', 'showMatrix', 'done'],
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
    answerValue: function () {
      const arr = []
      for (let i = 0; i < 3; i++) {
        arr.push({
          name: `a${i + 1}`,
          a1: this.showMatrix[i * 3 + 0],
          a2: this.showMatrix[i * 3 + 1],
          a3: this.showMatrix[i * 3 + 2]
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
