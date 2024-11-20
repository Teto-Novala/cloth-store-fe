import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignInView from "@/views/sign-in/SignInView.vue";
import ForgotPasswordView from "@/views/forgot-password/ForgotPasswordView.vue";
import RegisterView from "@/views/register/RegisterView.vue";
import ConfirmationCodeView from "@/views/confirmation-code/ConfirmationCodeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signin",
      name: "sign-in",
      component: SignInView,
    },
    {
      path: "/forgotpassword",
      name: "forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/confirmationcode",
      name: "confirmation-code",
      component: ConfirmationCodeView,
    },
  ],
});

export default router;
