<template>
    <div>
        <div class="score">
            <span>{{shopInfo.score}}</span>
            <div class="score-img">
                <span>商家评分</span>
                <div class="star">
                    <div>
                        <img :src="scoreBg"/>
                    </div>
                    <div :style="{width: shopInfo.score/5*100 + '%'}" class="light-star">
                        <img :src="scoreOri"/>
                    </div>
                </div>
            </div>
            <div class="other-score">
                <div>
                    <span>味道</span>
                    <span class="number">{{shopInfo.foodScore}}</span>
                </div>
                <div>
                    <span>服务</span>
                    <span class="number">{{shopInfo.serviceScore}}</span>
                </div>
                <div>
                    <span>配送</span>
                    <span class="number">4.7</span>
                </div>
            </div>
        </div>
        <div class="ratings">
            <div class="rating-icon">
                <span :class="{on: selectType==0}" @click="showTypeRating(0)">全部 {{shopRatings.length}}</span>
                <span :class="{on: selectType==1}" @click="showTypeRating(1)">满意 {{pleasedRatings.length}}</span>
                <span class="unsatisfy" :class="{on: selectType==2}" @click="showTypeRating(2)">不满意 {{unpleasedRatings.length}}</span>
            </div>
            <div class="rating-list">
                <div class="have-content">
                    <i class="iconfont icon-dagou" :class="{on: haveContent}" @click="toggleHaveRating()"></i>
                    <span>只看有内容的评价</span>
                </div>
                <ul class="user-ratings">
                    <li v-for="(userRating, index) in curRatings" :key="index">
                        <div class="user-img">
                            <img :src="userRating.avatar"/>
                        </div>
                        <div class="user-rating">
                            <div class="name-and-time">
                                <span>{{userRating.username}}</span>
                                <span>{{_utilToDate(userRating.rateTime)}}</span>
                            </div>
                            <div class="user-score">
                                <div class="star">
                                    <div>
                                        <img :src="scoreBg"/>
                                    </div>
                                    <div class="light-star" :style="{width: userRating.score/5*100 + '%'}">
                                        <img :src="scoreOri"/>
                                    </div>
                                </div>
                                <span :class="{unsatisfy: userRating.rateType}">{{userRating.rateType==0 ? '满意' : '不满意'}}</span>
                            </div>
                            <div class="text">
                                <span>{{userRating.text}}</span>
                            </div>
                            <div class="reply">
                                <p>
                                    商家回复：亲爱的顾客，感谢您选择品尝本店的美食，谢谢您认可我们的口味和服务，我们会继续努力，为您提供更好的服务。祝您生活愉快！
                                </p>
                            </div>
                            <div class="photo" >
                                <img v-for="(photo,index) in userRating.photos" :key="index" :src="photo" :style="{width: userRating.photos.length > 2 ? 100/userRating.photos.length - userRating.photos.length - 0.5 + '%' : '47.5%'}" @click="showPic($event)">
                            </div>
                            <div class="thumbs-up" v-if="userRating.recommend != 0">
                                <i class="iconfont icon-zan"></i>
                                <span v-for="(item, index) in userRating.recommend" :key="index">
                                    {{item}}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pic-bg" v-show="showRatingPic">
            <img src="" ref="imgNode"/>
            <div class="close" @click="showRatingPic = !showRatingPic">
                <i class="iconfont icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "ratings",
        data: function () {
            return {
                scoreBg: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
                scoreOri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeDI9IjEwMCUiIHkyPSI1MCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZERTAwIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGQjAwMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
                selectType: 0,
                haveContent: true,
                showRatingPic: false
            }
        },
        computed: {
            ...mapState(['shopInfo', 'shopRatings']),
            pleasedRatings () {
                if (this._utilJudgeArr(this.shopRatings)) {
                    return this.shopRatings.filter((item) => {
                        return item.rateType === 0;
                    });
                } else {
                    return [];
                }
            },
            unpleasedRatings () {
                if (this._utilJudgeArr(this.shopRatings)) {
                    return this.shopRatings.filter((item) => {
                        return item.rateType === 1;
                    });
                } else {
                    return [];
                }
            },
            curRatings () {
                if (this.selectType == 0 && this._utilJudgeArr(this.shopRatings)) {
                    if (this.haveContent) {
                        return this.shopRatings.filter((item) => {
                            return item.text || item.photos;
                        })
                    }
                    return this.shopRatings;
                } else if (this.selectType == 1 && this._utilJudgeArr(this.shopRatings)) {
                    if (this.haveContent) {
                        return this.shopRatings.filter((item) => {
                            return item.rateType === 0 && (item.text || item.photos);
                        });
                    }
                    return this.pleasedRatings;
                } else if (this.selectType == 2 && this._utilJudgeArr(this.shopRatings)) {
                    if (this.haveContent) {
                        return this.shopRatings.filter((item) => {
                            return item.rateType === 1 && (item.text || item.photos);
                        });
                    }
                    return this.unpleasedRatings;
                } else {
                    return [];
                }
            }
        },
        methods: {
            showTypeRating (index) {
                this.selectType = index;
            },
            toggleHaveRating () {
                this.haveContent = !this.haveContent;
            },
            _utilToDate (num) {   // num毫秒数
                let date = new Date(num);

                return `${date.getFullYear()}-${this._utilAddZero(date.getMonth())}-${this._utilAddZero(date.getDate())}`;
            },
            _utilAddZero (num) {
                if (num < 10) {
                    return '' + 0 + num;
                }
                return num
            },
            _utilJudgeArr (obj) {
                return Object.prototype.toString.call(obj)=='[object Array]';
            },
            showPic (e) {
                this.showRatingPic = !this.showRatingPic;
                this.$refs.imgNode.src = e.target.src;
                // console.log(this.$refs.imgNode)
            }
        }
    }
