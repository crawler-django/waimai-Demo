<template>
    <div class="footer tc">
        <div :class="{on: '/home'===$route.path}" @click="goUrl('/home')">
            <i class="iconfont icon-zonghe"></i>
            <span>首页</span>
        </div>
        <div :class="{on: '/found'===$route.path}" @click="goUrl('/found')">
            <i class="iconfont icon-faxian"></i>
            <span>发现</span>
        </div>
        <div :class="{on: '/order'===$route.path}" @click="goUrl('/order')">
            <i class="iconfont icon-dingdan"></i>
            <span>订单</span>
        </div>
        <div :class="{on: '/personal'===$route.path}" @click="goUrl('/personal')">
            <i class="iconfont icon-geren"></i>
            <span>我的</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseFooter",
        methods: {
            goUrl (path) {
                this.$router.replace(path);
            }
        }
    }
</script>

<style scoped>
    .footer {
        display: flex;
        position: absolute;
        background: white;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 1px #eee solid;
        padding-top: 1vh;
        z-index: 999;
        overflow: hidden;
    }
    .footer > div {
        width: 25%;
        display: flex;
        flex-direction: column;
    }
    .on {
        color: green;
    }
</style>
