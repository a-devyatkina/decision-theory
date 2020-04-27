<template>
  <div class = "goal">
    {{ condition.criterion[number].description }}
    <br>
    <img :src="condition.criterion[number].path" alt="график" align="middle" width="700"/>
    <p>Вид функции:</p>
    <img :src="condition.criterion[number].function">
    <table border=1px align="right">
      <tr><td colspan="2" style="text-align: center">{{ condition.criterion[number].tytle }}</td> </tr>
      <tr>
        <td>{{ condition.alternative[0].description }}</td><td>{{ condition.alternative[0][number+1][0] }}</td>
      </tr>
      <tr>
        <td>{{ condition.alternative[1].description }}</td><td>{{ condition.alternative[1][number+1][0] }}</td>
      </tr>
      <tr>
        <td>{{ condition.alternative[2].description }}</td><td>{{ condition.alternative[2][number+1][0] }}</td>
      </tr>
    </table>
    <p>Необходимо вычислить значения критерия для каждой альтернативы:</p>
    <div v-if="quantitative">
      <p>А1 = <input v-model="s1" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
      <p>А2 = <input v-model="s2" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
      <p>А3 = <input v-model="s3" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
      <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
      <p v-if="err" style="color: red">Неверно</p>
      <button class="bu" @click="$emit('back')">
        Назад
      </button>
      <button class="bu" @click="check(s1, s2, s3)">
        Проверить
      </button><br>
    </div>
    <div v-if="!quantitative">
      <p>А1 = {{q1}}</p>
      <p>А2 = {{q2}}</p>
      <p>А3 = {{q3}}</p>
      <button class="bu" @click="$emit('back')">
        Назад
      </button>
      <button class="bu" @click="$emit('right')">
        Продолжить
      </button><br>
    </div>
  </div>
</template>

<script>
export default {
  props: ['number', 'condition'],
  data () {
    return {
      validation: false,
      err: false,
      quantitative: true,
      s1: '',
      s2: '',
      s3: ''
    }
  },
  methods:{
    check(s1, s2, s3) {
      if (s1 == '' || s2 == '' || s3 == '' || (!Number(s1) && Number(s1) != 0) || (!Number(s2) && Number(s2) != 0)|| (!Number(s3) && Number(s3) != 0)) {
        this.err = false
        this.validation = true
      } else if (!this.compare(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[0][this.number+1][1])),s1) || !this.compare(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[1][this.number+1][1])),s2) || !this.compare(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[2][this.number+1][1])),s3)) {
        this.err = true
        this.validation = false
      } else {
        this.$emit('right')
      }
    },
    compare(a, b) {
      return Math.abs(a-b)<0.05
    }
  },
  mounted () {
    if (sessionStorage.getItem('quantitative'+this.number)) {
      this.quantitative = false
    }
    if (sessionStorage.getItem('s1'+this.number)) {
      this.s1 = sessionStorage.getItem('s1'+this.number)
    }
    if (sessionStorage.getItem('s2'+this.number)) {
      this.s2 = sessionStorage.getItem('s2'+this.number)
    }
    if (sessionStorage.getItem('s3'+this.number)) {
      this.s3 = sessionStorage.getItem('s3'+this.number)
    }
  },
  watch: {
    quantitative(newquantitative) {
      sessionStorage.setItem('quantitative'+this.number, newquantitative)
    },
    s1(news1) {
      sessionStorage.setItem('s1'+this.number, news1)
    },
    s2(news2) {
      sessionStorage.setItem('s2'+this.number, news2)
    },
    s3(news3) {
      sessionStorage.setItem('s3'+this.number, news3)
    }
  }
}
</script>

<style>
</style>
