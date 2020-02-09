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
    <FillTable v-if = 'weigth'
    :data = 'weigthValue'
    :columns = 'weigthColumns'
    :title = '"Значения весов"'
    />
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
  props: ['alternative', 'answers', 'showMatrix', 'rightMatrix', 'weigth'],
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
    matrixData: function () {
      const matrixArr = []
      console.log(this.weight)
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
    weigthValue: function () {
      const arr = []
      console.log(this.weigth)
      if (this.weigth) {
        for (let i = 0; i < this.weigth.length; i++) {
          arr.push({
            name: `C${i + 1}`,
            value: this.weigth[i]
          })
        }
      }
      return arr
    }
  },
  methods: {
    onAnswer: function () {
      console.log(this.rightMatrix)
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
