<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div id="themeid" v-for="(theme) in themes" :key="theme" class="theme">
            <q-radio v-model="value" :val="theme" dense> {{ theme.label }} </q-radio>
        </div>
        <q-btn @click="labpage()" color="secondary" label="Finish" class="q-ml-sm"/>
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
  methods: {
    labpage () {
      this.$q.dialog({
        message: 'Вернуться обратно?',
        ok: 'Да',
        cancel: 'Нет'
      }).then(() => {
        this.$router.push('/labs')
      })
    }
  },
  mounted () {
    axios.get(
      'http://localhost:8000/lab1b'
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
