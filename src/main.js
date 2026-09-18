import { createApp } from 'vue'
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/500.css'
import '@vscode/codicons/dist/codicon.css'
import '@/assets/styles/tokens.css'
import '@/assets/styles/base.css'
import '@/assets/styles/editor.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
