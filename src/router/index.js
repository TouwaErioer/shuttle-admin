import Vue from 'vue'
import VueRouter from 'vue-router'
import {check} from "@/utils/api/user";

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        component: () => import("@/layout/home"),
        redirect: 'user',
        children: [
            {
                path: 'user',
                component: () => import("@/views/user")
            },
            {
                path: 'service',
                component: () => import("@/views/service")
            },
            {
                path: 'category',
                component: () => import("@/views/category")
            },
            {
                path: 'store',
                component: () => import("@/views/store")
            },
            {
                path: 'product',
                component: () => import("@/views/product")
            },
            {
                path: 'order',
                component: () => import("@/views/order")
            },
        ]
    }, {
        path: '/login',
        component: () => import("@/pages/login")
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (to.path !== '/login') next({path: '/login'});
            else next()
        } else {
            check().then(res => {
                if (res.code === 1) next();
                else {
                    localStorage.removeItem('token');
                    next({path: '/login'})
                }
            })
        }
    }
);
export default router