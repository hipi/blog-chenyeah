<template>
    <div id="main">
        <div class="minfo">
        </div>
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
            <!-- <msg></msg> -->
            <hitokoto></hitokoto>
            <div ref="affix" :class="{affix:isAffix}">
                <latestArticle></latestArticle>
                <ad></ad>
            </div>

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
        return {
            mactive: false,
            isAffix: false,
            oldScrollTop: ""
        };
    },
    computed: {},
    methods: {
        eventListen() {
            let vm = this;
            if (document.documentElement.clientWidth > 1024) {
                if (
                    vm.$refs.affix.offsetTop -
                        document.documentElement.scrollTop <=
                    20
                ) {
                    vm.isAffix = true;
                }
                if (document.documentElement.scrollTop <= vm.oldScrollTop) {
                    vm.isAffix = false;
                }
            }
        }
    },
    mounted() {
        let vm = this;
        vm.oldScrollTop = vm.$refs.affix.offsetTop;
        window.addEventListener("scroll", vm.eventListen);
    },
    beforeDestroy() {
        let vm = this;
        window.removeEventListener("scroll", vm.eventListen);
    }
};
</script>
<style lang="scss" scoped>
#main {
    display: flex;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 30px;
    max-width: 1280px;

    > div {
        border-radius: 10px;
    }
    .minfo {
        display: none;
    }
    .my {
        width: 180px;
        height: fit-content;
        div {
            position: fixed;
            width: 180px;
        }
    }
    .container {
        flex: 1;
        margin: 0 20px;
        max-width: 800px;
        height: fit-content;
        background: #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02),
            0 4px 10px rgba(0, 0, 0, 0.06);
    }
    .sidebar {
        width: 260px;
        height: fit-content;
        .cont {
            margin-bottom: 20px;
        }
        .affix {
            position: fixed;
            top: 20px;
            width: 260px;
        }
    }
}

@media screen and (max-width: 1024px) {
    #main {
        display: block;
        padding-top: 10px;
        padding-bottom: 0;
        .minfo {
            display: block;
        }
        .my {
            margin: 0 auto;
            width: 94%;
            div {
                position: relative;
                width: 100%;
            }
        }
        .bread {
            margin: 0 auto;
            width: 94%;
            height: 40px;
            border-top: 1px solid #eee;
            border-radius: 0 0 10px 10px;
            background: #fff;
            text-align: center;
            line-height: 40px;
        }
        .container {
            margin: 10px auto;
            max-width: 94%;
            width: 94%;
        }
        .sidebar {
            margin: 10px auto;
            width: 94%;
            > div {
                margin-top: 10px;
                margin-bottom: 0;
            }
        }
    }
}
</style>

