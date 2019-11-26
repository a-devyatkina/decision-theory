<template>
  <q-modal v-model="opened">
    <div class="q-pa-lg" style="width: 400px">
      <div class="column">
        <div class="row self-center">
          {{title}}
        </div>
      </div>
      <q-select v-if="action==='assign'" :stack-label="$t('File')" :options="selects" v-model="select" />
      <q-field v-else-if="attachment" :label="$t('Attachment')" orientation="vertical" style="font-size:small">
        <dev class="column">
          <q-chip class="row q-mb-sm" square icon="attachment" color="secondary" closable @hide="removeFile()">{{attachment}}</q-chip>
        </dev>
      </q-field>
      <q-uploader v-else-if="action=='improve'||action=='resolve'||action=='comment'" auto-expand :stack-label="$t('Upload file')" url="" @uploaded="fileUploaded" :upload-factory="uploadFile" ref="uploader"/>
      <q-input v-if="action==='close'" :stack-label="$t('Score') + ` (max ${maxScore})`" type="number" v-model="score" />
      <q-input :stack-label="$t('Comment')" type="textarea" v-model="comment" />
      <div class="row q-mt-lg">
        <q-btn slot="footer" color="secondary" @click="apply" :label="$t('Apply')" class="col q-ma-sm"/>
        <q-btn slot="footer" color="secondary" @click="cancel" :label="$t('Cancel')" class="col q-ma-sm"/>
      </div>
    </div>
  </q-modal>
</template>

<script>

import * as firebase from 'firebase'

export default {
  props: [ 'action', 'title', 'files', 'maxScore', 'callback' ],
  data () {
    return {
      opened: false,
      select: this.files && this.files.length > 0 ? this.files[0] : '',
      attachment: null,
      comment: '',
      score: 0
    }
  },
  computed: {
    selects () {
      let selects = []
      for (let file of this.files) {
        selects.push(
          {
            label: file,
            value: file
          }
        )
      }
      return selects
    }
  },
  methods: {
    fileUploaded (file) {
      this.attachment = file.name
    },
    uploadFile (file, updateProgress) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('data/uploadFile', {file}).then(url => {
          updateProgress(1)
          resolve(file)
        })
      })
    },
    removeFile () {
      this.$store.dispatch('data/deleteFile', {file: this.attachment})
      this.attachment = null
    },
    apply () {
      if ((this.action === 'resolve' && !this.attachment) ||
        (this.action === 'comment' && !this.comment) ||
        (this.action === 'assign' && !this.select) ||
        (this.action === 'close' && !this.score)) {
        this.$q.notify({
          message: 'Please, fill the gaps',
          timeout: 3000,
          color: 'red',
          textColor: 'black',
          position: 'bottom',
          actions: [{
            icon: 'close'
          }]
        })
        return
      }
      this.opened = false
      let user = this.$store.getters['data/getUser']()
      this.callback(
        {
          action: this.action,
          file: this.action === 'assign' ? this.select : this.attachment,
          score: this.score,
          comment: this.comment,
          author: user.id,
          date: firebase.database.ServerValue.TIMESTAMP
        }
      )
      this.file = null
      this.attachment = null
      this.comment = ''
      this.score = 0
    },
    cancel () {
      this.opened = false
    }
  }
}
</script>
