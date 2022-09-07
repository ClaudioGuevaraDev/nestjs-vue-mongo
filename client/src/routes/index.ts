import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import DashboardView from "../views/Dashboard.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
