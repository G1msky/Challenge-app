import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Vue3TouchEvents from "vue3-touch-events";
import "flyonui/flyonui";
import "@/assets/css/index.scss";
import "flatpickr/dist/flatpickr.css";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(router).use(Vue3TouchEvents).mount("#app");
