<template>
    <div class="music-content">
        <div class="track-field">
            <div class="tag-filter-field">
                <SelectList></SelectList>                          
                <div class="tag-filter-field__btn" @click="shuffle()">
                    <div class="tag-filter-field__btn-icon"></div>
                </div>
            </div>           
            <div class="track-field-content__body">
                <Loading v-if="$store.state.loading"></Loading>
                <div class="track-field-content__body-item" 
                    v-for="item in musicList" :key="item.name"
                    @click="selectTrack(item)">
                    <div class="track-field-content__audio-icon"></div>
                    {{ item.name }}
                </div>
                <div v-show="containsAudio" class="_faded-item">Внутри папки нет музыки</div>
            </div>            
        </div>
        <div class="tag-field">
            <div class="tag-field__now-playing">
                <div class="tag-field__now-playing_trackname">{{currentTrackName.playingSong}}</div>
                <div class="tag-field__now-playing_artist-name">{{currentTrackName.playingArtist}}</div>
            </div>
            <Checkbox :array="tagsList.slice(1)" @is-checked="handleCheckboxes($event)"></Checkbox>
            <div class="tag-field__new-tag">
                <input class="tag-field__input" type="text" value="Новый тег" v-model="newTag">
                <div class="tag-field__btn">
                    <div class="tag-field__btn-icon"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import store from "vuex";
import Loading from "~/components/Loading.vue";
import Checkbox from "~/components/Checkbox.vue";
import SelectList from "~/components/SelectList.vue";

export default {
    components: {
        Loading,
        SelectList,
        Checkbox
	},
    data(){
        return {
            newTag: '',
            nowPlayingSong: 'Композиция',
            nowPlayingArtist: 'Исполнитель'
        }
    },
    methods: {
        selectTrack(item){
            this.$store.commit('UPDATE_CURRENT_TRACK', item);   
            this.$store.commit('UPDATE_CURRENT_TRACK_NAME', item);
        },
        shuffle() {
            this.musicList.sort(() => Math.random() - 0.5);
        },    
        handleCheckboxes(value) {
            // this.$store.commit('HANDLE_CHECKBOXES', value)               
        }          
    },
    computed: {
        tagsList() {
			return this.$store.getters.TAGS_LIST;
		},
        musicList() {
            return this.$store.getters.MUSIC_LIST;
        },
        currentItemName() {
            return this.$store.getters.CURRENT_ITEM_STATE[this.$store.getters.CURRENT_ITEM_STATE.length - 1].name;
        },
        currentItemPath() {
            return this.$store.getters.CURRENT_ITEM_STATE[this.$store.getters.CURRENT_ITEM_STATE.length - 1].path;
        },
        containsAudio() {
            if(this.$store.getters.MUSIC_LIST.length === 0) {
                return true;
            }
        },
        currentTrackName(){
            return this.$store.getters.CURRENT_TRACK_NAME;
        }
    },
    created() {
        return this.$store.dispatch('FETCH_FILES', this.$store.state.user.path);
    }
}
</script>

