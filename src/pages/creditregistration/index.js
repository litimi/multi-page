import Vue from 'vue'
import App from './App'
import 'amfe-flexible/index.js'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
