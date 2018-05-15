<template>
    <div class="container">
        <div id="content" v-html="asyncData.content">
        </div>
        <div class="aside">
            <div class="show">
                <nuxt-link to="/blog">
                    <img src="/img/show.jpg" alt="">
                </nuxt-link>
                <nuxt-link to="/blog">
                    <img src="/img/show.jpg" alt="">
                </nuxt-link>

                <!-- ad -->
            </div>
            <div class="block" ref="block">
                <div class="block-title">文章列表</div>
                <div class="block-cont">
                    <div v-for="n in 4" :key="n" class="block-list">
                        <a href="/">asd</a>
                        <p>asd</p>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
<script>
import marked from "marked";
import axios from "axios";
export default {
    validate({ params }) {
        return Boolean(params.hash); //路由参数校验
    },
    head() {
        return {
            title: this.asyncData.title,
            titleTemplate: "%s - 羽叶丶"
        };
    },
    asyncData(context) {
        return axios
            .post("https://api.yuyehack.cn/blog/article/get_note.php", {
                hash: context.params.hash
            })
            .then(res => {
                let DATA = res.data.data;
                DATA.content = marked(DATA.content);
                let D = `
                            <h1>${DATA.title}</h1>
                            <blockquote>
                                <p>${DATA.info}</p>
                            </blockquote>
                            ${DATA.content}
                        `;
                DATA.content = D;
                return { asyncData: DATA };
            })
            .catch(e => {
                context.error({ statusCode: 404, message: "笔记不存在" });
            });
    },
    data() {
        return {
            listPosition: ""
        };
    },
    methods: {
        scrollF() {
            let vm = this;
            setTimeout(function() {
                vm.listPosition = vm.$refs.block.offsetTop;
                vm.scroll = function() {
                    if (
                        vm.$refs.block.offsetTop -
                            document.documentElement.scrollTop <
                        0
                    ) {
                        vm.$refs.block.style.position = "fixed";
                        vm.$refs.block.style.top = "20px";
                    }
                    if (document.documentElement.scrollTop < vm.listPosition) {
                        vm.$refs.block.style.position = "absolute";
                        vm.$refs.block.style.top = "auto";
                    }
                };
                document.addEventListener("scroll", vm.scroll);
            }, 0);
        }
    },
    computed: {},
    mounted() {
        this.scrollF();
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.scroll);
    }
};
</script>
<style lang="scss"  scoped>
.container {
    width: 80%;
    margin: 0 auto;
    position: relative;
    max-width: 1200px;
    #content {
        width: calc(100% - 250px);
        padding: 24px;
    }
    .aside {
        position: absolute;
        right: 0;
        top: 74px;
        width: 250px;
        border-radius: 4px;
        .show {
            a {
                display: block;
                position: relative;
                margin-bottom: 10px;
                img {
                    display: block;
                    max-width: 100%;
                }
                &:after {
                    position: absolute;
                    content: "广告";
                    font-size: 12px;
                    color: #fff;
                    border: 1px solid;
                    background: #000;
                    opacity: 0.4;
                    bottom: 5px;
                    right: 5px;
                    padding: 1px 2px;
                    border-radius: 1px;
                }
            }
        }
        .block {
            width: 250px;
            background: #fafafa;
            .block-title {
                font-size: 16px;
                padding: 12px 20px;
                color: #333;
                border-bottom: 1px solid hsla(0, 0%, 59%, 0.1);
            }
            .block-list {
                font-size: 14px;
                padding: 12px 20px;
            }
        }
    }
}
@media screen and (max-width: 960px) {
    .container {
        width: 100% !important;
        #content {
            width: 100% !important;
        }
        .aside {
            position: initial !important;
            width: 100% !important;
            border: 0 !important;
            .ad {
                margin: 0 24px;
            }
            .block {
                width: 100% !important;
                position: initial !important;
            }
        }
    }
}
</style>
<style lang="scss">
#content {
    background: #fff;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
    @import "~assets/css/markdown.scss";
}
</style>




