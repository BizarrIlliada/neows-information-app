import { createApp } from 'vue'
import App from './App.vue'

import {
  ElButton,
  ElCard,
} from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'

const app = createApp(App)

const elementsPlus = [
  ElButton,
  ElCard,
]

elementsPlus.forEach(el => {
  app.component(el.name, el)
})

app.mount('#app')
