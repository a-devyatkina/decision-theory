<template>
  <div class="q-pa-xs">
    <q-table
      title="Координаты:"
      :data="coords"
      :columns="coordsColumns"
      ref='coords'
      row-key="name"
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="coord" :props="props">
          {{ props.row.coord }}
          <q-popup-edit :disable="checked" v-model="props.row.coord">
            <q-input v-model="props.row.coord" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
      </q-tr>
    </q-table>
    <br><br>
    <q-table
      title="Оценки альтернатив:"
      :data="rating"
      :columns="ratingColumns"
      row-key="name"
      ref='rating'
      hide-bottom
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="rating" :props="props">
          {{ props.row.rating }}
          <q-popup-edit :disable="checked" v-model="props.row.rating">
            <q-input v-model.number="props.row.rating" type='number' dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
      </q-tr>
    </q-table>
    <h5>Оптимальной является альтернатива под номером:</h5>
    <q-input
      v-model.number="altNum"
      type="number"
      filled
      outlined
      style="max-width: 100px"
      ref="input"
      :disable="checked"
      color="secondary"
      :step="1"
      prefix="№"
    />
    <br>
    <h5 v-if="mistake">Проверьте ответы. У вас ошибка!</h5>
    <q-btn class='q-px-lg' color="secondary" label="Продолжить" @click="check"/>
    <q-btn flat class='q-px-lg' color="secondary" label="Назад" style='margin: 25px' @click="$emit('back')"/>
  </div>
</template>

<script>
export default {
  props: ['squares', 'step', 'correctStep', 'r_functions'],
  data () {
    return {
      coordsColumns: [
        { name: 'name', align: 'left', label: 'Точка', field: 'name' },
        { name: 'coord', align: 'center', label: 'Координата', field: 'coord' }
      ],
      coords: [
        {
          name: 'x1',
          coord: ''
        },
        {
          name: 'x2',
          coord: ''
        },
        {
          name: 'x3',
          coord: ''
        }
      ],
      ratingColumns: [
        { name: 'name', align: 'left', label: 'Альтернатива', field: 'name' },
        { name: 'rating', align: 'center', label: 'Оценка', field: 'rating' }
      ],
      rating: [
        {
          name: 'a1',
          rating: ''
        },
        {
          name: 'a2',
          rating: ''
        },
        {
          name: 'a3',
          rating: ''
        }
      ],
      altNum: 0,
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
    answerCoords () {
      let correct = []

      for (let alt = 0; alt < 3; alt++) {
        correct[alt] = {
          name: 'x' + (alt + 1)
        }

        let a = 0
        if ((this.r_functions[alt]['end'] - this.r_functions[alt]['top']) > (this.r_functions[alt]['top'] - this.r_functions[alt]['begin'])) {
          a = this.r_functions[alt]['end']
          correct[alt]['coord'] = (Math.abs(Math.sqrt(this.squares[alt]['square'] * (a - this.r_functions[alt]['top'])) - a)).toFixed(2)
        } else {
          a = this.r_functions[alt]['begin']
          correct[alt]['coord'] = (Math.sqrt(this.squares[alt]['square'] * this.r_functions[alt]['top'] - a * (this.squares[alt]['square'] - a))).toFixed(2)
        }
        correct[alt]['__index'] = alt
      }
      return correct
    },
    answerRating () {
      let correct = []

      let coords = [...this.answerCoords]
      console.log(JSON.stringify(coords))
      coords.sort((a, b) => (a.coord < b.coord) ? 1 : -1)
      console.log(JSON.stringify(coords))
      for (let alt = 0; alt < 3; alt++) {
        correct[alt] = {
          name: 'a' + (alt + 1),
          rating: coords.findIndex(function (e) { return e.name === 'x' + (alt + 1) }) + 1,
          __index: alt
        }
      }
      return correct
    },
    answerAltNum () {
      console.log('answerAltNum:')
      console.log(this.answerRating)
      return (this.answerRating.findIndex(function (e) { return e.rating === 1 }) + 1)
    }
  },
  methods: {
    check () {
      this.mistake = false
      this.coords.forEach((point, row) => {
        if (Math.abs(point.coord - this.answerCoords[row].coord) > 0.05) {
          this.$refs.coords.$children[2 + row].$children[1].$el.style = 'background-color: #FF0000'
          this.mistake = true
          this.$emit('error', 3)
        } else {
          this.$refs.coords.$children[2 + row].$children[1].$el.style = 'background-color: #FFFFFF'
        }
      })

      this.rating.forEach((alt, row) => {
        if (Math.abs(alt.rating - this.answerRating[row].rating) > 0.05) {
          this.$refs.rating.$children[2 + row].$children[1].$el.style = 'background-color: #FF0000'
          this.mistake = true
          this.$emit('error', 3)
        } else {
          this.$refs.rating.$children[2 + row].$children[1].$el.style = 'background-color: #FFFFFF'
        }
      })

      if (this.altNum !== this.answerAltNum) {
        this.$refs.input.$el.style = 'background-color: #FF0000; max-width: 100px'
      }

      if (!this.mistake) {
        this.checked = true
        this.$emit('answer')
        this.coords = this.answerCoords
        this.rating = this.answerRating
        this.altNum = this.answerAltNum
      }
    }
  },
  mounted () {
    // if (localStorage.coords) {
    //   this.coords = JSON.parse(localStorage.coords)
    // }
    // if (localStorage.rating) {
    //   this.rating = JSON.parse(localStorage.rating)
    // }
    // if (localStorage.altNum) {
    //   this.altNum = localStorage.altNum
    // }

    if (this.correctStep >= this.step) {
      this.checked = true
      // this.$emit('answer')
      this.coords = this.answerCoords
      this.rating = this.answerRating
      this.altNum = this.answerAltNum
    }
  }
  /* watch: {
    coords: {
      handler: function (oldCoords, newCoords) {
        localStorage.coords = JSON.stringify(newCoords)
      },
      deep: true
    },
    rating: {
      handler: function (oldRaing, newRating) {
        localStorage.rating = JSON.stringify(newRating)
      },
      deep: true
    },
    altNum: {
      handler: function (oldNum, newNum) {
        localStorage.altNum = newNum
      }
    }
  } */
}
</script>
