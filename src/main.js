import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import router from "@/router";
import store from "@/store";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    render: h => h(App),
    router,
    store: store
}).$mount('#app');
