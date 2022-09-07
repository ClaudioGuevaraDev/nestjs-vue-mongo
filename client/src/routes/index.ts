import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import DashboardView from "../views/Dashboard.vue";
import { useUserStore } from "../stores/user";
import axios from "axios";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  try {
    const response = await axios.get("/api/auth/check-user");
    userStore.email = response.data.user.email;
    userStore.username = response.data.user.username;
    userStore.logged = true;

    if (to.fullPath === "/" || to.fullPath === "/register") return "/dashboard";
  } catch (error) {
    userStore.email = "";
    userStore.username = "";
    userStore.logged = false;

    if (to.fullPath === "/dashboard") return "/";
  }
});
