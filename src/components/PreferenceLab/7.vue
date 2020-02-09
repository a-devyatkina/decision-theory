<template lang="html">
  <div class="">
    <div class="" style="text-align:center; padding: 5px">
      <font size = '5' class="" >
        Найдите подмножество недоминируемых альтернатив
      </font>
    </div>
<table class="infotable" style = "margin:auto; padding:5px">
  <tr class="infotr"><th class="infoth">Q2</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth">a3</th></tr> <!--ряд с ячейками заголовков-->
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong><td class="infotd" style = "text-align:center">{{matrix[0]}}</td><td class="infotd">{{matrix[3]}}</td><td class="infotd">{{matrix[6]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong><td class="infotd" style = "text-align:center">{{matrix[1]}}</td><td class="infotd">{{matrix[4]}}</td><td class="infotd">{{matrix[7]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong><td class="infotd" style = "text-align:center">{{matrix[2]}}</td><td class="infotd">{{matrix[5]}}</td><td class="infotd">{{matrix[8]}}</td></tr>
</table>
<div v-if='!done'>
<table class="infotable" style = "margin:auto">
  <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a2,a1) - U<sub>Q2</sub>(a1,a2)</th><th class="infoth">U<sub>Q2</sub>(a3,a1) - U<sub>Q2</sub>(a1,a3)</th> <th>U<sub>Q2</sub>(a1) = 1 - sup()</th> </tr>

  <tr class="infotr"><td class="infotd" style="text-align:center;"><input type="text" v-model = 'message[0]' @keypress = 'isNumber($event)' v-bind:style = 'wr1' required placeholder = "0.000"  size="6"></td><td class="infotd"><input type="text" name="a12" placeholder = "0.000" v-model = 'message[3]' @keypress = 'isNumber($event)' v-bind:style = 'wr4' size="6"></td><td class="infotd"><input type="text" name="a13" required placeholder = "0.000" v-model = 'message[6]' @keypress = 'isNumber($event)' v-bind:style = 'wr7' size="6"></td></tr>

</table>

<table style = "margin:auto;padding: 5px">
    <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a1,a2) - U<sub>Q2</sub>(a2,a1)</th><th class="infoth">U<sub>Q2</sub>(a3,a2) - U<sub>Q2</sub>(a2,a3)</th> <th>U<sub>Q2</sub>(a2) = 1 - sup()</th> </tr>
      <tr class="infotr"><td class="infotd" style="text-align:center;"><input type="text" required placeholder = "0.000" v-model = 'message[1]' @keypress = 'isNumber($event)' v-bind:style = 'wr2' size="6"></td><td class="infotd"><input type="text" name="a22" required placeholder = "0.000" v-model = 'message[4]' @keypress = 'isNumber($event)' v-bind:style = 'wr5' size="6"></td><td class="infotd"><input type="text" name="a23" required placeholder = "0.000" v-model = 'message[7]' @keypress = 'isNumber($event)' v-bind:style = 'wr8' size="6"></td></tr>
</table>

<table style = "margin:auto;padding: 5px">
    <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a1,a3) - U<sub>Q2</sub>(a3,a1)</th><th class="infoth">U<sub>Q2</sub>(a2,a3) - U<sub>Q2</sub>(a3,a2)</th> <th>U<sub>Q2</sub>(a3) = 1 - sup()</th> </tr>
    <tr class="infotr"><td class="infotd" style="text-align:center;"><input type="text" required placeholder = "0.000" v-model = 'message[2]' @keypress = 'isNumber($event)' v-bind:style = 'wr3' size="6"></td><td class="infotd"><input type="text" name="a32" required placeholder = "0.000" v-model = 'message[5]' @keypress = 'isNumber($event)' v-bind:style = 'wr6' size="6"></td><td class="infotd"><input type="text" name="a33" required placeholder = "0.000" v-model = 'message[8]' @keypress = 'isNumber($event)' v-bind:style = 'wr9' size="6"></td></tr>
</table>
<button type="submit" class="knopka" name="check" @click = 'onAnswer(message)'>Проверить</button>
{{err}}
  </div>
<div v-else>
  <table class="infotable" style = "margin:auto">
    <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a2,a1) - U<sub>Q2</sub>(a1,a2)</th><th class="infoth">U<sub>Q2</sub>(a3,a1) - U<sub>Q2</sub>(a1,a3)</th> <th>U<sub>Q2</sub>(a1) = 1 - sup()</th> </tr>

    <tr class="infotr"><td class="infotd" style="text-align:center;">{{answermatrix[0]}}</td><td class="infotd">{{answermatrix[3]}}</td><td class="infotd">{{answermatrix[6]}}</td></tr>

  </table>

  <table style = "margin:auto;padding: 5px">
      <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a1,a2) - U<sub>Q2</sub>(a2,a1)</th><th class="infoth">U<sub>Q2</sub>(a3,a2) - U<sub>Q2</sub>(a2,a3)</th> <th>U<sub>Q2</sub>(a2) = 1 - sup()</th> </tr>
        <tr class="infotr"><td class="infotd" style="text-align:center;">{{answermatrix[1]}}</td><td class="infotd">{{answermatrix[4]}}</td><td class="infotd">{{answermatrix[7]}}</td></tr>
  </table>

  <table style = "margin:auto;padding: 5px">
      <tr class="infotr"> <th class="infoth">U<sub>Q2</sub>(a1,a3) - U<sub>Q2</sub>(a3,a1)</th><th class="infoth">U<sub>Q2</sub>(a2,a3) - U<sub>Q2</sub>(a3,a2)</th> <th>U<sub>Q2</sub>(a3) = 1 - sup()</th> </tr>
      <tr class="infotr"><td class="infotd" style="text-align:center;">{{answermatrix[2]}}</td><td class="infotd">{{answermatrix[5]}}</td><td class="infotd">{{answermatrix[8]}}</td></tr>
  </table>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      message: ['', '', '', '', '', '', '', '', ''],
      wr1: '',
      wr2: '',
      wr3: '',
      wr4: '',
      wr5: '',
      wr6: '',
      wr7: '',
      wr8: '',
      wr9: '',
      wrong: [true, true, true, true, true, true, true, true, true],
      err: '',
      mistake: true,
      error: 0
    }
  },
  props: ['settings', 'next', 'last', 'done'],
  methods: {
    onAnswer (message) {
      console.log(this.answermatrix)
      if (message[0] === '' || Number(message[0]) !== this.answermatrix[0]) {
        this.wr1 = 'border-color: red'
        this.wrong[0] = false
        this.error += 1
      } else {
        this.wr1 = ''
        this.wrong[0] = true
      }
      if (message[1] === '' || Number(message[1]) !== this.answermatrix[1]) {
        this.wrong[1] = false
        this.wr2 = 'border-color: red'
        this.error += 1
      } else {
        this.wr2 = ''
        this.wrong[1] = true
      }
      if (message[2] === '' || Number(message[2]) !== this.answermatrix[2]) {
        this.wrong[2] = false
        this.wr3 = 'border-color: red'
        this.error += 1
      } else {
        this.wr3 = ''
        this.wrong[2] = true
      }
      if (message[3] === '' || Number(message[3]) !== this.answermatrix[3]) {
        this.wrong[3] = false
        this.wr4 = 'border-color: red'
        this.error += 1
      } else {
        this.wr4 = ''
        this.wrong[3] = true
      }
      if (message[4] === '' || Number(message[4]) !== this.answermatrix[4]) {
        this.wrong[4] = false
        this.wr5 = 'border-color: red'
        this.error += 1
      } else {
        this.wr5 = ''
        this.wrong[4] = true
      }
      if (message[5] === '' || Number(message[5]) !== this.answermatrix[5]) {
        this.wrong[5] = false
        this.wr6 = 'border-color: red'
        this.error += 1
      } else {
        this.wr6 = ''
        this.wrong[5] = true
      }
      if (message[6] === '' || Number(message[6]) !== this.answermatrix[6]) {
        this.wrong[6] = false
        this.wr7 = 'border-color: red'
        this.error += 1
      } else {
        this.wr7 = ''
        this.wrong[6] = true
      }
      if (message[7] === '' || Number(message[7]) !== this.answermatrix[7]) {
        this.wrong[7] = false
        this.wr8 = 'border-color: red'
        this.error += 1
      } else {
        this.wr8 = ''
        this.wrong[7] = true
      }
      if (message[8] === '' || Number(message[8]) !== this.answermatrix[8]) {
        this.wrong[8] = false
        this.wr9 = 'border-color: red'
        this.error += 1
      } else {
        this.wr9 = ''
        this.wrong[8] = true
      }
      this.mistake = true
      if (this.wrong[0] && this.wrong[1] && this.wrong[2] && this.wrong[3] && this.wrong[4] && this.wrong[5] && this.wrong[6] && this.wrong[7] && this.wrong[8]) {
        sessionStorage.setItem('u', JSON.stringify(message))
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
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && charCode !== 45) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  },
  mounted () {
    if (sessionStorage.getItem('u')) {
      this.message = JSON.parse(sessionStorage.getItem('u'))
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
    matrix () {
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
    answermatrix () {
      let answermatrix = []
      answermatrix[0] = Math.round((this.matrix[1] - this.matrix[3]) * 100) / 100
      answermatrix[1] = Math.round((this.matrix[3] - this.matrix[1]) * 100) / 100
      answermatrix[2] = Math.round((this.matrix[6] - this.matrix[2]) * 100) / 100
      answermatrix[3] = Math.round((this.matrix[2] - this.matrix[6]) * 100) / 100
      answermatrix[4] = Math.round((this.matrix[5] - this.matrix[7]) * 100) / 100
      answermatrix[5] = Math.round((this.matrix[7] - this.matrix[5]) * 100) / 100
      answermatrix[6] = Math.round((1 - Math.max(answermatrix[0], answermatrix[3])) * 100) / 100
      answermatrix[7] = Math.round((1 - Math.max(answermatrix[1], answermatrix[4])) * 100) / 100
      answermatrix[8] = Math.round((1 - Math.max(answermatrix[2], answermatrix[5])) * 100) / 100
      return answermatrix
    }
  },
  watch: {
    message (newmessage) {

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

padding: 5px 20px;
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
padding: 5px 20px;
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
