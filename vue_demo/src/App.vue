<template>
  <div id="app">
    <router-view />
    <BaseFooter class="footer" v-show="$route.meta.showFooter"></BaseFooter>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import BaseFooter from "./components/BaseFooter/BaseFooter";


export default {
  name: 'app',
  components: {
    BaseFooter,
  },
  mounted() {
    this.getAddress();
    this.getUserInfo();
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  /*初始化样式*/
  html {overflow: hidden; height: 100%;}
  body {margin:0; padding:29px00; font:12px"\5B8B\4F53",sans-serif;background:#ffffff; height: 100%; overflow-y: auto;}
  div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p{padding:0; margin:0;}
  table,td,tr,th{font-size:12px;}
  li{list-style-type:none;}
  img{vertical-align:baseline; border:0;}
  ol,ul {list-style:none;}
  h1,h2,h3,h4,h5,h6{font-size:12px; font-weight:normal;}
  address,cite,code,em,th {font-weight:normal; font-style:normal;}
  input,select {vertical-align: middle;}
  a {text-decoration: none;}



  /* 基础样式 */
  .w {
    padding: 0 2vw;
  }
  .pw {
    padding: 0 2vw;
  }
  .h {
    margin: 1vh 0;
  }

  .ph {
    padding: 1vh 0;
  }

  .tc {
    text-align: center;
  }

  .gray {
    color: #999;
  }

  .normal-font {
    color: #666;
    font-size: .75rem;
  }

  .bold-font {
    color: #333;
    font-weight: bold;
    font-size: .9rem;
  }

  .light-font {
    color: #999;
    font-size: .5rem
  }

  .title-size {
    color: black;
    font-size: .9rem;
  }

  .tr {
    text-align: right;
  }

  /*边框*/
  .bb {
    border-bottom: 1px solid #ddd;
  }
  .rb {
    border-right: 1px solid #ddd;
  }
  .tb {
    border-top: 1px solid #ddd;
  }

  /*省略*/
  .ellipsis {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  /*颜色a*/

  /* 首单色 */
  .icon-color-0 {
      background: rgb(112, 188, 70);
  }
  /* 满减色 */
  .icon-color-1 {
    background: rgb(240, 115, 115);
  }
  /* 特价色 */
  .icon-color-2 {
    background: rgb(241, 136, 79);
  }
  /* 赠品色 */
  .icon-color-3 {
    background: rgb(60, 199, 145);
  }

  .icon-main {
    background: linear-gradient(90deg,#fff100,#ffe339);
    color: #6a3709;
    padding: -1px;
  }

  /* 遮罩 */
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 99;
  }
  /* 遮罩上要显示的 */
  .light {
      z-index: 1000;
  }
</style>
