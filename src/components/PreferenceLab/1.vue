<template>
  <div>
    <div v-if = 'show'>
     <div class="" style="text-align:center; padding: 5px">
       <font size = '5' class="" >
         Восстановите функцию
       </font>
     </div>
     {{settings.crit}}
       <table>
         <tr>
              <td><img v-bind:src="settings.path" width="400"/>
        </td>
    <td>

    </td>
         </tr>
       </table>

      <span v-html= "settings.func">
      </span>
      <br>
      <div v-if="!done">
       K = <input name = 'k' @keypress = 'isNumber($event, message)' v-model = 'message' class="div-group" placeholder="0.000" v-bind:style = 'wr'>
       {{comment}}
       <br>
       <br>
            <button type="submit" class="knopka" name="check" value="true" @click = 'onAnswer(message)'>Проверить</button>
     </div>
     <div v-else>
       {{settings.k[0]}}
    </div>
  </div>

  </div>

</template>

<script>

export default {
  data () {
    return {
      message: '',
      show: true,
      wrong: false,
      comment: '',
      wr: ''
    }
  },
  props: ['settings', 'next', 'last', 'crit', 'done'],
  methods: {
    onAnswer (ok) {
      console.log(this.done)
      if (!isNaN(ok)) {
        if (this.settings.k[0] === Number(ok)) {
          this.$emit('success1')
          this.wrong = false
          this.comment = ''
          sessionStorage.setItem('message' + this.crit, ok)
        } else {
          this.comment = 'Неверный ответ'
          this.wrong = true
          this.wr = 'border-color: red'
          this.$emit('err', 1)
        }
      } else {
        this.comment = 'Некорректный ввод'
        this.wrong = false
        this.wr = ''
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
    if (sessionStorage.getItem('message' + this.crit)) {
      this.message = sessionStorage.getItem('message' + this.crit)
    }
  },
  watch: {
    message (newmessage) {
      if (isNaN(newmessage)) {
        this.message = sessionStorage.getItem('message' + this.crit)
      }
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
  width: 25%;
    background-color: #F8E391;
    border-radius: 5px;
}

.fade-enter{
    transform :  translateX(100%);
  }
 .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    transform :  translateX(-100%);
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s ease-in-out;
}

</style>
