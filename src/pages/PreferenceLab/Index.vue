<template>
    <div class="q-pa-md">
    <div v-if='rightanswers<9'>
      <q-btn  @click="step = 1; crit = 0" :color="buttoncolor[0]" label="1.1" style="width:4vw" class="q-ml-sm"/>
      <q-btn  @click="step = 1; crit = 1" :color="buttoncolor[1]" label="1.2" style="width:4vw" class="q-ml-sm"/>
      <q-btn  @click="step = 2; crit = 0" :color="buttoncolor[2]" label="2.1" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 2'/>
      <q-btn  @click="step = 2; crit = 1" :color="buttoncolor[3]" label="2.2" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 2'/>
      <q-btn  @click="step = 2; crit = 2" :color="buttoncolor[4]" label="2.3" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 2'/>
      <q-btn  @click="step = 2; crit = 3" :color="buttoncolor[5]" label="2.4" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 2'/>
      <q-btn  @click="step = 3; crit = 0" :color="buttoncolor[6]" label="3.1" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 3'/>
      <q-btn  @click="step = 3; crit = 1" :color="buttoncolor[7]" label="3.2" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 3'/>
      <q-btn  @click="step = 3; crit = 2" :color="buttoncolor[8]" label="3.3" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 3'/>
      <q-btn  @click="step = 3; crit = 3" :color="buttoncolor[9]" label="3.4" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 3'/>
      <q-btn  @click="step = 4" :color="buttoncolor[10]" label="4" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 4'/>
      <q-btn  @click="step = 5" :color="buttoncolor[11]" label="5" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 5'/>
      <q-btn  @click="step = 6" :color="buttoncolor[12]" label="6" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 6'/>
      <q-btn  @click="step = 7" :color="buttoncolor[13]" label="7" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 7'/>
      <q-btn  @click="step = 8" :color="buttoncolor[14]" label="8" class="q-ml-sm" style="width:4vw" :disabled = 'rightanswers < 8'/>
    </div>
   <q-stepper
     v-model="step"
     vertical
     ref="stepper"
     color="primary"
     animated
   >
   <q-step
     :name="0"
     title="вопрос 1"
     icon="settings"
     v-if = "step == '0'"
     :done="rightanswers >= 1 || critanswers[0]"
   >
     <type1
     v-if = "questions[step].type == 1"
     :settings = "questions[step]"
     :done="rightanswers >= 1 || critanswers[0]"
     @success1 = 'Answer'
     @err = 'error += 1'
     ></type1>
     <type2
     v-if = "questions[step].type == 2"
     :settings = "questions[step]"
     @success1 = 'Answer'
     @err = 'error += 1'
     ></type2>
   </q-step>
     <q-step
       :name="1"
       title="шаг 1 критерий 1"
       icon="settings"
       v-if = "step == '1'"
     >
       <one
       v-if = 'crit == 0'
       :settings = "example[crit]"
       @success1 = 'Answer'
       :crit = 'crit'
       @err = 'Error($event)'
       :done="buttoncolor[0]=='primary'"
       ></one>
     </q-step>
     <q-step
       :name="1"
       title="шаг 1 критерий 2"
       icon="settings"
       v-if = "step == '1' && 'crit == 1'"
     >
       <one
       v-if = 'crit == 1'
       :settings = "example[crit]"
       @success1 = 'Answer'
       :crit = 'crit'
       @err = 'Error($event)'
       :done="buttoncolor[1]=='primary'"
       ></one>
     </q-step>
     <q-step
       :name="2"
       title="шаг 2 критерий 1"
       icon="create_new_folder"
       v-if = "step == '2'"
     >
      <two
      v-if = 'crit == 0'
      :settings = "example[crit]"
      @success1 = 'Answer1'
      :crit = 'crit'
      @err = 'Error($event)'
      :done="buttoncolor[2]=='primary'"
      >
      </two>
     </q-step>
     <q-step
       :name="2"
       title="шаг 2 критерий 2"
       icon="create_new_folder"
       v-if = "step == '2'"
     >
      <two
      v-if = 'crit == 1'
      :settings = "example[crit]"
      @success1 = 'Answer1'
      :crit = 'crit'
      @err = 'Error($event)'
      :done="buttoncolor[3]=='primary'"
      >
      </two>
     </q-step>
     <q-step
       :name="2"
       title="шаг 2 критерий 3"
       icon="create_new_folder"
       v-if = "step == '2'"
     >
      <two
      v-if = 'crit == 2'
      :settings = "example[crit]"
      @success1 = 'Answer1'
      :crit = 'crit'
      @err = 'Error($event)'
      :done="buttoncolor[4]=='primary'"
      >
      </two>
    </q-step>
     <q-step
       :name="2"
       title="шаг 2 критерий 4"
       icon="create_new_folder"
       :done="rightanswers >= 2 || critanswers[3]"
       v-if = "step == '2'"
     >
      <two
      v-if = 'crit == 3'
      :settings = "example[crit]"
      @success1 = 'Answer1'
      :crit = 'crit'
      @err = 'Error($event)'
      :done="buttoncolor[5]=='primary'"
      >
      </two>
     </q-step>
     <q-step
       :name="3"
       title="шаг 3 критерий 1"
       icon="assignment"
       v-if = "step == '3'"
     >
     <three
     v-if = 'crit == 0'
     :settings = "example[crit]"
     :crit = 'crit'
     :done="buttoncolor[6] == 'primary'"
     @success1 = 'Answer2($event)'
     @err = 'Error($event)'
     ></three>
     </q-step>
     <q-step
       :name="3"
       title="шаг 3 критерий 2"
       icon="assignment"
       v-if = "step == '3'"
     >
     <three
     v-if = 'crit == 1'
     :settings = "example[crit]"
     :crit = 'crit'
     @success1 = 'Answer2'
     :done="buttoncolor[7] == 'primary'"
     @err = 'Error($event)'
     ></three>
     </q-step>
     <q-step
       :name="3"
       title="шаг 3 критерий 3"
       icon="assignment"
       v-if = "step == '3'"
     >
     <three
     v-if = 'crit == 2'
     :settings = "example[crit]"
     :crit = 'crit'
     @success1 = 'Answer2'
     :done="buttoncolor[8] == 'primary'"
     @err = 'Error($event)'
     ></three>
   </q-step>
     <q-step
       :name="3"
       title="шаг 3 критерий 4"
       icon="assignment"
       v-if = "step == '3'"
     >
     <three
     v-if = 'crit == 3'
     :settings = "example[crit]"
     :crit = 'crit'
     @success1 = 'Answer2'
     :done="buttoncolor[9] == 'primary'"
     @err = 'Error($event)'
     ></three>
     </q-step>
     <q-step
       :name="4"
       title="шаг 4"
       icon="add_comment"
       v-if = "step == '4'"
     >
     <four
     :matrix = 'matrixStep3'
     :settings = "example"
     @success1 = 'Answer4(5)'
     @err = 'Error($event)'
     :done="buttoncolor[10] == 'primary'"
     ></four>
     </q-step>
     <q-step
       :name="5"
       title="шаг 5"
       icon="add_comment"
       v-if = "step == '5'"
     >
     <five
     :settings = "example[crit]"
     @success1 = "Answer4(6)"
     @err = 'Error($event)'
     :done="buttoncolor[11] == 'primary'"
     ></five>
     </q-step>
     <q-step
       :name="6"
       title="шаг 6"
       icon="add_comment"
       v-if = "step == '6'"
     >
     <six
     :settings = "example"
     @success1 = 'Answer4(7)'
     @err = 'Error($event)'
     :done="buttoncolor[12] == 'primary'"
     ></six>
     </q-step>
     <q-step
       :name="7"
       title="шаг 7"
       icon="add_comment"
       v-if = "step == '7'"
     >
     <seven
     :settings = "example"
     @success1 = 'Answer4(8)'
     @err = 'Error($event)'
     :done="buttoncolor[13] == 'primary'"
     ></seven>
     </q-step>
     <q-step
       :name="8"
       title="шаг 8"
       icon="add_comment"
       v-if = "step == '8' "
     >
     <eight
     :settings = "example"
     @success1 = 'Answer4(9)'
     @err = 'Error($event)'
     :done="buttoncolor[14] == 'primary'"
     ></eight>
     </q-step>
     <div class="" v-if = "step == '9'">
       <report :error='error'>
      </report>
     </div>
   </q-stepper>
 </div>
