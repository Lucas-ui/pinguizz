import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home page",
      component: Home,
    },
    {
      path: "/login",
      name: "login page",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/registration",
      name: "registration page",
      component: () => import("../views/Registration.vue"),
    },
    {
      path: "/themes",
      name: "themes page",
      component: () => import("../views/Themes.vue"),
    },
  ],
});

export default router;
