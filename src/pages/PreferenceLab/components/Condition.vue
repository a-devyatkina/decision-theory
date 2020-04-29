<template>
  <div class="goal">
    <h3>
      Найдите наилучшую альтернативу
    </h3>
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
    <FillTable v-for = '(item, index) in alternative' v-bind:key='index'
    :data = 'item'
    :columns = 'columns'
    :title = 'condition.alternative[index].description'
    />
    <FillTable
    :data = 'weightValue'
    :columns = 'columns'
    title = 'Веса'
    />
  </div>
</template>

<script>
export default {
  props: ['condition'],
  data () {
    return {
      columns: [
        {
          name: 'desc',
          required: true,
          align: 'left',
          field: row => row.name
        },
        { name: 'Значение', label: 'Значение', field: 'value' }
      ]
    }
  },
  computed: {
    alternative: function () {
      const alternativeArr = []
      for (let i = 0; i < this.condition.alternative.length; i++) {
        const obj = {}
        const arr = []
        for (let j = 0; j < 4; j++) {
          obj.name = this.condition.criterion[j].tytle
          if ((this.condition.alternative[i][j + 1].length)) {
            obj.value = this.condition.alternative[i][j + 1][0]
          } else {
            obj.value = this.condition.alternative[i][j + 1]
          }
          arr.push({ ...obj })
        }
        alternativeArr.push(arr)
      }
      return alternativeArr
    },
    weightValue: function () {
      const arr = []
      if (this.condition.weight) {
        for (let i = 0; i < this.condition.weight.length; i++) {
          arr.push({
            name: this.condition.criterion[i].tytle,
            value: this.condition.weight[i]
          })
        }
      }
      return arr
    }
  }
}
</script>

<style>
  .goal{
    font-size: 20px;
  }
  .text-right{
    text-align: center;
  }
</style>
