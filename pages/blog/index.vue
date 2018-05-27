<template>
  <div>

    <div v-if="s&&s!==''" class="ht">{{s}} - 搜索结果</div>
    <div v-else class="ht">最新文章</div>
    <div class="content">
      <div v-if="list.length>0" class="list" v-for="(n,i) in list" :key="i">
        <nuxt-link class="title" :to="`/blog/${n.hash}`">
          <h2>
            <span v-if="n.top" style="color:#de8181">[置顶] </span>{{n.title}}
          </h2>
        </nuxt-link>
        <a class="info">
          <img ref="articleImg" :class="[n.imgIsBroken?'broken-img':'']" :src="n.cover"> {{n.info}}
        </a>
        <div class="meta">
          <i v-if="n.modify_time" class="iconfont icon-brush"></i>
          <i v-else class="iconfont icon-activity"></i>
          <span> {{n.modify_time?n.modify_time:n.add_time}}</span>
          <nuxt-link :to="`/blog/archives/${n.tag}`" v-if="n.tag" class="tag">
            <i class="iconfont icon-label"></i>{{n.tag}}
          </nuxt-link>
        </div>
      </div>
      <div v-if="list.length==0" class="nodata">
        暂无文章
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
            if (ele.clientWidth > 768) {
                if (ele.scrollHeight - ele.scrollTop - ele.clientHeight < 30) {
                    if (this.currentPage < this.totalPages) {
                        if (this.isLoad) {
                            this.isLoad = false;
                            this.load(this.currentPage + 1);
                        }
                    }
                }
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
        let ele = document.documentElement;
        if (ele.clientWidth > 768) {
            window.addEventListener("scroll", vm.eventListen);
        }
    },
    beforeDestroy() {
        let vm = this;
        window.removeEventListener("scroll", vm.eventListen);
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
    .nodata {
        line-height: 100px;
        color: #999;
        text-align: center;
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




