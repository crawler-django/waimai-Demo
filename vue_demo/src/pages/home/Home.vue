<template>
    <div class="home">
        <BaseHeader :text="address.name" :title="address.name">
            <i class="iconfont icon-location" slot="left"></i>
            <input class="basehead-search h" placeholder="搜索商家、商品名称" slot="bottom" @input="showSearchNode()" v-model="search">
            <router-link slot="right" v-if="!userInfo._id" to="/login">登录|注册</router-link>
            <router-link slot="right" to="/userinfo" v-else><i class="iconfont icon-mydata"></i></router-link>
        </BaseHeader>
        <HomeContent :content-height="contentHeight" v-show="noSearch"></HomeContent>
        <div class="search-list" v-show="!noSearch" :style="{height: searchNodeHeight + 'px'}">
            <ul class="searchUl">
                <router-link v-for="(searchShop, index) in searchShops" :key="index" tag="li" :to="{path: '/shop', query: {shopId: searchShop.id}}">
                    <div class="left">
                        <img :src="searchShop.info.shopImg"/>
                        <span>{{searchShop.info.name}}</span>
                        <span class="icon" :class="'icon-color-' + searchShop.info.discount[0].type">{{searchShop.info.discount[0]['icon-name']}}</span>
                        <span class="fengniao">蜂鸟</span>
                    </div>
                    <div class="right">
                        <span class="gray">评分{{searchShop.info.score}}</span>
                    </div>
                </router-link>
            </ul>
        </div>

    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import BaseHeader from "../../components/BaseHeader/BaseHeader";
    import HomeContent from "../../components/BaseContent/HomeContent/HomeContent";
    export default {
        name: "Home",
        components: {HomeContent, BaseHeader},
        props: ['footerHeight'],
        data: function () {
            return {
                contentHeight: 0,
                noSearch: true,
                searchNodeHeight: 0,
                search: ''
            }
        },
        computed: {
            ...mapState(['address', 'userInfo', 'searchShops'])
        },
        methods: {
            ...mapActions(['getFoodTypes', 'getShops']),
            showSearchNode () {
                const search = this.search.trim();
                if (search) {
                    this.$store.dispatch('getSearchShops', search);
                    this.noSearch = false;
                } else {
                    this.noSearch = true;
                }

            }
        },
        mounted() {
            this.getFoodTypes();
            this.getShops();
            this.$nextTick(function () {
                this.contentHeight = document.documentElement.clientHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.basehead').offsetHeight;
                this.searchNodeHeight = document.documentElement.clientHeight - document.querySelector('.basehead').offsetHeight;
            })
        }
    }
</script>

<style scoped>
    .search-list {
        width: 100%;
        background: #eee;
        overflow-y: auto;
    }
    .searchUl > li {
        display: flex;
        justify-content: space-between;
        padding: 2vh 4vw;
        border-bottom: 1px solid #e3e3e3;
    }
    .searchUl > li > div {
        display: flex;
        align-items: center;
    }
    .left {
        width: 80%;
    }
    .left > span {
        margin: 0 1vw;
    }
    .left > .icon {
        color: white;
        border-radius: .8vw;
        display: inline-block;
        height: 1em;
        line-height: 1em;
        margin-top: .5vw;
    }
    .left .fengniao {
        color: white;
        border-radius: .8vw;
        display: inline-block;
        height: 1em;
        line-height: 1em;
        margin-top: .7vw;
        background: rgb(35, 149, 255);
    }
    .right {
        width: 20%;
        justify-content: flex-end;
    }
    .searchUl img {
        width: 7%;
        margin-right: 4vw;
    }
</style>
