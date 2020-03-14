<template>
  <q-page>
    <q-list no-border>
      <q-item class="q-mt-sm">
        <q-item-main :label="$t('Tasks')" :sublabel="$t('Tasks for laboratory works')"  />
      </q-item>
      <labs-table/>
      <q-item class="q-mt-lg">
        <q-item-main :label="$t('Stepwise tasks')" :sublabel="$t('Tasks for stepwise laboratory works')"  />
      </q-item>
      <steplabs-table/>
      <q-item class="q-mt-lg">
        <q-item-main :label="$t('Stepwise tasks')" :sublabel="$t('Tasks for stepwise laboratory works')"  />
      </q-item>
      <siblinghierarchies-table/>
    </q-list>
  </q-page>
</template>

<script>
</script>

<style>
</style>
