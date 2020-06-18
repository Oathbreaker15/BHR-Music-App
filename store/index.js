import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
        currentTrack: {},
        currentTrackName: {
            playingSong: '',
            playingArtist: ''
        },
        loading: true,
        token: null,
        tags: [
            {
                name: 'Без тегов',
                isChecked: false,
                hasDivider: true,
                relationship: true,
            },
            {
                name: 'Весело',
                isChecked: false,
                hasDivider: false
            },
            {
                name: 'Грустно',
                isChecked: false,
                hasDivider: false
            },
            {
                name: 'Мощно',
                isChecked: false,
                hasDivider: false
            }],
        filesList: [],
        musicList: [],
        user: [],
        sidebarVisible: false,
        currentItemState: [{
            name: 'Диск',
            path: 'disk:/',
            resource_id: ''
        }],
    },
    mutations: {
        HANDLE_CHECKBOXES(state, currentTag) {
            state.tags.forEach(tag => {
                // добавить метку отмечено                
                if (tag.name === currentTag.name){                   
                    tag.isChecked = currentTag.isChecked; 
                } 
                // если нажали "Без тегов" убрать метку отмечено со всех остальных тегов
                if (tag.name === currentTag.name && tag.relationship) {
                    state.tags.forEach(element=>{
                        if (!element.relationship) {
                            element.isChecked = false;
                        } else {

                        }
                    })
                }
                // убираем метку отмечено с тега "Без тегов" если нажали на другой тег
                if (tag.name === currentTag.name && !tag.relationship) {
                    state.tags.forEach(element=>{
                        if (element.relationship) {
                            element.isChecked = false;
                        }
                    })
                }      
            })
        },        
        //тут я делаю мутацию которая кладёт токен в стэйт 
        SET_TOKEN(state, value) {
            state.token = value;
        },
        SET_RESOURCE_ID (state, value) {
            Vue.set(state.currentItemState[0], "resource_id", value);
        },
        // сортируем список файлов с ответа Яндекса на файлы и музыку
        FETCH_FILES(state, payload) {
            state.filesList = payload.data._embedded.items.filter((item) => {
                if (item.type === "dir" || item.media_type === "audio") {
                    return true;
                }  
                return false;
            })
            .map((item) => {
                return {
                    name: item.name,
                    type: item.type === "dir" ? 'folder' : 'audio',
                    path: item.path
                };
            });
        },
        FETCH_AUDIO(state, payload) {
            state.musicList = payload.data._embedded.items.filter((item) => {
                if (item.media_type === "audio") {
                    return true;
                }  
                return false;
            })
            .map((item) => {
                return {
                    name: item.name,
                    type: item.type === "dir" ? 'folder' : 'audio',
                    path: item.path,
                    href: item.file
                };
            });
        },        
        // добавляем "текущее состояние" для навигации, добавляя или удаляя записи в массиве
        ADD_CURRENT_STATE(state, item) {
            state.currentItemState.push({
                name: item.name,
                path: item.path
            });                   
        },
        UPDATE_CURRENT_TRACK(state, item){
            state.currentTrack = {...item};
        },
        REMOVE_CURRENT_STATE(state) {
            state.currentItemState.pop();
        },
        UPDATE_USER(state, user) {
            state.user = {...user};
        },
        TOGGLE_SIDEBAR(state) {
            state.sidebarVisible = !state.sidebarVisible;
        },
        CLOSE_SIDEBAR(state) {
            state.sidebarVisible = false;
        },
        UPDATE_CURRENT_TRACK_NAME(state, item) {
            if (item.name.indexOf('-') !== -1) {
                state.currentTrackName.playingSong = item.name.replace(/^[\w ]+-/,'').replace(/\.[^.]*$/,''); 
                state.currentTrackName.playingArtist = item.name.replace(/\-[^-]*$/,''); 
            } else {
                state.currentTrackName.playingSong = item.name.replace(/^[\w ]+-/,'').replace(/\.[^.]*$/,''); 
                state.currentTrackName.playingArtist = ''; 
            } 
        }
    },
    getters: {
        FILES_LIST: state => {
            return state.filesList;
        },
        MUSIC_LIST: state => {
            return state.musicList;
        },
        CURRENT_ITEM_STATE: state => {
            return state.currentItemState;
        },
        GET_PATH_TO_DB: (state) => {
            return state.currentItemState[state.currentItemState.length-1].path;
        },
        TAGS_LIST: state => {
            return state.tags;
        },
        CURRENT_TRACK: state => {
            return state.currentTrack;
        },
        CURRENT_TRACK_NAME: state => {
            return state.currentTrackName;
        }
    },
    actions: {
        // фетчим файлы с яндекса для дальнейшей сортировки
        FETCH_FILES: ({commit, state}, route) => {
            state.loading = true;
            return Axios({
                method: 'get',
                url: 'https://cloud-api.yandex.net/v1/disk/resources',
                withCredentials: true,
                params: {
                    path: route,
                    limit: '500'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `OAuth ${state.token}` 
                    }
                })
                .then(response => {
                    // console.log(response);                  
                    commit('FETCH_FILES', response);
                    commit('FETCH_AUDIO', response);
                    commit('UPDATE_CURRENT_TRACK', state.musicList[0])
                    commit('UPDATE_CURRENT_TRACK_NAME', state.currentTrack);
                    commit('SET_RESOURCE_ID', response.data.resource_id);
                    state.loading = false;
                });
        },    
        // вызываем мутации которые добавляют или удаляют "хлебные крошки" в массиве currentItemState
        GO_TO(context, item) {
            if(item.type === 'folder') {  
                context.commit('ADD_CURRENT_STATE', item);
                context.dispatch('FETCH_FILES', item.path);                     
            }
        },
        GO_BACK({state, commit, dispatch}) {
            commit('REMOVE_CURRENT_STATE');
            dispatch('FETCH_FILES', state.currentItemState[state.currentItemState.length - 1].path);
        },
        // обновляем пользователя при работе с API
        UPDATE_USER(context, user) {
            context.commit('UPDATE_USER', user)
        },
        // обновляем путь до рабочей папки через API и обновляем объект пользователя
        async UPDATE_PATH(context) {
            // сперва патчим новый путь
            await Axios({
                method: 'patch',
                url: 'http://localhost:3003/api/users',
                withCredentials: false,
                params: {
                    id: context.state.user.id,
                    path: context.state.currentItemState[context.state.currentItemState.length-1].path
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                }      
            });
            // затем возвращаем обновленную запись о пользователе
            const refreshUserState = await Axios({
                method: 'get',
                url: 'http://localhost:3003/api/users',
                withCredentials: false,
                params: {
                    id: context.state.user.id
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                }      
            });
            context.commit('UPDATE_USER', refreshUserState.data[0])
        },
    }
  });

export default store;