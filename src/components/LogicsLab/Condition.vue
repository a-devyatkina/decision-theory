<template>
    <div>
      <div class='text__italic'>{{ condition.goal }}</div>
      <h5>Критерии:</h5>
      <div v-for='index of range(4)' :key='index'>
          <p>{{ condition.criterion[index].description }}</p>
          <img :src='condition.criterion[index].path' width='500'>
      </div>
      <h5>Альтернативы:</h5>
      <div class="center">
        <div v-for='index of range(3)' :key='index' class='tables'>
          <q-table
            :title='condition.alternative[index].description'
            :columns='columns'
            :data='data(index)'
            separator='cell'
            hide-bottom
            :class='{ tables__table : index != 2 }'
          >
          </q-table><br>
        </div>
      </div>
      <h5>Правила:</h5>
      <div v-for='index of range(3)' :key='index'>
        d{{ index + 1 }}: {{ condition.rules.text[index] }}
      </div>
      <div>
        <br>
        <p>Представленные выше графики являются функциями принадлежности, отражающими  принадлежность соответствующего свойства альтернативы к множеству
        μ<sub>A</sub> «Подходящее (подходящая, подходящий)». Для расчета функции принадлежности свойства альтернативы к множеству «неподходящее» использовать классическое отрицание.</p>
        <p>Переменная Y задана на множестве J = {0; 0,1; 0,2; ...; 1}.</p>
        <p>Значения переменной Y заданы с помощью следующих функций принадлежности:</p>
        <p>S - удовлетворительный |=> μ(x) = х;</p>
        <p>Р - безупречный |=> μ(х) = 1, если х = 1, иначе 0;</p>
        <p>US - неудовлетворительный |=> μ(x) = 1 – х.</p>
      </div>
      <button-next label='Начать выполнение лабораторной работы'/>
    </div>
</template>

<script>
export default {
  name: 'condition',
  data () {
    return {
      columns: [
        { name: 'name', required: true, label: 'Название критерия', field: row => row.name, align: 'left' },
        { name: 'value', label: 'Значение критерия', field: 'value', align: 'right' }
      ]
    }
  },
  props: ['condition', 'total_step', 'current_step'],
  methods: {
    range (n) {
      return [...Array(n).keys()]
    },
    data (n) {
      const array = []
      for (let i = 0; i < 4; i++) {
        array.push({ name: this.condition.criterion[i].title, value: typeof this.condition.alternative[n][i + 1] === 'number' ? this.condition.alternative[n][i + 1] : this.condition.alternative[n][i + 1][0] })
      }
      return array
    }
  }
}
</script>

<style scoped>
  .text__italic {
    font-style: italic;
  }

  .tables {
    display: inline-table;
  }

  .tables__table {
    margin-right: 200px;
  }
</style>
