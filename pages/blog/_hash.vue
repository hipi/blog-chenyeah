<template>
  <div class="content">
    <h1 class="title">{{asyncData.title}}</h1>
    <div class="breadcrumb">
      <span>
        <i class="iconfont icon-activity"></i>
        {{asyncData.add_time}}
      </span>
      <span>
        <i class="iconfont icon-collection_fill"></i>
      </span>
      <span v-if="asyncData.modify_time">
        <i class="iconfont icon-brush"></i>
        {{asyncData.modify_time}}
      </span>
    </div>
    <div class="cover">
      <img ref="cover" :src="asyncData.cover" alt="">
    </div>
    <div class="info">
      {{asyncData.info}}
    </div>
    <div id="article" v-html="asyncData.content">
    </div>
    <div class="comment">
      <div class="comment-title">
        <span>评论</span>
        <span class="comment-info">
          需要登陆GitHub才可评论哦！
        </span>
      </div>
      <gitment :pageTitle="asyncData.title" :pageId="$route.params.hash"></gitment>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import axios from "axios";
import gitment from "~/components/gitment";
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
    transition: "blog",
    layout: "blog",
    asyncData(context) {
        return axios
            .post("https://api.yuyehack.cn/blog/article/get_note.php", {
                hash: context.params.hash
            })
            .then(res => {
                let DATA = res.data.data;
                DATA.content = marked(DATA.content);
                return { asyncData: DATA };
            })
            .catch(e => {
                context.error({ statusCode: 404, message: "笔记不存在" });
            });
    },
    data() {
        return {};
    },
    components: {
        gitment
    },
    methods: {},
    computed: {},
    mounted() {
        let _img = this.$refs.cover;
        if (!_img.src || _img.src == "") {
            _img.src = "/img/blog/article-nopic.jpeg";
            _img.setAttribute("class", "broken-img");
        } else {
            _img.onerror = function() {
                if (!_img.classList.contains("broken-img")) {
                    _img.setAttribute("class", "broken-img");
                    _img.src = "/img/blog/article-nopic.jpeg";
                }
            };
        }
    },
    beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
.content {
    padding: 20px;
}
.title {
    margin-top: 0;
    margin-bottom: 10px;
    color: #444;
    text-transform: none;
    font-weight: 400;
    font-size: 30px;
    line-height: 42px;
}
.breadcrumb {
    margin-bottom: 20px;
    font-size: 16px;
}
.cover {
    overflow: hidden;
    margin-bottom: 20px;
    img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        max-height: 400px;
        border-radius: 4px;
    }
}
.info {
    margin-bottom: 20px;
    padding-left: 1em;
    border-left: 4px solid #de8181;
    color: #de8181;
    line-height: 1.5;
}
.comment {
    margin-top: 40px;
    padding: 10px 0;
    border-top: 1px solid #de8181;
    .comment-info {
        color: #999;
        font-size: 14px;
    }
    .comment-title {
        color: #de8181;
        font-size: 24px;
    }
}
</style>

<style lang="scss">
#article {
    background: #fff;
    color: #24292e;
    word-wrap: break-word;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.5;
    line-height: 1.5;

    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    @import "~assets/css/markdown.scss";
}
</style>




