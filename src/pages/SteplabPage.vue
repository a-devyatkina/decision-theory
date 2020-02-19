<template>
  <q-page>
    <q-list no-border >
      <q-item class="q-mb-sm">
        <q-item-main :label="name" :sublabel="description" />
      </q-item>
      <q-stepper ref="stepper" vertical no-header-navigation color="secondary" class="q-mx-md">
        <q-step v-for="(step, index) in steps" :order="index" :key="index" :done-icon="icon(step.state)" :active-icon="icon(step.state)"
          :default="icon(step.state)" :icon="icon(step.state)" :title="step.title" :subtitle="step.subtitle" :name="step.name" @click.native="view(step.name)">
          <div class="shadow-2 round-borders row bg-grey-2" @click.native.stop="">
            <div v-for="(elem, index) in step.content" :key="index" :class="elem.layout">
              <div class="q-ma-md">
                <div v-if="elem.element == 'label'" :class="elem.class" :style="elem.style">{{ elem.value }}</div>
                <img v-else-if="elem.element == 'image'" :src="image(step.name, elem.value)" :class="elem.class" :style="elem.style" />
                <q-input v-else-if="elem.element == 'input'" :type="elem.type" hide-underline :align="elem.type == 'number' ? 'right' : ''" :style="elem.style" :class="elem.class" v-model="elem.value" :readonly="readonly(step.state)"/>
                <q-option-group v-else-if="elem.element == 'group'" :type="elem.type" :style="elem.style" :class="elem.class" color="secondary" :options="elem.options" v-model="elem.value" :readonly="readonly(step.state)"/>
                <table v-else-if="elem.element == 'table'" :style="elem.style" :class="elem.class" :rules="elem.rules">
                  <caption>{{ elem.caption }}</caption>
                  <tr v-for="(row, r) in elem.value" :key="r">
                    <td v-for="(col, c) in row" :key="c" style="text-align:center">
                      <div v-if="elem.type == 'label'" :style="elem.cellstyle" :class="elem.cellclass">{{ elem.value[r][c] }}</div>
                      <q-input v-else :type="elem.type" hide-underline :style="elem.cellstyle" :class="elem.cellclass" v-model="elem.value[r][c]" align="center" :readonly="readonly(step.state)"/>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="q-my-md">
            <q-stepper-navigation v-if="step.button != undefined">
              <q-btn @click.stop="done()" :label="step.button.label" :disable="readonly(step.state)" color="secondary"/>
            </q-stepper-navigation>
          </div>
        </q-step>
      </q-stepper>
      <q-item class="q-mt-sm">
        <q-btn @click="$router.back()" :label="$t('Close')" color="secondary"/>
      </q-item>
    </q-list>
    <h1>THIS PAGE</h1>
  </q-page>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters['data/getUser']()
    },
    lid () {
      return this.$router.currentRoute.query.lab
    },
    uid () {
      return this.$router.currentRoute.query.user
    },
    steplab () {
      return this.$store.getters['data/getSteplab'](this.lid, this.uid)
    },
    steps () {
      return this.steplab === null ? [] : this.user.role === 'teacher' && this.uid === this.user.id ? this.steplab.steps : this.steplab.steps.filter(step => step.state !== 'none')
    },
    handle () {
      return this.$store.getters['data/getSteplabHandle'](this.lid)
    },
    name () {
      return this.handle ? this.handle.name : ''
    },
    description () {
      return this.handle ? this.handle.description : ''
    }
  },
  methods: {
    readonly (state) {
      return this.uid !== this.user.id || state !== 'edit'
    },
    async done () {
      try {
        await this.$store.dispatch('data/updateSteplab', { lid: this.lid, uid: this.uid, steplab: this.steplab })
        let step = this.steplab.steps.find(item => item.state === 'edit')
        if (step) {
          this.$refs.stepper.goToStep(step.name)
        } else {
          step = this.steplab.steps.slice(-1).pop()
          this.$refs.stepper.goToStep(step.name)
        }
      } catch (error) {
        this.$q.notify(error.message)
      }
    },
    view (step) {
      this.$refs.stepper.goToStep(step)
    },
    image (step, image) {
      return '/restapi/steplab/instance/image?lab=' + this.lid + '&user=' + this.uid + '&step=' + step + '&image=' + image
    },
    icon (state) {
      return state === 'edit' ? 'edit' : state === 'fail' ? 'priority_high' : state === 'done' ? 'playlist_add_check' : 'hourglass_empty'
    }
  },
  async created () {
    try {
      if (this.handle === null) {
        await this.$store.dispatch('data/getSteplabHandle', { lid: this.lid })
      }
      if (this.steplab === null) {
        await this.$store.dispatch('data/getSteplab', { lid: this.lid, uid: this.uid })
      }
    } catch (error) {
      this.$q.notify(error.message)
    }
  }
}
</script>

<style scope>
.q-stepper-tab:hover {
    cursor: pointer;
}
.q-stepper-tab {
    color: #26A69A;
}
.q-stepper-tab.step-waiting {
    color: #26A69A;
}
.q-stepper-tab.step-waiting .q-stepper-dot {
    color: #26A69A;
}
</style>
