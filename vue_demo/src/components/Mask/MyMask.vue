<template>
    <div class="mask" v-if="isShow" @click="closeMask()">

    </div>
</template>

<script>
    import {bus} from '../../common/js/eventBus';
    export default {
        data: function () {
            return {
                isShow: false,
                targetObj: {},
                showTarget: '',
                flag: false
            }
        },
        methods: {
            openMask (that, showTarget, flag=false) {
                this.targetObj = that;
                this.isShow = !this.isShow;
                this.showTarget = showTarget;
                this.flag = flag;
            },
            closeMask () {
                this.isShow = !this.isShow;
                if (!this.flag)
                    this.targetObj[this.showTarget] = !this.targetObj[this.showTarget];
                else
                    this.targetObj[this.showTarget]();
            }
        },
        mounted () {
            bus.$on('toggleMask', this.openMask);
            bus.$on('closeMask', () => {
                this.isShow = false;
            });
        }
    }
</script>

<style scoped>

</style>
