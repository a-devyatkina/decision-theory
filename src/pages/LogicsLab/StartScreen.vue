<template>
  <div class="goal parent">
    <div v-if="!check">
      Введите ваше имя и фамилию
      <input v-model="name"/>
      <button class="bu" @click="checkname()">Проверить наличие пользователя</button>
    </div>
    <div v-if="check">
      <div v-if="find">Существующий пользователь</div>
      <router-link v-if="find" :to="{name: 'implementation', params: {name: name}}" class="q-btn">Продолжить выполнение лабораторной работы 3б</router-link>
      <div v-if="!find">Новый пользователь</div>
      <router-link v-if="!find" @click.native="savevariant()" :to="{name: 'implementation', params: {name: name}}" class="q-btn">Подтвердить и начать выполнение лабораторной работы 3б</router-link>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      name: '',
      find: false,
      check: false,
    }
  },
  methods: {
    savevariant(){
      axios
        .get(`http://localhost:3000/variant?name=${this.name}`)
        .then();
    },
    checkname(){
      if (this.name) {
        axios
          .get(`http://localhost:3000/name?name=${this.name}`)
          .then(responce => (this.find = responce.data));
        this.check = true
      }
    }
  }
}
</script>

<style>
.parent {
  font-size: 20px;
  background: #30CDE8;
  border: 2px solid #1CAFCA;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  height: 120px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -60px;
}
</style>
