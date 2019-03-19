<template>
    <div class="order">
        <div class="category-menu" id="category-menu" :style="{height: menuHeight + 'px'}">
            <ul class="category-list">
                <li v-for="(good, index) in shopGoods" :key="index" :class="{on: curIndex==index}" @click="toIndex(index)">
                    <img :src="good.icon" v-if="good.icon"/>
                    <span>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-menu" :style="{height: menuHeight + 'px'}" ref="foodsMenu">
            <ul ref="foodsUl">
                <li v-for="(good, index) in shopGoods" :key="index" class="foodsLi">
                    <h3 class="category-name">{{good.name}}</h3>
                    <ul class="foods">
                        <li v-for="(food, index) in good.foods" :key="index" @click="seeDetail(food)" :id="'f_' + (food.foodId || 'no')"  :class="{appoint: $route.query.foodId ? $route.query.foodId == food.foodId : false}">
                            <div class="left-img">
                                <img v-lazy="food.icon" />
                            </div>
                            <div class="right-info">
                                <h4 class="ellipsis"><strong>{{food.name}}</strong></h4>
                                <span class="gray" v-if="food.sellCount">
                                    月售{{food.sellCount}}份 <span v-if="food.rating">好评率{{food.rating}}%</span>
                                </span>
                                <div>
                                    <span v-if="food.discount" class="discount">{{food.discount}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥<strong class="strong">{{food.price}}</strong></span>
                                    <del class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</del>
                                </div>
                                <add-or-minus-btn :food="food"></add-or-minus-btn>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <FoodDetail :food="food" v-if="showFoodDetail"></FoodDetail>
    </div>
</template>

<script>
    import {bus} from '../../../common/js/eventBus'
    import {mapState} from 'vuex';
    import AddOrMinusBtn from "./add-or-minus-btn/AddOrMinusBtn";
    import FoodDetail from "./food-detail/FoodDetail";
    export default {
        name: "order",
        components: {FoodDetail, AddOrMinusBtn},
        data: function () {
            return {
                menuHeight: 0,
                foodTops: [],
                foodsScrollY: 0,
                food: {},
                showFoodDetail: false,
                curIndex: 0,
                lastY: 0,
            }
        },
        computed: {
            ...mapState(['shopGoods']),
        },
        watch: {
            shopGoods (value) {
                if (value) {
                    this.$nextTick(function () {
                        this._initFoodTops();
                        if (this.$route.query.foodId) {
                            const {foodId} = this.$route.query;
                            this._toAppointFood(foodId);
                        }
                    });
                }
            },
            foodsScrollY (value) {
                const index = this.foodTops.findIndex((item, index) => {
                    return item <= value && this.foodTops[index + 1] > value;
                });
                this.curIndex = index;
            }
        },
        methods: {
            _initFoodTops () {
                let tops = [];
                let top = 0;
                const lis = this.$refs.foodsUl.querySelectorAll('.foodsLi');

                tops.push(top);
                Array.from(lis).forEach((li) => {
                    //console.log(li)
                    top += li.offsetHeight;
                    tops.push(top)
                })
                this.foodTops = tops;
            },
            toIndex (index) {
                let y = this.foodTops[index];
                this.foodsScrollY = y;
                this.$refs.foodsMenu.scrollTo(0, y, 300);
            },
            seeDetail (food) {
                this.food = food;
                this.showFoodDetail = true;
                bus.$emit('toggleMask', this, 'showFoodDetail');
            },
            _toAppointFood (foodId) {
                // document.body.scrollTo(0, document.body.scrollHeight);
                // console.log(this.$refs.foodsMenu.querySelector(`#s_${foodId}`))
                // this.$refs.foodsMenu.querySelector(`#f_${foodId}`) && this.$refs.foodsMenu.querySelector(`#f_${foodId}`).scrollIntoView(true);
                this.$refs.foodsMenu.querySelector(`#f_${foodId}`) && this._scrollToAnchor(foodId);
                // console.log(this._getHash())
            },
            _scrollToAnchor (foodId) {
                let hash = this._getHash(foodId);
                let anchorDom = this._getAnchorDom(hash);
                const anchorScrollTop = anchorDom.offsetTop;
                this._animationToAnchor(0, anchorScrollTop);
            },
            _getHash (foodId) {
                return "#f_" + foodId;
            },
            _getAnchorDom (id) {
                return this.$refs.foodsMenu.querySelector(id);
            },
            _animationToAnchor (start, scrollTop) {
                let now = start + 50;
                if (now > scrollTop) {
                    now = scrollTop;
                }

                window.requestAnimationFrame(() => {
                    this.$refs.foodsMenu.scrollTop = now;

                    if (now == scrollTop) {
                        return;
                    }

                    this._animationToAnchor(now, scrollTop);
                });
            }
        },
        mounted () {
            this.menuHeight = document.documentElement.clientHeight - document.querySelector('.tapNav').offsetHeight;
            window.onresize = () => {
                this.menuHeight = document.documentElement.clientHeight - document.querySelector('.tapNav').offsetHeight;
                this._initFoodTops();
            };
            this.$refs.foodsMenu.onscroll = () => {
                this.foodsScrollY = this.$refs.foodsMenu.scrollTop;
                if (this.$refs.foodsMenu.scrollTop - this.lastY > 0) {
                    document.body.scrollTo(0, document.body.scrollHeight);
                }
                this.lastY = this.foodsScrollY;
            }
        },
    }
</script>

<style scoped>
    .order {
        display: flex;
    }
    .strong {
        font-size: .9rem;
    }

    /*左边*/
    .category-menu {
        width: 20%;
        overflow-y: auto;
        box-sizing: border-box;
        padding-bottom: 8vh;
    }
    .category-list {
        background: #faeeb8;
    }
    .category-list img {
        width: 1em;
    }
    .category-list li {
        text-align: center;
        padding: 3vh 0;
    }
    .category-list li.on {
        background: white;
        color: black;
        font-weight: 400;
    }


    /*右边*/
    .foods-menu {
        width: 80%;
        padding: 0 2vw;
        overflow-y: auto;
        box-sizing: border-box;
        padding-bottom: 8vh;
        position: relative;
    }
    .foods > li {
        display: flex;
        padding: 1.4vh 0;
        height: 14vh;
    }
    .foods > li.appoint {
        background: antiquewhite;
    }
    .left-img {
        width: 30%;
    }
    .left-img > img {
        width: 100%;
    }
    .right-info {
        position: relative;
        padding: 0 2vw;
        width: 65%;
    }
    .category-name {
        font-weight: 400;
        color: black;
    }
    .price {
        position: absolute;
        bottom: 0;
    }
    .discount {
        color: #f07373;
    }
    .now {
        color: rgb(255, 83, 57);
        margin-right: 1vw;
    }
    .old {
        color: #999;
    }
</style>
