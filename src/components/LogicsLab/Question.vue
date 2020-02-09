<template>
  <div>
    <div class = 'goal'>
      {{question.right}}
      {{arr}}
      <br><br><br><br><br><br>
        <div v-if='step<number'>
          <p><b>{{ question.question }}</b></p>
          <input type='checkbox' style='width: 16px; height: 16px;' value='0' v-model='arr'>{{ question.answer[0] }}<br>
          <input type='checkbox' style='width: 16px; height: 16px;' value='1' v-model='arr'>{{ question.answer[1] }}<br>
          <input type='checkbox' style='width: 16px; height: 16px;' value='2' v-model='arr'>{{ question.answer[2] }}<br>
          <input type='checkbox' style='width: 16px; height: 16px;' value='3' v-model='arr'>{{ question.answer[3] }}<br>
          <p v-if='validation' style='color: red'>Выберите, по крайней мере, один вариант ответа</p>
          <p v-if='err' style='color: red'>Неверно</p>
          <button class='bu' @click='$emit("back")'>
            Назад
          </button>
          <button class='bu' @click='check()'>
            Проверить
          </button>
        </div>
        <div v-if='step>=number'>
          <p><b>{{ question.question }}</b></p>
          <p v-if='(question.right==0)' style="font-size: 20px">{{ question.answer[0] }}</p>
          <p v-if='!(question.right==0)' style="font-size: 16px">{{ question.answer[0] }}</p>
          <p v-if='(question.right==1)' style="font-size: 20px">{{ question.answer[1] }}</p>
          <p v-if='!(question.right==1)' style="font-size: 16px">{{ question.answer[1] }}</p>
          <p v-if='(question.right==2)' style="font-size: 20px">{{ question.answer[2] }}</p>
          <p v-if='!(question.right==2)' style="font-size: 16px">{{ question.answer[2] }}</p>
          <p v-if='(question.right==3)' style="font-size: 20px">{{ question.answer[3] }}</p>
          <p v-if='!(question.right==3)' style="font-size: 16px">{{ question.answer[3] }}</p>
          <p v-if='err' style="font-size: 16px; color: red">Вы допустили ошибку</p>
          <button class='bu' @click='$emit("back")'>
            Назад
          </button>
          <button class='bu' @click='$emit("forward")'>
            Продолжить
          </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['number', 'question', 'mark', 'step'],
  data () {
    return {
      validation: false,
      err: false,
      arr: []
    }
  },
  methods: {
    check () {
      if (this.arr.length === 0) {
        this.err = false
        this.validation = true
      } else if (Number(this.arr[0]) !== this.question.right || this.arr.length !== 1) {
        console.log('hi')
        this.$emit('continue')
        this.err = true
        this.mark -= 8
      } else {
        this.$emit('continue')
      }
    }
  }
}
</script>

<style>
</style>
