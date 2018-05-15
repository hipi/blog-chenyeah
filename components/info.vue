<template>
    <div class="cont">
        <i @click="isMusic=!isMusic" class="music iconfont icon-music"></i>
        <iframe v-if="isMusic" class="wy" frameborder="no" border="0" marginwidth="0" marginheight="0" width=198 height=52 src="//music.163.com/outchain/player?type=2&id=32507039&auto=1&height=32"></iframe>
        <div class="head">
            <div>
                <img src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="">
            </div>
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
        <form class="search">
            <input placeholder="搜索" type="search">
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isMusic: false,
            menu: [
                {
                    top: {
                        title: "菜单",
                        link: "/test"
                    },
                    child: [
                        {
                            title: "菜单",
                            link: "/test"
                        },
                        {
                            title: "菜单",
                            link: "/test"
                        }
                    ]
                }
            ]
        };
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
    text-align: center;
    // border: 1px solid #eee;
    position: relative;
    box-shadow: 0 0 0 1px rgba(0,0,0,.02), 0 4px 10px rgba(0,0,0,.06);
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
    > div {
        max-width: 100px;
        margin: 0 auto;
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
            background: #44cef6;
            > a {
                color: #fff;
            }
            .li-sider {
                display: block;
            }
        }

        .li-sider {
            border: 1px solid #eee;
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
                li:first-child {
                    border-top: 0;
                    border-radius: 10px 10px 0 0;
                }
                li:last-child {
                    border-radius: 0 0 10px 10px;
                }
            }
        }
    }
}
.search {
    border-top: 1px solid #eee;
    font-size: 14px;
    input {
        color: #888;
        border: 0;
        text-align: center;
        height: 40px;
        outline: none;
        margin: 0;
        border-radius: 0 0 10px 10px;
        background: #fff;
        width:100%;
        &:hover {
            background: #44cef6;
            &::-webkit-input-placeholder {
                color: #fff;
            }
        }
    }
}
</style>

