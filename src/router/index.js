import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoadingScreen from "@/views/LoadingScreen.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/start-game",
      name: "start-game",
      component: () => import("@/views/StartGame.vue"),
    },
    {
      path: "/loading-screen",
      name: "loading-screen",
      component: LoadingScreen,
      props: {
        default: true,
      },
    },
  ],
});

export default router;
