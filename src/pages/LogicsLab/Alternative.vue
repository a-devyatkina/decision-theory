<template>
  <div class="goal">
    <p>В процессе выполнения были получены оценки критериев альтернативы {{ condition.alternative[number].description }}:</p>
    <table border=1px>
      <tr><td colspan="2" style="text-align: center">{{ condition.alternative[number].description }}</td></tr>
      <tr><td>{{ condition.criterion[0].tytle}}</td><td>{{ c[0] }}</td></tr>
      <tr><td>{{ condition.criterion[1].tytle}}</td><td>{{ c[1] }}</td></tr>
      <tr><td>{{ condition.criterion[2].tytle}}</td><td>{{ c[2] }}</td></tr>
      <tr><td>{{ condition.criterion[3].tytle}}</td><td>{{ c[3] }}</td></tr>
    </table>
    Представленные значения отражают  принадлежность соответствующего свойства альтернативы к множеству
    μ<sub>A</sub> «Подходящее  (подходящая,  подходящий)». Для расчета функции принадлежности свойства альтернативы к множеству «неподходящее» использовать классическое отрицание.<br><br>
    <p v-if="rating">Получить оценку принадлежности каждого свойства к обоим классам</p>
    <table border=1px>
      <tr><td></td><td>Подходящее</td><td>Неподходящее</td></tr>
      <tr><td>{{ condition.criterion[0].tytle}}</td><td><input v-model="m[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td><td><input v-model="s[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td></tr>
      <tr><td>{{ condition.criterion[1].tytle}}</td><td><input v-model="m[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td><td><input v-model="s[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td></tr>
      <tr><td>{{ condition.criterion[2].tytle}}</td><td><input v-model="m[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td><td><input v-model="s[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td></tr>
      <tr><td>{{ condition.criterion[3].tytle}}</td><td><input v-model="m[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td><td><input v-model="s[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></td></tr>
    </table>
    <div v-if="rating">
      <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
      <p v-if="err" style="color: red">Неверно</p>
      <button class="bu" @click="$emit ('back')">
        Назад
      </button>
      <button class="bu" @click="check (m,  s)">
        Проверить
      </button>
    </div>
    <div v-if="!rating">
      <br>Правила:<br>
      d1 : {{ condition.rules.text[0] }}<br>
      d2 : {{ condition.rules.text[1] }}<br>
      d3 : {{ condition.rules.text[2] }}<br><br>
      <p v-if="mu">Найти числовые значения μ<sub>A</sub> функций принадлежности d<sub>1</sub>,  d<sub>2</sub>,  d<sub>3</sub><br></p>
      <p>D1 = <input v-model="d[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></p>
      <p>D2 = <input v-model="d[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></p>
      <p>D3 = <input v-model="d[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 145px;"></p>
      <div  v-if="mu">
        <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
        <p v-if="err" style="color: red">Неверно</p>
        <button class="bu" @click="$emit ('back')">
          Назад
        </button>
        <button class="bu" @click="checksecond (d,  m)">
          Проверить
        </button>
      </div>
    </div>
    <div v-if="!mu">
      <br>Переменная Y задана на множестве J = {0; 0, 1; 0, 2; ...; 1}.<br>
      Значения переменной Y заданы с помощью следующих функций принадлежности:<br>
      S = удовлетворительный             μ<sub>B</sub> (x) = х;<br>
      US = неудовлетворительный           μ<sub>B</sub> (x) = 1 – х;<br>
      Р = безупречный                    μ<sub>B</sub> (х) = 1,  если х = 1,  иначе 0.<br>Используя для преобразования правил импликацию Лукасевича,  получить нечёткие отношения D<sub>1</sub>,  D<sub>2</sub>,  D<sub>3</sub><br>
      Правило Лукасевича: μ<sub>A->B</sub>=min{1;1-μ<sub>A</sub> + μ<sub>B</sub>}
      <p v-if="!luka">На основе полученной таблицы получить итоговое функциональное решение<p>
      <table border=1px>
        <tr><td>Y</td><td>0</td><td>0.1</td><td>0.2</td><td>0.3</td><td>0.4</td><td>0.5</td><td>0.6</td><td>0.7</td><td>0.8</td><td>0.9</td><td>1</td></tr>
        <tr><td>D1 (Y),  где μ<sub>A</sub> = {{ d[0] }}</td><td><input v-model="d1[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d1[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d1[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d1[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d1[4]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d1[5]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d1[6]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d1[7]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d1[8]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d1[9]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d1[10]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
        <tr><td>D2 (Y),  где μ<sub>A</sub> = {{ d[1] }}</td><td><input v-model="d2[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d2[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d2[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d2[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d2[4]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d2[5]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d2[6]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d2[7]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d2[8]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d2[9]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d2[10]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td></tr>
        <tr><td>D3 (Y),  где μ<sub>A</sub> = {{ d[2] }}</td><td><input v-model="d3[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d3[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d3[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d3[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d3[4]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d3[5]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d3[6]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d3[7]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d3[8]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="d3[9]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
          <td><input v-model="d3[10]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td></tr>
          <tr v-if="!luka"><td>Итоговое решение</td><td><input v-model="dtotal[0]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="dtotal[1]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
            <td><input v-model="dtotal[2]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="dtotal[3]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
            <td><input v-model="dtotal[4]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="dtotal[5]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
            <td><input v-model="dtotal[6]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="dtotal[7]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
            <td><input v-model="dtotal[8]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td><td><input v-model="dtotal[9]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td>
            <td><input v-model="dtotal[10]" placeholder="0.000" style="font-size:25px; height: 27px; width: 70px;"></td></tr>
      </table>
      <div v-if="luka">
        <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
        <p v-if="err" style="color: red">Неверно</p>
        <button class="bu" @click="$emit ('back')">
          Назад
        </button>
        <button class="bu" @click="checkthird (d1,  d2,  d3)">
          Проверить
        </button>
      </div>
      <div v-if="!luka">
        <p v-if="validation" style="color: red">Проверьте правильность ввода</p>
        <p v-if="err" style="color: red">Неверно</p>
        <button class="bu" @click="$emit ('back')">
          Назад
        </button>
        <button class="bu" @click="checktotal (d1,  d2,  d3,  dtotal)">
          Проверить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-eval: 0 */
export default {
  props: ['number', 'condition'],
  data  () {
    return {
      rating: true,
      m: ['', '', '', ''],
      s: ['', '', '', ''],
      err: false,
      validation: false,
      d: ['', '', ''],
      mu: true,
      d1: ['', '', '', '', '', '', '', '', '', '', ''],
      d2: ['', '', '', '', '', '', '', '', '', '', ''],
      d3: ['', '', '', '', '', '', '', '', '', '', ''],
      luka: true,
      dtotal: ['', '', '', '', '', '', '', '', '', '', '']
    }
  },
  computed: {
    c: function () {
      return [eval(this.condition.criterion[0].functioncompute.replace(/x/g, this.condition.alternative[this.number][1])).toFixed(3), eval(this.condition.criterion[1].functioncompute.replace(/x/g, this.condition.alternative[this.number][2])).toFixed(3),
        eval(this.condition.criterion[2].functioncompute.replace(/x/g, this.condition.alternative[this.number][3][1])).toFixed(3), eval(this.condition.criterion[3].functioncompute.replace(/x/g, this.condition.alternative[this.number][4][1])).toFixed(3)]
    }
  },
  methods: {
    check  (m, s) {
      for (var i = 0; i < 4; i++) {
        if (m[i] === '' || s[i] === '' || (!Number(m[i]) && Number(m[i]) !== 0) || (!Number(s[i]) && Number(s[i]) !== 0)) {
          this.validation = true
          this.err = false
          return
        }
      }
      for (i = 0; i < 4; i++) {
        if (Number(m[i]).toFixed(3) !== Number(this.c[i]).toFixed(3) || Number(s[i]).toFixed(3) !== Number(1 - this.c[i]).toFixed(3)) {
          this.validation = false
          this.err = true
          return
        }
      }
      this.rating = false
      this.err = false
      this.validation = false
    },
    checksecond (d, m) {
      for (var i = 0; i < 3; i++) {
        if (d[i] === '' || (!Number(d[i]) && Number(d[i]) !== 0)) {
          this.validation = true
          this.err = false
          return
        }
      }
      for (i = 0; i < 3; i++) {
        if (Number(d[i]).toFixed(3) !== Number(eval(this.condition.rules.formula[i])).toFixed(3)) {
          this.validation = false
          this.err = true
          return
        }
      }
      this.mu = false
      this.err = false
      this.validation = false
    },
    checkthird (d1, d2, d3) {
      for (var i = 0; i < 10; i++) {
        if (d1[i] === '' || (!Number(d1[i]) && Number(d1[i]) !== 0) || d2[i] === '' || (!Number(d2[i]) && Number(d2[i]) !== 0) || d3[i] === '' || (!Number(d3[i]) && Number(d3[i]) !== 0)) {
          this.validation = true
          this.err = false
          return
        }
      }
      for (i = 0; i < 11; i++) {
        if (d1[i] !== Math.min(1, 1 - this.d[0] + 0.1 * i) || d2[i] !== Math.min(1, 1 - this.d[1] + (1 - 0.1 * i)) || d3[i] !== Math.min(1, 1 - this.d[2] + Math.floor(i * 0.1))) {
          this.validation = false
          this.err = true
          return
        }
      }
      this.luka = false
    },
    checktotal (d1, d2, d3, dtotal) {
      for (var i = 0; i < 11; i++) {
        if (dtotal[i] === '' || (!Number(dtotal[i]) && Number(dtotal[i]) !== 0)) {
          this.validation = true
          this.err = false
          return
        }
      }
      for (i = 0; i < 11; i++) {
        if (dtotal[i] !== Math.min(d1[i], d2[i], d3[i])) {
          this.validation = false
          this.err = true
          return
        }
      }
      this.$emit('right')
    }
  },
  mounted  () {
    if (sessionStorage.getItem('m' + this.number)) {
      this.m = sessionStorage.getItem('m' + this.number).split(', ')
    }
    if (sessionStorage.getItem('s' + this.number)) {
      this.s = sessionStorage.getItem('s' + this.number).split(', ')
    }
    if (sessionStorage.getItem('rating' + this.number)) {
      this.rating = false
    }
    if (sessionStorage.getItem('d' + this.number)) {
      this.d = sessionStorage.getItem('d' + this.number).split(', ')
    }
    if (sessionStorage.getItem('mu' + this.number)) {
      this.mu = false
    }
    if (sessionStorage.getItem('d1' + this.number)) {
      this.d1 = sessionStorage.getItem('d1' + this.number).split(', ')
    }
    if (sessionStorage.getItem('d2' + this.number)) {
      this.d2 = sessionStorage.getItem('d2' + this.number).split(', ')
    }
    if (sessionStorage.getItem('d3' + this.number)) {
      this.d3 = sessionStorage.getItem('d3' + this.number).split(', ')
    }
    if (sessionStorage.getItem('luka' + this.number)) {
      this.luka = false
    }
    if (sessionStorage.getItem('dtotal' + this.number)) {
      this.dtotal = sessionStorage.getItem('dtotal' + this.number).split(', ')
    }
  },
  watch: {
    m (newm) {
      sessionStorage.setItem('m' + this.number, newm)
    },
    s (news) {
      sessionStorage.setItem('s' + this.number, news)
    },
    rating (newrating) {
      sessionStorage.setItem('rating' + this.number, newrating)
    },
    d (newd) {
      sessionStorage.setItem('d' + this.number, newd)
    },
    mu (newmu) {
      sessionStorage.setItem('mu' + this.number, newmu)
    },
    d1 (newd1) {
      sessionStorage.setItem('d1' + this.number, newd1)
    },
    d2 (newd2) {
      sessionStorage.setItem('d2' + this.number, newd2)
    },
    d3 (newd3) {
      sessionStorage.setItem('d3' + this.number, newd3)
    },
    luka (newluka) {
      sessionStorage.setItem('luka' + this.number, newluka)
    },
    dtotal (newdtotal) {
      sessionStorage.setItem('dtotal' + this.number, newdtotal)
    }
  }
}
</script>

<style>
</style>
