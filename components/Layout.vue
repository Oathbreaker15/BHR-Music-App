<template>
	<div class="main-layout">
		<div class="main-layout__header">
			<div class="main-layout__header-btn" 
				@click="sidebarActive()">
			</div>
            <div class="main-layout__header-text">
                <slot name="layout-name">
                </slot>
            </div>

			<div class="main-layout__audio">
				<slot name="audio">
				</slot>
			</div>

		</div>

        <slot name="layout-content">
        </slot>

		<transition name="slide-fade" v-if="$store.state.sidebarVisible">
			<Sidebar></Sidebar>
		</transition>
	</div>
</template>

<script>
import store from "vuex";
import Sidebar from "~/components/Sidebar.vue";

export default {
	components: {
		Sidebar
	},
  data(){
    return {
		trans: this.$store.state.sidebarVisible
    }
  },
  methods: {
	sidebarActive() {
		this.$store.commit('TOGGLE_SIDEBAR');
	}
  },
}
</script>

<style scoped>
	.main-layout {
		display: flex;
    	flex-direction: column;
		padding: 20px;
		background-color: #f2f2f2;
        min-height: 100vh;
	}

	.main-layout__header {
		flex-grow: 0;
    	flex-shrink: 0;
		padding-bottom: 20px;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	.main-layout__header-text {
		padding-left: 27.5px;
		font-size: 24px;
	}

	.main-layout__header-btn {
		background-image: url('../static/Menu.svg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 20px;
        height: 20px;
		cursor: pointer;
		margin-left: 15px;
	}

	.main-layout__audio {
		flex: 1 1 auto;
	}

	audio {
		display: block;
		width: 100%;
		outline: none; 
	}

	.slide-fade-enter-active {
		transition: all 0.3s ease;
	}
	.slide-fade-leave-active {
		transition: all 0.3s ease;
	}
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateX(-20px);
		opacity: 0;
	}
</style>