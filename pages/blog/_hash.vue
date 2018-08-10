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
        <!-- 快捷操作 -->
        <div v-if="!isPhone" class="clear" @click="clearOther">
            <template v-if="isClear">取消</template>
            <template v-else>清爽模式</template>
        </div>
    </div>
</template>
<script>
import marked from 'marked';
import axios from 'axios';
import gitment from '~/components/gitment';
export default {
  validate({ params }) {
    return Boolean(params.hash); //路由参数校验
  },
  head() {
    return {
      title: this.asyncData.title,
      //titleTemplate: "%s - 羽叶丶"
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.asyncData.info
        }
      ]
    };
  },
  transition: 'blog',
  layout: 'blog',
  asyncData(context) {
    return axios
      .post('https://api.chenyeah.com/blog/article/get_note.php', {
        hash: context.params.hash
      })
      .then(res => {
        let DATA = res.data.data;
        DATA.content = marked(DATA.content);
        return { asyncData: DATA };
      })
      .catch(e => {
        context.error({ statusCode: 404, message: '笔记不存在' });
      });
  },
  data() {
    return {
      isClear: false,
      isPhone: false
    };
  },
  components: {
    gitment
  },
  methods: {
    clearOther() {
      const select = dom => {
        return document.querySelectorAll(dom);
      };
      if (!this.isClear) {
        select('#main > div.my')[0].style.display = 'none';
        select('#main > div.sidebar')[0].style.display = 'none';
        select('#main > div.container')[0].style.maxWidth = '100%';
      } else {
        select('#main > div.my')[0].style.display = 'block';
        select('#main > div.sidebar')[0].style.display = 'block';
        select('#main > div.container')[0].style.maxWidth = '800px';
      }
      this.isClear = !this.isClear;
    }
  },
  computed: {},
  mounted() {
    let _img = this.$refs.cover;
    if (!_img.src || _img.src == '') {
      _img.src = '/img/blog/article-nopic.jpeg';
      _img.setAttribute('class', 'broken-img');
    } else {
      _img.onerror = function() {
        if (!_img.classList.contains('broken-img')) {
          _img.setAttribute('class', 'broken-img');
          _img.src = '/img/blog/article-nopic.jpeg';
        }
      };
    }
    this.isPhone = window.navigator.userAgent.indexOf('Mobile') >= 0;
  },
  beforeDestroy() {
    const select = dom => {
      return document.querySelectorAll(dom);
    };
    select('#main > div.my')[0].style.display = 'block';
    select('#main > div.sidebar')[0].style.display = 'block';
    select('#main > div.container')[0].style.maxWidth = '800px';
  }
};
</script>
<style lang="less" scoped>
.content {
  padding: 20px;
}
.title {
  margin-top: 0;
  margin-bottom: 10px;
  color: #000;
  text-transform: none;
  font-weight: 400;
  font-size: 20px;
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
.clear {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 100px;
  line-height: 30px;
  background-color: #3cafff;
  border-radius: 3px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>

<style lang="less">
#article {
  background: #fff;
  color: #24292e;
  word-wrap: break-word;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  line-height: 1.5;
  line-height: 1.5;

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  @import '~assets/css/markdown.less';
}
</style>




