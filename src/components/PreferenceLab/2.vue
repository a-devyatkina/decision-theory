<template lang="html">
  <div class="">

  <div class="" style="text-align:center; padding: 5px">
    <font size = '5' class="" >
      Получите значения каждой альтернативы
    </font>
  </div>
  {{settings.crit}}
    <table>
      <tr>
        <td><img v-bind:src="settings.path" width="400"/></td>
<td>
<table class="infotable">
  <tr class="infotr"><th class="infoth">альтернатива a1</th><th class="infoth">альтернатива a2</th><th class="infoth">альтернатива a3</th></tr> <!--ряд с ячейками заголовков-->
  <tr class="infotr"><td class="infotd">{{settings.value[0]}}</td><td class="infotd">{{settings.value[1]}}</td><td class="infotd">{{settings.value[2]}}</td></tr>
</table>
</td>
      </tr>
    </table>

      <br>

      <span v-html= "settings.func">
      </span>
        <br>
    <div class="" v-if = 'settings.k'>
      K = {{settings.k[0]}}
    </div>
    <div v-if='!done'>
    <input type="func" name = 'k1' class="div-group" v-model = 'message1' placeholder="0.000"  @keypress = 'isNumber($event)' v-bind:style = 'wr1'>
    <input type="func" name = 'k2' class="div-group" v-model = 'message2' placeholder="0.000 " @keypress = 'isNumber($event)' v-bind:style = 'wr2'>
    <input type="func" name = 'k3' class="div-group" v-model = 'message3' placeholder="0.000" @keypress = 'isNumber($event)' v-bind:style = 'wr3'>
    {{err}}
          <br>
          <br>
  <button type="submit" class="knopka" name="check" value="true" @click = 'onAnswer(message1, message2, message3)' >Проверить</button>
</div>
  <div v-else>
    {{settings.answers[0]}}
    {{settings.answers[1]}}
    {{settings.answers[2]}}
  </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      message1: '',
      message2: '',
      message3: '',
      wrong1: true,
      wrong2: true,
      wrong3: true,
      wr1: '',
      wr2: '',
      wr3: '',
      err: '',
      mistake: true,
      error: 0
    }
  },
  props: ['settings', 'next', 'last', 'crit', 'done'],
  methods: {
    onAnswer (ok1, ok2, ok3) {
      if (this.settings.answers[0] !== Number(ok1)) {
        this.wrong1 = false
        this.wr1 = 'border-color: red'
        this.error += 1
      } else {
        this.wr1 = ''
        this.wrong1 = true
      }
      if (this.settings.answers[1] !== Number(ok2)) {
        this.wrong2 = false
        this.wr2 = 'border-color: red'
        this.error += 1
      } else {
        this.wr2 = ''
        this.wrong2 = true
      }
      if (this.settings.answers[2] !== Number(ok3)) {
        this.wrong3 = false
        this.wr3 = 'border-color: red'
        this.error += 1
      } else {
        this.wr3 = ''
        this.wrong3 = true
      }
      this.mistake = true
      if (this.wrong1 && this.wrong2 && this.wrong3) {
        sessionStorage.setItem('message1' + this.crit, ok1)
        sessionStorage.setItem('message2' + this.crit, ok2)
        sessionStorage.setItem('message3' + this.crit, ok3)
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
    if (sessionStorage.getItem('message1' + this.crit)) {
      this.message1 = sessionStorage.getItem('message1' + this.crit)
    }
    if (sessionStorage.getItem('message2' + this.crit)) {
      this.message2 = sessionStorage.getItem('message2' + this.crit)
    }
    if (sessionStorage.getItem('message3' + this.crit)) {
      this.message3 = sessionStorage.getItem('message3' + this.crit)
    }
  },
  watch: {
    message1 (newmessage) {

    },
    message2 (newmessage) {

    },
    message3 (newmessage) {

    }
  }

}

</script>

<style lang="css" scoped>
body{

   }
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

padding: 10px 20px;
}
.infoth, .infotd {
border-style: solid;
border-width: 0 1px 1px 0;
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
padding: 10px 20px;
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