<style scoped>
    .music-field {
        display: flex;
    }

    .border {
        margin: -20px 0;
        flex-shrink: 0;
        border-left: 1px solid #E6E6E6;
        box-sizing: border-box;
    }

    .music-content {
        /* max-height: calc(100% - 49px); */
        display: flex;
        padding: 20px 15px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        flex-grow: 0;
        flex-shrink: 1;
        min-height: 0;
    }

    .track-field {
        display: flex;
        flex-direction: column;
        width: 100%;
        border-right: 1px solid #E6E6E6;
    }

    .track-field-content__nav {
        padding-bottom: 15px;
        display: flex;
        justify-content: left;
        align-items: baseline;
    }

    .track-field-content__ok-icon {
        width: 15px;
        height: 15px;
        background-image: url('../static/ok.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .track-field-content__folder-icon {
        width: 25px;
        height: 20px;
        background-image: url('../static/folder-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .track-field-content__audio-icon {
        width: 16px;
        height: 25px;
        background-image: url('../static/audio-icon.svg');
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 13px;
    }

    .track-field-content__arrow-icon {
        width: 15px;
        height: 15px;
        margin-left: 15px;
        margin-right: 30px;
        background-image: url('../static/back-arrow.svg');
        background-size: cover;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .track-field-content__text {
        font-size: 18px;
        user-select: none;
    }

    .track-field-content__body {
        box-sizing: border-box;
        transform: translate(0, 0);
        overflow-y: scroll;
        /* height: calc(100% - 85px); */
        margin-right: 20px;
    }

    .track-field-content__body-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 24px;
        margin-right: 24px;
    }

    .tag-field__now-playing {
        padding-bottom: 20px;
    }

    .tag-field__now-playing_artist-name {
        padding-top: 5px;
        font-size: 14px;
        line-height: 16px;
        color: #B3B3B3;
    }

    .tag-field__now-playing_trackname {
        font-size: 18px;
    }

    .track-field-content__body-item:hover {
        background-color: #E6E6E6;
    }

    .tag-filter-field {
        display: flex;
        padding-left: 5px;
        margin-bottom: 30px;
        flex-grow: 0;
        flex-shrink: 0;
    }
/* --------------------------------------------ОФОРМЛЕНИЕ КНОПКИ--------------------------------------------------- */
    .tag-filter-field__btn {
		display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px; 
        margin: 0 20px;
        margin-left: 20px;
        cursor: pointer;
    }

    .tag-filter-field__btn-icon {
        width: 12px;
        height: 12px;
        background-image: url('../static/shuffle.svg');
        background-size: cover;
        background-repeat: no-repeat;        
    }
/* --------------------------------------------ОФОРМЛЕНИЕ ТЕГОВ---------------------------------------------------- */
    .tag-field {
        width: 340px;
        flex-shrink: 0;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .tag-field__tag-content-item {
        display: flex;
        height: 50px;
    }
/* ---------------------------------------------ОФОРМЛЕНИЕ ИНПУТА------------------------------------------------ */
    .tag-field__new-tag {
        padding: 10px 0;
        display: flex;
    }

    .tag-field__input{
        padding: 15px 20px;
        width: 230px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px;
        color: #B3B3B3;
        font-size: 18px;
    }

    .tag-field__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        width: 60px;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px;    
    }

    .tag-field__btn-icon {
        width: 12px;
        height: 12px;
        background-image: url('../static/add-tag.svg');
        background-size: cover;
        background-repeat: no-repeat;
    }
/* ---------------------------------------------ОФОРМЛЕНИЕ СЕЛЕКТА----------------------------------------------- */
/*     
    .tag-filter-field {
        display: flex;
    }
    
    .tag-filter-field-select{
        padding: 10px 20px;
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px;
        color: #B3B3B3;
        font-size: 18px;
    }

    .tag-filter-field__btn {
        margin: 0 20px;
    }

    .tag-filter-field__btn-icon {
        width: 12px;
        height: 12px;
        background-image: url('../static/shuffle.svg');
        background-size: cover;
        background-repeat: no-repeat;        
    } */
/* ---------------------------------------------КАСТОМИЗАЦИЯ ЧЕКБОКСА-------------------------------------------- */
/* Customize the label (the container) */
    .tag-content-item-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 40px;
        cursor: pointer;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .tag-content-item-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        /* top: 0; */
        left: 0;
        height: 30px;
        width: 30px;
        border: 1px solid #B3B3B3;
        border-radius: 4px;
    }

    /* On mouse-over, add a grey background color */
    .tag-content-item-container:hover input ~ .checkmark {
        background-color: #E6E6E6;;
    }

    /* When the checkbox is checked, add a blue background */
    .tag-content-item-container input:checked ~ .checkmark {
        background-color: #4285F4;
        border: 1px solid #4285F4;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .tag-content-item-container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .tag-content-item-container .checkmark:after {
        left: 12px;
        top: 5px;
        width: 7px;
        height: 14px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }    
/* --------------------------------------------------ОФОРМЛЕНИЕ СКРОЛА--------------------------------------------- */
/* width */
    .track-field-content__body::-webkit-scrollbar {
        width: 5px;
        background: #B3B3B3;
        border-radius: 5px;
    }

    /* Track */
    .track-field-content__body::-webkit-scrollbar-track {
        background: #F2F2F2;
        border-radius: 5px;
        background-clip: content-box;
    }

    /* Handle */
    .track-field-content__body::-webkit-scrollbar-thumb {
        width: 5px;
        height: 75px;
        border-radius: 5px;
        background: #B3B3B3;
    }
</style>