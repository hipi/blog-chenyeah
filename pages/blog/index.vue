<template>
    <div>

        <div v-if="s&&s!==''" class="ht">{{s}} - 搜索结果</div>
        <div v-else class="ht">最新文章</div>
        <div class="content">
            <div class="list" style="padding:10px 0">
                <a target="_blank" href="https://t.cn/Rdg1Jer">
                    <h2 style="margin: 0;font-size:16px">
                        <i style="color:#de8181;font-size:20px" class="iconfont icon-praise"></i>
                        掘金收藏集（学习文章）
                    </h2>
                </a>
            </div>
            <div v-if="list.length>0" class="list" v-for="(n,i) in list" :key="i">
                <nuxt-link class="title" :to="`/blog/${n.hash}`">
                    <h2>
                        <i v-if="n.top" style="color:#de8181;font-size:20px" class="iconfont icon-praise"></i>
                        {{n.title}}
                    </h2>
                </nuxt-link>
                <a class="info">
                    <img ref="articleImg" :class="[n.imgIsBroken?'broken-img':'']" :src="n.cover"> {{n.info}}
                </a>
                <div class="meta">
                    <span>
                        <i class="iconfont icon-activity"></i>
                        {{n.add_time}}
                    </span>
                    <span class="star">
                        <i class="iconfont icon-collection_fill"></i>
                    </span>
                    <nuxt-link :to="`/blog/archives/${n.tag}`" v-if="n.tag" class="tag">
                        <i class="iconfont icon-label"></i>{{n.tag}}
                    </nuxt-link>
                    <span class="pv">
                        阅读&nbsp;&nbsp;{{n.pv}}
                    </span>
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
export default {
  layout: "blog",
  async asyncData({ query, app }) {
    function getArticle() {
      return app.$axios
        .$post("/api/blog/article/get_articlelist.php", {
          s: query.s,
          page: 1,
          pageSize: 10
        })
        .then(res => {
          return {
            list: res.list,
            totalPages: res.totalPages
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
      isLoad: true,
      pageSize: 10
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
      this.$axios
        .$post("/api/blog/article/get_articlelist.php", {
          s: this.s,
          page: page,
          pageSize: this.pageSize
        })
        .then(res => {
          let newList = res.list;
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
    if (ele.clientWidth > 1024) {
      window.addEventListener("scroll", vm.eventListen);
    }
  },
  beforeDestroy() {
    let vm = this;
    window.removeEventListener("scroll", vm.eventListen);
  },
  watch: {
    "$route.query": function(to, from) {
      this.$axios
        .$post("/api/blog/article/get_articlelist.php", {
          s: this.$route.query.s,
          page: 1,
          pageSize: 8
        })
        .then(res => {
          this.list = res.list;
          this.totalPages = res.totalPages;
          this.currentPage = 1;
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
        margin: 0 0 10px;
        color: #000;
        font-weight: 400;
        font-size: 1.2em;
        line-height: 1.2em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .info {
      display: block;
      margin: 0;
      min-height: 80px;
      color: #999;
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
      .pv {
        font-size: 12px;
        margin-left: 12px;
      }
    }
  }
  .nodata {
    color: #999;
    text-align: center;
    line-height: 100px;
  }
  .mloading {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .content {
    .mloading {
      display: block;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>




