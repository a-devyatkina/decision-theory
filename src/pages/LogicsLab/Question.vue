<template>
  <div>
    <h5>{{ question.question }}</h5>
    <div v-if='!done'>
      <q-checkbox v-for='(item, index) of question.answer' class='block__checkbox' :key='index' :label='item' v-model='array[index]'/>
      <q-btn @click='check()' color='secondary' label='Проверить'/>
      <p v-if='validation' style='color: red'>Выберите, по крайней мере, один вариант ответа</p>
    </div>
    <div v-else>
      <p v-for='(item, index) of question.answer'
        :key='index'
        :class='{ "not-user-answer" : !array[index] }'>
        {{ item }}
      </p>
      <p v-if='error' style='color: red'>Неверно</p>
      <button-next :total_step='total_step' :current_step='current_step' label='Продолжить'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  data () {
    return {
      validation: false,
      error: false,
      array: [false, false, false, false],
      done: false
    }
  },
  props: ['question', 'total_step', 'current_step', 'user_answer'],
  created () {
    if (this.user_answer !== 0) {
      this.array = this.user_answer
      this.done = true
      const right = this.question.right
      if (this.array.filter(function (item, i) { return item === true && i !== right }).length) {
        this.error = true
      }
    }
  },
  methods: {
    check: function () {
      const right = this.question.right
      if (this.array.every(value => value === false)) {
        this.validation = true
        this.error = false
      } else if (this.array.filter(function (item, i) { return item === true && i !== right }).length) {
        this.validation = false
        this.error = true
        this.$emit('error', this.array)
        this.done = true
      } else {
        this.validation = false
        this.error = false
        this.$emit('right', this.array)
        this.done = true
      }
    }
  }
}
</script>

<style>
  .block__checkbox {
    width: 100%;
  }

  .not-user-answer {
    font-size: 16px;
  }
</style>
