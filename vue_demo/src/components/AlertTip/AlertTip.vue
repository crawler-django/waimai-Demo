<template>
    <div class="mask" :style="{height: wholeHeight + 'px'}">
        <div class="tip">
            <div>
                <i class="iconfont icon-tishi"></i>
                <span>{{alertText}}</span>
            </div>
            <button @click="$emit('closeTip')">确定</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlertTip",
        props: ['alertText'],
        data: function () {
            return {
                wholeHeight: 0,
            }
        },
        mounted() {
            this.wholeHeight = document.documentElement.clientHeight;
        }
    }
</script>

<style scoped>
    .mask {
        position: absolute;
        background: rgba(10,10,10,.5);
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tip {
        display: flex;
        flex-direction: column;
        width: 50%;
        border-radius: 8px;
        overflow: hidden;
        font-size: 1rem;
        text-align: center;
    }
    .tip i {
        color: yellow;
        font-size: 2rem;
    }
    .tip > div {
        background: white;
        padding: 3vh 2vw;
    }
    .tip > button {
        background: dodgerblue;
        color: white;
        padding: 1vh 1vw;
    }
</style>
