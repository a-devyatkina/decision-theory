<template>
  <div class="parent">
    Вы закончили лабораторную работу<br>
    Количество ошибок: {{count}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: sessionStorage.count
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
