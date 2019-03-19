<template>
    <div>
        <div class="login">
            <div class="back">
                <i class="iconfont icon-huitui" @click="$router.back()"></i>
            </div>
            <div class="title">
                <span>咸鱼外卖</span>
            </div>
            <div class="login-way">
                <div class="way">
                    <span :class="{on: loginWay}" @click="loginWay = true">短信登录</span>
                    <span :class="{on: !loginWay}" @click="loginWay = false">密码登录</span>
                </div>
                <form class="form">
                    <div class="mobile-way" v-show="loginWay">
                        <div class="input">
                            <input type="text" placeholder="手机号" class="mobile" v-model="phone" maxlength="11"/>
                            <button :class="{rphone: rightPhone&&!intervalId}" :disabled="disabledBtn" @click.prevent="sendMsg()">{{sendTime>0 ? `已发送(${sendTime}s)` : "获取验证码"}}</button>
                        </div>
                        <div class="input">
                            <input type="text" placeholder="验证码" class="proving" v-model="code"/>
                        </div>
                    </div>
                    <div class="message-way" v-show="!loginWay">
                        <div class="input">
                            <input type="text" placeholder="手机/邮箱/用户名" v-model="username">
                        </div>
                        <div class="input">
                            <input type="password" placeholder="密码" v-show="switchWay" v-model="pwd">
                            <input type="text" placeholder="密码" v-show="!switchWay" v-model="pwd">
                            <div class="switch" :class="switchWay ? 'off' : 'on'" @click="switchWay = !switchWay">
                                <div class="switch-btn" :class="{rightmove: !switchWay}"></div>
                            </div>
                        </div>
                        <div class="input captcha">
                            <input type="text" placeholder="验证码" v-model="captcha">
                            <img src="http://localhost:4000/captcha" @click="getCaptcha()" ref="captcha"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="tips">
                <span>温馨提示: 未注册外卖账号的用户, 登录时将自动注册, 且代表已同意 <a href="javascript:;">《用户服务协议》</a></span>
            </div>
            <div class="btns">
                <button class="login-btn" @click="login()">登录</button>
                <button class="aboutus-btn">关于我们</button>
            </div>
        </div>
        <AlertTip v-show="tipShow" :alertText="tipText" @closeTip="closeTip()"></AlertTip>
    </div>

</template>

<script>
    import {reqSendMobileCode, reqMobileCodeLogin, reqPwdLogin} from '../../api';
    import AlertTip from "../../components/AlertTip/AlertTip";
    export default {
        name: "Login",
        components: {AlertTip},
        data: function() {
            return {
                loginWay: true,
                switchWay: true,
                phone: '',
                sendTime: 0,
                intervalId: undefined,
                pwd: '',
                username: '',
                code: '', //手机验证码
                captcha: '', //图像验证码
                tipShow: false,
                tipText: ''
            }
        },
        computed: {
            rightPhone () {
                return /^1\d{10}$/.test(this.phone);
            },
            disabledBtn () {
                return (!this.rightPhone||this.intervalId) ? true : false;
            }
        },
        methods: {
            handleFocus (e) {
                e.target.parentNode.style.border = '1px solid dodgerblue';
            },
            handleBlur (e) {
                e.target.parentNode.style.border = '1px solid #c8cccf';
            },
            async sendMsg () {
                // 启用倒计时
                window.console.log(this.intervalId);
                window.console.log(!this.rightPhone);
                window.console.log(this.intervalId || !this.rightPhone);
                if (!this.intervalId) {
                    this.sendTime = 30;
                    this.intervalId = setInterval(() => {
                        this.sendTime--;
                        if (this.sendTime <= 0) {
                            clearInterval(this.intervalId);
                            this.intervalId = 0;
                        }
                    }, 1000);
                }

                // 发送短信验证码
                const result = await reqSendMobileCode(this.phone);
                if (result.code === 1) {
                    this.alertTip(result.msg);
                    if (this.intervalId) {
                        this.sendTime = 0;
                        clearInterval(this.intervalId);
                        this.intervalId = 0;
                    }
                }
            },
            alertTip (text) {
                this.tipShow = true;
                this.tipText = text;
            },
            closeTip () {
                this.tipShow = false;
                this.tipText = "";
            },
            async login () {
                let loginResult;
                if (this.loginWay) {
                    // 短信登录
                    const {phone, code} = this;
                    if (!phone) {
                        this.alertTip("手机号不能为空");
                    } else if (!code) {
                        this.alertTip("验证码不能为空");
                    }

                    loginResult = await reqMobileCodeLogin(phone, code);
                    if (loginResult.code === 0) {
                        // 登录成功
                        if (this.intervalId) {
                            this.sendTime = 0;
                            clearInterval(this.intervalId);
                        }
                        this.$store.dispatch('getUserInfo');
                        // 跳转路由
                        this.$router.replace('/personal');
                    } else {
                        this.alertTip(loginResult.msg);
                    }
                } else {
                    // 密码登录
                    const {username, pwd, captcha} = this;
                    if (!username) {
                        this.alertTip("用户名不能为空");
                    } else if (!pwd) {
                        this.alertTip("密码不能为空");
                    } else if (!captcha) {
                        this.alertTip("验证码不能为空");
                    }

                    loginResult = await reqPwdLogin(username, pwd, captcha);
                    if (loginResult.code === 0) {
                        // 登录成功
                        this.$store.dispatch('getUserInfo');

                        // 跳转路由
                        this.$router.replace('/personal');
                    } else {
                        this.alertTip(loginResult.msg);

                    }
                    this.getCaptcha();
                }
            },
            getCaptcha () {
                this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
            }
        },
        mounted () {
            const inputNodes = this.$el.getElementsByTagNameNS("*", "input");

            for (let i = 0; i < inputNodes.length; i++) {
                let that = this;
                inputNodes[i].onfocus = function(e) {
                    that.handleFocus(e);
                };
                inputNodes[i].onblur = function (e) {
                    that.handleBlur(e);
                };
            }

        }
    }
