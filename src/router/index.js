import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "../views/PortfolioView.vue"),
  },
  {
    path: "/contact",
    name: "links",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/ContactView.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogView.vue"),
  },
  {
    path: "/blog/:slug",
    name: "BlogPost",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/BlogView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
