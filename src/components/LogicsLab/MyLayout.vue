<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="secondary">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          МИФИ<br>
          Лабораторный практикум по Теории Принятия Решенией
        </q-toolbar-title>

        <!--<div>Витько Кирилл</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Лабораторный практикум</q-item-label>
        <q-item clickable tag="a" target="_blank" href="http://localhost:8080/">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Лабораторная работа 3б</q-item-label>
            <q-item-label caption>Метод нечёткого логического вывода</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  <q-page-container>
    <router-view />
  </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
