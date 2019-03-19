<template>
    <div class="shoplist h">
        <div class="title tc title-size">推荐商家</div>
        <ShopsNav></ShopsNav>
        <Shops></Shops>
    </div>
</template>

<script>
    import ShopsNav from './Shoplist-components/ShopNav'
    import Shops from "./Shoplist-components/Shops";
    export default {
        name: "Shoplist",
        components: {
            Shops,
            ShopsNav
        }
    }
</script>

<style scoped>

</style>
