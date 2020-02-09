<template>
  <div class="">
    <div class="head">
      Отчет
    </div>
  <div class="cell">
    1 задание 1 критерий: {{error[0]}}
  </div>
  <div class="cell">
    1 задание 2 критерий:  {{error[1]}}
  </div>
  <div class="cell">
    2 задание 1 критерий: {{error[2]}}
  </div>
  <div class="cell">
    2 задание 2 критерий: {{error[3]}}
  </div>
  <div class="cell">
    2 задание 3 критерий: {{error[4]}}
  </div>
  <div class="cell">
    2 задание 4 критерий: {{error[5]}}
  </div>
  <div class="cell">
    3 задание 1 критерий: {{error[6]}}
  </div>
  <div class="cell">
    3 задание 2 критерий: {{error[7]}}
  </div>
  <div class="cell">
    3 задание 3 критерий: {{error[8]}}
  </div>
  <div class="cell">
    3 задание 4 критерий: {{error[9]}}
  </div>
  <div class="cell">
    4 задание: {{error[10]}}
  </div>
  <div class="cell">
    5 задание:{{error[11]}}
  </div>
  <div class="cell">
    6 задание:{{error[12]}}
  </div>
  <div class="cell">
    7 задание:{{error[13]}}
  </div>
  <div class="cell">
    8 задание:{{error[14]}}
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      user: '',
      name: ''
    }
  },
  props: ['error'],
  methods: {
    check () {
      axios
        .get(`http://localhost:3000/api/create/${this.name}`)
        .then(response => (this.user = response.data))
    }
  }
}
</script>

<style lang="css" scoped>
  div {
    margin: 5px;
  }
  .head {
    font-size: 25px;
  }
  .cell {
    border: 1px solid black;
    width: 15vw;
  }
</style>
