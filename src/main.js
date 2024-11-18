import "./assets/main.css";
import "@fontsource/volkhov";
import "@fontsource/poppins";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";

const pinia = createPinia();
const app = createApp(App);

app.use(Toast);
app.use(pinia);
app.use(router);

app.mount("#app");
