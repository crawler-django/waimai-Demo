<template>
    <div class="swiper-container bb">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(tempArr,index) in foodTypesArr" :key="index">
                <a href="javascript:;" class="shop-to-link normal-font" v-for="(foodType,index) in tempArr" :key="index">
                    <img :src="'https://fuss10.elemecdn.com' + foodType.image_url">
                    <span>{{foodType.title}}</span>
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    export default {
        computed: {
            ...mapState(['foodTypes']),
            foodTypesArr () {
                const {foodTypes} = this;
                const arr = [];
                let tempArr = [];
                foodTypes.forEach(function (s) {
                    tempArr.push(s);
                    if (tempArr.length === 10) {
                        arr.push(tempArr);
                        tempArr = [];
                    }
                });
                if (tempArr) {
                    arr.push(tempArr);
                }
                return arr;
            }
        },
        watch: {
            foodTypes (value) {
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .swiper-slide {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 4vh;
    }
    .shop-to-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 17%;
        margin: 0 1vw;
    }
    .shop-to-link > img {
        width: 70%;
    }

</style>
