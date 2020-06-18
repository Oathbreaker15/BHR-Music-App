<template>
    <div class="settings-select-content">
        <div class="settings-select-content__nav">
            <div class="settings-select-content__text-column">
                <p class="settings-select-content__text-header">Папка с музыкой</p>
                <p class="settings-select-content__text">{{ currentPath }}</p>
            </div>
            <nuxt-link to="/folder-select">
                <button class="settings-select-content__btn">Изменить</button>
            </nuxt-link>
        </div>
        <div class="settings-select-content__nav">
            <div class="settings-select-content__text-column">
                <p class="settings-select-content__text-header">Теги</p>
                <p class="settings-select-content__text">Добавление и удаление тэгов</p>
            </div>
            <button class="settings-select-content__btn">Настроить</button>
        </div>
    </div>
</template>

<script>
import store from "vuex";

export default {
    data(){
        return {
            currentPath: this.$store.state.user.path
        }
    },   
}
</script>

<style scoped>
    .settings-select-content {
        padding: 20px 15px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
    }

    .settings-select-content__nav {
        padding-bottom: 15px;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .settings-select-content__text {
        font-size: 18px;
        color: #808080;
        user-select: none;
    }

    .settings-select-content__btn {
        width: 145px;
        height: 50px;
        margin-left: 20px;
        font-size: 18px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: baseline;
        padding: 15px 0;
    }

    .settings-select-content__body-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 10px;
    }

    ._faded-item {
        color: #808080;
    }

    .settings-select-content__body-item:hover {
        background-color: #F2F2F2;
    }

    .settings-select-content__text-column {
        display: flex;
        flex-direction: column;
    }

    .settings-select-content__text-header {
        font-size: 18px;
    }

    a { 
        text-decoration: none;
    }
</style>