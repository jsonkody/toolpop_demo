import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { pop } from "toolpop";
// import { pop } from './directives/pop';

const app = createApp(App);

app.directive("pop", pop);

app.mount("#app");
