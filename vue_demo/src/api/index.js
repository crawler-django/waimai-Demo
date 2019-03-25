/*
* 包含n个接口请求函数模块
* 函数返回值: promise对象
* */


// import axios from "axios";
// import ajax from './ajax'
//
// axios.defaults.baseURL = 'http://localhost:4000';

//
// // 1.根据经纬度获取位置详情
// export const reqAddress = (geohash) => ajax(`/position/${geohash}`);
//
// // 2、获取食品分类列表
// export const reqFoodTypes = () => ajax('/index_category');
//
// // 3、根据经纬度获取商铺列表
// export const reqShops = (longtitude, latitude) => ajax('/shops', {longtitude, latitude});
//
// // 4、根据经纬度和关键字搜索商铺列表
// export const reqSearchShops = (keyword) => ajax('/search_shops', {keyword});
// //export const reqSearchShops = (keyword) => fetchInfo('http://localhost:4000/search_shops', {keyword});
//
// // 6、用户名密码登陆
//export const reqPwdLogin = (name, pwd, captcha) => ajax('/login_pwd', {name, pwd, captcha}, 'POST');
//
// // 7、发送短信验证码
// export const reqSendMobileCode = (phone) => ajax('/sendcode', {phone});
//
// // 8、手机号验证码登陆
//export const reqMobileCodeLogin = (phone, code) => ajax('/login_sms', {phone, code}, 'POST');
//
// // 9、根据会话获取用户信息
// export const reqUserInfo = () => ajax('/userinfo');
//
// // 10、用户登出
// export const reqLogout = () => ajax('/logout');
//
// // 11、获取店铺
// export const reqShop = (shopId) => ajax('/shop', {shopId});
//
// // 获取随机店铺
// export const reqRandomShops = () => ajax('/found');
//
// // 请求记录订单
// export const reqRecordOrder = ({name, foodCart, totalPrice, shopImg, shopId, orderDate}) =>  ajax('/recordOrder', {name, foodCart, totalPrice, shopImg, shopId, orderDate}, 'POST');


import {fetchInfo} from "./ajax";

const BASE_URL = 'http://localhost:4000';


// 1.根据经纬度获取位置详情
export const reqAddress = (geohash) => fetchInfo(`${BASE_URL}/position/${geohash}`);

// 2、获取食品分类列表
export const reqFoodTypes = () => fetchInfo(BASE_URL + '/index_category');

// 3、根据经纬度获取商铺列表
export const reqShops = (longtitude, latitude) => fetchInfo(BASE_URL + '/shops', {longtitude, latitude});

// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (keyword) => fetchInfo(BASE_URL + '/search_shops', {keyword});

// 6、用户名密码登陆
export const reqPwdLogin = (name, pwd, captcha) => fetchInfo(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST');

// 7、发送短信验证码
export const reqSendMobileCode = (phone) => fetchInfo(BASE_URL + '/sendcode', {phone});

// 8、手机号验证码登陆
export const reqMobileCodeLogin = (phone, code) => fetchInfo(BASE_URL + '/login_sms', {phone, code}, 'POST');

// 9、根据会话获取用户信息
export const reqUserInfo = () => fetchInfo(BASE_URL + '/userinfo');

// 10、用户登出
export const reqLogout = () => fetchInfo(BASE_URL + '/logout');

// 11、获取店铺
export const reqShop = (shopId) => fetchInfo(BASE_URL + '/shop', {shopId});

// 获取随机店铺
export const reqRandomShops = () => fetchInfo(BASE_URL + '/found');

// 请求记录订单
export const reqRecordOrder = ({name, foodCart, totalPrice, shopImg, shopId, orderDate}) =>  fetchInfo(BASE_URL + '/recordOrder', {name, foodCart, totalPrice, shopImg, shopId, orderDate}, 'POST');
