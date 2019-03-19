<template>
    <div ref="shop" id="shop">
        <div class="shopHead shopInnerHead">
            <div class="head-bg" :style="{backgroundImage: `url(${shopInfo.bgImg})`}">
                <div class="back" @click="back()">
                    <i class="iconfont icon-huitui"></i>
                </div>
            </div>
            <div class="head-info">
                <img class="shop-img" :src="shopInfo.shopImg" />
                <div>
                    <h2 class="title" @click="showTitle=!showTitle">
                        <span>{{shopInfo.name}}</span>
                        <i class="iconfont icon-right-copy"></i>
                    </h2>
                </div>
                <div class="base">
                    <span>评价{{shopInfo.score}}</span>
                    <span>月售{{shopInfo.sellCount}}单</span>
                    <span>{{shopInfo.description}}约{{shopInfo.deliveryTime}}分钟</span>
                </div>
                <div class="discount" v-if="shopInfo.discount" @click="showDiscount=!showDiscount">
                    <ul>
                        <li>
                            <span class="discount-icon" :class="'icon-color-' + shopInfo.discount[0].type">{{shopInfo.discount[0].name}}</span>
                            <span class="discount-content ellipsis">{{shopInfo.discount[0].content}}</span>
                        </li>
                    </ul>
                    <span class="discount-info">
                        {{shopInfo.discount.length}}个优惠<i class="iconfont icon-below-s"></i>
                    </span>
                </div>
                <span class="notice ellipsis" v-if="shopInfo.bulletin">公告：{{shopInfo.bulletin}}</span>
                <span class="notice ellipsis" v-else>公告：欢迎光临，用餐高峰期请提前下单，谢谢。</span>
            </div>

            <transition name="fade">
                <div class="head-info-title" v-show="showTitle" @click="showTitle=!showTitle">
                    <div @click.stop="doNothing()">
                        <h2 class="title"><i class="icon-main">品牌</i> {{shopInfo.name}}</h2>
                        <div class="info-list">
                            <div>
                                <h3>{{shopInfo.score}}</h3>
                                <p>评分</p>
                            </div>
                            <div>
                                <h3>{{shopInfo.sellCount}}单</h3>
                                <p>月售</p>
                            </div>
                            <div>
                                <h3>{{shopInfo.description}}</h3>
                                <p>约{{shopInfo.deliveryTime}}</p>
                            </div>
                            <div>
                                <h3>{{shopInfo.deliveryPrice}}元</h3>
                                <p>配送费</p>
                            </div>
                            <div>
                                <h3>{{shopInfo.distance}}</h3>
                                <p>距离</p>
                            </div>
                        </div>
                        <div class="complete-notice">
                            <h3>
                                <span>公告</span>
                            </h3>
                            <p>
                                {{shopInfo.bulletin}}
                            </p>
                        </div>
                        <div class="close" @click.stop="showTitle=!showTitle">
                            <i class="iconfont icon-close_icon"></i>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div class="head-info-discount" v-show="showDiscount" @click="showDiscount=!showDiscount">
                    <div @click.stop="doNothing()">
                        <h2>优惠活动</h2>
                        <ul v-if="shopInfo.discount">
                            <li v-for="(discount, index) in shopInfo.discount" :key="index">
                                <span class="discount-icon" :class="'icon-color-' + discount.type">{{discount.name}}</span>
                                <span class="discount-content ellipsis">{{discount.content}}</span>
                            </li>
                        </ul>
                        <div class="discount-close" @click.stop="showDiscount=!showDiscount">
                            <i class="iconfont icon-close"></i>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="tapNav" ref="tapNav">
            <div>
                <router-link to="/shop/order" :class="{on: $route.path === '/shop/order'}" replace>点餐</router-link>
            </div>
            <div>
                <router-link to="/shop/ratings" :class="{on: $route.path === '/shop/ratings'}" replace>评价</router-link>
            </div>
            <div>
                <router-link to="/shop/info" :class="{on: $route.path === '/shop/info'}" replace>商家</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <div class="shopCart" :class="{light: showFoodCart}" v-if="this.$route.path == '/shop/order'" ref="shopCart">
            <transition name="move">
                <div class="cart-head" v-show="showFoodCart">
                    <div>
                        <span>已选购商品</span>
                        <button @click="clearCart()">
                            <i class="iconfont icon-qingkong"></i>
                            <span>清空</span>
                        </button>
                    </div>
                    <ul>
                        <li v-for="(food, index) in foodCart" :key="index">
                            <div class="food">
                                <span class="name ellipsis"><strong>{{food.name}}</strong></span>
                                <span>
                                <del v-if="food.oldPrice">￥{{_utilToFixed2(food.oldPrice * food.count)}}</del>
                                <span class="price">￥<strong>{{_utilToFixed2(food.price * food.count)}}</strong></span>
                            </span>
                                <AddOrMinusBtn :food="food"></AddOrMinusBtn>
                            </div>
                        </li>
                    </ul>
                </div>
            </transition>
            <div class="cart-bottom" @click="toggleShow()">
                <div class="cart-icon" :class="{on: totalCount}">
                    <i class="iconfont icon-ziyuan"></i>
                    <span class="count" v-if="totalCount">{{totalCount}}</span>
                </div>
                <div class="text">
                    <span :class="{'main': totalPrice}">{{totalPrice ? `￥${_utilToFixed2(totalPrice)}` : '未选购商品'}}</span>
                    <span>另需配送费4元</span>
                </div>
                <button :class="btnClass" @click.stop="submitOrder()" :disabled="btnClass ? false : true">{{accountText}}</button>
            </div>
        </div>
        <transition name="hidden">
            <MyMask></MyMask>
        </transition>

    </div>
