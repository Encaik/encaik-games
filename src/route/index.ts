import { createRouter,createWebHashHistory} from "vue-router";
const defaultLayout = () => import("@/layouts/default.vue");
const login = () => import("@/views/login.vue");
const game = () => import("@/views/game.vue");

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/",
    component: defaultLayout,
    children:[
      {
        path: "login",
        name: "login",
        component: login
      },
      {
        path: "game",
        name: "game",
        component: game
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})