import Vue from 'vue'
import VueRouter from 'vue-router'

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
                path: 'order/:status',
                component: () => import("@/views/order"),
                props: true
            },
            {
                path: 'comment',
                component: () => import("@/views/comment"),
            },
            {
                path: 'ads',
                component: () => import("@/views/ads"),
            },
            {
                path: 'approve/:type',
                component: () => import("@/views/approve"),
                props: true
            }
        ]
    }, {
        path: '/login/:token',
        component: () => import("@/pages/login"),
        props: true
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log(to.path.split('/')[1]);
            if (to.path.split('/')[1] !== 'login') next({path: '/login/null'});
            else next()
        } else {
            next();
        }
    }
);
export default router