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
    <InputTable
    :data = 'inputMatrix'
    :columns = 'columns'
    :title = '"Значения альтернатив"'
    />
    <q-btn type="submit" class="knopka" name="check" @click = 'onAnswer()'>Проверить</q-btn>
  </div>
</template>

<script>
export default {
  props: ['showMatrix1', 'showMatrix2', 'rightMatrix'],
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
      weigthColumns: [
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
          a1: 0,
          a2: 0,
          a3: 0
        }
      ]
    }
  },
  computed: {
    matrixData1: function () {
      const matrixArr = []
      console.log(this.showMatrix1)
      matrixArr.push({
        name: `a1`,
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
        name: `a1`,
        a1: this.showMatrix2[0],
        a2: this.showMatrix2[1],
        a3: this.showMatrix2[2]
      })
      return matrixArr
    }
  },
  methods: {
    onAnswer: function () {
      console.log(this.inputMatrix)
      for (let i = 0; i < 3; i++) {
        if (Number(this.inputMatrix[0][`a${i + 1}`]) !== this.rightMatrix[i]) {
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
