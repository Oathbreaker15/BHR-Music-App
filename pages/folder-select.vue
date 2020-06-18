<template>
    <Layout>
        <template v-slot:layout-name>
            <p>Выбор папки с музыкой</p>
        </template>

        <template v-slot:layout-content>
            <FolderSelect></FolderSelect>
        </template>
    </Layout>
</template>

<script>
import store from "vuex";
import FolderSelect from "~/components/FolderSelect.vue";
import Layout from "~/components/Layout.vue";

export default {
	middleware: 'checkAuth',
	components: {
		FolderSelect,
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