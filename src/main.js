import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import Toaster from "@meforma/vue-toaster";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
   components,
  directives,
})


createApp(App).use(Toaster).mount("#app")
createApp(App).use(vuetify).mount('#app')
