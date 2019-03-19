<template>
    <div class="order">
        <div>
            <ul class="order-list">
                <li v-for="(order, index) in userInfo.order" :key="index">
                    <img :src="order.shopImg"/>
                    <div>
                        <div class="text">
                            <router-link tag="span" class="name" :to="{path: '/shop', query: {shopId: order.shopId}}">{{order.shopName}} <i class="iconfont icon-right"></i></router-link>
                            <span>订单已送达</span>
                        </div>
                        <p class="gray">{{order.orderDate | date-format}}</p>
                        <div class="text info">
                            <span>
                                <span class="ellipsis">{{order.foods[0].name}}</span><span>等{{order.foods.length}}件商品</span>
                            </span>
                            <span><strong>￥{{order.totalPrice}}</strong></span>
                        </div>
                        <div class="btn">
                            <button>再来一单</button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="userInfo._id" class="tip">
                <span>{{userInfo.order.length ? '没有更多了' : '没有任何订单哦～'}}</span>
            </div>
            <div v-else class="tip">
                <span>请先登录～登录才能对订单进行查看哦～</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Order",
        computed: {
            ...mapState(['userInfo']),
        }
    }
</script>

<style scoped>
    button {
        border-width: 0;
        outline: none;
        background: transparent;
    }
    i {
        font-size: .6rem;
    }
    .order {
        padding-bottom: 8vh;
    }
    .order-list > li {
        display: flex;
        padding: 2.5vh 5vw;
        border-top: 1.5vh solid #eee;
    }
    .order-list > li > div {
        flex: 1;
    }
    .order-list img {
        width: 10vw;
        height: 10vw;
        padding: 1vw 2vw 0 0;
    }
    .order-list .text {
        display: flex;
        justify-content: space-between;
    }
    .order-list > li p {
        padding: 1vw 0 1.5vh;
    }
    .text > .name {
        font-weight: 500;
        font-size: .8rem;
        color: black;
    }
    .order-list .info {
        padding: 1.5vh 0;
        border-top: 1px solid #ccc;
    }
    .order-list .info > span {
        display: flex;
    }
    .order-list .info .ellipsis {
        max-width: 10em;
        margin-right: 1vw;
    }
    .order-list .btn {
        display: flex;
        flex-direction: row-reverse;
        padding: 1vh 0;
        border-top: 1px solid #ccc;
    }
    .btn > button {
        border: 1px solid #2395ff;
        border-radius: 2px;
        color: #2395ff;
    }

    .order .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1vh;
    }
</style>
