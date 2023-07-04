import { createApp } from "vue"
import App from "./App.vue"
import router from "@/router"
import { setupStore } from "@/store"
import { setupDirective } from "@/directive"

import "@/permission"
import "virtual:svg-icons-register"
import i18n from "@/lang/index"

// Style
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"
import "uno.css"
const app = createApp(App)
// 全域註冊 directive
setupDirective(app)
// 全域狀態管理啟用 store
setupStore(app)

app.use(router).use(i18n).mount("#app")
