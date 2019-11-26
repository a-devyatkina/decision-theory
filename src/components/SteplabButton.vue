<template>
  <q-btn :icon="icon" :color="color" round :flat="flat" @click="open()">
    <q-modal v-model="opened">
      <div class="q-pa-lg" style="width: 400px">
        <div class="column">
          <div class="row self-center">{{title}}</div>
        </div>
        <q-input :stack-label="$t('Label')" v-model="name" />
        <q-input :stack-label="$t('Description')" type="textarea" v-model="description" />
        <q-input :stack-label="$t('Schema')" type="textarea" v-model="schema" />
        <q-field :label="$t('Spreadsheet')" orientation="vertical" style="font-size:small">
          <q-chip v-if="pattern !== ''" class="row q-mb-sm" square icon="attachment" color="secondary" closable @hide="removePattern()">
            <router-link to="" @click.native="downloadPattern()" :download="pattern">{{pattern}}</router-link>
          </q-chip>
          <q-uploader :hidden="pattern != ''" no-thumbnails hide-upload-button @add="patternSelected" @finish="apply" extensions=".ods" :upload-factory="uploadPattern" ref="uploader" />
        </q-field>
        <div class="row q-mt-lg">
          <q-btn slot="footer" color="secondary" @click="apply()" :label="title" class="col q-ma-sm" />
          <q-btn slot="footer" color="secondary" @click="cancel()" :label="$t('Cancel')" class="col q-ma-sm" />
        </div>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>
export default {
  props: ['icon', 'color', 'flat', 'title', 'lab'],
  data () {
    return {
      lid: null,
      opened: false,
      name: '',
      description: '',
      schema: '',
      pattern: ''
    }
  },
  computed: {
    url () {
      return this.lid ? '/restapi/steplab/pattern/file?lab=' + this.lid : ''
    },
    handle () {
      return this.lid ? this.$store.getters['data/getSteplabHandle'](this.lid) : null
    }
  },
  methods: {
    async open () {
      if (this.lab) {
        this.lid = this.lab
      }
      if (this.lid) {
        this.name = this.handle ? this.handle.name : ''
        this.description = this.handle ? this.handle.description : ''
        this.schema = ''
        this.pattern = ''
        try {
          let schema = await this.$store.dispatch('data/getSteplabPatternSchema', { lid: this.lid })
          this.schema = JSON.stringify(schema)
          this.pattern = 'pattern.ods'
        } catch (error) {
          this.$q.notify(error.message)
        }
      }
      this.opened = true
    },
    patternSelected (files) {
      if (files && files.length > 0) {
        this.pattern = files[0].name
      }
    },
    async uploadPattern (file, updateProgress) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.$store.dispatch('data/uploadSteplabPattern', { lid: this.lid, file })
          updateProgress(1)
          resolve(file)
        } catch (error) {
          this.$q.notify(error.message)
          reject(error.message)
        }
        this.$refs.uploader.reset()
      })
    },
    async apply () {
      try {
        if (!this.lid) {
          let handle = {
            name: this.name,
            description: this.description,
            outdated: false
          }
          this.lid = await this.$store.dispatch('data/createSteplabHandle', { handle })
        }
        if (this.schema === '') {
          return this.$q.notify(this.$t('Need to specify schema'))
        }
        if (this.$refs.uploader.queue.length > 0) {
          return this.$refs.uploader.upload()
        }
        if (this.pattern === '') {
          return this.$q.notify(this.$t('Need to specify spreadsheet'))
        }
        let handle = {
          name: this.name,
          description: this.description,
          outdated: false
        }

        await this.$store.dispatch('data/updateSteplabHandle', { lid: this.lid, handle })
        await this.$store.dispatch('data/updateSteplabPatternSchema', { lid: this.lid, schema: JSON.parse(this.schema) })

        this.lid = ''
        this.name = ''
        this.description = ''
        this.schema = ''
        this.pattern = ''
        this.opened = false
        this.$refs.uploader.reset()
      } catch (error) {
        this.$q.notify(error.message)
      }
    },
    async cancel () {
      this.lid = ''
      this.name = ''
      this.description = ''
      this.schema = ''
      this.pattern = ''
      this.opened = false
      this.$refs.uploader.reset()
    },
    async removePattern () {
      this.pattern = ''
      this.$refs.uploader.reset()
    },
    downloadPattern () {
      let newWindow = window.open('', '_blank')
      newWindow.location.href = this.url
    }
  }
}
</script>

<style>
</style>
