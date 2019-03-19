<template>
    <div class="personal-content" :style="{height:contentHeight + 'px'}">
        <router-link :to="userInfo._id ? '/userinfo' : '/login'" class="user-info">
            <div class="head-img w">
                <img src="https://avatar.csdn.net/9/A/4/3_sigridw.jpg"/>
            </div>
            <div class="info w">
                <span class="bold-font" v-if="!userInfo.phone || userInfo.name">{{userInfo.name || '登录|注册'}}</span>
                <span><i class="iconfont icon-10"></i> <span>{{userInfo.phone || '暂无绑定手机'}}</span></span>
            </div>
            <div class="right"><i class="iconfont icon-right"></i></div>
        </router-link>
        <div class="discount-way bgw">
            <div>
                <span class="envelopes"><span class="bold">0</span>个</span>
                <span>红包</span>
            </div>
            <div>
                <span class="integral"><span class="bold">0</span>个</span>
                <span>积分</span>
            </div>
        </div>
        <div class="address bgw">
            <div>
                <i class="iconfont icon-dizhi" style="color:rgb(74, 165, 240)"></i>
                <span class="w">地址</span>
                <i class="iconfont icon-right"></i>
            </div>
        </div>
        <div v-if="userInfo._id">
            <mt-button type="danger" size="large" @click="logout()">退出登录</mt-button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {MessageBox, Toast} from 'mint-ui'

    export default {
        name: "Personal",
        props: ['contentHeight'],
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            logout () {
                MessageBox.confirm('确认退出登陆吗?').then(action => {
                    this.$store.dispatch('logout');
                    Toast('退出成功');
                }).catch(action => {
                    window.console.log('取消退出');
                })
            }
        }
    }
</script>

<style scoped>
    .personal-content {
        background: #f5f5f5;
        overflow-y: auto;
    }

    .bgw {
        background: white;
    }
    /* user-info 开始 */
    .user-info {
        padding: 2vh 2vw;
        display: flex;
        background-image: linear-gradient(90deg,#0af,#0085ff);
        margin-top: 2px;
    }
    .head-img {
        width: 20%;
    }
    .head-img > img {
        width: 100%;
        border-radius: 50%;
    }
    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: .9rem;
        width: 70%;
    }
    .right {
        align-self: center;
    }
    /* user-info 结束 */

    /* discount-way 开始 */
    .discount-way {
        display: flex;
    }
    .discount-way > div{
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 2vh 0;
        border: 1px #ddd solid;
    }
    .discount-way > div > span{
        align-self: center;
    }
    .envelopes {
        color: rgb(255, 95, 62);
    }
    .integral {
        color: rgb(106, 194, 11);
    }
    .bold {
        font-size: 1.5rem;
        font-weight: bold;
    }
    /* discount-way 结束 */

    /* address 开始 */
    .address {
        margin: 2vh 0;
    }
    .address > div {
        display: flex;
        padding: 2vh 2vw;
        font-size: .9rem;
        line-height: 22px;
    }
    .address > div > span {
        width: 90%;
    }


</style>
