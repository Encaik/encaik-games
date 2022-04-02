import { createApp } from "vue";
import App from "./App.vue";
import socket from "./util/socket";

const app = createApp(App);

app.use(socket, {
  connection: "http://172.16.0.55:3000",
  options: {
    autoConnect: false,
  },
});

app.mount("#app");
