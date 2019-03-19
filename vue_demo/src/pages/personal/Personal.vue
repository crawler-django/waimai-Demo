<template>
    <div>
        <BaseHeader text="我的"></BaseHeader>
        <PersonalContent :contentHeight="contentHeight"></PersonalContent>
    </div>
</template>

<script>
    import BaseHeader from "../../components/BaseHeader/BaseHeader";
    import PersonalContent from "../../components/BaseContent/PersonalContent/PersonalContent";
    export default {
        name: "Personal",
        components: {BaseHeader,PersonalContent},
        data: function () {
            return {
                contentHeight: 0,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.contentHeight = document.documentElement.clientHeight - document.querySelector('.footer').offsetHeight - document.querySelector('.basehead').offsetHeight;
            })
        }
    }
</script>

<style scoped>

</style>
