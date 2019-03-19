<template>
    <div class="found">
        <div class="text">
            <h2>
                <span class="left-span"></span>
                <i class="iconfont icon-zan"></i>
                <span>为你推荐</span>
                <span class="right-span"></span>
            </h2>
            <span>
                <span>你的口味，我都懂得</span>
            </span>
        </div>
        <div class="random-list">
            <ul v-if="goods">
                <router-link tag="li" :to="{path: '/shop', query: {shopId: good.id, foodId: good.good.foodId}}" class="random-shop" v-for="(good, index) in goods" :key="index">
                    <img v-lazy="good.good.icon" v-if="good.good"/>
                    <div v-if="good.good">
                        <h3 class="ellipsis">{{good.good.name}}</h3>
                        <div>
                            <span class="gray">月售{{good.good.sellCount}}份 好评率{{good.good.rating}}%</span>
                        </div>
                        <div>
                            <span class="price">￥<span class="main">{{good.good.price}}</span> <del v-if="good.good.oldPrice">￥{{good.good.oldPrice}}</del></span>
                            <span class="discount">满20减12</span>
                        </div>
                        <div class="shop-name ellipsis">
                            <i class="iconfont icon-dianpu"></i>
                            <span v-if="good"> {{good.name}}</span>
                        </div>
                    </div>
                </router-link>
            </ul>
        </div>
        <div class="more" @click="showMore()">
            <span v-if="randomShops.goods && randomShops.goods.length">查看更多 <i class="iconfont icon-right"></i></span>
            <span v-else>没有更多了哦～</span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {bus} from '../../common/js/eventBus';
    export default {
        name: "Found",
        data: function () {
            return {
                goods: []
            }
        },
        computed: {
            ...mapState(['randomGoods', 'randomShops']),
        },
        watch: {
            randomGoods (value) {
                this.goods.push.apply(this.goods, value);
            }
        },
        methods: {
            showMore () {
                if (this.randomShops && this.randomShops.goods.length) {
                    this.$store.dispatch('getRandomGoods');
                }
            }
        },
        mounted () {
            this.$store.dispatch('getRandomShops');
            this.goods = [];
        }
    }
</script>

<style scoped>
    h2 {
        font-size: 1rem;
        font-weight: 500;
    }
    h3 {
        font-weight: bold;
        font-size: 0.8rem;
    }
    .found {
        padding-bottom: 8vh;
    }
    .found .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2vh 0;
    }
    .text i {
        padding: 0 1vw;
        color: firebrick;
    }
    .text .left-span, .text .right-span {
        width: 4vw;
        height: 0;
        border: 1px solid #333;
        display: inline-block;
        margin-bottom: .3em;
        position: relative;
    }
    .right-span {
        margin-left: 1vw;
    }
    .left-span::after {
        content: '';
        display: inline-block;
        width: 2vw;
        height: 2vw;
        border-radius: 50%;
        position: absolute;
        right: -1vw;
        top: -1vw;
        background: #333;
        z-index: 1;
    }
    .right-span::before {
        content: '';
        display: inline-block;
        width: 2vw;
        height: 2vw;
        border-radius: 50%;
        position: absolute;
        left: -1vw;
        top: -1vw;
        background: #333;
        z-index: 1;
    }

    .random-list > ul {
        padding: 0 1vw;
        display: flex;
        flex-wrap: wrap;
    }
    .random-shop {
        display: flex;
        flex-direction: column;
        margin: 1vw;
        width: 47vw;
        box-sizing: border-box;
        border: 1px solid #eee;
    }
    .random-shop img {
        width: 100%;
        height: 41vw;
    }
    .random-shop > div {
        padding: 0 2vw;
    }
    .random-shop .price {
        color: #ff6000;
        margin-right: 1vw;
    }
    .random-shop .price del {
        color: #777;
    }
    .price .main {
        font-weight: bold;
        font-size: 0.9rem;
    }
    .random-shop .discount {
        color: #f66d6b;
        font-size: 0.6rem;
        border: 1px solid #f66d6b;
        box-sizing: border-box;
    }
    .random-shop .shop-name {
        margin-top: 1vh;
        border-top: 1px dashed #ccc;
        padding: 2vh 0;
    }
    .more {
        padding: 2vh 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .more i {
        font-size: 12px;
    }
</style>
