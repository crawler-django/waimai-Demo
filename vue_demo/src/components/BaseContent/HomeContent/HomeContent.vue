<template>
    <div class="w h content" :style="{height: contentHeight + 'px'}">
        <ShopkindNav></ShopkindNav>
        <Shoplist></Shoplist>
    </div>
</template>

<script>
    import ShopkindNav from "./HomeContent-components/FoodTypesNav";
    import Shoplist from "./HomeContent-components/Shoplist";
    export default {
        name: "BaseContent",
        components: {Shoplist, ShopkindNav},
        props: ['contentHeight']
    }
</script>

<style scoped>
    .content {
        overflow-y: auto;
    }
</style>
