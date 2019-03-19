/*
* 直接更新state多个方法的对象
* */
import Vue from 'vue';

import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODTYPES,
    RECEIVE_SHOP,
    RECEIVE_SHOPS,
    RECEIVE_USERINFO,
    RESET_USERINFO,
    RESET_SHOP,
    ADD_FOODCOUNT,
    MINUS_FOODCOUNT,
    CLEAR_FOODCART,
    RECEIVE_SEARCHSHOPS,
    RECEIVE_RANDOMSHOPS,
    RECEIVE_RANDOMGOODS
} from './mutation-types';

export default {
    [RECEIVE_ADDRESS] (state, {address}) {
        state.address = address;
    },
    [RECEIVE_FOODTYPES] (state, {foodTypes}) {
        state.foodTypes = foodTypes;
    },
    [RECEIVE_SHOPS] (state, {shops}) {
        state.shops = shops;
    },
    [RECEIVE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
    },
    [RESET_USERINFO] (state) {
        state.userInfo = {};
    },
    [RECEIVE_SHOP] (state, {info, goods, ratings}) {
        state.shopInfo = info;
        state.shopGoods = goods;
        state.shopRatings = ratings;
    },
    [RESET_SHOP] (state) {
        state.shopInfo = {};
        state.shopGoods = {};
        state.shopRatings = {};
    },
    [ADD_FOODCOUNT] (state, food) {
        if (!food.count) {
            Vue.set(food, 'count', 1);
            state.foodCart.push(food);
        } else{
            food.count += 1;
        }
    },
    [MINUS_FOODCOUNT] (state, food) {
        if (food.count && food.count > 0) {
            food.count -= 1;
            if (food.count == 0) {
                state.foodCart.splice(state.foodCart.indexOf(food), 1);
            }
        }
    },
    [CLEAR_FOODCART] (state) {
        state.foodCart.forEach((food) => {
            if (food.count)
                food.count = 0;
        });
        state.foodCart = [];
    },
    [RECEIVE_SEARCHSHOPS] (state, searchShops) {
        state.searchShops = searchShops;
    },
    [RECEIVE_RANDOMSHOPS] (state, randomShops) {
        state.randomShops = randomShops;
        if (state.randomShops.goods && state.randomShops.goods.length) {
            const arr = _getRandomGoods(state);
            state.randomGoods = arr;
        } else {
            state.randomGoods = [];
        }
    },
    [RECEIVE_RANDOMGOODS] (state) {
        if (state.randomShops.goods && state.randomShops.goods.length) {
            const arr = _getRandomGoods(state);
            state.randomGoods = arr;
        } else {
            state.randomGoods = [];
        }
    }
}

function _getRandomGoods(state) {
    const id = state.randomShops.id;
    const name = state.randomShops.name;
    let arr = [];
    let goods = state.randomShops.goods;
    for (let i = 0; i < 6; i++) {
        let goodx = Math.floor(Math.random() * goods.length);

        let goody = Math.floor(Math.random() * goods[goodx].foods.length);
        let tempGood = goods[goodx].foods[goody];
        arr.push({id, name, good: tempGood});
        //console.log(goodx, goody, tempGood, state.randomShops.goods[goodx].foods.length);
        goods[goodx].foods.splice(goody, 1);
        if (goods[goodx].foods.length == 0) {
            goods.splice(goodx, 1);
        }
        if (goods.length == 0) {
            return arr;
        }
        //console.log(state.randomShops)
    }
    return arr;
}
