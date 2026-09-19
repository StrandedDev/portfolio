import { createApp } from 'vue'
import '@fontsource/fira-code/latin-400.css'
import '@fontsource/fira-code/latin-500.css'
import '@/assets/styles/tokens.css'
import '@/assets/styles/base.css'
import '@/assets/styles/editor.css'
import '@/assets/styles/animations.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
