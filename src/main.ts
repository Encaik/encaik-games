import { createApp } from "vue";
import App from "./App.vue";
import socket from "./util/socket";
import http from './util/http';
import { router } from './route/index';
import "element-plus/es/components/message/style/css";

const app = createApp(App);

app.use(router);

app.use(socket, {
  connection: "http://172.16.0.55:3000",
  options: {
    autoConnect: false,
  },
});

app.config.globalProperties.$http = http;

app.mount("#app");
