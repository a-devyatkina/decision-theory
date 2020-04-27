<template>
  <div class="q-pa-md">
    <importance-table :table='condition.tables.importance' />
    <br>
    <linguistic-table :table='condition.tables.linguistic' />
    <br>
    <q-table
      title="Укажите оценки альтернатив по следующему критерию:"
      :data="evals"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="criterion" :props="props">
          {{ props.row.criterion }}
        </q-td>
        <q-td ref="a1" key="a1" :props="props">
          {{ props.row.a1 }}
          <q-popup-edit :disable="checked" v-model="props.row.a1">
            <q-input v-model="props.row.a1" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
        <q-td ref="a2" key="a2" :props="props">
          <div class="text-pre-wrap">{{ props.row.a2 }}</div>
          <q-popup-edit :disable="checked" v-model="props.row.a2">
            <q-input v-model="props.row.a2" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
        <q-td ref="a3" key="a3" :props="props">
          {{ props.row.a3 }}
          <q-popup-edit :disable="checked" v-model="props.row.a3">
            <q-input v-model="props.row.a3" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
        <q-td ref="importance" key="importance" :props="props">
          {{ props.row.importance }}
          <q-popup-edit :disable="checked" v-model="props.row.importance">
            <q-input v-model="props.row.importance" style="max-width: 300px" dense autofocus counter maxlength="3" color="secondary"/>
          </q-popup-edit>
        </q-td>
      </q-tr>
    </q-table>
    <br>
    <h5 v-if="mistake">Проверьте ответы. У вас ошибка!</h5>
    <br>
    <q-btn class='q-px-lg' color="secondary" label="Продолжить" @click="check"/>
    <q-btn flat class='q-px-lg' color="secondary" label="Назад" style='margin: 25px' @click="$emit('back')"/>
  </div>
</template>

