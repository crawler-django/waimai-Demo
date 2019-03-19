<template>
    <div class="shop-info">
        <div>
            <h3>配送信息</h3>
            <p>
                <span class="fengniao">{{shopInfo.description}}</span>
                <span>约{{shopInfo.deliveryTime}}分钟送达，距离{{shopInfo.distance}}</span>
            </p>
            <p>{{shopInfo.deliveryPrice ? `配送费￥${shopInfo.deliveryPrice}` : '免配送费'}}</p>
        </div>
        <div>
            <h3>活动与服务</h3>
            <ul>
                <li v-for="(discount, index) in shopInfo.discount" :key="index">
                    <span :class="'icon-color-' + discount.type" class="icon">{{discount.name}}</span>
                    <span>{{discount.content}}</span>
                </li>
            </ul>
        </div>
        <div>
            <h3>商品实景</h3>
            <div class="scene-img">
                <img v-for="(pic, index) in shopInfo.pics" :key="index" :src="pic" @click="showSceneImg($event)"/>
            </div>
        </div>
        <div>
            <h3>商家信息</h3>
            <span class="introduction">暂无简介</span>
            <p class="text">
                <span><strong>品类</strong></span>
                <span>{{category}}</span>
            </p>
            <p class="text">
                <span><strong>商家电话</strong></span>
                <span>{{shopInfo.phone}}</span>
            </p>
            <p class="text">
                <span><strong>地址</strong></span>
                <span>{{shopInfo.address}}</span>
            </p>
            <p class="text">
                <span><strong>营业时间</strong></span>
                <span>{{shopInfo.workTime}}</span>
            </p>
        </div>
        <div>
            <h3>营业资质</h3>
        </div>
        <div class="scene-img-node" v-show="imgNodeShow" @click="imgNodeShow = !imgNodeShow">
            <img src="" ref="sceneImgNode"/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "info",
        computed: {
            ...mapState(['shopInfo']),
            category () {
                const {shopInfo} = this;
                let text = '';
                if (shopInfo.category) {
                    shopInfo.category.forEach((item, index, arr) => {
                        if (index == arr.length-1) {
                            text += item;
                        } else {
                            text += item + ','
                        }
                    })
                }
                return text;
            }
        },
        data: function () {
            return {
                imgNodeShow: false
            }
        },
        methods: {
            showSceneImg (e) {
                this.imgNodeShow = !this.imgNodeShow;
                this.$refs.sceneImgNode.src = e.target.src;
            }
        }
    }
</script>

<style scoped>
    .fengniao {
        padding: 0 .8vw;
        background: #0097ff;
        border-radius: .8vw;
        color: white;
        margin-right: 2vw;
        font-size: .6rem;
    }
    strong {
        color: black;
    }
    .shop-info > div {
        padding: .5vh 4vw 3vh;
        border-bottom: 1.5vh solid #eee;
    }
    .shop-info h3 {
        font-size: .9rem;
        font-weight: bold;
        color: black;
        padding: 1vh 0;
    }
    .shop-info li > .icon {
        color: white;
        margin-right: 2vw;
        border-radius: .8vw;
    }
    .scene-img {
        display: flex;
        overflow-x: auto;
    }
    .scene-img > img {
        width: 30%;
        height: 30%;
        padding: 0 1vw;
    }
    .shop-info .text {
        padding: 1vh 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #eee;
        margin-top: 1vh;
    }

    .shop-info > div.scene-img-node {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        padding: 0;
        z-index: 100;
    }
    .scene-img-node > img {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
