import { createRouter, createWebHistory } from "vue-router";
import auth from "@/middleware/auth";
import checkChallengeParticipation from "@/middleware/checkChallengeParticipation";

import AuthPage from "/src/pages/auth-index.vue";
import ProfilePage from "/src/pages/profile-index.vue";
import TodayPage from "/src/pages/today-index.vue";
import CreateChallengePage from "/src/pages/challenges/create-challenge-index.vue";
import ChallengeDetailPage from "/src/pages/challenges/challenge-detail-index.vue";
import JoinChallengePage from "/src/pages/challenges/join-challenge-index.vue";
import PublicChallengesPage from "/src/pages/challenges/public-challenges-index.vue";
import OwnChallengesPage from "/src/pages/challenges/own-challenges-index.vue";
import JoinedChallengesPage from "/src/pages/challenges/joined-challenges-index.vue";

const routes = [
  { path: "/", component: AuthPage, beforeEnter: auth },
  { path: "/today", component: TodayPage, beforeEnter: auth },
  { path: "/profile", component: ProfilePage, beforeEnter: auth },
  {
    path: "/challenges/public",
    component: PublicChallengesPage,
    name: "public-challenges",
    beforeEnter: auth,
  },
  {
    path: "/challenges/own",
    component: OwnChallengesPage,
    name: "own-challenges",
    beforeEnter: auth,
  },
  {
    path: "/challenges/joined",
    component: JoinedChallengesPage,
    name: "joined-challenges",
    beforeEnter: auth,
  },

  {
    path: "/create-challenge",
    component: CreateChallengePage,
    beforeEnter: auth,
  },
  {
    path: "/challenges/:id",
    component: ChallengeDetailPage,
    name: "challenge-detail",
    beforeEnter: auth,
  },
  {
    path: "/challenges/join/:challengeId/:invitationKey?",
    component: JoinChallengePage,
    name: "join-challenge",
    beforeEnter: [checkChallengeParticipation],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  linkActiveClass: "active",
  routes,
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
      document.querySelector("#task-drawer-daily-backdrop")?.remove();
      document.body.style.overflow = "";
    }, 100);
  }
});

export default router;
