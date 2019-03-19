<template>
    <nav class="tc normal-font bb ph">
        <div>
            <span>综合排序</span>
            <i class="iconfont icon-below-s"></i>
        </div>
        <div>
            <span>距离最近</span>
        </div>
        <div>
            <span>满减</span>
        </div>
        <div>
            <span>筛选</span>
            <i class="iconfont icon-shaixuan"></i>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "ShopNav"
    }
</script>

<style scoped>
    nav {
        display: flex;
    }
    nav > div {
        width: 25%;
    }

</style>
