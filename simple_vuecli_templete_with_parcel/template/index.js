import Vue from 'vue'
import App from './App.js'

new Vue({
    el: '#app',
    template:'<App></App>',
    components:{
        App:App
    }
}).$mount('#app')