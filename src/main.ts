import "./assets/main.css";

import { createApp } from "vue";
import { GesturePlugin } from "@vueuse/gesture";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(GesturePlugin);

app.mount("#app");
