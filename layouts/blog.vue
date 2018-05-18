<template>
    <div id="main">
        <div class="minfo">
            <!-- <minfo :mactive.sync="mactive"></minfo> -->
        </div>
        <div class="my">
            <div>
                <info></info>
            </div>
        </div>
        <!-- <div class="bread" @click="mactive=true">
            <i class="iconfont icon-label"></i>
        </div> -->
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
import minfo from "~/components/minfo";
import latestArticle from "~/components/latestArticle";
import msg from "~/components/msg";
import archives from "~/components/archives";
import hitokoto from "~/components/hitokoto";
import ad from "~/components/ad";
export default {
    components: {
        info,
        minfo,
        latestArticle,
        msg,
        archives,
        hitokoto,
        ad
    },
    data() {
        return {
            mactive: false
        };
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
    padding-bottom: 30px;
    margin: 0 auto;
    display: flex;

    > div {
        border-radius: 10px;
    }
    .minfo {
        display: none;
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
        margin: 0 20px;
        height: fit-content;
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

@media screen and (max-width: 768px) {
    #main {
        padding-top: 10px;
        display: block;
        padding-bottom: 0;
        .minfo {
            display: block;
        }
        .my {
            width: 94%;
            margin: 0 auto;
            div {
                position: relative;
                width: 100%;
            }
        }
        .bread {
            height: 40px;
            width: 94%;
            margin: 0 auto;
            line-height: 40px;
            text-align: center;
            background: #fff;
            border-radius: 0 0 10px 10px;
            border-top: 1px solid #eee;
        }
        .container {
            width: 94%;
            margin: 10px auto;
        }
        .sidebar {
            width: 94%;
            margin: 10px auto;
            > div {
                margin-top: 10px;
                margin-bottom: 0;
            }
        }
    }
}
</style>

