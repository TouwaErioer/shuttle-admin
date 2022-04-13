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
                component: () => import("@/views/user"),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: 'service',
                component: () => import("@/views/service"),
                meta: {
                    title: '业务管理'
                }
            },
            {
                path: 'category',
                component: () => import("@/views/category"),
                meta: {
                    title: '类别管理'
                }
            },
            {
                path: 'store',
                component: () => import("@/views/store"),
                meta: {
                    title: '商店管理'
                }
            },
            {
                path: 'product',
                component: () => import("@/views/product"),
                meta: {
                    title: '产品管理'
                }
            },
            {
                path: 'order/:status',
                component: () => import("@/views/order"),
                props: true,
                meta: {
                    title: '订单管理'
                }
            },
            {
                path: 'comment',
                component: () => import("@/views/comment"),
                meta: {
                    title: '评论管理'
                }
            },
            {
                path: 'ads',
                component: () => import("@/views/ads"),
                meta: {
                    title: '海报管理'
                }
            },
            {
                path: 'approve/:type',
                component: () => import("@/views/approve"),
                props: true,
                meta: {
                    title: '审批管理'
                }
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
        if (to.meta.title) {
            document.title = to.meta.title;
        }
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
