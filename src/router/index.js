import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoadingScreen from "@/views/LoadingScreen.vue";
import StartGame from "@/views/StartGame.vue";
import EndGame from "@/views/EndGame.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: `Truth or Dare | Home` },
      component: HomeView,
    },
    {
      path: "/start-game",
      name: "start-game",
      meta: { title: `Truth or Dare | Start Game` },
      component: StartGame,
    },
    {
      path: "/end-game",
      name: "end-game",
      meta: { title: `Truth or Dare | End Game` },
      component: EndGame,
    },
    {
      path: "/loading-screen",
      name: "loading-screen",
      meta: { title: `Truth or Dare | Loading...` },
      component: LoadingScreen,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
