import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPop, type PopOptions } from "toolpop";
// import { createPop, type PopOptions } from "./directives/pop";

const app = createApp(App);

// try tweak the options
const options: Partial<PopOptions> = {
  fontSize: 14,
  paddingX: 10,
  paddingY: 0,
  duration: 0.15,
  fontFamily: 'system-ui, sans-serif',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderColor: 'rgba(255, 255, 255, 0.28)',
  borderRadius: 6,
  scaleStart: 0.75,
};

app.directive("pop", createPop(options));

app.mount("#app");
