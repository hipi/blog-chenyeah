<template>
    <div ref="adminArticle">
        <div class="ht">
            <span v-if="s&&s!==''">{{s}} - 搜索结果</span>
            <span v-else>最新文章</span>
            <nuxt-link to="/admin/editor/new" class="add">新增文章</nuxt-link>
        </div>
        <div class="content">
            <div class="list" v-for="(n,i) in list" :key="i">
                <h2>
                    <nuxt-link class="title" :to="`/blog/${n.hash}`">
                        <span v-if="n.top" class="article-top">[置顶] </span>{{n.title}}
                    </nuxt-link>
                    <nuxt-link class="edit" :to="`/admin/editor/posts/${n.hash}`">
                        编辑
                    </nuxt-link>
                    <span @click="deleteArticle" class="del">
                        删除
                    </span>
                </h2>
                <a class="info">
                    <img ref="articleImg" :class="[n.imgIsBroken?'broken-img':'']" :src="n.cover"> {{n.info}}
                </a>
                <div class="meta">
                    <span>
                        <i class="iconfont icon-activity"></i>
                        {{n.add_time}}
                    </span>
                    <span>
                        <i class="iconfont icon-collection_fill"></i>
                    </span>
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
    layout: "admin",
    async asyncData({ query }) {
        function getArticle() {
            return axios
                .post(
                    "https://api.yuyehack.cn/blog/article/get_articlelist.php",
                    {
                        s: query.s,
                        page: 1,
                        pageSize: 8
                    }
                )
                .then(res => {
                    return {
                        list: res.data.list,
                        totalPages: res.data.totalPages
                    };
                })
                .catch(e => {
                    // context.error({ statusCode: 404, message: "出错啦" });
                    return { list: [{ title: "出错啦", info: "请检查接口" }] };
                });
        }
        let data = await getArticle();
        return data;
    },
    data() {
        return {
            currentPage: 1,
            isLoad: true
        };
    },

    computed: {
        s: function() {
            return this.$route.query.s;
        }
    },
    methods: {
        replaceBrokenImg() {
            this.list.forEach((n, i) => {
                let img = new Image();
                img.onerror = function() {
                    n.imgIsBroken = true;
                    n.cover = "/img/blog/article-nopic.jpeg";
                };
                img.src = n.cover;
            });
        },
        deleteArticle() {
            this.$confirm("确认删除此文章？")
                .then(() => {
                    // TODO: 删除API
                })
                .catch(() => {});
        },
        load(page) {
            axios
                .post(
                    "https://api.yuyehack.cn/blog/article/get_articlelist.php",
                    {
                        s: this.s,
                        page: page,
                        pageSize: 8
                    }
                )
                .then(res => {
                    let newList = res.data.list;
                    this.list = [...this.list, ...newList];
                    this.isLoad = true;
                    this.currentPage++;
                    this.replaceBrokenImg();
                });
        },
        eventListen() {
            let ele = document.documentElement;
            if (ele.clientWidth > 1024) {
                if (ele.scrollHeight - ele.scrollTop - ele.clientHeight < 30) {
                    if (this.currentPage < this.totalPages) {
                        if (this.isLoad) {
                            this.isLoad = false;
                            this.load(this.currentPage + 1);
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.replaceBrokenImg();
        let vm = this;
        let ele = document.documentElement;
        document
            .querySelectorAll(".container")[0]
            .addEventListener("scroll", vm.eventListen);
    },
    beforeDestroy() {
        let vm = this;
        document
            .querySelectorAll(".container")[0]
            .removeEventListener("scroll", vm.eventListen);
    },
    watch: {
        "$route.query": function(to, from) {
            axios
                .post(
                    "https://api.yuyehack.cn/blog/article/get_articlelist.php",
                    {
                        s: this.$route.query.s,
                        page: 1,
                        pageSize: 8
                    }
                )
                .then(res => {
                    this.list = res.data.list;
                    this.totalPages = res.data.totalPages;
                });
        }
    }
};
</script>
<style lang="less" scoped>
.ht {
    padding: 0 30px;
    height: 56px;
    border-bottom: 1px solid #eee;
    background-image: linear-gradient(
        rgba(200, 200, 200, 0),
        rgba(200, 200, 200, 0.12)
    );
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.4);
    line-height: 56px;
    .add {
        margin-left: 20px;
        color: #20a0ff;
    }
}
.content {
    padding: 0 30px;
    .list {
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        a {
            color: #333;
            text-decoration: none;
        }
        h2 {
            margin: 0 0 10px;
            color: #444;
            font-weight: 400;
            font-size: 24px;
            line-height: 30px;

            a {
                &:hover {
                    color: #3cafff;
                }
            }
        }
        .edit {
            color: #20a0ff;
            font-size: 16px;
        }
        .del {
            margin-left: 10px;
            color: red;
            font-size: 16px;
            cursor: pointer;
        }
        .info {
            display: block;
            margin: 0;
            min-height: 80px;
            color: #696969;
            letter-spacing: 1px;
            font-size: 14px;
            line-height: 24px;
            img {
                float: right;
                margin-left: 10px;
                max-width: 180px;
                max-height: 80px;
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