</template>

<script>
    import {bus} from '../../common/js/eventBus';
    import {MessageBox, Toast} from 'mint-ui'
    import {mapState, mapGetters} from 'vuex';
    import AddOrMinusBtn from "./shop-order/add-or-minus-btn/AddOrMinusBtn";
    import MyMask from "../../components/Mask/MyMask";
    export default {
        name: "shop",
        components: {MyMask, AddOrMinusBtn},
        data: function () {
            return {
                showTitle: false,
                showDiscount: false,
                showFoodCart: false,
            }
        },
        computed: {
            ...mapState(['shopInfo', 'foodCart', 'userInfo']),
            ...mapGetters(['totalPrice', 'totalCount']),
            accountText () {
                const {totalPrice, shopInfo} = this;
                if (!totalPrice) {
                    return `还差￥${shopInfo.minPrice}起送`;
                } else if (totalPrice < shopInfo.minPrice) {
                    return `还差￥${this._utilToFixed2(shopInfo.minPrice - totalPrice)}起送`;
                } else {
                    return '结算';
                }
            },
            btnClass () {
                const {totalPrice, shopInfo} = this;
                if (shopInfo.minPrice <= totalPrice) {
                    return 'account';
                } else {
                    return ''
                }
            }
        },
        methods: {
            back () {
                this.$router.back();
                // this.$router.replace('/home');
                this.$store.dispatch('resetShop');
            },
            doNothing () {
                window.console.log("doNothing");
            },
            toggleShow () {
                this.showFoodCart = !this.showFoodCart;
                bus.$emit('toggleMask', this, 'showFoodCart');
            },
            clearCart () {
                MessageBox.confirm('确定清空购物车吗?').then(action => {
                    this.$store.dispatch('clearFoodCart');
                }, () => {});
            },
            submitOrder () {
                if (this.userInfo._id) {
                    const {totalPrice, foodCart, shopInfo, shopId} = this;
                    const name = shopInfo.name;
                    const shopImg = shopInfo.shopImg;
                    const orderDate = Date.now();
                    this.$store.dispatch('recordOrder', {name, foodCart, totalPrice, shopImg, shopId, orderDate});
                    Toast('结算成功');
                } else {
                    Toast('请先登录');
                }

            },
            _utilToFixed2 (num) {
                return Number(num.toFixed(2));
            }
        },
        watch: {
            foodCart (value) {
                if (value.length == 0) {
                    this.showFoodCart = false;
                    bus.$emit('closeMask');
                }
            }
        },
        mounted () {
            this.shopId = this.$route.query.shopId;
            this.$store.dispatch('getShop', this.shopId);
        }
    }
</script>

