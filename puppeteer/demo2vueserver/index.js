import Vue from 'vue/dist/vue'
import App from './src/App.js'

new Vue({
    el: '#app',
    template:'<App></App>',
    components:{
        App:App
    }
}).$mount('#app')