</template>

<script>
import one from '../../components/PreferenceLab/1.vue'
import two from '../../components/PreferenceLab/2.vue'
import three from '../../components/PreferenceLab/3.vue'
import four from '../../components/PreferenceLab/4.vue'
import five from '../../components/PreferenceLab/5.vue'
import six from '../../components/PreferenceLab/6.vue'
import seven from '../../components/PreferenceLab/7.vue'
import eight from '../../components/PreferenceLab/8.vue'
import report from '../../components/PreferenceLab/Report.vue'
import type1 from '../../components/PreferenceLab/questiontype1.vue'
import type2 from '../../components/PreferenceLab/questiontype2.vue'
// import axios from 'axios'
export default {
  components: {
    'one': one,
    'two': two,
    'three': three,
    'four': four,
    'five': five,
    'six': six,
    'seven': seven,
    'eight': eight,
    'type1': type1,
    'type2': type2,
    'report': report
  },
  props: ['name'],
  data () {
    return {
      step: 1,
      last: false,
      next: true,
      rightanswers: 0,
      critanswers: [false, false, false, false],
      crit: 0,
      error: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      matrixStep3: [null, null, null, null],
      example:
    [
      {
        crit: 'С1 Срок окупаемости – период времени, необходимый для того, чтобы доходы, генерируемые инвестициями, покрыли затраты на инвестиции.',
        func: ' <span class = "notfrac"> Y = -(</span><span class="fraction"><span class="top">1</span><span class="bottom">(k*x+1)</span></span><span class = "notfrac">-1)</span>',
        value: [
          2,
          3,
          5
        ],
        answers: [
          0.67,
          0.75,
          0.83
        ],
        path: '/statics/image/2graph.png',
        w: 0.5,
        k: [
          1
        ]
      },
      {
        crit: 'С2 Объем финансирования – средства (в десятках млн), которые необходимо вложить.',
        func: 'Y = -(x/k)^3+1<span style = "  vertical-align: 13px;"> Y = -(</span><span class="fraction"><span class="top">x</span><span class="bottom">k<sup>3</sup></span></span><span style = " vertical-align: 13px;">)+1</span>',
        value: [
          0.45,
          0.1,
          0.85
        ],
        answers: [
          0.91,
          1,
          0.39
        ],
        path: '/statics/image/3graph.png',
        w: 0.17,
        k: [
          1
        ]
      },
      {
        crit: 'С3 Рентабельность - отражает степень эффективности использования материальных, трудовых и денежных ресурсов, а также природных богатств.',
        func: 'Y = x/6',
        value: [
          'достаточно низкая',
          'высокая',
          'достаточно низкая'
        ],
        answers: [
          0.33,
          0.83,
          0.33
        ],
        path: '/statics/image/1graph.png',
        w: 0.25
      },
      {
        crit: 'С4 Риск – возможность невыполнения фирмой своих обязательств перед заказчиком.',
        func: 'Y = -(x/6)^2+1',
        value: [
          'достаточно низкая степень риска',
          'достаточно высокая степень риска',
          'высокая степень риска'
        ],
        answers: [
          0.89,
          0.56,
          0.31
        ],
        path: '/statics/image/4graph.png',
        w: 0.08
      }
    ]
    }
  },
  methods: {
    Answer () {
      console.log(this.example)
      this.buttoncolor[this.crit] = 'primary'
      this.critanswers[this.crit] = true
      console.log(this.rightanswers)
      if (this.rightanswers < 2 && this.critanswers[0] && this.critanswers[1]) {
        this.rightanswers = 2
        this.step = 2
        this.buttoncolor[2] = 'yellow'
        this.buttoncolor[3] = 'yellow'
        this.buttoncolor[4] = 'yellow'
        this.buttoncolor[5] = 'yellow'
        this.next = true
        this.last = false
        this.crit = 0
      } else {
        if (this.crit === 1) {
          this.crit = 0
        } else {
          this.crit += 1
        }
      }
    },
    Answer1 () {
      console.log(this.name)
      this.buttoncolor[this.crit + 2] = 'primary'
      this.critanswers[this.crit] = true
      if (this.rightanswers < 3 && this.critanswers[0] && this.critanswers[1] && this.critanswers[2] && this.critanswers[3]) {
        this.rightanswers = 3
        this.step = 3
        this.crit = 0
        this.buttoncolor[this.crit + 6] = 'yellow'
        this.buttoncolor[this.crit + 7] = 'yellow'
        this.buttoncolor[this.crit + 8] = 'yellow'
        this.buttoncolor[this.crit + 9] = 'yellow'
        this.critanswers = [false, false, false, false]
        this.next = true
        this.last = false
        // axios
        //   .get(`http://localhost:3000/api/update/${this.name.name}/${this.rightanswers}`)
        //   .then(response => (console.log(raxioesponse)))
      } else {
        if (this.crit >= 3) {
          this.crit = 0
        } else {
          this.crit += 1
        }
      }
    },
    Answer2 (matrix) {
      this.buttoncolor[this.crit + 6] = 'primary'
      this.critanswers[this.crit] = true
      this.matrixStep3[this.crit] = matrix
      if ((this.rightanswers < 4) && (this.critanswers[0]) && (this.critanswers[1]) && (this.critanswers[2]) && (this.critanswers[3])) {
        this.rightanswers = 4
        console.log(this.rightanswers)
        this.step = 4
        this.crit = 0
        this.buttoncolor[10] = 'yellow'
        this.next = true
        this.last = false
        // axios
        //   .get(`http://localhost:3000/api/update/${this.name.name}/${this.rightanswers}`)
        //   .then(response => (console.log(response)))
      } else {
        if (this.crit >= 3) {
          this.crit = 0
        } else {
          this.crit += 1
        }
      }
    },
    Answer4 (i) {
      this.buttoncolor[i + 5] = 'primary'
      this.buttoncolor[i + 6] = 'yellow'
      this.step = i
      if (this.rightanswers < i) {
        this.rightanswers = i
        // axios
        //   .get(`http://localhost:3000/api/update/${this.name.name}/${this.rightanswers}`)
        //   .then(response => (console.log(response)))
      }
    },
    Error (i) {
      console.log(i, this.crit, this.step)
      if (this.step === 1) {
        this.error[this.crit + this.step - 1] += i
      }
      if (this.step === 2) {
        this.error[this.crit + this.step] += i
      }
      if (this.step === 3) {
        this.error[this.crit + this.step + 3] += i
      }
      if (this.step > 3) {
        this.error[this.step + 6] += i
      }
      console.log(this.error)
    }
  },
  created () {
    if (this.name.step) {
      this.rightanswers = +this.name.step
      this.step = +this.name.step
      console.log(this.rightanswers)
    }
    // axios
    //   .get(`http://localhost:3000/api/users/${this.name.variant}`)
    //   .then(response => {
    //     this.example = response.data.data.example
    //   })
  },
  computed: {
    buttoncolor () {
      let buttoncolor = ['yellow', 'yellow', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red']
      if (this.rightanswers === 2) {
        return ['primary', 'primary', 'yellow', 'yellow', 'yellow', 'yellow', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red']
      }
      if (this.rightanswers >= 3) {
        buttoncolor = ['primary', 'primary', 'primary', 'primary', 'primary', 'primary', 'yellow', 'yellow', 'yellow', 'yellow', 'red', 'red', 'red', 'red', 'red']
      }
      if (this.rightanswers > 3) {
        for (let i = 0; i < this.rightanswers; i++) {
          buttoncolor[i + 6] = 'primary'
        }
        buttoncolor[this.rightanswers + 6] = 'yellow'
      }
      return buttoncolor
    }
  }
}
</script>

<style>
.fraction, .top, .bottom {
    padding: 0 2px;
}

.fraction {
    display: inline-block;
    text-align: center;
}

.bottom{
    border-top: 1px solid #000;
    display: block;
}
.notfrac{
    vertical-align: 12px;
}
</style>
