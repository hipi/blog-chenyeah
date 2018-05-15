<template>
    <div id="main">
        <div class="my">
            <div>
                <info></info>
            </div>
        </div>
        <div class="container">
            <div class="content">
                <nuxt/>
            </div>
        </div>
        <div class="sidebar">
            <msg></msg>
            <hitokoto></hitokoto>
            <latestArticle></latestArticle>
            <ad></ad>
        </div>
    </div>
</template>
<script>
import Cookie from "js-cookie";
import info from "~/components/info";
import latestArticle from "~/components/latestArticle";
import msg from "~/components/msg";
import archives from "~/components/archives";
import hitokoto from "~/components/hitokoto";
import ad from "~/components/ad";
export default {
    components: {
        info,
        latestArticle,
        msg,
        archives,
        hitokoto,
        ad
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
#main {
    max-width: 1280px;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    > div {
        border-radius: 10px;
    }
    .my {
        background: #fff;
        width: 180px;
        height: fit-content;
        div {
            width: 180px;
            position: fixed;
        }
    }
    .container {
        background: #fff;
        padding-bottom: 30px;
        margin: 0 20px;
        flex: 1;
        max-width: 800px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02),
            0 4px 10px rgba(0, 0, 0, 0.06);
    }
    .sidebar {
        width: 260px;
        height: fit-content;
        > div {
            margin-bottom: 20px;
        }
    }
}
</style>

<style lang="scss">
body {
    background: #e8e8e8;
}
</style>

