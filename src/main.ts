import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import { pop } from "toolpop";
import { createPop, type PopOptions } from "./directives/pop";

const app = createApp(App);

// try tweak the options
const options: Partial<PopOptions> = {
  fontSize: 14,
  duration: 0.15,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderColor: "rgba(255, 255, 255, 0.28)",
  borderRadius: 6,
  scaleStart: 0.75,
};

app.directive("pop", createPop(options));

app.mount("#app");
