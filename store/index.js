import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      token: null,
      filesList: [],
      currentItemState: [{
          name: 'Диск',
          path: 'disk:/',
          resource_id: ''
      }],
    },
    mutations: {
    //тут я делаю мутацию которая кладёт токен в стэйт    
        SET_TOKEN(state, value) {
            state.token = value;
        },
        SET_RESOURCE_ID (state, value) {
            state.resource_id = value;
        },
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
        ADD_CURRENT_STATE(state, item) {
            state.currentItemState.push({
                name: item.name,
                path: item.path
            });                   
        },
        REMOVE_CURRENT_STATE(state) {
            state.currentItemState.pop();
        },
    },
    getters: {
        FILES_LIST: state => {
            return state.filesList;
        },
        CURRENT_ITEM_STATE: state => {
            return state.currentItemState;
        }
    },
    actions: {
        FETCH_FILES: ({commit, state}, route) => {
            Axios({
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
                    commit('FETCH_FILES', response);
                    commit('SET_RESOURCE_ID', response.data.resource_id);
                    console.log(response.data.resource_id);                   
                })
        },
        GO_TO(context, item) {
            if(item.type === 'folder') {  
                context.commit('ADD_CURRENT_STATE', item);
                context.dispatch('FETCH_FILES', item.path);                     
            }
        },
        GO_BACK({state, commit, dispatch}) {
            commit('REMOVE_CURRENT_STATE');
            dispatch('FETCH_FILES', state.currentItemState[state.currentItemState.length - 1].path);
        }
    }
  });

export default store;