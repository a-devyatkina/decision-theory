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
            <q-input v-model.number="props.row.coord" type="number" dense autofocus counter color="secondary"/>
          </q-popup-edit>
        </q-td>
      </q-tr>
    </q-table>
    <br>
   <!--  <h7>Примечание: альтернативам с равными координатами присваиваются равные оценки</h7>
    <br>
    <br>
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
    </q-table> -->
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

        let a = parseFloat(this.r_functions[alt]['begin'])
        let b = parseFloat(this.r_functions[alt]['top'])
        let c = parseFloat(this.r_functions[alt]['end'])
        let S = parseFloat(this.squares[alt]['square'])
        let x1, x2

        if ((c - b) > (b - a)) {
          // For right half
          let koren = Math.sqrt(S * (c - b))
          x1 = c - koren
          x2 = c + koren
        } else {
          // For left half
          let koren = Math.sqrt(this.squares[alt]['square'] * (this.r_functions[alt]['top'] - this.r_functions[alt]['begin']))
          x1 = a - koren
          x2 = a + koren
        }

        if (x1 < a || x1 > c) {
          correct[alt]['coord'] = Math.round(x2 * 100) / 100
        } else {
          correct[alt]['coord'] = Math.round(x1 * 100) / 100
        }

        correct[alt]['__index'] = alt
      }
      return correct
    },
    answerRating () {
      let correct = []

      let coords = [...this.answerCoords]
      coords.sort((a, b) => (a.coord < b.coord) ? 1 : -1)
      for (let alt = 0; alt < 3; alt++) {
        correct[alt] = {
          name: 'a' + (alt + 1),
          rating: coords.findIndex(function (e) { return e.name === 'x' + (alt + 1) }) + 1,
          __index: alt
        }
      }
      for (let i = 1; i < 3; i++) {
        let alt = parseInt(coords[i].name.substring(coords[i].name.length - 1)) - 1
        let prevAlt = parseInt(coords[i - 1].name.substring(coords[i - 1].name.length - 1)) - 1
        if (coords[i].coord === coords[i - 1].coord) {
          correct[alt].rating = correct[prevAlt].rating
        } else {
          correct[alt].rating = correct[prevAlt].rating + 1
        }
      }
      return correct
    },
    answerAltNum () {
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

      /* this.rating.forEach((alt, row) => {
        if (Math.abs(alt.rating - this.answerRating[row].rating) > 0.05) {
          this.$refs.rating.$children[2 + row].$children[1].$el.style = 'background-color: #FF0000'
          this.mistake = true
          this.$emit('error', 3)
        } else {
          this.$refs.rating.$children[2 + row].$children[1].$el.style = 'background-color: #FFFFFF'
        }
      }) */

      // if (this.altNum !== this.answerAltNum) {
      /*   if (this.answerCoords[this.altNum - 1].coord !== this.answerCoords[this.answerAltNum - 1].coord) {
        this.$emit('error', 3)
        this.$refs.input.$el.style = 'background-color: #FF0000; max-width: 100px'
      } */

      if (this.answerRating[Number(this.altNum) - 1].rating !== 1) {
        this.$emit('error', 3)
        this.mistake = true
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
