<template>
    <div class="add-or-minus" v-if="food">
        <div class="minus" v-if="food.count" @click.stop="updateCount(false)">
            <i class="iconfont icon-shanjian"></i>
        </div>
        <div class="count" v-if="food.count">
            <span>{{food.count}}</span>
        </div>
        <div class="add" @click.stop="updateCount(true)">
            <i class="iconfont icon-add"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddOrMinusBtn",
        props: {
            food: Object
        },
        methods: {
            updateCount (flag) {
                //window.console.log(flag);
                this.$store.dispatch('updateFoodCount', {flag, food:this.food});
            }
        }
    }
</script>

<style scoped>
    .add-or-minus {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
    }
    .add {
        color: dodgerblue;
    }
    .count {
        margin: 0 2vw;
    }


</style>
