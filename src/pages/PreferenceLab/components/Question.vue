<template>
  <div>
    <div class = 'goal'>
      <h5>{{ question.question }}</h5>
      <img v-if="question.path" :src="question.path" />
        <div v-if='!done'>
          <div v-for="(item, index) in question.answer" v-bind:key='index'>
            <q-checkbox  v-model='arr[index]' :label='item'/>
          </div>
          <p v-if='validation' style='color: red'>Выберите, по крайней мере, один вариант ответа</p>
          <p v-if='err' style='color: red'>Неверно</p>
          <q-btn class='bu' @click='check()' label='Проверить' color="secondary"/>
        </div>
        <div v-if='done'>
          <p v-for="(item, index) in question.answer" v-bind:key='index'>{{ item }}</p>
          <p v-if='err' style="font-size: 16px; color: red">Вы допустили ошибку</p>
          <p v-else style="font-size: 16px; color: green">Верно</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'done'],
  data () {
    return {
      validation: false,
      arr: [false, false, false, false],
      err: false
    }
  },
  methods: {
    check () {
      if (!this.checkValid()) {
        this.err = false
        this.validation = true
      } else if (!this.arr[this.question.right] || !this.checkArr()) {
        this.$emit('error')
        this.$emit('success')
        this.err = true
      } else {
        this.$emit('success')
      }
    },
    checkArr () {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i] && this.question.right !== i) {
          return false
        }
      }
      return true
    },
    checkValid () {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i]) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>
</style>
