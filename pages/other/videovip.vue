<template>
  <div>
    <div class="fc">
      <h2 class="title">VIP视频解析播放</h2>
      <div class="search">
        <input @keydown.enter="play" v-model="url" type="text" placeholder="请输入播放地址后解析,支持爱奇艺,优酷,土豆等VIP视频播放地址" autocomplete="off" id="url">
        <span id="ans" @click="play">
          解析
        </span>
      </div>
      <div class="info">
        <p>本站提供的：腾讯视频VIP解析、优酷视频VIP解析、爱奇艺VIP解析、乐视vip解析等接口均收集自网络。</p>
        <p>本站无任何广告，如果发现视频中有广告，均为解析接口自带的广告，请自己用浏览器去广告插件去除。 支持全网VIP解析，支持手机哦。</p>
        <div>记住永久地址：
          <a href="/other/videovip"> https://chenyeah.com/other/videovip</a>
        </div>
      </div>
    </div>
    <div class="v" v-show="isplay">
      <iframe scrolling="auto" allowtransparency="true" id="video" frameborder="0" :src="playsrc"></iframe>
    </div>
    <div class="jia" v-show="!isplay">
      <span>
        <svg class="icon" style="width: 60px; height: 60px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1299">
          <path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333zM672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z" p-id="1300">
          </path>
        </svg>
      </span>
    </div>
  </div>
</template>
<script>
export default {
    head() {
        return {
            title: "VIP视频解析播放",
            titleTemplate: "%s - 羽叶丶"
        };
    },
    data() {
        return {
            url: "",
            isplay: false,
            playsrc: ""
        };
    },
    methods: {
        start() {
            this.playsrc ="https://player.52laoma.com/ipsign/player.php?v=" + this.url;
            //this.playsrc ="http://zs.lzonel.cn/vip/?url="+this.url;
        },
        play() {
            if (this.url !== "") {
                this.start(url);
                this.isplay = true;
            } else {
                alert("请输入链接地址");
            }
        }
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.fc {
    margin: 0 auto;
    padding-top: 40px;
    width: 900px;
}
h2 {
    margin-bottom: 40px;
    color: #3cafff;
    text-align: center;
}
.search {
    font-size: 0;
    input {
        position: relative;
        z-index: 2;
        box-sizing: border-box;
        margin-bottom: 0;
        padding: 0 10px;
        width: 850px;
        height: 40px;
        outline: none;
        border: 1px solid #3cafff;
        border-radius: 4px 0 0 4px;
        color: #555;
        font-size: 16px;
        &:focus {
            border: 1px solid #3cafff;
        }
    }
    span {
        display: inline-block;
        width: 50px;
        height: 40px;
        border-radius: 0 4px 4px 0;
        background: #3cafff;
        color: #fff;
        vertical-align: top;
        vertical-align: top;
        text-align: center;
        font-size: 16px;
        line-height: 40px;
        cursor: pointer;

        user-select: none;
    }
}
.info {
    p {
        margin: 14px;
    }
    > div {
        margin: 14px;
    }
}
.v {
    display: block;
    margin: 0 auto;
    width: 960px;
    height: 540px;
    background: black;
    #video {
        width: 100%;
        height: 100%;
    }
}
.jia {
    position: relative;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 960px;
    height: 540px;
    background: #ccc;
    span {
        position: absolute;
        width: 60px;
        height: 60px;
        // background: #fff;
        border-radius: 50%;
        cursor: pointer;
    }
}

@media only screen and (max-width: 980px) {
    .fc {
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        .search {
            text-align: center;
        }
        input {
            width: 80%;
        }
    }
    .v {
        width: 100%;
        height: auto;
        background: transparent;
        #video {
            display: block !important;
            margin: 0 auto;
            width: 90%;
            height: 250px;
        }
    }
    .jia {
        margin: 0 auto;
        margin-bottom: 20px;
        width: 90%;
        height: 250px;
    }
}
</style>