<style scoped>
    .shopHead {
        display: flex;
        flex-direction: column;
        border: 1px solid transparent;
    }
    /* shopHead 开始 */
    /* head-bg */
    .head-bg {
        width: 100%;
        height: 15vh;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        position: relative;
    }
    .head-bg::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(0deg,hsla(0,0%,100%,0),rgba(0,0,0,.5));
    }

    /* head-info */
    .head-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -10vh;
        z-index: 99;
        padding-bottom: 1vh;
    }
    .head-info > .shop-img {
        width: 23vw;
        height: 23vw;
    }
    .title {
        margin-top: 1vh;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
    }
    span {
        margin-right: 1vh;
    }
    .base {
        color: #666;
    }
    .discount {
        display: flex;
        justify-content: center;
        font-size: .7rem;
        margin: 1vh 0;
        width: 90%;
    }
    .discount > ul {
        width: 70%;
    }
    .discount > ul > li {
        display: flex;
    }
    .discount .discount-icon {
        width: 2.4em;
    }
    .discount-icon {
        color: white;
        padding: -1px;
    }
    .discount .discount-content {
        width: 80%;
    }

    .discount-info {
        margin-left: 1vh;
        width: 30%;
        color: #999;
        text-align: right;
    }
    .discount-info > i {
        font-size: .7rem;
    }
    .notice {
        color: #999;
        width: 90%;
        margin-left: 1vh;
    }

    .back {
        position: absolute;
        top: 1vh;
    }
    .back > i {
        padding: 1vh 1vw;
        font-size: 1.2rem;
        color: white;
    }

    .head-info-title {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 1111;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .head-info-title > div {
        background: white;
        width: 80%;
        padding: 4vh 0;
    }
    .head-info-title i {
        font-size: .9rem;
    }
    .head-info-title .title {
        margin-bottom: 1vh;
    }

    .info-list {
        display: flex;
        padding: 0 2vw;
        align-items: center;
    }
    .info-list > div {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1.2rem;
    }
    .info-list > div > h3 {
        font-weight: bold;
        font-size: .7rem;
    }
    .info-list > div > p {
        color: #999;
    }
    .complete-notice {
        padding: 0 3vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .complete-notice > h3 {
        width: 20vw;
        background-image: linear-gradient(90deg,#fff,#333 50%,#fff);
        background-size: 100% 1px;
        background-position: 50%;
        background-repeat: no-repeat;
        margin: 4.8vw auto 2.666667vw;
        text-align: center;
        color: #999;
    }
    .complete-notice > h3 > span {
        background: white;
        margin: 0;
    }
    .close {
        text-align: center;
        margin-top: 1vh;
    }
    .close i {
        font-size: 1.5rem;
    }

    .head-info-discount {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0,0,0,.5);
        z-index: 1111;
    }
    .head-info-discount > div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 35vh;
        background: white;
        padding: 2vh 7vw;
    }
    .head-info-discount > div ul {
        overflow-y: auto;
        height: 28vh;
    }
    .head-info-discount > div li {
        display: flex;
        margin: 1vh 0;
    }
    .head-info-discount > div h2 {
        font-size: 1.1rem;
        text-align: center;
        font-weight: bold;
        margin-bottom: 1vh;
    }
    .discount-close {
        position: absolute;
        right: 2vw;
        top: 1vh;
        padding: 1vh 1vw;
    }

    /* 过度 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    /* .fade-leave-active below version 2.1.8 */
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    /* shopHead 结束 */

    /* tabNav 开始 */
    .tapNav {
        display: flex;
        border: 1px solid transparent;
        position: sticky;
        top: 0;
        background: white;
        z-index: 2;
    }
    .tapNav > div {
        width: 33.3333333%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a {
        color: #666;
        border-bottom: 2px solid transparent;
        padding: 1vh;
    }
    a.on {
        color: #333;
        font-weight: bold;
        border-bottom: 2px solid rgb(35, 149, 255);
    }
    /* tabNav 结束 */


    /* shopCart 开始 */
    .shopCart {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
    }
    .shopCart > .cart-bottom {
        height: 8vh;
        background: #333;
        display: flex;
        padding-left: 4vw;
    }
    .cart-icon {
        width: 7vh;
        height: 7vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #222;
        border: 1vh solid #444;
        position: relative;
        bottom: 2vh;
    }
    .cart-icon > i {
        color: #999;
    }
    .cart-icon.on {
        background: dodgerblue;
    }
    .cart-icon.on > i {
        color: white;
    }
    .count {
        position: absolute;
        width: 1em;
        height: 1em;
        text-align: center;
        line-height: 1em;
        border-radius: 50%;
        background: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
        color: white;
        top: -.8vh;
        right: -2.5vw;
    }
    .text {
        color: #999;
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 4vw;
    }
    .text .main {
        color: white;
        font-weight: bold;
    }
    .cart-bottom {
        z-index: 1;
    }
    .cart-bottom button {
        flex: 1;
        background: #444;
        color: white;
        font-weight: bold;
        border: 0;
    }
    button.account {
        background: dodgerblue;
    }

    .cart-head {
        z-index: -1;
    }
    .cart-head > div {
        display: flex;
        justify-content: space-between;
        background: #eceff1;
        color: #666;
        align-items: center;
        padding-left: 3vw;
    }
    .cart-head > div > span {
        font-weight: 700;
    }
    .cart-head button {
        background: transparent;
        color: #666;
        border: 0;
        font-size: 12px;
        padding: 1vh 2vw;
    }
    .cart-head > ul {
        background: white;
        max-height: 35vh;
        overflow-y: auto;
    }
    .cart-head > ul > li {
        padding: 2vh 2vw;
    }
    .cart-head > ul > li .food {
        display: flex;
        position: relative;
        align-items: center;
    }
    .cart-head .food .name {
        width: 50%;
    }
    .cart-head .food .price {
        color: rgb(255, 83, 57);
    }
    del {
        color: #999;
        font-size: .6rem;
    }
    .food .price > strong {
        font-size: .9rem;
    }

    /* 动画 */
    .cart-head.move-enter-active, .cart-head.move-leave-active {
        transition: .5s;
    }
    .cart-head.move-enter, .cart-head.move-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }

    .hidden-enter-active, .hidden-leave-active {
        transition: .5s;
    }
    .hidden-enter, .hidden-leave-to {
        opacity: 0;
    }
</style>
