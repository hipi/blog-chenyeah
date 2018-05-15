<template>
    <div id="art" v-html="asyncData.content">
    </div>
</template>
<script>
import marked from "marked";
import axios from "axios";
export default {
    validate({ params }) {
        return Boolean(params.tag); //路由参数校验
    },
    head() {
        return {
            title: this.asyncData.title,
            titleTemplate: "%s - 羽叶丶"
        };
    },
    layout: "blog",
    asyncData(context) {
        return axios
            .post("https://api.yuyehack.cn/blog/article/get_note.php", {
                hash: context.params.tag
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
        return {};
    },
    methods: {},
    computed: {},
    mounted() {},
    beforeDestroy() {}
};
</script>
<style lang="scss">
#art {
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




