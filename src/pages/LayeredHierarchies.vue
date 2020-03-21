<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div v-if="work.work.stage === 'assign'">
            <div id="themeid" v-for="(theme) in themes" :key="theme" class="theme">
                <q-radio v-model="value" :val="theme" dense> {{ theme.label }} </q-radio>
            </div>
            <q-btn @click="chooseTheme()" color="secondary" label="Выбрать" class="q-ml-sm"/>
        </div>
        <div v-else>
            Выбранная тема: {{ value }}
        </div>
    </div>
</template>

<style>
</style>
<script>
const axios = require('axios')
export default {
  data: () => {
    return {
      value: null,
      themes: []
    }
  },
  computed: {
    user () {
      return this.$store.getters['data/getUser']()
    },
    work () {
      return this.$store.getters['data/getStudentHierarchieswork'](this.user.id, 'layeredhierarchies')
    }
  },
  methods: {
    chooseTheme () {
      let data = {
        user_id: this.user.id,
        theme: this.value.value
      }
      axios.post(
        'restapi/hierarchies/choose_theme',
        data
      ).then(response => {
        if (response.data === 'ok') {
          this.work.work.stage = 'resolve'
          this.$store.dispatch('data/updateHierarchieswork', {
            wid: this.work.wid,
            work: this.work.work
          })
          this.$router.push('/works')
        } else {
          alert('Ошибка, попробуйте снова')
        }
      })
    }
  },
  mounted () {
    if (this.work.work.stage === 'assign') {
      axios.get(
        'restapi/hierarchies/lab1b'
      ).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          let theme = {
            label: response.data[i].name,
            value: response.data[i]._id
          }
          this.themes.push(theme)
        }
      })
    } else {
      let data = {
        user_id: this.user.id
      }
      axios.post(
        'restapi/hierarchies/get_theme',
        data
      ).then(response => {
        console.log(response.data)
        this.value = response.data.theme
      })
    }
  }
}
</script>
