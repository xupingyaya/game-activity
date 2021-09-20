import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
    {
        path: "/",
        component: () => import("../container/home.vue"),
    },
    {
        path: "/gold",
        component: () => import("../container/gold.vue"),
    },
    {
        path: "/gold1",
        component: () => import("../container/gold1.vue"),
    },
    {
        path: "/circle",
        component: () => import("../container/circle.vue"),
    },
    {
        path: "/test",
        component: () => import("../container/test.vue"),
    }
];

export default new Router({
    mode: "hash",
   // fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
});
