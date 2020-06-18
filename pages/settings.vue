<template>
    <Layout>
        <template v-slot:layout-name>
            <p>Настройки</p>
        </template>

        <template v-slot:layout-content>
            <Settings></Settings>
        </template>
    </Layout>
</template>

<script>

import Settings from "~/components/Settings.vue";
import Layout from "~/components/Layout.vue";
export default {
    middleware: 'checkAuth',
    components: {
        Settings,
        Layout
    },
    data(){
        return {

        }
    },
    methods: {

    },
    }
</script>

<style scoped>
</style>