import { createApp } from "vue";
import App from "./App.vue";
import store from './store/index';
import socket from "./util/socket";
import http from './util/http';
import router from './route/index';
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import.meta.env.PROD

const app = createApp(App);

app.use(router);
app.use(store);

app.use(socket, {
  connection: import.meta.env.PROD?"http://124.222.1.235:3000/":"http://localhost:3000/",
  options: {
    autoConnect: false,
  },
});

app.config.globalProperties.$http = http;

app.mount("#app");
