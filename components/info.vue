<template>
  <div class="cont">
    <i @click="isMusic=!isMusic" class="music iconfont icon-music"></i>
    <audio v-if="isMusic" autoplay src="/music/bg.mp3"></audio>
    <div class="head">
      <nuxt-link to='/admin'>
        <img src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="">
      </nuxt-link>
    </div>
    <div class="title">
      <nuxt-link to="/blog">羽叶</nuxt-link>
    </div>
    <span>羽叶のBlog</span>
    <div class="tik">
      <nuxt-link to="blog/archives">
        <span>15</span>
        <i class="iconfont icon-document"></i>
      </nuxt-link>
      <nuxt-link to="blog/archives">
        <span>15</span>
        <i class="iconfont icon-manage"></i>
      </nuxt-link>
      <nuxt-link to="blog/archives">
        <span>15</span>
        <i class="iconfont icon-label"></i>
      </nuxt-link>
    </div>
    <ul class="menu">
      <li>
        <nuxt-link to="/blog">首页</nuxt-link>
      </li>
      <li v-for="(n,i) in menu" :key="i">
        <nuxt-link :to="n.top.link">{{n.top.title}}</nuxt-link>
        <div class="li-sider">
          <ul>
            <li v-for="(x,y) in n.child" :key="y">
              <nuxt-link :to="x.link">{{x.title}}</nuxt-link>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <nuxt-link to="/blog">关于</nuxt-link>
        <div class="li-sider">
          <ul>
            <li>
              <a target="_blank" href="https://github.com/chenyeah">GitHub</a>
            </li>
            <li>
              <a href="mailto:yuyehack@gmail.com">邮箱</a>
            </li>
          </ul>
        </div>
      </li>

    </ul>
    <form action="/blog" class="search">
      <input ref="search" @keydown.enter.prevent="search($event)" v-model="s" placeholder="搜索" name="s" type="search" autocomplete="off">
    </form>
    <a class="beian" target="_blank" href="http://www.miibeian.gov.cn">苏ICP备16044037号</a>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isMusic: false,
      s: "",
      menu: [
        {
          top: {
            title: "页面",
            link: ""
          },
          child: [
            {
              title: "VIP视频",
              link: "/other/videovip"
            }
          ]
        }
      ]
    };
  },
  couputed: {},
  methods: {
    search(e) {
      this.$router.replace({ path: "/blog", query: { s: this.s } });
      // 表格取消focus 解决手机键盘不收起
      this.$refs.search.blur();
    }
  }
};
</script>

<style lang="scss" scoped>
.cont {
  background: #fff;
  border-radius: 10px;
  text-align: center;
  // border: 1px solid #eee;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
  .music {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .wy {
    position: absolute;
    bottom: -52px;
    right: -10px;
  }
}
.head {
  padding: 28px 28px 10px;
  > a {
    max-width: 100px;
    margin: 0 auto;
    display: block;
    img {
      display: block;
      margin: 0 auto;
      width: 100px;
      border: 1px solid #eee;
      border-radius: 100%;
    }
  }
}
.title {
  position: relative;

  font-size: 20px;
  line-height: 30px;
  margin: 0 35px;
  color: #333;
  a {
    text-decoration: none;
    color: #333;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    height: 1px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    transform: scaleX(1);
    transition: all 0.2s ease-in;
  }
}
span {
  display: block;
  font-size: 12px;
  padding: 0 10px;
  margin: 10px 0 0;
}
.tik {
  padding: 20px;
  display: flex;
  font-size: 14px;
  > a {
    text-decoration: none;
    color: #333;
    flex: 1;
    height: 46px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    span {
      display: block;
      margin: 0;
    }
    &:hover {
      span,
      i {
        font-size: 1.2em;
        transition: all 0.2s ease-in;
      }
      i {
        font-size: 1.4em;
        transition: all 0.2s ease-in;
      }
    }
  }
}
.menu {
  margin: 0;
  padding: 0;
  font-size: 14px;
  li {
    list-style: none;
    border-top: 1px solid #eee;
    position: relative;
    a {
      text-decoration: none;
      color: #888;
      padding: 10px 0;
      display: block;
    }
    &:hover {
      .li-sider {
        display: block;
      }
    }
    a:hover {
      background: #44cef6;
      color: #fff;
    }
    .li-sider {
      border-radius: 10px;
      border: 1px solid #eee;
      overflow: hidden;
      display: none;
      position: absolute;
      border-radius: 10px;
      top: -1px;
      left: 180px;
      z-index: 99;
      width: 180px;
      background: #fff;
      ul {
        padding: 0;
        margin: 0;
        display: block;
        li {
          border-top: 1px solid #eee;
          &:first-child {
            border: 0;
          }
        }
      }
    }
  }
}
.search {
  border-top: 1px solid #eee;
  padding: 0;
  input {
    font-size: 14px;
    width: 100%;
    color: #888;
    border: none;
    text-align: center;
    height: 40px;
    outline: none;
    margin: 0;
    background: #fff;
    -webkit-appearance: none;
    border-radius: 0;
  }
}
.beian {
  font-size: 14px;
  display: inline-block;
  margin-bottom: 10px;
  color: #aaa;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .cont {
    border-radius: 10px 10px 0 0;
    box-shadow: none;
    .wy {
      bottom: -64px;
      right: 10px;
    }
  }
  .tik {
    padding: 0 30px;
  }
  /* .li-sider {
        position: initial !important;
        display: block !important;
        border: 0 !important;
        border-radius: 0 !important;
        width: 100% !important;
        li {
            border-top: 1px solid #eee !important;
            border-bottom: 0 !important;
        }
    } */
  .menu li:nth-child(2),
  .menu li:nth-child(3),
  .beian {
    display: none;
  }
}
</style>

