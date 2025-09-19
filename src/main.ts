import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Toolpop from "toolpop";
// import Toolpop from "./directives/plugin";

const app = createApp(App);

// Feel free to tweak these options. The values shown are the library's defaults.
app.use(Toolpop, {
  fontSize: 14,
  paddingX: 8,
  paddingY: 0,
  duration: 0.15,
  fontFamily: "system-ui, sans-serif",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  borderColor: "rgba(255, 255, 255, 0.28)",
  borderRadius: 6,
  scaleStart: 0.75,
  blur: 14,
});

app.mount("#app");