</script>

<style scoped>
    /* score 开始*/
    .score {
        display: flex;
        align-items: center;
        padding: 2vh 4vw 3vh;
        border-bottom: 1vh solid #eee;
    }

    .score > span {
        font-size: 2rem;
        color: #ff6000;
        font-weight: 400;
    }
    .score-img {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding-left: 4vw;
    }
    .star {
        position: relative;
    }
    .star > .light-star {
        position: absolute;
        overflow: hidden;
        left: 0;
        top: 0;
    }
    .other-score {
        flex: 1;
        display: flex;
    }
    .other-score > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33333%;
        color: #666;
        box-sizing: border-box;
    }
    .other-score .number {
        font-weight: 400;
        font-size: 1rem;
        padding-top: .5vh;
    }
    .other-score > div:last-child {
        border-left: 1px solid #ddd;
    }
    /* score结束 */

    /* ratings开始 */
    .ratings {
        padding: 2vh 3vw;
    }
    .rating-icon {
        display: flex;
        padding-bottom: 2vh;
    }
    .rating-icon .unsatisfy {
        background: #e9e9e9;
        color: #aaa;
    }
    .rating-icon > span {
        padding: .3vh 4vw;
        background: #ebf5ff;
        color: #6d7885;
        margin: 0 1vw;
        border-radius: 2px;
    }
    .rating-icon > span.on {
        background: #0097ff;
        color: white;
    }
    .rating-icon > span.on.unsatisfy {
        background: gray;
    }

    .rating-list {
        display: flex;
        flex-direction: column;
    }
    .have-content {
        padding: 1vh 2vw;
        border-top: 1px solid #eee;
    }
    .have-content > i {
        font-size: .7rem;
    }
    .have-content > i.on {
        color: #76d572;
    }
    .user-ratings > li {
        display: flex;
        padding: 2vh 0;
        border-top: 1px solid #eee;
    }
    .user-ratings .user-img {
        width: 10%;
    }
    .user-img img {
        width: 100%;
        border-radius: 50%;
    }
    .user-rating {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 2vw;
    }
    .name-and-time {
        display: flex;
        justify-content: space-between;
        margin-bottom: .5vh;
    }
    .user-score {
        display: flex;
        align-items: center;
    }
    .user-score > span {
        color: rgb(251, 154, 11);
        padding: 0 2vw;
    }
    .user-score > span.unsatisfy {
        color: rgb(137, 159, 188);
    }
    li .text {
        padding: 1vh 0;
    }
    .reply {
        background: #f3f3f3;
        color: #666;
        padding: 1vh 3vw;
        position: relative;
        margin-top: 2vh;
    }
    .reply::before {
        content: '';
        width: 0;
        height: 0;
        border-width: 0 2vh 2vh;
        border-style: solid;
        border-color: transparent transparent #f3f3f3;
        position: absolute;
        top: -2vh;
        left: 3vh;
    }
    .photo {
        margin: 1vh 0;
    }
    .photo img {
        margin: 0 1vw;
    }
    .thumbs-up > i {
        font-size: 12px;
        padding: 0 1vw;
    }
    .thumbs-up > span {
        background: #ebf5ff;
        color: #6d7885;
        padding: .3vh 1vw;
        line-height: 2em;
        margin: 0 2vw;
    }
    /* rating结束 */

    .pic-bg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        z-index: 99;
    }
    .pic-bg img {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        background: white;
    }
    .pic-bg .close {
        color: white;
        position: absolute;
        right: 2vw;
        top: 1vh;
        padding: .3vh 1vw;
    }
</style>
