<template>
  <div class="q-pa-md">
    <h3>
      Постройте нечеткое отношение критерия C{{index + 1}}
    </h3>
    <FillTable
    :data = 'answerValue'
    :columns = 'columns'
    :title = '"Значения альтернатив"'
    />
    <InputTable
    :data = 'inputMatrix'
    :columns = 'inputColumns'
    :title = '"Значения альтернатив"'
    />
    <q-btn type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
  </div>
</template>

<script>
export default {
  props: ['alternative', 'answers', 'rightMatrix', 'index'],
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
    }
  },
  methods: {
    onAnswer: function () {
      console.log(this.inputMatrix)
      for (let i = 0; i < 3; i++) {
        if (Number(this.inputMatrix[i].a1) !== this.rightMatrix[i * 3 + 0]) {
          this.error = true
        }
        if (Number(this.inputMatrix[i].a2) !== this.rightMatrix[i * 3 + 1]) {
          this.error = true
        }
        if (Number(this.inputMatrix[i].a3) !== this.rightMatrix[i * 3 + 2]) {
          this.error = true
        }
      }
      if (!this.error) {
        this.$emit('success')
      } else {
        console.log('mistake')
      }
      this.error = false
    }
  }
}
</script>
