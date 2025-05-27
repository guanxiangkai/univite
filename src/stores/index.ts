import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

const pinia = createPinia()

const persistedStatePlugin = createPersistedStatePlugin()

pinia.use(persistedStatePlugin)// 注册插件

export default pinia;
