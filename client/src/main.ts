import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.min.css";
import { router } from "./routes";

createApp(App).use(createPinia()).use(router).mount("#app");
