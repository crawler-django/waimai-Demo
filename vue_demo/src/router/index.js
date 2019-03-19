/*
    路由器对象
  */

import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '../pages/home/Home';
// import Found from '../pages/found/Found';
// import Order from '../pages/order/Order';
// import Personal from '../pages/personal/Personal';

const Home = () => import('../pages/home/Home.vue');
const Found = () => import('../pages/found/Found.vue');
const Order = () => import('../pages/order/Order.vue');
const Personal = () => import('../pages/personal/Personal.vue');


import Login from '../pages/login/Login';
import Shop from "../pages/shop/Shop";
import ShopRatings from "../pages/shop/shop-ratings/ShopRatings";
import ShopInfo from "../pages/shop/shop-info/ShopInfo";
import ShopOrder from '../pages/shop/shop-order/ShopOrder'


Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/found',
            component: Found,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/personal',
            component: Personal,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/order',
                    component: ShopOrder
                },
                {
                    path: '/shop/ratings',
                    component: ShopRatings
                },
                {
                    path: '/shop/info',
                    component: ShopInfo
                },
                {
                    path: '',
                    redirect: '/shop/order'
                }
            ]
        }
    ]

})
