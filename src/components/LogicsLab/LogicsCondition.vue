<template>
  <div class="goal">
    {{ condition.goal }}<br>
    Критерии:<br>
    <p>{{ condition.criterion[0].description }}</p>
    <img :src="condition.criterion[0].path" width="500"/><br>
    <p>{{ condition.criterion[1].description }}</p>
    <img :src="condition.criterion[1].path" width="500"/>
    <p>{{ condition.criterion[2].description }}</p>
    <img :src="condition.criterion[2].path" width="500"/>
    <p>{{ condition.criterion[3].description }}</p>
    <img :src="condition.criterion[3].path" width="500"/>
    <p>Альтернативы:</p>
    {{ condition.alternative[0].description }}<br>
    {{ condition.criterion[0].tytle }}: {{ condition.alternative[0][1] }}<br>
    {{ condition.criterion[1].tytle }}: {{ condition.alternative[0][2] }}<br>
    {{ condition.criterion[2].tytle }}: {{ condition.alternative[0][3][0] }}<br>
    {{ condition.criterion[3].tytle }}: {{ condition.alternative[0][4][0] }}<br><br>
    {{ condition.alternative[1].description }}<br>
    {{ condition.criterion[0].tytle }}: {{ condition.alternative[1][1] }}<br>
    {{ condition.criterion[1].tytle }}: {{ condition.alternative[1][2] }}<br>
    {{ condition.criterion[2].tytle }}: {{ condition.alternative[1][3][0] }}<br>
    {{ condition.criterion[3].tytle }}: {{ condition.alternative[1][4][0] }}<br><br>
    {{ condition.alternative[2].description }}<br>
    {{ condition.criterion[0].tytle }}: {{ condition.alternative[2][1] }}<br>
    {{ condition.criterion[1].tytle }}: {{ condition.alternative[2][2] }}<br>
    {{ condition.criterion[2].tytle }}: {{ condition.alternative[2][3][0] }}<br>
    {{ condition.criterion[3].tytle }}: {{ condition.alternative[2][4][0] }}<br><br>
    Правила:<br>
    d1 : {{ condition.rules.text[0] }}<br>
    d2 : {{ condition.rules.text[1] }}<br>
    d3 : {{ condition.rules.text[2] }}<br><br>
    Представленные выше графики являются функциями принадлежности, отражающими  принадлежность соответствующего свойства альтернативы к множеству
    μ<sub>A</sub> «Подходящее (подходящая, подходящий)». Для расчета функции принадлежности свойства альтернативы к множеству «неподходящее» использовать классическое отрицание.<br>
    Переменная Y задана на множестве J = {0; 0,1; 0,2; ...; 1}.<br>
    Значения переменной Y заданы с помощью следующих функций принадлежности:<br>
    S = удовлетворительный -            μ(x) = х;<br>
    Р = безупречный -                   μ(х) = 1, если х = 1, иначе 0;<br>
    US = неудовлетворительный -          μ(x) = 1 – х.<br>
    <button class="bu" @click="$emit('continue')">
      Начать
    </button>
  </div>
</template>

<script>
export default {
  props: {
    condition: Object
  }
}
</script>

<style>
  .bu {
    color: #fff;
    background: #239A8E;
    padding: 5px;
    border-radius: 20px;
    border-color: #239A8E;
    margin: 5px;
  }
  .goal{
    font-size: 20px;
    margin-left: 200px;
  }
</style>
