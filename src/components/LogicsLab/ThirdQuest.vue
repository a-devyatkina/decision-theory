<template>
  <div>
    <div class = "goal">
        <br><br><br><br><br><br>
          <p><b>Какое из выражений является правилом Лукасевича, если μ<sub>A</sub>-значение свойства, а μ<sub>В</sub>-значение переменной?</b></p>
          <input type="checkbox" style="width: 16px; height: 16px;" value="incorrect1" v-model="checkwrong3">max(μ<sub>A</sub>,μ<sub>B</sub>)<br>
          <input type="checkbox" style="width: 16px; height: 16px;" value="true" v-model="checkright3">min(1,1-μ<sub>A</sub>+μ<sub>B</sub>)<br>
          <input type="checkbox" style="width: 16px; height: 16px;" value="incorrect2" v-model="checkwrong3">max(μ<sub>A</sub>+μ<sub>B</sub>,1)<br>
          <input type="checkbox" style="width: 16px; height: 16px;" value="incorrect3" v-model="checkwrong3">min(μ<sub>A</sub>-μ<sub>B</sub>,1)<br>
          <p v-if="validation" style="color: red">Выберите, по крайней мере, один вариант ответа</p>
          <p v-if="err" style="color: red">Неверно</p>
          <button class="bu" @click="$emit('back')">
            Назад
          </button>
          <button class="bu" @click="check()">
            Проверить
          </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkright3: false,
      checkwrong3: [],
      validation: false,
      err: false,
      back: false
    }
  },
  methods: {
    check () {
      if (this.checkright3 === false && this.checkwrong3.length === 0) {
        this.err = false
        this.validation = true
      } else if (this.checkright3 !== true || this.checkwrong3.length !== 0) {
        this.$emit('err')
        this.err = true
        this.validation = false
      } else {
        this.$emit('right')
      }
    }
  },
  mounted () {
    if (sessionStorage.checkright3) {
      this.checkright3 = Boolean(sessionStorage.checkright3)
    }
  },
  watch: {
    checkright3 (newcheckright3) {
      sessionStorage.checkright3 = newcheckright3
    }
  }
}
</script>

<style>
</style>
