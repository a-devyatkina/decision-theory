<template>
 <div>
<div class="outer">
  Вы приступаете к лабораторной работе по<br> теме метод отношения предпочтения
</div>

<br>
<button type="submit" class="knopka" @click="$emit('onStart')">Приступить</button>
</div>
</template>

<script>
export default {

  methods: {
    some () {
      alert(1)
    }
  }
}
</script>

<style lang="css" scoped>
button.knopka {
  color: #fff;
  background: #239A8E;
  padding: 5px;
  border-radius: 20px;
  border-color: #239A8E;
  top:10%;
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
  .outer{
    text-align: center;
    font-size: 50px;
    background: #239A8E;
    color: white;
    height:200px;
    width: 100%;
  }

</style>
