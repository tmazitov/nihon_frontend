import { createRouter , createWebHashHistory } from "vue-router";

const testRoutres = [
    
]

const routes = [
    {
        name: "auth",
        path: "/auth",
        component: () => import('./pages/Auth.vue')
    },
    {
        name: "about",
        path: "/",
        component: () => import('./pages/About.vue')
    },
    {
        name: "profile",
        path: "/profile",
        component: () => import('./pages/Profile.vue')
    },
    {
        name: "dictionary",
        path: "/dictionary",
        component: () => import('./pages/Dictionary.vue')
    },
    ...testRoutres
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router