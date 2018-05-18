<template>
    <div>

        <div v-if="s&&s!==''" class="ht">{{s}} - 搜索结果</div>
        <div v-else class="ht">最新文章</div>
        <div class="content">
            <div class="list" v-for="(n,i) in list" :key="i">
                <nuxt-link class="title" :to="`/blog/${n.hash}`">
                    <h2>
                        <span v-if="n.top" style="color:#de8181">[置顶] </span>{{n.title}}
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
            <div class="mloading" @click="mload" v-if="currentPage<totalPages">
                继续加载
            </div>
        </div>

    </div>
</template>
<script>
import axios from "axios";
export default {
    layout: "blog",
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
                    return { list: [{ content: "<h1>出错啦</h1>" }] };
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
            let _img = this.$refs.articleImg;
            if (_img) {
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
                });
        },
        scroll() {
            let ele = document.documentElement;
            let vm = this;
            if (ele.clientWidth > 768) {
                window.onscroll = function() {
                    if (
                        ele.scrollHeight - ele.scrollTop - ele.clientHeight <
                        30
                    ) {
                        if (vm.currentPage < vm.totalPages) {
                            if (vm.isLoad) {
                                console.log(1);
                                vm.isLoad = false;
                                vm.load(vm.currentPage + 1);
                            }
                        }
                    }
                };
            }
        },
        mload() {
            let vm = this;
            if (vm.currentPage < vm.totalPages) {
                if (vm.isLoad) {
                    vm.isLoad = false;
                    vm.load(vm.currentPage + 1);
                }
            }
        }
    },
    mounted() {
        this.replaceBrokenImg();
        let vm = this;
        this.scroll();
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
                    (this.list = res.data.list),
                        (this.totalPages = res.data.totalPages);
                });
        }
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
    .mloading {
        display: none;
    }
}
@media screen and (max-width: 768px) {
    .content {
        .mloading {
            display: block;
            cursor: pointer;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
        }
    }
}
</style>




