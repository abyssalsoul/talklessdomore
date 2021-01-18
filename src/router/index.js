import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/home/index.vue";
import Navigation from "@/views/navigation/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/navigation",
    name: "Navigation",
    component: Navigation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;