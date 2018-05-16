<template>
    <div>
        <div class="ht">最新文章</div>
        <div class="content">
            <div class="list" v-for="(n,i) in list" :key="i">
                <nuxt-link class="title" :to="`/blog/${n.hash}`">
                    <h2>
                        <span v-if="n.top" class="article-top">[置顶] </span>{{n.title}}
                    </h2>
                </nuxt-link>
                <a class="info">
                    <img ref="articleImg" :src="n.cover"> {{n.info}}
                </a>
                <div class="meta">
                    <span>{{n.add_time}}</span>
                    <nuxt-link :to="`/blog/archives/${n.tag}`" v-if="n.tag" class="tag">
                        <i class="iconfont icon-label"></i>{{n.tag}}
                    </nuxt-link>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from "axios";
export default {
    layout: "blog",
    async asyncData(context) {
        function getArticle() {
            return axios
                .post(
                    "https://api.yuyehack.cn/blog/article/get_articlelist.php",
                    {
                        page: 1,
                        pageSize: 1000
                    }
                )
                .then(res => {
                    return { list: res.data.list };
                })
                .catch(e => {
                    // context.error({ statusCode: 404, message: "出错啦" });
                    return { list: [{ content: "<h1>出错啦</h1>" }] };
                });
        }
        let data = await getArticle();
        return data;
    },
    data() {
        return {};
    },
    methods: {},
    mounted() {
        let _img = this.$refs.articleImg;
        _img.forEach(element => {
            if (!element.src) {
                element.src = "/img/blog/article-nopic.jpeg";
                element.setAttribute("class", "broken-img");
            } else {
                element.onerror = function() {
                    if (!element.classList.contains("broken-img")) {
                        element.setAttribute("class", "broken-img");
                        element.src = "/img/blog/article-nopic.jpeg";
                    }
                };
            }
        });
    }
};
</script>
<style lang="scss" scoped>
.ht {
    height: 56px;
    line-height: 56px;
    padding: 0 30px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    background-image: linear-gradient(
        rgba(200, 200, 200, 0),
        rgba(200, 200, 200, 0.12)
    );
    color: rgba(0, 0, 0, 0.4);
}
.content {
    padding: 0 30px;
    .list {
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        a {
            color: #333;
            text-decoration: none;
            h2 {
                font-size: 24px;
                line-height: 30px;
                margin: 0 0 10px;
                color: #444;
                font-weight: 400;
            }
            &:hover {
                h2 {
                    color: #3cafff;
                }
            }
        }
        .info {
            min-height: 80px;
            font-size: 14px;
            margin: 0;
            color: #696969;
            line-height: 24px;
            letter-spacing: 1px;
            display: block;
            img {
                max-width: 180px;
                max-height: 80px;
                float: right;
                margin-left: 10px;
                border-radius: 4px;
            }
        }

        .meta {
            margin-top: 10px;
            color: #999;
            .tag {
                margin-left: 10px;
                font-size: 14px;
            }
        }
    }
}
</style>




