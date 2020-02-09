<template lang="html">
  <div class="">
    <div class="" style="text-align:center; padding: 5px">
      <font size = '5' class="" >
        Выберите наилучшую стратегию
      </font>
    </div>
  <table v-if='!done' class="infotable" style = "margin:auto">
    <tr class="infotr"><th class="infoth" style="background:#239A8E;color:white"><strong>U<sub>Q1</sub></strong></th><td class="infotd">1</td><td class="infotd">1</td><td class="infotd">1</td></tr>
    <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>U<sub>Q2</sub></strong></td><td class="infotd">{{matrix[6]}}</td><td class="infotd">{{matrix[7]}}</td><td class="infotd">{{matrix[8]}}</td></tr>
    <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>U<sub>Q</sub></strong></td><td class="infotd"><input v-model = 'message[0]' type="text" @keypress = 'isNumber($event)' v-bind:style = 'wr1' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[1]' @keypress = 'isNumber($event)' v-bind:style = 'wr2' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[2]' @keypress = 'isNumber($event)' v-bind:style = 'wr3' size = '6' placeholder="0"></td></tr>
  </table>
  <table v-else class="infotable" style = "margin:auto">
    <tr class="infotr"><th class="infoth" style="background:#239A8E;color:white"><strong>U<sub>Q1</sub></strong></th><td class="infotd">1</td><td class="infotd">1</td><td class="infotd">1</td></tr>
    <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>U<sub>Q2</sub></strong></td><td class="infotd">{{matrix[6]}}</td><td class="infotd">{{matrix[7]}}</td><td class="infotd">{{matrix[8]}}</td></tr>
    <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>U<sub>Q</sub></strong></td><td class="infotd">{{Math.min(1, this.matrix[6])}}</td><td class="infotd">{{Math.min(1, this.matrix[7])}}</td><td class="inf8td">{{Math.min(1, this.matrix[8])}}</td></tr>
  </table>
  <br>
  <div style = "text-align: center; font: 14px">
      Наилучшая альтернатива: <input v-model = 'mes' type="text" @keypress = 'isNumber($event)' v-bind:style = 'wr4' size = '6' placeholder="0.000">
  </div>

  <button type="submit" class="knopka" name="check" @click = 'onAnswer(message, mes)'>Проверить</button>
  <br>
  <br>
  <button type="submit" class="knopka" name="lastpage" value="true" >Предыдущая страница</button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      message: ['', '', ''],
      wr1: '',
      wr2: '',
      wr3: '',
      wr4: '',
      wrong: [true, true, true, true],
      err: '',
      mistake: true,
      mes: '',
      error: 0
    }
  },
  props: ['settings', 'done'],
  methods: {
    onAnswer (message, mes) {
      const answer = [Math.min(1, this.matrix[6]), Math.min(1, this.matrix[7]), Math.min(1, this.matrix[8])]
      console.log(answer)
      if (Math.min(1, this.matrix[6]) !== Number(message[0])) {
        this.wrong1 = false
        this.wr1 = 'border-color: red'
        this.error += 1
      } else {
        this.wr1 = ''
        this.wrong1 = true
      }
      if (Math.min(1, this.matrix[7]) !== Number(message[1])) {
        this.wrong2 = false
        this.wr2 = 'border-color: red'
        this.error += 1
      } else {
        this.wr2 = ''
        this.wrong2 = true
      }
      if (Math.min(1, this.matrix[8]) !== Number(message[2])) {
        this.wrong3 = false
        this.wr3 = 'border-color: red'
        this.error += 1
      } else {
        this.wr3 = ''
        this.wrong3 = true
      }
      if (answer.indexOf((1)) !== (Number(mes) - 1)) {
        this.wrong4 = false
        this.wr4 = 'border-color: red'
        this.error += 1
      } else {
        this.wr4 = ''
        this.wrong4 = true
      }
      this.mistake = true
      console.log([...answer])
      console.log(answer.indexOf(1) === (Number(mes) - 1))
      console.log(answer.indexOf(1).toString())
      if (this.wrong1 && this.wrong2 && this.wrong3 && this.wrong4) {
        sessionStorage.setItem('answer', JSON.stringify(message))
        this.$emit('success1')
      } else {
        this.$emit('err', this.error)
        this.error = 0
        this.err = 'Неверный ответ'
      }
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('answer')) {
      this.message = JSON.parse(sessionStorage.getItem('answer'))
    }
  },
  computed: {
    matrixcrit1 () {
      let arr = []
      arr[0] = 1
      arr[4] = 1
      arr[8] = 1
      if (this.settings[0].answers[0] > this.settings[0].answers[1]) {
        arr[1] = Math.round((this.settings[0].answers[0] - this.settings[0].answers[1]) * 100) / 100
        arr[3] = 0
      } else {
        arr[1] = 0
        arr[3] = Math.round((this.settings[0].answers[1] - this.settings[0].answers[0]) * 100) / 100
      }
      if (this.settings[0].answers[0] > this.settings[0].answers[2]) {
        arr[2] = Math.round((this.settings[0].answers[0] - this.settings[0].answers[2]) * 100) / 100
        arr[6] = 0
      } else {
        arr[2] = 0
        arr[6] = Math.round((this.settings[0].answers[2] - this.settings[0].answers[0]) * 100) / 100
      }
      if (this.settings[0].answers[1] > this.settings[0].answers[2]) {
        arr[5] = Math.round((this.settings[0].answers[1] - this.settings[0].answers[2]) * 100) / 100
        arr[7] = 0
      } else {
        arr[5] = 0
        arr[7] = Math.round((this.settings[0].answers[2] - this.settings[0].answers[1]) * 100) / 100
      }
      return arr
    },
    matrixcrit2 () {
      let arr = []
      arr[0] = 1
      arr[4] = 1
      arr[8] = 1
      if (this.settings[1].answers[0] > this.settings[1].answers[1]) {
        arr[1] = Math.round((this.settings[1].answers[0] - this.settings[1].answers[1]) * 100) / 100
        arr[3] = 0
      } else {
        arr[1] = 0
        arr[3] = Math.round((this.settings[1].answers[1] - this.settings[1].answers[0]) * 100) / 100
      }
      if (this.settings[1].answers[0] > this.settings[1].answers[2]) {
        arr[2] = Math.round((this.settings[1].answers[0] - this.settings[1].answers[2]) * 100) / 100
        arr[6] = 0
      } else {
        arr[2] = 0
        arr[6] = Math.round((this.settings[1].answers[2] - this.settings[1].answers[0]) * 100) / 100
      }
      if (this.settings[1].answers[1] > this.settings[1].answers[2]) {
        arr[5] = Math.round((this.settings[1].answers[1] - this.settings[1].answers[2]) * 100) / 100
        arr[7] = 0
      } else {
        arr[5] = 0
        arr[7] = Math.round((this.settings[1].answers[2] - this.settings[1].answers[1]) * 100) / 100
      }
      return arr
    },
    matrixcrit3 () {
      let arr = []
      arr[0] = 1
      arr[4] = 1
      arr[8] = 1
      if (this.settings[2].answers[0] > this.settings[2].answers[1]) {
        arr[1] = Math.round((this.settings[2].answers[0] - this.settings[2].answers[1]) * 100) / 100
        arr[3] = 0
      } else {
        arr[1] = 0
        arr[3] = Math.round((this.settings[2].answers[1] - this.settings[2].answers[0]) * 100) / 100
      }
      if (this.settings[2].answers[0] > this.settings[2].answers[2]) {
        arr[2] = Math.round((this.settings[2].answers[0] - this.settings[2].answers[2]) * 100) / 100
        arr[6] = 0
      } else {
        arr[2] = 0
        arr[6] = Math.round((this.settings[2].answers[2] - this.settings[2].answers[0]) * 100) / 100
      }
      if (this.settings[2].answers[1] > this.settings[2].answers[2]) {
        arr[5] = Math.round((this.settings[2].answers[1] - this.settings[2].answers[2]) * 100) / 100
        arr[7] = 0
      } else {
        arr[5] = 0
        arr[7] = Math.round((this.settings[2].answers[2] - this.settings[2].answers[1]) * 100) / 100
      }
      return arr
    },
    matrixcrit4 () {
      let arr = []
      arr[0] = 1
      arr[4] = 1
      arr[8] = 1
      if (this.settings[3].answers[0] > this.settings[3].answers[1]) {
        arr[1] = Math.round((this.settings[3].answers[0] - this.settings[3].answers[1]) * 100) / 100
        arr[3] = 0
      } else {
        arr[1] = 0
        arr[3] = Math.round((this.settings[3].answers[1] - this.settings[3].answers[0]) * 100) / 100
      }
      if (this.settings[3].answers[0] > this.settings[3].answers[2]) {
        arr[2] = Math.round((this.settings[3].answers[0] - this.settings[3].answers[2]) * 100) / 100
        arr[6] = 0
      } else {
        arr[2] = 0
        arr[6] = Math.round((this.settings[3].answers[2] - this.settings[3].answers[0]) * 100) / 100
      }
      if (this.settings[3].answers[1] > this.settings[3].answers[2]) {
        arr[5] = Math.round((this.settings[3].answers[1] - this.settings[3].answers[2]) * 100) / 100
        arr[7] = 0
      } else {
        arr[5] = 0
        arr[7] = Math.round((this.settings[3].answers[2] - this.settings[3].answers[1]) * 100) / 100
      }
      return arr
    },
    matrix1 () {
      let matrix1 = []
      matrix1[0] = Math.round((this.matrixcrit1[0] * this.settings[0].w + this.matrixcrit2[0] * this.settings[1].w + this.matrixcrit3[0] * this.settings[2].w + this.matrixcrit4[0] * this.settings[3].w) * 100) / 100
      matrix1[3] = Math.round((this.matrixcrit1[1] * this.settings[0].w + this.matrixcrit2[1] * this.settings[1].w + this.matrixcrit3[1] * this.settings[2].w + this.matrixcrit4[1] * this.settings[3].w) * 100) / 100
      matrix1[6] = Math.round((this.matrixcrit1[2] * this.settings[0].w + this.matrixcrit2[2] * this.settings[1].w + this.matrixcrit3[2] * this.settings[2].w + this.matrixcrit4[2] * this.settings[3].w) * 100) / 100
      matrix1[1] = Math.round((this.matrixcrit1[3] * this.settings[0].w + this.matrixcrit2[3] * this.settings[1].w + this.matrixcrit3[3] * this.settings[2].w + this.matrixcrit4[3] * this.settings[3].w) * 100) / 100
      matrix1[4] = Math.round((this.matrixcrit1[4] * this.settings[0].w + this.matrixcrit2[4] * this.settings[1].w + this.matrixcrit3[4] * this.settings[2].w + this.matrixcrit4[4] * this.settings[3].w) * 100) / 100
      matrix1[7] = Math.round((this.matrixcrit1[5] * this.settings[0].w + this.matrixcrit2[5] * this.settings[1].w + this.matrixcrit3[5] * this.settings[2].w + this.matrixcrit4[5] * this.settings[3].w) * 100) / 100
      matrix1[2] = Math.round((this.matrixcrit1[6] * this.settings[0].w + this.matrixcrit2[6] * this.settings[1].w + this.matrixcrit3[6] * this.settings[2].w + this.matrixcrit4[6] * this.settings[3].w) * 100) / 100
      matrix1[5] = Math.round((this.matrixcrit1[7] * this.settings[0].w + this.matrixcrit2[7] * this.settings[1].w + this.matrixcrit3[7] * this.settings[2].w + this.matrixcrit4[7] * this.settings[3].w) * 100) / 100
      matrix1[8] = Math.round((this.matrixcrit1[8] * this.settings[0].w + this.matrixcrit2[8] * this.settings[1].w + this.matrixcrit3[8] * this.settings[2].w + this.matrixcrit4[8] * this.settings[3].w) * 100) / 100
      return matrix1
    },
    matrix () {
      let answermatrix = []
      answermatrix[0] = Math.round((this.matrix1[1] - this.matrix1[3]) * 100) / 100
      answermatrix[1] = Math.round((this.matrix1[3] - this.matrix1[1]) * 100) / 100
      answermatrix[2] = Math.round((this.matrix1[6] - this.matrix1[2]) * 100) / 100
      answermatrix[3] = Math.round((this.matrix1[2] - this.matrix1[6]) * 100) / 100
      answermatrix[4] = Math.round((this.matrix1[5] - this.matrix1[7]) * 100) / 100
      answermatrix[5] = Math.round((this.matrix1[7] - this.matrix1[5]) * 100) / 100
      answermatrix[6] = Math.round((1 - Math.max(answermatrix[0], answermatrix[3])) * 100) / 100
      answermatrix[7] = Math.round((1 - Math.max(answermatrix[1], answermatrix[4])) * 100) / 100
      answermatrix[8] = Math.round((1 - Math.max(answermatrix[2], answermatrix[5])) * 100) / 100
      return answermatrix
    }
  }
}
</script>

<style lang="css" scoped>
.as{
      color: green;
    }

    table {

font-size: 14px;
border-radius: 10px;
border-spacing: 0;
text-align: center;
}
th {
background: #239A8E;
color: white;

padding: 10px 20px;
}
th, td {
border-style: solid;
border-width: 0 1px 1px 0;
border-color: white;
}
th:first-child, td:first-child {
text-align: left;
}
th:first-child {
border-top-left-radius: 10px;
}
th:last-child {
border-top-right-radius: 10px;
border-right: none;
}
td {
padding: 10px 20px;
background: #F8E391;
}
tr:last-child td:first-child {
border-radius: 0 0 0 10px;
}
tr:last-child td:last-child {
border-radius: 0 0 10px 0;
}
tr td:last-child {
border-right: none;
}
button.knopka {
color: #fff;
background: #239A8E;
padding: 5px;
border-radius: 20px;
border-color: #239A8E;
}
.menu{
  position: fixed;
  background-color: #239A8E;
  width: 100%;
  text-align: center;
left:0;
right:0;
top:0;
}
</style>
