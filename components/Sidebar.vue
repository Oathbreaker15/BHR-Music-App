<template>
    <div class="sidebar-window" @click="closeSidebar()">
        <div class="sidebar">
            <div class="sidebar-header"> 
                <div class="sidebar-header__icon"></div>
                <div class="sidebar-header__login">{{$store.state.user.id}}</div>
                <div class="sidebar-header__close"
                    @click="closeSidebar()"></div>
            </div>
            <div class="sidebar-menu">
                <nuxt-link to="/">
                    <div class="sidebar-menu__element" @click="closeSidebar()">
                        <div class="sidebar-menu__element-icon_music"></div>
                        <div class="sidebar-menu__element-name">Музыка</div>                   
                    </div>
                </nuxt-link>

                <nuxt-link to="/settings">
                    <div class="sidebar-menu__element" @click="closeSidebar()">
                        <div class="sidebar-menu__element-icon_settings"></div>                    
                        <div class="sidebar-menu__element-name">Настройки</div>                   
                    </div>
                </nuxt-link>

                <div class="sidebar-menu__element">
                    <div class="sidebar-menu__element-icon_logout"></div>
                    <div class="sidebar-menu__element-name">Выйти</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "vuex";

export default {
    methods: {
        closeSidebar() {
            if (event.target.className !== 'sidebar' && event.target.className !== 'sidebar-header' && 
                event.target.className !== 'sidebar-header__icon' && event.target.className !== 'sidebar-header__login') {
                this.$store.commit('CLOSE_SIDEBAR');
                event.stopPropagation(); 
            }        
        }
    }
}
</script>

<style scoped>
    .sidebar {
        position: fixed;
        z-index: 3;
        width: 280px;
        height: 100%;
        background: white;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .sidebar-header {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .sidebar-header__icon {
        background-image: url('../static/person-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        flex-grow: 0;
    }

    .sidebar-header__login {
        padding-left: 10px;
        flex-grow: 1;
        user-select: none;
    }

    .sidebar-header__close {
        background-image: url('../static/close-sidebar.svg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        cursor: pointer;
        flex-grow: 0;
    }

    .sidebar-menu {
        display: flex;
        flex-direction: column;
    }

    .sidebar-menu__element {
        display: flex;
        align-items: center;
        padding: 15px 0px;
        cursor: pointer;
        padding-left: 17px;
    }

    .sidebar-menu__element:hover {
        background: #F2F2F2;
    }

    .sidebar-menu__element .sidebar-menu__element-icon_music {
        background-image: url('../static/sidebar-music-icon.svg');
    }

    .sidebar-menu__element-icon_settings {
        background-image: url('../static/sidebar-settings-icon.svg');
    }

    .sidebar-menu__element-icon_logout {
        background-image: url('../static/sidebar-logout-icon.svg');

    }

    .sidebar-menu__element-icon_music,
    .sidebar-menu__element-icon_settings,
    .sidebar-menu__element-icon_logout {
        width: 20px;
        height: 20px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 12px;
    }

    .sidebar-menu__element-name {
        font-size: 18px;
        text-decoration: none;
        color: black;
    }

    .sidebar-window {
        display: flex;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.1);
        position: fixed;
		top: 0;
		left: 0;
    }

    a { 
        text-decoration: none;
    }
</style>