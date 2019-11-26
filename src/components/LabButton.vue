<template>
  <q-btn :icon="icon" :color="color" round :flat="flat" @click="opened=true">
    <q-modal v-model="opened">
      <div class="q-pa-lg" style="width: 400px">
        <div class="column">
          <div class="row self-center">{{title}}</div>
        </div>
        <q-input :stack-label="$t('Label')" v-model="name" />
        <q-input :stack-label="$t('Description')" type="textarea" v-model="description" />
        <q-field :label="$t('Files')" orientation="vertical" style="font-size:small">
          <dev class="column">
            <q-chip class="row q-mb-sm" v-for="file in files" :key="file" square icon="attachment" color="secondary" closable @hide="removeFile(file)">{{file}}</q-chip>
          </dev>
        </q-field>
        <q-uploader auto-expand :stack-label="$t('Upload files')" multiple url="" @uploaded="fileUploaded" :upload-factory="uploadFile" ref="uploader"/>
        <div class="row q-mt-lg">
          <q-btn slot="footer" color="secondary" @click="apply()" :label="title" class="col q-ma-sm"/>
          <q-btn slot="footer" color="secondary" @click="cancel()" :label="$t('Cancel')" class="col q-ma-sm"/>
        </div>
      </div>
    </q-modal>
  </q-btn>
</template>

<script>
export default {
  props: ['icon', 'color', 'flat', 'title', 'lid'],
  data () {
    return {
      opened: false,
      name: '',
      description: '',
      files: []
    }
  },
  computed: {
    user () {
      return this.$store.getters['data/getUser']()
    },
    lab () {
      return this.$store.getters['data/getLab'](this.lid)
    }
  },
  beforeMount () {
    this.name = this.lab ? this.lab.name : ''
    this.description = this.lab ? this.lab.description : ''
    this.files = this.lab ? this.lab.files.slice() : []
  },
  methods: {
    fileUploaded (file) {
      this.files.push(file.name)
    },
    uploadFile (file, updateProgress) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('data/uploadFile', {file}).then(url => {
          updateProgress(1)
          resolve(file)
        })
      })
    },
    removeFile (file) {
      this.$store.dispatch('data/deleteFile', { file: file })
      this.files.splice(this.files.indexOf(file), 1)
    },
    apply () {
      this.opened = false
      this.$refs.uploader.reset()
      if (this.lid) {
        this.$store.dispatch('data/updateLab', {
          lid: this.lid,
          name: this.name,
          description: this.description,
          teacher: this.lab ? this.lab.teacher : this.user.id,
          files: this.files.slice(),
          outdated: this.lab ? this.lab.outdated : false
        })
      } else {
        this.$store.dispatch('data/createLab', {
          name: this.name,
          description: this.description,
          teacher: this.lab ? this.lab.teacher : this.user.id,
          files: this.files.slice(),
          outdated: this.lab ? this.lab.outdated : false
        })
      }
    },
    cancel () {
      this.opened = false
      this.name = this.lab ? this.lab.name : ''
      this.description = this.lab ? this.lab.description : ''
      this.files = this.lab ? this.lab.files.slice() : []
      this.$refs.uploader.reset()
    }
  }
}
</script>

<style>
</style>
