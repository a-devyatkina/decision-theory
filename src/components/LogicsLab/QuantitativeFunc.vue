<template>
  <div class = "goal">
    <div>
      {{ condition.criterion[number].description }}
    </div><br>
    <div>
      <p v-if="quantitative">Необходимо по графику функции принадлежности и её общему виду восстановить неизвестные коэффициенты</p>
      <img :src="condition.criterion[number].path" alt="график" align="middle" width="700"/>
      <p>Вид функции:</p>
      <img :src="condition.criterion[number].function">
      <div v-if="quantitative">
        <p style="font-size:25px">a=<input v-model="m1" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p style="font-size:25px" v-if="condition.criterion[this.number].count>=2">b=<input v-model="m2" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p style="font-size:25px" v-if="condition.criterion[this.number].count>=3">c=<input v-model="m3" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
        <p v-if="err" style="color: red">Неверно</p>
        <button class="bu" @click="$emit('back')">
          Назад
        </button>
        <button class="bu" @click="check(m1, m2, m3)">
          Проверить
        </button><br>
      </div>
    </div>
    <div v-if="!quantitative">
      <p style="font-size:25px">a = {{ condition.criterion[this.number].koef[0] }}</p>
      <p style="font-size:25px" v-if="condition.criterion[this.number].count>=2">b = {{ condition.criterion[this.number].koef[1] }}</p>
      <p style="font-size:25px" v-if="condition.criterion[this.number].count>=3">c = {{ condition.criterion[this.number].koef[2] }}</p>
      <table border=1px align="right">
        <tr><td colspan="2" style="text-align: center">{{ condition.criterion[number].tytle }}</td> </tr>
        <tr>
          <td>{{ condition.alternative[0].description }}</td><td>{{ condition.alternative[0][number+1] }}</td>
        </tr>
        <tr>
          <td>{{ condition.alternative[1].description }}</td><td>{{ condition.alternative[1][number+1] }}</td>
        </tr>
        <tr>
          <td>{{ condition.alternative[2].description }}</td><td>{{ condition.alternative[2][number+1] }}</td>
        </tr>
      </table>
      <p>Необходимо вычислить значения критерия для каждой альтернативы:</p>
      <div v-if="marking">
        <p>А1 = <input v-model="s1" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p>А2 = <input v-model="s2" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p>А3 = <input v-model="s3" placeholder="0.000" style="font-size:20px; height: 20px; width: 150px;"></p>
        <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
        <p v-if="err" style="color: red">Неверно</p>
        <button class="bu" @click="$emit('back')">
          Назад
        </button>
        <button class="bu" @click="checksecond(s1, s2, s3)">
          Проверить
        </button><br>
      </div>
      <div v-if="!marking">
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
  </div>
</template>

<script>
export default {
  props: ['number', 'condition', 'error'],
  data () {
    return {
      validation: false,
      err: false,
      quantitative: true,
      marking: true,
      error: 0,
      m1: '',
      m2: '',
      m3: '',
      s1: '',
      s2: '',
      s3: '',
      q1: eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[0][this.number+1])).toFixed(2),
      q2: eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[1][this.number+1])).toFixed(2),
      q3: eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[2][this.number+1])).toFixed(2),
    }
  },
  methods:{
    check(m1, m2, m3) {
      if (this.condition.criterion[this.number].count == 1) {
        if (m1 == '' || (!Number(m1) && Number(m1) != 0)) {
          this.err = false
          this.validation = true
        } else if (!this.compare(this.condition.criterion[this.number].koef[0],m1)) {
          this.err = true
          this.validation = false
          this.$emit('err')
        } else {
          this.quantitative = false
        }
      } else if (this.condition.criterion[this.number].count == 2) {
        if (m1 == '' || m2 == '' || (!Number(m1) && Number(m1) != 0) || (!Number(m2) && Number(m2) != 0)) {
          this.err = false
          this.validation = true
        } else if (!this.compare(this.condition.criterion[this.number].koef[0],m1) || !this.compare(this.condition.criterion[this.number].koef[1],m2)) {
          this.err = true
          this.validation = false
          this.$emit('err')
        } else {
          this.quantitative = false
        }
      } else {
        if (m1 == '' || m2 == '' || m3 == '' || (!Number(m1) && Number(m1) != 0) || (!Number(m2) && Number(m2) != 0)|| (!Number(m3) && Number(m3) != 0)) {
          this.err = false
          this.validation = true
        } else if (!this.compare(this.condition.criterion[this.number].koef[0],m1) || !this.compare(this.condition.criterion[this.number].koef[1],m2) || !this.compare(this.condition.criterion[this.number].koef[2],m3)) {
          this.err = true
          this.validation = false
          this.$emit('err')
        } else {
          this.quantitative = false
          this.validation = false
          this.err = false
        }
      }
    },
    compare(a,b) {
      if (Math.abs(a)<1) {
        return Math.abs(a-b)<0.05
      } else {
        return Math.abs(a/b-1)<0.1
      }
    },
    checksecond(s1, s2, s3) {
      if (s1 == '' || s2 == '' || s3 == '' || (!Number(s1) && Number(s1) != 0) || (!Number(s2) && Number(s2) != 0)|| (!Number(s3) && Number(s3) != 0)) {
        this.err = false
        this.validation = true
      } else if (!this.comparesecond(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[0][this.number+1])),s1) || !this.comparesecond(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[1][this.number+1])),s2)
      || !this.comparesecond(eval(this.condition.criterion[this.number].functioncompute.replace(/x/g,this.condition.alternative[2][this.number+1])),s3)) {
        this.err = true
        this.validation = false
      } else {
        this.marking = false
      }
    },
    comparesecond(a, b) {
      return Math.abs(a-b)<0.05
    }
  },
  mounted () {
    if (sessionStorage.getItem('m1'+this.number)) {
        this.m1 = sessionStorage.getItem('m1'+this.number)
    }
    if (sessionStorage.getItem('m2'+this.number)) {
        this.m2 = sessionStorage.getItem('m2'+this.number)
    }
    if (sessionStorage.getItem('m3'+this.number)) {
        this.m3 = sessionStorage.getItem('m3'+this.number)
    }
    if (sessionStorage.getItem('quantitative'+this.number)) {
        if (sessionStorage.getItem('quantitative'+this.number) == "false") {
          this.quantitative = false
        } else {
          this.quantitative = true
        }
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
    if (sessionStorage.getItem('marking'+this.number)) {
        if (sessionStorage.getItem('marking'+this.number) == "false") {
          this.marking = false
        } else {
          this.marking = true
        }
    }
  },
  watch: {
    m1(newm1) {
      sessionStorage.setItem('m1'+this.number, newm1)
    },
    m2(newm2) {
      sessionStorage.setItem('m2'+this.number, newm2)
    },
    m3(newm3) {
      sessionStorage.setItem('m3'+this.number, newm3)
    },
    quantitative(newquantitative) {
      sessionStorage.setItem('quantitative'+this.number, newquantitative)
    },
    marking(newmarking) {
      sessionStorage.setItem('marking'+this.number, newmarking)
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
  table {
    border-collapse: collapse;
    text-align: center;
  }
  th, td:first-child {
    background: #AFCDE7;
    padding: 10px 20px;
  }
  th, td {
    border-style: solid;
    border-width: 0 1px 1px 0;
    padding: 10px 20px;
  }
  td {
    background: #D8E6F3;
  }
  th:first-child, td:first-child {
    text-align: left;
  }
</style>
