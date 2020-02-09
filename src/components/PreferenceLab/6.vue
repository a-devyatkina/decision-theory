<template lang="html">
  <div class="">
  <div class="" style="text-align:center; padding: 5px">
    <font size = '5' class="" >
      Постройте нечеткое отношение
    </font>
  </div>
  <table style = "margin:auto">
    <tr>
      <td>
        <table class="infotable">
          <tr class="infotr"><th class="infoth">C1</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth">a3</th></tr> <!--ряд с ячейками заголовков-->
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong><td class="infotd" style = "text-align:center">{{matrixcrit1[0]}}</td><td class="infotd">{{matrixcrit1[1]}}</td><td class="infotd">{{matrixcrit1[2]}}</td></tr>
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong><td class="infotd" style = "text-align:center">{{matrixcrit1[3]}}</td><td class="infotd">{{matrixcrit1[4]}}</td><td class="infotd">{{matrixcrit1[5]}}</td></tr>
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong><td class="infotd" style = "text-align:center">{{matrixcrit1[6]}}</td><td class="infotd">{{matrixcrit1[7]}}</td><td class="infotd">{{matrixcrit1[8]}}</td></tr>
        </table>
      </td>
<td>
<table class="infotable">
  <tr class="infotr"><th class="infoth">C2</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth">a3</th></tr> <!--ряд с ячейками заголовков--> <!--ряд с ячейками заголовков-->
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong><td class="infotd" style = "text-align:center">{{matrixcrit2[0]}}</td><td class="infotd">{{matrixcrit2[1]}}</td><td class="infotd">{{matrixcrit2[2]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong><td class="infotd" style = "text-align:center">{{matrixcrit2[3]}}</td><td class="infotd">{{matrixcrit2[4]}}</td><td class="infotd">{{matrixcrit2[5]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong><td class="infotd" style = "text-align:center">{{matrixcrit2[6]}}</td><td class="infotd">{{matrixcrit2[7]}}</td><td class="infotd">{{matrixcrit2[8]}}</td></tr>
</table>
</td>
<td><table v-if='!done' class="infotable">
  <tr class="infotr"><th class="infoth">u<sub>Q1</sub>(a)</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth" >a3</th></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong></td><td class="infotd"><input v-model = 'message[0]' type="text" @keypress = 'isNumber($event)' v-bind:style = 'wr1' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[3]' @keypress = 'isNumber($event)' v-bind:style = 'wr4' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[6]' @keypress = 'isNumber($event)' v-bind:style = 'wr7' size = '6' placeholder="0.000"></td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong></td><td class="infotd"><input v-model = 'message[1]' type="text" @keypress = 'isNumber($event)' v-bind:style = 'wr2' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[4]' @keypress = 'isNumber($event)' v-bind:style = 'wr5' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[7]' @keypress = 'isNumber($event)' v-bind:style = 'wr8' size = '6' placeholder="0.000"></td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong></td><td class="infotd"><input v-model = 'message[2]' type="text" @keypress = 'isNumber($event)' v-bind:style = 'wr3' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[5]' @keypress = 'isNumber($event)' v-bind:style = 'wr6' size = '6' placeholder="0.000"></td><td class="infotd"><input type="text" v-model = 'message[8]' @keypress = 'isNumber($event)' v-bind:style = 'wr9' size = '6' placeholder="0.000"></td></tr>

</table>
<table v-else class="infotable">
  <tr class="infotr"><th class="infoth">u<sub>Q1</sub>(a)</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth" >a3</th></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong></td><td class="infotd">{{matrix[0]}}</td><td class="infotd">{{matrix[3]}}</td><td class="infotd">{{matrix[6]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong></td><td class="infotd">{{matrix[1]}}</td><td class="infotd">{{matrix[4]}}</td><td class="infotd">{{matrix[7]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong></td><td class="infotd">{{matrix[2]}}</td><td class="infotd">{{matrix[5]}}</td><td class="infotd">{{matrix[8]}}</td></tr>

</table></td>
    </tr>
    <tr>
      <td>
        <table class="infotable">
          <tr class="infotr"><th class="infoth">C3</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth">a3</th></tr> <!--ряд с ячейками заголовков-->
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong><td class="infotd" style = "text-align:center">{{matrixcrit3[0]}}</td><td class="infotd">{{matrixcrit3[1]}}</td><td class="infotd">{{matrixcrit3[2]}}</td></tr>
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong><td class="infotd" style = "text-align:center">{{matrixcrit3[3]}}</td><td class="infotd">{{matrixcrit3[4]}}</td><td class="infotd">{{matrixcrit3[5]}}</td></tr>
          <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong><td class="infotd" style = "text-align:center">{{matrixcrit3[6]}}</td><td class="infotd">{{matrixcrit3[7]}}</td><td class="infotd">{{matrixcrit3[8]}}</td></tr>
        </table>
      </td>
<td>
<table class="infotable">
  <tr class="infotr"><th class="infoth">C4</th><th class="infoth">a1</th><th class="infoth">a2</th><th class="infoth">a3</th></tr> <!--ряд с ячейками заголовков-->
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a1</strong><td class="infotd" style = "text-align:center">{{matrixcrit4[0]}}</td><td class="infotd">{{matrixcrit4[1]}}</td><td class="infotd">{{matrixcrit4[2]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a2</strong><td class="infotd" style = "text-align:center">{{matrixcrit4[3]}}</td><td class="infotd">{{matrixcrit4[4]}}</td><td class="infotd">{{matrixcrit4[5]}}</td></tr>
  <tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>a3</strong><td class="infotd" style = "text-align:center">{{matrixcrit4[6]}}</td><td class="infotd">{{matrixcrit4[7]}}</td><td class="infotd">{{matrixcrit4[8]}}</td></tr>
</table>
</td>
<td>
  <table class="infotable" style = "margin:auto">
    <tr class="infotr"><tr class="infotr"><td class="infoth" style="background:#239A8E;color:white"><strong>W1</strong></td><td class="infoth" style = "text-align:center;background: #F8E391;color:black;">{{this.settings[0].w}}</td></tr>
    <tr class="infotr"><tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>W2</strong></td><td class="infotd" style = "text-align:center">{{this.settings[1].w}}</td></tr>
    <tr class="infotr"><tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>W3</strong></td><td class="infotd" style = "text-align:center">{{this.settings[2].w}}</td></tr>
      <tr class="infotr"><tr class="infotr"><td class="infotd" style="background:#239A8E;color:white"><strong>W4</strong></td><td class="infotd" style = "text-align:center">{{this.settings[3].w}}</td></tr>
  </table>
</td>
      </tr>
    </table>
  <button type="submit" class="knopka" name="check" @click = 'onAnswer(message)'>Проверить</button>
{{err}}
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
      console.log(this.matrix)
      if (message[0] === '' || Number(message[0]) !== this.matrix[0]) {
        this.wr1 = 'border-color: red'
        this.wrong[0] = false
        this.error += 1
      } else {
        this.wr1 = ''
        this.wrong[0] = true
      }
      if (message[1] === '' || Number(message[1]) !== this.matrix[1]) {
        this.wrong[1] = false
        this.wr2 = 'border-color: red'
        this.error += 1
      } else {
        this.wr2 = ''
        this.wrong[1] = true
      }
      if (message[2] === '' || Number(message[2]) !== this.matrix[2]) {
        this.wrong[2] = false
        this.wr3 = 'border-color: red'
        this.error += 1
      } else {
        this.wr3 = ''
        this.wrong[2] = true
      }
      if (message[3] === '' || Number(message[3]) !== this.matrix[3]) {
        this.wrong[3] = false
        this.wr4 = 'border-color: red'
        this.error += 1
      } else {
        this.wr4 = ''
        this.wrong[3] = true
      }
      if (message[4] === '' || Number(message[4]) !== this.matrix[4]) {
        this.wrong[4] = false
        this.wr5 = 'border-color: red'
        this.error += 1
      } else {
        this.wr5 = ''
        this.wrong[4] = true
      }
      if (message[5] === '' || Number(message[5]) !== this.matrix[5]) {
        this.wrong[5] = false
        this.wr6 = 'border-color: red'
        this.error += 1
      } else {
        this.wr6 = ''
        this.wrong[5] = true
      }
      if (message[6] === '' || Number(message[6]) !== this.matrix[6]) {
        this.wrong[6] = false
        this.wr7 = 'border-color: red'
        this.error += 1
      } else {
        this.wr7 = ''
        this.wrong[6] = true
      }
      if (message[7] === '' || Number(message[7]) !== this.matrix[7]) {
        this.wrong[7] = false
        this.wr8 = 'border-color: red'
        this.error += 1
      } else {
        this.wr8 = ''
        this.wrong[7] = true
      }
      if (message[8] === '' || Number(message[8]) !== this.matrix[8]) {
        this.wrong[8] = false
        this.wr9 = 'border-color: red'
        this.error += 1
      } else {
        this.wr9 = ''
        this.wrong[8] = true
      }
      this.mistake = true
      if (this.wrong[0] && this.wrong[1] && this.wrong[2] && this.wrong[3] && this.wrong[4] && this.wrong[5] && this.wrong[6] && this.wrong[7] && this.wrong[8]) {
        sessionStorage.setItem('arr6', JSON.stringify(this.message))
        this.$emit('success1', this.matrix)
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
    }
  },
  mounted () {
    if (sessionStorage.getItem('arr6')) {
      this.message = JSON.parse(sessionStorage.getItem('arr6'))
    }
  },
  watch: {
    message (newmessage) {

    }
  }
}
</script>

<style lang="css" scoped>
button.knopka {
 color: #fff;
 background: #239A8E;

 border-radius: 20px;
 border-color: #239A8E;
 }
 .infotable {

font-size: 14px;
border-radius: 10px;
border-spacing: 0;
text-align: center;
}
.infoth {
background: #239A8E;
color: white;

padding: 5px 20px;
}
.infoth, .infotd {
border-style: solid;
border-width: 0 1px 1px 0;
min-width: 70px;
border-color: white;
}
.infoth:first-child, .infotd:first-child {
text-align: left;
}
.infoth:first-child {
border-top-left-radius: 10px;
}
.infoth:last-child {
border-top-right-radius: 10px;
border-right: none;
}
.infotd {
padding: 5px 20px;
background: #F8E391;
}
.infotr:last-child .infotd:first-child {
border-radius: 0 0 0 10px;
}
.infotr:last-child .infotd:last-child {
border-radius: 0 0 10px 0;
}
.infotr .infotd:last-child {
border-right: none;
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
 .lefttimg{

     width: 350px;

 }
 .hat{

 }
 .form-group{
   width: 40%;
   text-align:center;
     background-color: #F8E391;
     border-radius: 5px;

 }
</style>
