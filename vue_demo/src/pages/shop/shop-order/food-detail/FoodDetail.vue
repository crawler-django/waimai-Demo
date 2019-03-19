<template>
    <div class="food-detail">
        <div class="detail-content" :class="{light: isShow}">
            <div>
                <div class="info">
                    <img v-lazy="food.icon"/>
                    <h3><strong>{{food.name}}</strong></h3>
                    <div>
                        <span>月售{{food.sellCount}}份 </span>
                        <span>好评率{{food.rating}}%</span>
                    </div>
                    <span>{{food.description}}</span>
                    <div>
                        <span v-if="food.discount" class="discount">{{food.discount}}</span>
                    </div>
                    <div>
                        <span class="price">
                            ￥<span>{{food.price}}</span>
                        </span>
                        <del v-if="food.oldPrice">{{food.oldPrice}}</del>
                    </div>
                </div>
                <div class="back" @click="toggleShow()">
                    <i class="iconfont icon-huitui"></i>
                </div>
                <AddOrMinusBtn :food="food"></AddOrMinusBtn>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '../../../../common/js/eventBus'
    import AddOrMinusBtn from "../add-or-minus-btn/AddOrMinusBtn";
    export default {
        name: "FoodDetail",
        components: {AddOrMinusBtn},
        props: {
            food: Object
        },
        methods: {
            toggleShow () {
                this.$parent.showFoodDetail = !this.$parent.showFoodDetail;
                bus.$emit('closeMask');
            }
        },
        computed: {
            isShow () {
                return this.$parent.showFoodDetail;
            }
        }
    }
</script>

<style scoped>
    h3 {
        font-size: .85rem;
    }

    .detail-content {
        background: white;
        width: 70vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        padding: 1vh 2vw;
    }
    .detail-content > div {
        position: relative;
    }
    .detail-content .info {
        display: flex;
        flex-direction: column;
    }
    .detail-content > div img {
        width: 100%;
    }
    .price {
        color: rgb(255, 83, 57);
    }
    .price > span {
        font-size: .8rem;
        font-weight: bold;
        margin-right: 2vw;
    }
    .discount {
        color: #f07373;
    }

    .back {
        position: absolute;
        left: 1vw;
        top: 2vh;
        color: white;
    }
</style>
