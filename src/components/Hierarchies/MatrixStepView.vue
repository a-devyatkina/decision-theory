<template>
    <q-list class="q-ma-md round-borders shadow-2 bg-white" id="list">
        <q-item>
            <q-item-main>Вектор приоритетов</q-item-main>
            <q-item-side>&lt;{{ answer[0].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>Веса критериев</q-item-main>
            <q-item-side>&lt;{{ answer[1].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>(M*w)</q-item-main>
            <q-item-side>&lt;{{ answer[2].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>Лямбда</q-item-main>
            <q-item-side>&lt;{{ answer[3].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>Собственное значение лямбда</q-item-main>
            <q-item-side>&lt;{{ answer[4].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>Индекс согласованности</q-item-main>
            <q-item-side>&lt;{{ answer[5].join(', ') }}&gt;</q-item-side>
        </q-item>
        <q-item>
            <q-item-main>Отношение согласованности</q-item-main>
            <q-item-side>&lt;{{ answer[6].join(', ') }}&gt;</q-item-side>
        </q-item>
    </q-list>
</template>

<script>
export default {
  props: [ 'answer' ]
}
</script>

<style scoped>
    #list {
        width: 600px;
        padding-left: 10px;
    }
</style>
