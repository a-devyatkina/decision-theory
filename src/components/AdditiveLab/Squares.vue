<template>
  <div class="q-pa-md">
    <q-table
      title="Нечеткие оценки альтернатив"
      :data="r_functions"
      :columns="r_columns"
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
        </q-td>
        <q-td key="top" :props="props">
          <div class="text-pre-wrap">{{ props.row.top }}</div>
        </q-td>
        <q-td key="end" :props="props">
          {{ props.row.end }}
        </q-td>
      </q-tr>
    </q-table>
    <br>
    <q-table
      title="Площади соответсвующих треугольников:"
      :data="squares"
      :columns="columns"
      ref='table'
      row-key="name"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="square" :props="props">
          {{ props.row.square }}
          <q-popup-edit :disable="checked" v-model="props.row.square">
            <q-input v-model="props.row.square" dense autofocus counter color="secondary"/>
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
  props: ['r_functions', 'step', 'correctStep'],
  data () {
    return {
      columns: [
        { name: 'name', align: 'left', label: 'Треугольник', field: 'name' },
        { name: 'square', align: 'center', label: 'Площадь', field: 'square' }
      ],
      squares: [
        {
          name: 'S1',
          square: ''
        },
        {
          name: 'S2',
          square: ''
        },
        {
          name: 'S3',
          square: ''
        }
      ],
      r_columns: [
        { name: 'alternative', align: 'left', label: 'Альтернатива', field: 'alternative' },
        { name: 'begin', align: 'center', label: '0', field: 'begin' },
        { name: 'top', align: 'center', label: '1', field: 'top' },
        { name: 'end', align: 'center', label: '0', field: 'end' }
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

      for (let alt = 0; alt < 3; alt++) {
        correct[alt] = {
          name: 'S' + (alt + 1),
          square: ((this.r_functions[alt]['end'] - this.r_functions[alt]['begin']) / 2).toFixed(2),
          __index: alt
        }
      }

      return correct
    }
  },
  methods: {
    check () {
      console.log(this.$refs)
      this.mistake = false
      this.squares.forEach((triangle, row) => {
        if (Math.abs(triangle.square - this.answer[row].square) > 0.05) {
          this.$refs.table.$children[2 + row].$children[1].$el.style = 'background-color: #FF0000'
          this.mistake = true
          this.$emit('error')
        } else {
          this.$refs.table.$children[2 + row].$children[1].$el.style = 'background-color: #FFFFFF'
        }
      })
      if (!this.mistake) {
        this.checked = true
        this.$emit('answer', this.answer)
        this.squares = this.answer
      }
    }
  },
  mounted () {
    // if (localStorage.squares) {
    //   this.squares = localStorage.squares
    // }

    if (this.correctStep >= this.step) {
      this.checked = true
      // this.$emit('answer', this.answer)
      this.squares = this.answer
    }
  },
  watch: {
    squares: {
      handler: function (oldSquares, newSquares) {
        localStorage.squares = JSON.stringify(newSquares)
      },
      deep: true
    }
  }
}
</script>
