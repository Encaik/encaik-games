import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/login.vue"),
      },
      {
        path: "games",
        name: "games",
        component: () => import("@/layouts/card.vue"),
        children: [
          {
            path: "gold-fish",
            name: "gold-fish",
            component: () => import("@/views/games/gold-fish.vue"),
          },
        ],
      },
    ],
  },
];

let router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("user")) {
    if (to.name == "login") {
      next();
    } else {
      router.push("login");
    }
  } else {
    next();
  }
});

export default router;
