<template>
    <div class="wrapper">
        <router-link class="startBtn" to="/implementation">Начать выполнение лабораторной работы</router-link>
    </div>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style>
  .wrapper{
    margin: 250px;
    text-align: center;
  }
  .startBtn{
    -moz-box-shadow: 0px 10px 14px -7px #1c7d73;
    -webkit-box-shadow: 0px 10px 14px -7px #1c7d73;
    box-shadow: 0px 10px 14px -7px #1c7d73;
    background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #26a69a), color-stop(1, #219186));
    background:-moz-linear-gradient(top, #26a69a 5%, #219186 100%);
    background:-webkit-linear-gradient(top, #26a69a 5%, #219186 100%);
    background:-o-linear-gradient(top, #26a69a 5%, #219186 100%);
    background:-ms-linear-gradient(top, #26a69a 5%, #219186 100%);
    background:linear-gradient(to bottom, #26a69a 5%, #219186 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#26a69a', endColorstr='#219186',GradientType=0);
    background-color:#26a69a;
    -moz-border-radius:8px;
    -webkit-border-radius:8px;
    border-radius:8px;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:20px;
    font-weight:bold;
    padding:13px 32px;
    text-decoration:none;
    text-shadow:0px 1px 0px #3d768a;
}
.startBtn:hover {
    background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #219186), color-stop(1, #26a69a));
    background:-moz-linear-gradient(top, #219186 5%, #26a69a 100%);
    background:-webkit-linear-gradient(top, #219186 5%, #26a69a 100%);
    background:-o-linear-gradient(top, #219186 5%, #26a69a 100%);
    background:-ms-linear-gradient(top, #219186 5%, #26a69a 100%);
    background:linear-gradient(to bottom, #219186 5%, #26a69a 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#219186', endColorstr='#26a69a',GradientType=0);
    background-color:#219186;
}
.startBtn:active {
    position:relative;
    top:1px;
}

</style>
