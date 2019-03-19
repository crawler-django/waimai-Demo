/*
* 通过mutations间接更新state的对象
* */
import {
    ADD_FOODCOUNT, CLEAR_FOODCART, MINUS_FOODCOUNT,
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPES, RECEIVE_RANDOMGOODS, RECEIVE_RANDOMSHOPS, RECEIVE_SEARCHSHOPS, RECEIVE_SHOP,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO, RESET_SHOP, RESET_USERINFO
} from './mutation-types';
import {
    reqAddress,
    reqFoodTypes, reqLogout, reqRandomShops, reqRecordOrder, reqSearchShops, reqShop,
    reqShops,
    reqUserInfo
} from '../api';

export default {
    async getAddress ({commit, state}) {
        const geohash = state.latitude + ',' + state.longtitude;
        const result = await reqAddress(geohash);

        if (result.code == 0) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, {address});
        }
    },
    async getFoodTypes ({commit}) {
        const result = await reqFoodTypes();
        if (result.code == 0) {
            const foodTypes = result.data;
            commit(RECEIVE_FOODTYPES, {foodTypes});
        }
    },
    async getShops ({commit, state}) {
        const {longtitude, latitude} = state;
        const result = await reqShops(longtitude, latitude);
        if (result.code == 0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, {shops});
        }
    },
    async getUserInfo ({commit}) {
        const result = await reqUserInfo();
        if (result.code == 0) {
            const userInfo = result.data;
            commit(RECEIVE_USERINFO, userInfo);
        }
    },
    async logout ({commit}) {
        const result = await reqLogout();
        if (result.code == 0) {
            commit(RESET_USERINFO);
        }
    },
    async getShop ({commit}, shopId) {
        const result = await reqShop(shopId);
        if (result.code == 0) {
            const info = result.data.info;
            const goods = result.data.goods;
            const ratings = result.data.ratings;
            commit(RECEIVE_SHOP, {info,goods,ratings});
        }
    },
    resetShop ({commit}) {
        commit(RESET_SHOP);
    },
    updateFoodCount ({commit}, {flag, food}) {
        if (flag) {
            commit(ADD_FOODCOUNT, food);
        } else {
            commit(MINUS_FOODCOUNT, food);
        }
    },
    clearFoodCart ({commit}) {
        commit(CLEAR_FOODCART);
    },
    async getSearchShops ({commit}, keyword) {
        const result = await reqSearchShops(keyword);
        if (result.code == 0) {
            commit(RECEIVE_SEARCHSHOPS, result.data);
        }
    },
    async getRandomShops ({commit}) {
        const result = await reqRandomShops();
        if (result.code == 0) {
            commit(RECEIVE_RANDOMSHOPS, result.data);
        }
    },
    getRandomGoods ({commit}) {
        commit(RECEIVE_RANDOMGOODS);
    },
    async recordOrder ({commit}, {name, foodCart, totalPrice, shopImg, shopId, orderDate}) {
        // console.log(name,foodCart,totalPrice);
        const result = await reqRecordOrder({name, foodCart, totalPrice, shopImg, shopId, orderDate});
        foodCart.forEach((item) => {
            item.count = 0;
        });
        foodCart = [];
        if (result.code == 0) {
            commit(RECEIVE_USERINFO, result.data);
        }
    }
}
