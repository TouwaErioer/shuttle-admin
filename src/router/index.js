import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        component: () => import("@/layout/home"),
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
    }
]

export default new VueRouter({
    routes
})