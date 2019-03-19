<template>
    <div class="basehead w">
        <div>
            <span>
                <slot name="left"></slot>
            </span>
            <span class="title">
                <span>
                    {{text}}
                </span>
            </span>
            <span class="right">
                <slot name="right"></slot>
            </span>

        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
    export default {
        props: ['text']
    }
</script>

<style scoped>
    .basehead {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(90deg,#0af,#0085ff);
    }
    .basehead-search {
        flex-grow: 1;
    }
    .basehead > div {
        margin: 1vh 0;
        display: flex;

    }
    .basehead > div > span {
        width: 33.3333%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .title {
        text-align: center;
    }
    .right {
        text-align: right;
    }
</style>
