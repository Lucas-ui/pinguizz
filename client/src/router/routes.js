import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home page",
      component: Home,
    },
    {
      path: "/module/:name",
      name: "module page",
      component: () => import("../views/ModulePage.vue"),
    },
    {
      path: "/quiz/:name",
      name: "quiz page",
      component: () => import("../views/Quiz.vue"),
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
    {
      path: "/terms",
      name: "terms page",
      component: () => import("../views/Terms.vue"),
    },
    {
      path: "/rules",
      name: "rules page",
      component: () => import("../views/Rules.vue"),
    },
    {
      path: "/profile",
      name: "profile page",
      component: () => import("../views/Profile.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  await authStore.checkAuth();

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "home page" });
  } else {
    next();
  }
});

export default router;
