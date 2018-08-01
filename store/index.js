import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

// window.fetch() 的 Polyfill
const store = () =>
    new Vuex.Store({
        state: {
            token: null
        },

        mutations: {
            SET_TOKEN: function(state, token) {
                state.token = token;
            }
        },
        getters: {
            GET_TOKEN(state) {
                //先从state里面获取用户登录信息
                let token = state.token;
                //如果 state 里面获取不到，那么从localStorage里面获取
                /* if (!token&&window!='undefined') {
                    token = localStorage.getItem("token") || null;
                } */
                return token;
            }
        },
        actions: {
            async login({ commit }, { user, password }) {
                try {
                    const { data } = await axios.post(
                        "https://api.chenyeah.com/blog/user/sign_in.php",
                        { user, password }
                    );
                    commit("SET_TOKEN", data.token);
                    localStorage.setItem("token", token);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        throw new Error("Bad credentials");
                    }
                    throw error;
                }
            }
        }
    });

export default store;
