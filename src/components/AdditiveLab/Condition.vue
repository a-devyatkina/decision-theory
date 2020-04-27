<template>
  <div class="goal">
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
    <p>Важность <strong>критериев (С<sub>i</sub>)</strong> была задана нечеткими числами с функциями принадлежности следующего вида:</p>
    <importance-table :table="condition.tables.importance" />
    <br>
    <p>Для оценки альтернатив использовались лингвистические значения:</p>
    <linguistic-table :table="condition.tables.linguistic" />
  </div>
</template>

<script>
export default {
  props: ['condition']
}
</script>

<style>
  .goal{
    font-size: 20px;
    margin-left: 200px;
  }
  .text-right{
    text-align: center;
  }
</style>
