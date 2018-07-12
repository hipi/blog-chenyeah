<template>
  <div class="cont">
    <i @click="isMusic=!isMusic" class="music iconfont icon-music"></i>
    <audio v-if="isMusic" loop autoplay src="https://music.163.com/song/media/outer/url?id=562594322.mp3"></audio>
    <div class="head">
      <nuxt-link to='/blog'>
        <img :class="{play:isMusic}" src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="">
      </nuxt-link>
    </div>
    <div class="title">
      <nuxt-link to="/blog">羽叶</nuxt-link>
    </div>
    <span>羽叶のBlog</span>
    <div class="tik">

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
            <!-- <li>
              <a href="/Resume.pdf">Resume</a>
            </li> -->
          </ul>
        </div>
      </li>

    </ul>
    <form action="/blog" class="search">
      <input ref="search" @keydown.enter.prevent="search($event)" v-model="s" placeholder="搜索" name="s" type="text" autocomplete="off">
    </form>
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
            this.s = "";
        }
    }
};
</script>

<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
    text-align: center;
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
            @keyframes play {
                from {
                    -webkit-transform: rotate(0deg);
                }
                to {
                    -webkit-transform: rotate(360deg);
                }
            }
            &.play {
                animation: play 3s linear infinite;
            }
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
    height: 20px;
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
    border-radius: 0 0 10px 10px;
    overflow: hidden;
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
@media screen and (max-width: 1024px) {
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
    .menu li:nth-child(3) {
        display: none;
    }
}
</style>

