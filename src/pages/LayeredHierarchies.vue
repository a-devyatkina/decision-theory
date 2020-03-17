<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div id="themeid" v-for="(theme) in themes" :key="theme" class="theme">
            <q-radio v-model="value" :val="theme" dense> {{ theme.label }} </q-radio>
        </div>
        <q-btn @click="chooseTheme()" color="secondary" label="Выбрать" class="q-ml-sm"/>
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
    }
  },
  methods: {
    chooseTheme () {
      var data = {
        user_id: this.user_id,
        $set: {
          'theme': this.theme
        }
      }
      axios.post(
        'restapi/hierarchies/theme',
        data
      ).then(response => {
        if (response.data === 'ok') {
          alert('Успешно')
        }
      })
    }
  },
  mounted () {
    axios.get(
      '/restapi/hierarchies/lab1b'
    ).then(response => {
      for (var i = 0; i < response.data.length; i++) {
        var theme = {
          label: response.data[i].name,
          value: response.data[i]._id
        }
        this.themes.push(theme)
      }
    })
  }
}
</script>
