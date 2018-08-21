<template>
  <div class="cont">
    <i @click="isMusic=!isMusic" class="music iconfont icon-music"></i>
    <audio v-if="isMusic" loop autoplay src="https://music.163.com/song/media/outer/url?id=562594322.mp3"></audio>
    <div class="head">
      <nuxt-link to='/'>
        <img :class="{play:isMusic}" src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="">
      </nuxt-link>
    </div>
    <div class="title">
      <nuxt-link to="/admin">羽叶</nuxt-link>
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

<style lang="less" scoped>
.cont {
    position: relative;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    text-align: center;
    .music {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    .wy {
        position: absolute;
        right: -10px;
        bottom: -52px;
    }
}
.head {
    padding: 28px 28px 10px;
    > a {
        display: block;
        margin: 0 auto;
        max-width: 100px;
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
    margin: 0 35px;
    color: #333;
    font-size: 20px;
    line-height: 30px;
    a {
        color: #333;
        text-decoration: none;
    }
    &::after {
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 1px;
        background: rgba(0, 0, 0, 0.4);
        content: "";
        transition: all 0.2s ease-in;
        transform: scaleX(1);
    }
}
span {
    display: block;
    margin: 10px 0 0;
    padding: 0 10px;
    font-size: 12px;
}
.tik {
    height: 20px;
}
.menu {
    margin: 0;
    padding: 0;
    font-size: 14px;
    li {
        position: relative;
        border-top: 1px solid #eee;
        list-style: none;
        a {
            display: block;
            padding: 10px 0;
            color: #888;
            text-decoration: none;
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
            position: absolute;
            top: -1px;
            left: 180px;
            z-index: 99;
            display: none;
            overflow: hidden;
            width: 180px;
            border: 1px solid #eee;
            border-radius: 10px;
            border-radius: 10px;
            background: #fff;
            ul {
                display: block;
                margin: 0;
                padding: 0;
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
    overflow: hidden;
    padding: 0;
    border-top: 1px solid #eee;
    border-radius: 0 0 10px 10px;
    input {
        margin: 0;
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        border-radius: 0;
        background: #fff;
        color: #888;
        text-align: center;
        font-size: 14px;

        -webkit-appearance: none;
    }
}
@media screen and (max-width: 1024px) {
    .cont {
        border-radius: 10px 10px 0 0;
        box-shadow: none;
        .wy {
            right: 10px;
            bottom: -64px;
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