</script>

<style scoped>
    button {
        border-width: 0;
        outline: none;
        background: transparent;
    }
    .login {
        display: flex;
        flex-direction: column;
    }
    .back {
        padding: 1vh 1vw;
    }
    .back > * {
        padding: 1vh 1vw;
    }
    .title {
        text-align: center;
        font-size: 2rem;
        color: dodgerblue;
        font-weight: bold;
        padding: 2vh 0;
    }

    /* 登录组件开始 */
    .login-way {
        display: flex;
        flex-direction: column;
    }
    .way {
        display: flex;
        justify-content: center;
        margin-bottom: 1vh;
    }
    .way > span {
        padding: .5vh 1vw;
        margin: 0 4vw;
    }
    .way > span.on {
        border-bottom: 1px dodgerblue solid;
        color: dodgerblue;
    }

    /* input */
    .form > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: center;
        border-radius:4px;
        border:1px solid #c8cccf;
        margin: 1vh 0;
        padding-right: 2vw;
        width: 80%;
        box-sizing: border-box;

    }
    .input > button {
        width: 40%;
        margin-right: -4vw;
        color: #bbb;
    }
    input[type="text"],input[type="password"] {
        -web-kit-appearance:none;
        -moz-appearance: none;

        font-size:1rem;
        height:1.5em;
        color:#6a6f77;
        border-width: 0;
        outline: none;

        margin: 1vh 0;
        padding: 0 2vw;
        width: 60%;

        align-self: center;
    }

    .switch {
        height: 1em;
        border-radius: 5px;
        width: 3em;
        border: 1px solid #bbb;
        background-color: transparent;

        transition: .3s background-color, .3s border-color;
        position: relative;
    }
    .switch.on {
        background-color: dodgerblue;
    }
    .switch.off {
        background-color: transparent;
    }
    .switch-btn {
        border-radius: 50%;
        height: 1em;
        width: 1em;
        border: 1px solid #bbb;
        position: absolute;
        left: -1px;
        top: -1px;
        background: white;
        transition: .3s left;
    }
    .switch-btn.rightmove {
        left: 2em;
    }
    .captcha > input {
        width: 60%;
    }
    .captcha > img {
        width: 40%;
        margin-right: -4vw;
    }
    button.rphone {
        color: #444;
    }
    /* 登录组件结束 */

    /* tips */
    .tips {
        align-self: center;
        width: 80%;
        margin: 1vh 0;
    }
    .tips > a {
        color: green;
    }

    /* btns */
    .btns {
        width: 80%;
        align-self: center;
        display: flex;
        flex-direction: column;
    }
    .btns > button {
        font-size:1rem;
        padding: 1vh 0;
        border-radius: 4px;
        margin: 1vh 0;
    }
    .login-btn {
        background: cornflowerblue;
        color: white;
    }
    .aboutus-btn {
        background: transparent;
        color: gray;
    }

</style>
