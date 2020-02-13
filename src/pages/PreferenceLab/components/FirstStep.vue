<template>
  <div>
    <h3>
      Восстановите функцию и получите значения альтернатив
    </h3>
    <h5>
      {{data.description}}
    </h5>
    <div class="content">
      <img :src="data.path" width="400px" height="auto"/>
      <FillTable
      :data = 'funcValue'
      :columns = 'columns'
      :title = '"Значения альтернатив"'
      />
      <div v-if = 'data.koef && part === 2'>
        <FillTable
        :data = 'koefValue'
        :columns = 'columns'
        :title = '"Значения коэффицентов"'
        />
      </div>
    </div>
    <div class="content">
      <img v-bind:src="data.function"/>
    </div>
    <div v-if = 'data.koef && part === 1'>
      <div v-for="(item, index) in koefArr" v-bind:key='index'>
        {{String.fromCodePoint(65 + index)}} = <input v-model="koefArr[index]" placeholder="0.00"/>
      </div>
      <q-btn type="submit" class="knopka" name="check" @click = 'onAnswer(koefArr, data.koef)'>Проверить</q-btn>
    </div>
    <div v-else-if = 'part === 2 && !done'>
      <div v-for="(item, index) in alternative" v-bind:key='index'>
        {{item.description}} <input v-model="funcAnswer[index]" placeholder="0.00"/>
      </div>
      <q-btn type="submit" class="knopka" name="check" @click = 'onAnswer(funcAnswer, answers)'>Проверить</q-btn>
    </div>
    <div v-else>
      <FillTable
      :data = 'answerValue'
      :columns = 'columns'
      :title = '"Значения альтернатив"'
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['data', 'alternative', 'index', 'answers', 'done'],
  data () {
    return {
      error: false,
      next: false,
      funcAnswer: ['', '', ''],
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'Значение', label: 'Значение', field: 'value' }
      ]
    }
  },
  computed: {
    part: function () {
      if (this.data.koef && !this.next && !this.done) {
        return 1
      } else {
        return 2
      }
    },
    funcValue: function () {
      const arr = []
      for (let i = 0; i < this.alternative.length; i++) {
        const obj = {
          name: this.alternative[i].description
        }
        if ((this.alternative[i][this.index + 1].length)) {
          obj.value = this.alternative[i][this.index + 1][0]
        } else {
          obj.value = this.alternative[i][this.index + 1]
        }
        arr.push(obj)
      }
      return arr
    },
    koefArr: function () {
      const arr = []
      for (let i = 0; i < this.data.count; i++) {
        arr.push('')
      }
      return arr
    },
    koefValue: function () {
      const arr = []
      for (let i = 0; i < this.data.count; i++) {
        arr.push({
          name: String.fromCodePoint(65 + i),
          value: this.data.koef[i]
        })
      }
      return arr
    },
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
    onAnswer: function (answer, rightAnswer) {
      console.log(this.answers)
      for (let i = 0; i < answer.length; i++) {
        if (Number(answer[i]) !== rightAnswer[i]) {
          this.error = true
        }
      }
      if (this.error) {
        console.log(this.error)
      } else {
        if (this.part === 2) {
          this.$emit('success')
        } else {
          this.next = true
        }
      }
      this.error = false
    }
  }
}
</script>
<style>
  .content {
    display: flex;
    justify-content: center;
  }
  .img {
    height: auto;
  }
  input {
    margin: 5px;
  }
</style>
