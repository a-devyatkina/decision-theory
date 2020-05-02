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
    :columns = 'answerColumns'
    :title = '"Значения подмножеств"'
    />
    <FillTable v-else
    :data = 'rightMatrixTable'
    :columns = 'answerColumns'
    :title = '"Значения подмножеств"'
    />
    <q-btn color="secondary" v-if='!done' type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
    <p v-if='error' style="font-size: 16px; color: red">Вы допустили ошибку</p>
  </div>
</template>

<script>
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
      answerColumns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'a1', label: 'U_1', field: 'a1' },
        { name: 'a2', label: 'U_2', field: 'a2' },
        { name: 'a3', label: 'U_3', field: 'a3' }
      ],
      inputMatrix: [
        {
          name: ``,
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
    rightMatrixTable () {
      const arr = []
      for (let j = 0; j < 1; j++) {
        arr.push({
          name: ``,
          a1: this.rightMatrix[2],
          a2: this.rightMatrix[5],
          a3: this.rightMatrix[8]
        })
      }
      return (arr)
    }
  },
  methods: {
    onAnswer: function () {
      this.error = false
      for (let i = 0; i < 1; i++) {
        if (Number(this.inputMatrix[i].a1) !== this.rightMatrix[2]) {
          this.error = true
          this.$emit('error')
        }
        if (Number(this.inputMatrix[i].a2) !== this.rightMatrix[5]) {
          this.error = true
          this.$emit('error')
        }
        if (Number(this.inputMatrix[i].a3) !== this.rightMatrix[8]) {
          this.error = true
          this.$emit('error')
        }
      }
      if (!this.error) {
        this.$emit('success')
      }
    }
  }
}
</script>