<script>
export default {
  props: ['condition', 'cr', 'step', 'correctStep', 'funcAnswers'],
  data () {
    return {
      columns: [
        { name: 'criterion', align: 'left', label: 'Критерии', field: 'criterion' },
        { name: 'a1', align: 'center', label: this.condition.alternative[0].description.substr(this.condition.alternative[0].description.indexOf(' ') + 1), field: 'a1' },
        { name: 'a2', align: 'center', label: this.condition.alternative[1].description.substr(this.condition.alternative[1].description.indexOf(' ') + 1), field: 'a2' },
        { name: 'a3', align: 'center', label: this.condition.alternative[2].description.substr(this.condition.alternative[2].description.indexOf(' ') + 1), field: 'a3' },
        { name: 'importance', align: 'center', label: 'Важность', field: 'importance' }
      ],
      evals: [
        { criterion: this.condition.criterion[this.cr].tytle.substr(this.condition.criterion[this.cr].tytle.indexOf(' ') + 1), a1: '', a2: '', a3: '', importance: '' }
      ],
      // importance: [
      //   { level: 'Важный', abbr: 'В', begin: 0.4, top: 0.7, end: 0.1 },
      //   { level: 'Очень важный', abbr: 'ОВ', begin: 0.7, top: 1, end: 1 },
      //   { level: 'Не очень важный', abbr: 'НОВ', begin: 0.1, top: 0.4, end: 0.7 }
      // ],
      // importanceColumns: [
      //   { name: 'level', align: 'left', field: 'level' },
      //   { name: 'abbr', align: 'center', field: 'abbr' },
      //   { name: 'begin', align: 'center', label: '0', field: 'begin' },
      //   { name: 'top', align: 'center', label: '1', field: 'top' },
      //   { name: 'end', align: 'center', label: '0', field: 'end' }
      // ],
      // linguistic: [
      //   { level: 'Очень низкий', abbr: 'ОН', begin: 0, top: 0, end: 0.3 },
      //   { level: 'Низкий', abbr: 'Н', begin: 0.1, top: 0.3, end: 0.5 },
      //   { level: 'Средний', abbr: 'С', begin: 0.3, top: 0.5, end: 0.7 },
      //   { level: 'Высокий', abbr: 'В', begin: 0.5, top: 0.75, end: 1 },
      //   { level: 'Очень высокий', abbr: 'ОВ', begin: 0.75, top: 1, end: 1 }
      // ],
      tables: {
        condition: [
          // [0.86, 0.57, 0.14, 0.078],
          // [0.46, 0.92, 0.29, 0.558],
          // [0.29, 0.71, 0.43, 0.136],
          // [0.2, 0.07, 0.3, 0.228]
          [0.34, 0.82, 0.24, 0.24],
          [0.86, 0.72, 0.67, 0.16],
          [0.34, 0.82, 0.24, 0.45],
          [0.5, 0.25, 0.5, 0.15]
        ],
        importance: [0.1, 0.4, 0.7, 1],
        linguistic: [0.1, 0.3, 0.5, 0.75, 1],
        linguisticValues: ['ОН', 'Н', 'С', 'В', 'ОВ'],
        importanceValues: ['НОВ', 'В', 'ОВ']
      },
      mistake: false,
      checked: false
    }
  },
  computed: {
    answer () {
      let correct = []

      let linguistic = [...this.condition.tables.linguistic]
      /* linguistic.unshift(0)
      linguistic.push(1) */
      // linguistic.unshift(0)
      if (linguistic.length === 4) {
        linguistic.unshift(0)
      }
      linguistic.push(1)
      linguistic.push(1)

      let importance = [...this.condition.tables.importance]
      importance.push(1)
      importance.push(1)
      // correct[this.cr] = {
      correct[0] = {
        criterion: 'C' + (this.cr + 1)
      }

      for (let alt = 0; alt < 3; alt++) {
        let max = 0
        let value = 0
        // correct[this.cr]['a' + (alt + 1)] = this.tables.linguisticValues[0]
        correct[0]['a' + (alt + 1)] = this.tables.linguisticValues[0]
        for (let i = 1; i < linguistic.length - 1; i++) {
          // value = Number(this.membership(this.funcAnswers[this.cr][alt], parseFloat(linguistic[i - 1]), parseFloat(linguistic[i]), parseFloat(linguistic[i + 1])).toFixed(2))
          value = this.membership(this.funcAnswers[this.cr][alt], linguistic[i - 1], linguistic[i], linguistic[i + 1]).toFixed(2)

          if (value > max) {
            max = value
            // correct[this.cr]['a' + (alt + 1)] = this.tables.linguisticValues[i - 1]
            correct[0]['a' + (alt + 1)] = this.tables.linguisticValues[i - 1]
          }
        }
      }

      let max = 0
      let value = 0
      correct[0]['importance'] = this.tables.importanceValues[0]
      for (let i = 1; i < importance.length - 1; i++) {
        // value = Number(this.membership(parseFloat(this.condition.weight[this.cr]), parseFloat(importance[i - 1]), parseFloat(importance[i]), parseFloat(importance[i + 1])).toFixed(2))
        value = this.membership(this.condition.weight[this.cr], importance[i - 1], importance[i], importance[i + 1]).toFixed(2)
        if (value > max) {
          max = value
          correct[0]['importance'] = this.tables.importanceValues[i - 1]
        }
      }
      correct[0]['__index'] = this.cr
      return correct
    }
  },
  methods: {
    check () {
      // if (this.correctStep >= this.step) {
      //   this.$emit('answer', this.answer)
      // }

      this.mistake = false

      for (let alt in this.$refs) {
        // console.log(`this.evals[${alt}] = ${this.evals[0][alt].trim().toUpperCase()}`)
        // if (this.evals[0][alt].trim().toUpperCase() !== this.answer[this.cr][alt]) {
        // if (this.evals[this.cr][alt].trim().toUpperCase() !== this.answer[this.cr][alt]) {
        if (this.evals[0][alt].trim().toUpperCase() !== this.answer[0][alt]) {
          this.$refs[alt].$el.style = 'background-color: #FF0000'
          this.mistake = true
        } else {
          this.$refs[alt].$el.style = 'background-color: #FFFFFF'
        }
      }
      if (!this.mistake) {
        this.checked = true
        this.$emit('answer', this.answer)
        this.evals = this.answer
      } else {
        this.$emit('error', 2)
      }
      // console.log('in check')
      // console.log(this.answer)
      // this.checked = true
      // this.$emit('answer', this.answer)
      // this.evals = this.answer
    },
    membership (val, left, middle, right) {
      if (val < left || val > right) return 0
      if (val <= middle) {
        return (val - left) / (middle - left)
      }
      return (val - right) / (middle - right)
    }
  },
  mounted () {
    // if (localStorage.getItem('evals' + this.cr)) {
    //   this.evals = JSON.parse(localStorage.getItem('evals' + this.cr))
    // }
    if (this.correctStep >= this.step) {
      this.checked = true
      this.evals = this.answer
    }
  },
  watch: {
    evals: {
      handler: function (oldEvals, newEvals) {
        localStorage.setItem('evals' + this.cr, JSON.stringify(newEvals))
      },
      deep: true
    }
  }
}
</script>
