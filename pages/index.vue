<template>
    <div>
        <Layout class="main-layout">
            <template v-slot:layout-name>
                <p>Музыка</p>
            </template>

            <template v-slot:audio>
                <audio :src="srcHref" controls></audio>
            </template>       

            <template v-slot:layout-content>
                <MusicField></MusicField>
            </template>
        </Layout>
    </div>
</template>

<script>

import MusicField from "~/components/MusicField.vue";
import Layout from "~/components/Layout.vue";
import Axios from "axios";

export default {
    middleware: 'checkAuth',
    components: {
		Layout,
        MusicField
    },
    data(){
        return {
            isReady: false
        }
    },
    methods: {
        sidebarActive() {
            this.$store.commit('TOGGLE_SIDEBAR');
        },
    },
    computed: {
        srcHref() {
            return this.$store.getters.CURRENT_TRACK.href;
        }
    },
}
</script>

<style scoped>
	.main-layout {
        height: 100vh;
	}
</style>