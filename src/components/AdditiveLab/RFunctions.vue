<template>
  <div class="q-pa-md">
    <q-table
      title="Оценки альтернатив"
      :data="altsEvals"
      :columns="evalColumns"
      row-key="name"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="criterion" :props="props">
          {{ props.row.criterion }}
        </q-td>
        <q-td ref="a1" key="a1" :props="props">
          {{ props.row.a1 }}
        </q-td>
        <q-td ref="a2" key="a2" :props="props">
          <div class="text-pre-wrap">{{ props.row.a2 }}</div>
        </q-td>
        <q-td ref="a3" key="a3" :props="props">
          {{ props.row.a3 }}
        </q-td>
        <q-td ref="importance" key="importance" :props="props">
          {{ props.row.importance }}
        </q-td>
      </q-tr>
    </q-table>
    <br>
    <q-table
      title="Нечеткие оценки альтернатив получили следующие функции принадлежности:"
      :data="r_functions"
      :columns="columns"
      row-key="name"
      ref='table'
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="alternative" :props="props">
          {{ props.row.alternative }}
        </q-td>
        <q-td key="begin" :props="props">
          {{ props.row.begin }}
          <q-popup-edit :disable="checked" v-model="props.row.begin">
            <q-input v-model.number="props.row.begin" type="number" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
        <q-td key="top" :props="props">
          <div class="text-pre-wrap">{{ props.row.top }}</div>
          <q-popup-edit :disable="checked" v-model="props.row.top">
            <q-input v-model.number="props.row.top" type="number" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
        <q-td key="end" :props="props">
          {{ props.row.end }}
          <q-popup-edit :disable="checked" v-model="props.row.end">
            <q-input v-model.number="props.row.end" type="number" dense autofocus counter color="secondary"/>
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
  props: ['altsEvals', 'step', 'correctStep', 'condition'],
  data () {
    return {
      columns: [
        { name: 'alternative', align: 'left', label: 'Альтернатива', field: 'alternative' },
        { name: 'begin', align: 'center', label: '0', field: 'begin' },
        { name: 'top', align: 'center', label: '1', field: 'top' },
        { name: 'end', align: 'center', label: '0', field: 'end' }
      ],
      r_functions: [
        {
          alternative: 'A1',
          begin: '',
          top: '',
          end: ''
        },
        {
          alternative: 'A2',
          begin: '',
          top: '',
          end: ''
        },
        {
          alternative: 'A3',
          begin: '',
          top: '',
          end: ''
        }
      ],
      evalColumns: [
        { name: 'criterion', align: 'left', label: 'Критерии', field: 'criterion' },
        { name: 'a1', align: 'center', label: this.condition.alternative[0].description.substr(this.condition.alternative[0].description.indexOf(' ') + 1), field: 'a1' },
        { name: 'a2', align: 'center', label: this.condition.alternative[1].description.substr(this.condition.alternative[1].description.indexOf(' ') + 1), field: 'a2' },
        { name: 'a3', align: 'center', label: this.condition.alternative[2].description.substr(this.condition.alternative[2].description.indexOf(' ') + 1), field: 'a3' },
        { name: 'importance', align: 'center', label: 'Важность', field: 'importance' }
      ],
      tables: {
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
      /* importance.push(1) */
      importance.push(1)
      importance.push(1)

      for (let alt = 0; alt < 3; alt++) {
        correct[alt] = {
          alternative: 'A' + (alt + 1)
        }

        let arr = ['begin', 'top', 'end']
        arr.forEach((item, index) => {
          let sum = 0
          for (let i = 0; i < this.altsEvals.length; i++) {
            console.log('this.altsEvals = ', this.altsEvals)
            let lingVal = this.tables.linguisticValues.indexOf(this.altsEvals[i]['a' + (alt + 1)])
            let first = parseFloat(linguistic[lingVal + index])

            let impVal = this.tables.importanceValues.indexOf(this.altsEvals[i]['importance'])
            let second = parseFloat(importance[impVal + index])

            sum += first + second
            console.log(`A${alt + 1}`, item, `step = ${i + 1}`, first, second, sum)
          }
          correct[alt][item] = sum.toFixed(2)
        })
        // correct[alt]['__index'] = alt
      }
      return correct
    }
  },
  methods: {
    check () {
      this.mistake = false
      let cols = ['begin', 'top', 'end']
      this.r_functions.forEach((rfunc, row) => {
        cols.forEach((point, col) => {
          if (Math.abs(rfunc[point] - this.answer[row][point]) > 0.05) {
            this.$refs.table.$children[4 + row].$children[1 + col].$el.style = 'background-color: #FF0000'
            this.mistake = true
          } else {
            this.$refs.table.$children[4 + row].$children[1 + col].$el.style = 'background-color: #FFFFFF'
          }
        })
      })
      if (!this.mistake) {
        this.checked = true
        this.$emit('answer', this.answer)
        this.r_functions = this.answer
      } else {
        this.$emit('error', 2)
      }
      /* this.checked = true
      this.$emit('answer', this.answer)
      this.r_functions = this.answer */
    }
  },
  mounted () {
    if (this.correctStep >= this.step) {
      this.checked = true
      this.r_functions = this.answer
    }
    console.log('rfunctions:')
    console.log(this.altsEvals)
  },
  watch: {
    r_functions: {
      handler: function (oldFuncs, newFuncs) {
        localStorage.r_functions = JSON.stringify(newFuncs)
      },
      deep: true
    }
  }
}
</script>
