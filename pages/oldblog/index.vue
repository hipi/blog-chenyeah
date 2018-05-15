<template>
    <div class="con">
        <nav :style="{transform:menustyle}">
            <div @click="delmenu" v-show="delshow" class="dete">
            </div>
            <!-- <a class="me" href="/admin"> -->
            <nuxt-link class="me" to="/admin">
                <div>
                    <img src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="">
                </div>
                <p>
                    羽叶丶
                </p>
                <!-- </a> -->
            </nuxt-link>
            <div class="url">
                <ul>
                    <li>
                        <a href="https://github.com/chenyeah" target="_blank">
                            <svg class="icon" style="width: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2928">
                                <path d="M0 525.195313c0 223.59375 143.300781 413.691406 343.007813 483.496094 26.894531 6.796875 22.792969-12.402344 22.792969-25.390625l0-88.691406c-155.292969 18.203125-161.503906-84.609375-171.992188-101.699219-21.09375-35.996094-70.800781-45.195313-55.996094-62.304688 35.390625-18.203125 71.40625 4.609375 113.105469 66.308594 30.195313 44.707031 89.101563 37.207031 119.003906 29.707031 6.503906-26.894531 20.507813-50.898438 39.707031-69.609375-160.800781-28.808594-227.910156-126.992188-227.910156-243.808594 0-56.601563 18.691406-108.691406 55.292969-150.703125-23.300781-69.296875 2.207031-128.496094 5.605469-137.304688 66.503906-5.996094 135.507813 47.597656 140.898438 51.796875 37.792969-10.195313 80.898438-15.605469 129.101563-15.605469 48.496094 0 91.796875 5.605469 129.804688 15.898438 12.890625-9.804688 76.992188-55.800781 138.808594-50.195313 3.300781 8.808594 28.203125 66.699219 6.308594 135 37.109375 42.109375 55.996094 94.609375 55.996094 151.40625 0 116.992188-67.5 215.292969-228.808594 243.691406 26.894531 26.601562 43.59375 63.398438 43.59375 104.199219l0 128.808594c0.898437 10.292969 0 20.507813 17.207031 20.507813 202.597656-68.300781 348.496094-259.804688 348.496094-485.410156 0-282.910156-229.296875-511.992188-511.992188-511.992188C229.101563 13.203125 0 242.304687 0 525.195313L0 525.195313z" p-id="2929"></path>
                            </svg>
                            <span>Github</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:yuyehack@gmail.com">
                            <svg class="icon" style="width: 20px; vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4220">
                                <path d="M928 896h-832C43.072 896 0 852.928 0 800v-576C0 171.072 43.072 128 96 128h832c52.928 0 96 43.072 96 96v576c0 52.928-43.072 96-96 96zM96 192a32 32 0 0 0-32 32v576a32 32 0 0 0 32 32h832c17.6 0 32-14.4 32-32v-576a32 32 0 0 0-32-32h-832zM512 557.312a31.872 31.872 0 0 1-17.728-5.376l-320-213.312a32 32 0 1 1 35.456-53.248L512 486.848l302.272-201.472a32 32 0 0 1 35.456 53.248l-320 213.312A31.36 31.36 0 0 1 512 557.312z" p-id="4221"></path>
                            </svg>
                            <span>邮箱</span>
                        </a>
                    </li>

                    <li>
                        <a href="/other/videovip">
                            <svg class="icon" style="width: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1299">
                                <path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333zM672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" p-id="1300">
                                </path>
                            </svg>
                            <span>VIP视频</span>
                        </a>
                    </li>

                    <li>
                        <a href="./about.html">
                            <svg class="icon" style="width: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4755">
                                <path d="M512 465.454545c-12.846545 0-23.272727 10.426182-23.272727 23.272727l0 279.272727c0 12.846545 10.426182 23.272727 23.272727 23.272727 12.846545 0 23.272727-10.426182 23.272727-23.272727l0-279.272727C535.272727 475.880727 524.846545 465.454545 512 465.454545zM512 69.818182c-257.070545 0-465.454545 208.384-465.454545 465.454545 0 257.070545 208.384 465.454545 465.454545 465.454545 257.070545 0 465.454545-208.384 465.454545-465.454545C977.454545 278.202182 769.070545 69.818182 512 69.818182zM512 954.181818c-231.377455 0-418.909091-187.531636-418.909091-418.909091 0-231.377455 187.531636-418.909091 418.909091-418.909091s418.909091 187.531636 418.909091 418.909091C930.909091 766.650182 743.377455 954.181818 512 954.181818zM512 279.272727c-25.693091 0-46.545455 20.852364-46.545455 46.545455s20.852364 46.545455 46.545455 46.545455 46.545455-20.852364 46.545455-46.545455S537.693091 279.272727 512 279.272727z" p-id="4756"></path>
                            </svg>
                            <span>关于</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <header>
            <div @click="openmenu" class="icon" id="menu">
                <i></i>
            </div>
            <span>羽叶丶の Blog</span>
            <nuxt-link class="me" to="/admin">
                <img src="https://www.gravatar.com/avatar/40206d98ff6e85da457c341e4a4ea437" alt="羽叶丶">
            </nuxt-link>
        </header>
        <main class="main">
            <div class="info">
                {{info.hitokoto}}---《{{info.from}}》
            </div>
            <div id="container">
                <div class="list" v-for="(n,i) in list" :key="i">
                    <nuxt-link class="title" :to="`/blog/note/${n.hash}`">
                        <h2>
                            <span v-if="n.top" class="article-top">[置顶] </span>{{n.title}}
                        </h2>
                    </nuxt-link>
                    <a class="content">
                        <blockquote>
                            <p>{{n.info}}</p>
                        </blockquote>
                    </a>
                    <div class="meta">
                        <span>{{n.add_time}}</span>
                        <span v-if="n.tag" class="tag">{{n.tag}}</span>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import axios from "axios";

