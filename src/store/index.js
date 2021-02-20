import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        collapse: false,
    },
    getters: {
        getOrders: (state) => {
            return state.orders;
        }
    },
    mutations: {
        changeCollapse(state) {
            state.collapse = !state.collapse
        }
    }
})