<template>
    <div>      
        <div class="folder-select-content">       
            <div class="folder-select-content__nav">
                <span class="folder-select-content__arrow-icon" @click="goBack()" v-show="arrowVisible"></span>
                <p class="folder-select-content__text">{{ currentItemName }}</p>
                <button class="folder-select-content__btn" @click="addPathToDB()"><div class="folder-select-content__ok-icon"></div>Выбрать</button>
            </div>
            <div class="folder-select-content__body">
                <Loading v-if="$store.state.loading"></Loading>
            <!-- <div class="folder-select-content__body"> -->
                <div :class="['folder-select-content__body-item', {'_faded-item': item.type === 'audio'}]" 
                    v-for="item in filesList" :key="item.name"
                    @click="goTo(item)">
                    <!-- чтобы иметь возможность иметь выбор разных классов по условию, их следует записать через запятую в объекте
                    левая половина - название класса, правая - условие его присвоения -->
                    <div :class="{'folder-select-content__folder-icon': item.type === 'folder', 
                                'folder-select-content__audio-icon': item.type === 'audio',}"></div>
                    {{ item.name }}
                </div>
                <div v-show="containsAudio" class="_faded-item">Внутри папки нет музыки</div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import store from "vuex";
import Loading from "~/components/Loading.vue";

export default {
    components: {
        Loading
	},
    data(){
        return {
             
        }
    },
    methods: {
        goTo(item) {
            this.$store.dispatch('GO_TO', item)
        },
        goBack(){
            this.$store.dispatch('GO_BACK');
        },
        async addPathToDB() {
            await this.$store.dispatch('UPDATE_PATH');
            this.$router.push("/");
        }
    },
    computed: {
        filesList() {
            return this.$store.getters.FILES_LIST;
        },
        currentItemName() {
            return this.$store.getters.CURRENT_ITEM_STATE[this.$store.getters.CURRENT_ITEM_STATE.length - 1].name;
        },
        currentItemPath() {
            return this.$store.getters.CURRENT_ITEM_STATE[this.$store.getters.CURRENT_ITEM_STATE.length - 1].path;
        },
        arrowVisible() {
            if(this.currentItemPath !== 'disk:/') {
                return true;
            }
        },
        containsAudio() {
            if(this.$store.getters.FILES_LIST.length === 0) {
                return true;
            }
        },
    },
    created() {
        this.$store.dispatch('FETCH_FILES', `${this.$store.getters.CURRENT_ITEM_STATE[this.$store.getters.CURRENT_ITEM_STATE.length - 1].path}`);  
    },   
}
</script>

<style scoped>
    .folder-select-content {
        padding: 20px 15px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        margin-bottom: 20px;
    }

    .folder-select-content__nav {
        padding-bottom: 15px;
        display: flex;
        justify-content: left;
        align-items: baseline;
    }

    .folder-select-content__ok-icon {
        width: 15px;
        height: 15px;
        background-image: url('../static/ok.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .folder-select-content__folder-icon {
        width: 25px;
        height: 20px;
        background-image: url('../static/folder-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .folder-select-content__audio-icon {
        width: 16px;
        height: 25px;
        background-image: url('../static/audio-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .folder-select-content__arrow-icon {
        width: 15px;
        height: 15px;
        margin-left: 15px;
        margin-right: 30px;
        background-image: url('../static/back-arrow.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .folder-select-content__text {
        font-size: 18px;
        user-select: none;
    }

    .folder-select-content__btn {
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

    .folder-select-content__body {
       box-sizing: border-box;
       transform: translate(0, 0);
    }

    .folder-select-content__body-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 10px;
    }

    ._faded-item {
        color: #808080;
    }

    .folder-select-content__body-item:hover {
        background-color: #F2F2F2;
    }
</style>