export default {
    async asyncData(context) {
        function a() {
            /* return axios
                .get("https://v1.hitokoto.cn/?c=d")
                .then(res => {
                    return { info: res.data };
                })
                .catch(e => {
                    return {
                        info: {
                            hitokoto: "过去也只是过去 ",
                            from: "羽叶丶"
                        }
                    };
                }); */
            return {
                info: {
                    hitokoto: "过去也只是过去 ",
                    from: "羽叶丶"
                }
            };
        }
        function b() {
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
        let data1 = await b();
        let data2 = await a();
        return Object.assign(data1, data2);
    },
    data() {
        return {
            menustyle: "",
            delshow: false
        };
    },
    methods: {
        openmenu() {
            this.menustyle = "translate3D(0,0,0)";
            this.delshow = true;
        },
        delmenu() {
            this.menustyle = "translate3D(-76px,0,0)";
            this.delshow = false;
        }
    }
};
</script>
<style scoped lang="scss">
.con {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", Arial, sans-serif;
    line-height: 1.2;
}
.con {
    margin: 0;
    padding: 0;
    font-size: 0.3rem;
    overflow-x: hidden;
    overflow-y: auto;
}
.con a {
    color: #0366d6;
    text-decoration: none;
}
nav {
    position: fixed;
    box-sizing: border-box;
    width: 250px;
    height: 100vh;
    background: #eee;
    text-align: center;
    z-index: 99;
    transform: translate3d(0px, 0px, 0px);
}
nav .dete {
    position: fixed;
    width: calc(100vw - 76px);
    height: 100vh;
    top: 0;
    left: 76px;
    background: transparent;
    z-index: 99;
}
nav a.me {
    background: #000;
    display: block;
    box-sizing: border-box;
    height: 200px;
    padding-top: 30px;
    text-decoration: none;
}
nav a.me div {
    transition: all 1s ease;
}
nav a.me div img {
    width: 100px;
    border-radius: 50%;
}
nav a.me div:hover {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
}
nav a.me p {
    color: #fff;
}
nav .url {
    padding: 60px 0;
}
nav .url ul,
nav .url li {
    padding: 0;
    margin: 0;
    list-style: none;
}
nav .url a {
    text-align: left;
    display: block;
    text-decoration: none;
    cursor: pointer;
    color: #999;
    padding: 10px 0;
    padding-left: 60px;
    font-size: 20px;
}
nav .url a svg {
    margin-right: 20px;
}
nav .url a:hover {
    color: #3cafff;
}
header {
    display: none;
}
.main {
    width: 100%;
    margin-left: 250px;
}
.main #container {
    margin: 0 280px 0 30px;
    padding-top: 20px;
    min-height: calc(100vh - 120px);
}
.main #container h1,
.main #container h2,
.main #container h3,
.main #container h4,
.main #container h5,
.main #container p,
.main #container blockquote {
    margin: 0;
}
.main #container .list {
    padding: 15px;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-bottom: 1px solid #eef2f8;
}
.main #container .list .title {
    display: inline-block;
    text-decoration: none;
    color: #0d0015;
}
.list .title h1,
.list .title h2,
.list .title h3,
.list .title h4,
.list .title h5 {
    font-size: 24px;
}
.main #container .list .title:hover {
    color: #3cafff;
}
.main #container .list .content {
    display: block;
    color: #5d686f;
    margin: 10px 0 20px 0;
    border-left: 2px solid #ccc;
    padding-left: 10px;
}
.main #container .list .content p {
    font-size: 14px;
}
.main #container .list .meta span {
    font-size: 14px;
    color: #bdbdbd;
    .tag {
        font-size: 14px;
    }
}
.main #page {
    margin: 0 280px 0 30px;
}
.main #page .lf {
    display: inline-block;
    margin: 0;
    margin-right: 10px;
    padding: 5.5px 15px;
    border: 1px solid #9eabb3;
    border-radius: 3px;
    background: #fff;
    color: #9eabb3;
    font-size: 0.25rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.main #page .lf:hover {
    border: 1px solid #738691;
    color: #738691 !important;
}
.main #page .rf {
    float: right;
    color: #9eabb3;
}
.main .info {
    margin: 0 280px 0 30px;
    font-size: 18px;
}
@media screen and (max-width: 1200px) {
    nav {
        position: fixed;
        box-sizing: border-box;
        width: 76px;
        height: 100vh;
    }
    nav a.me {
        height: 160px;
    }
    nav a.me img {
        width: 80% !important;
    }
    .url {
        background: #eee;
    }
    .url a {
        padding-left: 0 !important;
        text-align: center !important;
    }
    .url li svg {
        display: none;
    }
    .main {
        margin-left: 76px;
    }
    .main #container {
        margin: 0 106px 0 30px;
    }
    .main #page {
        margin: 0 106px 0 30px;
    }
    .main .info {
        margin: 0 106px 0 30px;
    }
}
@media screen and (max-width: 768px) {
    header {
        display: block;
        width: 100%;
        height: 50px;
        background: #000;
        color: #fff;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
    }
    header .icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
    }
    header .icon::before {
        content: "";
        position: absolute;
        top: 15px;
        left: 12.5px;
        width: 25px;
        height: 1px;
        background-color: #fff;
        -webkit-transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
        transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
    }
    header .icon::after {
        content: "";
        position: absolute;
        bottom: 15px;
        left: 12.5px;
        width: 25px;
        height: 1px;
        background-color: #fff;
        -webkit-transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
        transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
    }
    header .icon i {
        position: absolute;
        top: 25px;
        left: 12.5px;
        width: 25px;
        height: 1px;
        background-color: #fff;
        -webkit-transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
        transition: all 0.2s cubic-bezier(0.4, 0.01, 0.165, 0.99) 0.3s;
    }
    header .me {
        position: absolute;
        display: block;
        top: 7.5px;
        right: 12.5px;
        width: 35px;
        height: 35px;
    }
    header .me img {
        width: 100%;
        border-radius: 50%;
    }
    nav {
        transform: translate3D(-76px, 0, 0);
        transition: all 0.4s ease;
    }
    .main {
        margin: 0;
    }
    .main #container {
        margin: 0 20px;
    }
    .main #page {
        margin: 0 20px;
    }
    .main .info {
        margin: 0 20px;
    }
}
.info {
    background: #bdbdbd;
    padding: 10px;
    border-radius: 0 0 4px 4px;
    color: #fff;
    background: #659abf;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    min-height: 40px;
    box-sizing: border-box;
}
#page {
    overflow: hidden;
    margin-bottom: 10px !important;
}
.tag {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 2px;
    background: #659abf;
    color: #fff !important;
    margin-left: 10px;
    font-size: 12px;
}
.article-top {
    color: #3cafff;
}
</style>

<style>
.list .title h1,
.list .title h2,
.list .title h3,
.list .title h4,
.list .title h5 {
    font-size: 0.4rem;
}
</style>
