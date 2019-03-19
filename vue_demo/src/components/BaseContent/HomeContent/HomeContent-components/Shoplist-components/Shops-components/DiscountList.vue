<template>
    <div class="discountlist" @click.stop="changeList">
        <transition name="change">
            <ul ref="discountul" :style="{overflow: 'hidden', height: nowListHeight + 'px'}">
                <li v-for="(discount,index) in discountlist" :key="index" class="ellipsis">
                    <span class="icon-name" :class="'icon-color-' + discount.type">{{discount['icon-name']}}</span>
                    <span class="w">{{discount.content}}</span>
                </li>
            </ul>
        </transition>
        <div v-if="discountNum > 2">
            <span>{{discountNum}}个活动 </span>
            <i class="iconfont icon-below-s"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DiscountList",
        props: [
            'discountlist',
            'discountNum'
        ],
        data: function () {
            return {
                oriListHeight: '',
                changedListHeight: '',
                nowListHeight: '',
            }
        },
        methods: {
            changeList () {
                if (this.nowListHeight == this.oriListHeight) {
                    this.nowListHeight = this.changedListHeight;
                } else {
                    this.nowListHeight = this.oriListHeight;
                }
            }
        },
        mounted() {
            if (this.$refs.discountul.getElementsByTagName('li').length > 2) {
                this.oriListHeight = this.$refs.discountul.getElementsByTagName('li').item(0).clientHeight * 2;
                this.changedListHeight = this.$refs.discountul.clientHeight;
            } else {
                this.oriListHeight = this.changedListHeight = this.$refs.discountul.clientHeight;
            }
            this.nowListHeight = this.oriListHeight;
        }

    }
</script>

<style scoped>
    .discountlist {
        display: flex;
    }
    .discountlist > ul {
        width: 70%;
        transition: all .3s ease;
    }
    .discountlist > div {
        width: 30%;
        text-align: right;
    }
    .discountlist > ul > li {

    }

    .icon-name {
        color: white;
    }
</style>
