import { createApp } from 'vue'
import { QuillEditor } from '@vueup/vue-quill';
import App from './App.vue'
import router from './router'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import store from './store'

createApp(App)
    .use(store)
    .component('QuillEditor', QuillEditor)
    .use(router)
    .mount('#app')
