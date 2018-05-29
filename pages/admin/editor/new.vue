<template>
  <div id="edit">
    <div class="top">
      <div class="title">
        <input v-model="title" placeholder="输入文章标题..." class="title-input">
      </div>
      <div class="info">
        <textarea v-model="info" spellcheck="false" placeholder="输入导语..."></textarea>
      </div>
      <div class="tag">
        <input v-model="tag" placeholder="输入标签..." type="text">
      </div>
      <div class="cover">
        <input v-model="cover" spellcheck="false" placeholder="输入封面图片地址">
      </div>
      <div @click="submit" class="sub">
        发布
      </div>
    </div>
    <div class="content">
      <div class="editor-box">
        <textarea placeholder="Markdown 格式" @keydown.tab.prevent="printTab()" @scroll="scroll" ref="edit" v-model="content" spellcheck="false"></textarea>
      </div>
      <div class="content-preview">
        <div ref="show" id="content-html" v-html="html">
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import marked from "marked";
import axios from "axios";
import prism from "prismjs";
marked.setOptions({
  highlight: function(code,lang) {
    if (["html", "javascript", "css"].includes(lang)) {
      return Prism.highlight(code, prism.languages.lang);
    } else {
      return Prism.highlight(code, prism.languages["javascript"]);
    }
  }
});
export default {
  asyncData(context) {},
  data() {
    return {
      title: "",
      info: "",
      tag: "",
      cover: "",
      content: ""
    };
  },
  computed: {
    html: function() {
      return marked(this.content);
    }
  },
  methods: {
    scroll() {
      let _edit = this.$refs.edit;
      let _show = this.$refs.show;
      _show.scrollTop =
        _edit.scrollTop *
        (_show.scrollHeight - _show.clientHeight) /
        (_edit.scrollHeight - _edit.clientHeight);
    },
    submit() {
      this.$confirm("确认发布？")
        .then(() => {
          axios
            .post("https://api.yuyehack.cn/blog/article/inset_article.php", {
              title: this.title,
              info: this.info,
              tag: this.tag,
              cover: this.cover,
              content: this.content
            })
            .then(res => {
              if (res.data.code == 0) {
                this.$router.push("/admin/article");
              } else {
                alert(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },
    printTab() {
      var t = this.$refs.edit;
      if (document.selection);
      else if (
        "number" == typeof t.selectionStart &&
        "number" == typeof t.selectionEnd
      ) {
        var n = t.selectionStart,
          r = t.selectionEnd,
          o = t.value,
          i = o
            .substring(0, n)
            .split("\n")
            .pop();
        if (i.match(/^\s*[0-9]+\.\s+\S*/)) {
          var a = i.replace(/(\d+)/, 1);
          t.value =
            o.substring(0, n - a.length) + "\t" + a + o.substring(r, o.length);
        } else
          i.match(/^\s*-\s+\S*/)
            ? (t.value =
                o.substring(0, n - i.length) +
                "\t" +
                i +
                o.substring(r, o.length))
            : (t.value = o.substring(0, n) + "\t" + o.substring(r, o.length));
        t.selectionStart = t.selectionEnd = n + 1;
      } else alert("Error: Browser version is too low");
      this.content = t.value;
      t.focus();
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
#edit {
  .top {
    height: 60px;
    display: flex;
    border-bottom: 1px solid #eee;
    .title {
      width: 500px;
      border-right: 1px solid #eee;
      .title-input {
        margin: 0;
        padding: 0;
        font-weight: 700;
        color: #333;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0 20px;
        font-size: 24px;
      }
    }
    .info {
      flex: 1;
      textarea {
        width: 100%;
        height: 100%;
        border: 0;
        resize: none;
        outline: none;
        font-size: 16px;
        padding: 10px;
      }
    }
    .tag {
      width: 80px;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      input {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 700;
        color: #333;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0 10px;
      }
    }
    .cover {
      border-right: 1px solid #eee;
      width: 200px;
      input {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-weight: 700;
        color: #333;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        padding: 0 10px;
      }
    }
    .sub {
      font-size: 18px;
      line-height: 60px;
      color: #007fff;
      cursor: pointer;
      text-align: center;
      width: 80px;
      background: #fff;
      user-select: none;
    }
  }
  .content {
    display: flex;
    height: calc(100vh - 64px);
    > div {
      flex: 1;
    }
    .editor-box {
      textarea {
        font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
          "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei",
          sans-serif;
        border: 0;
        resize: none;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 10px;
        font-size: 15px;
        outline: none;
        line-height: 1.5;
        color: #2c3e50;
      }
    }
  }
}
.content-preview {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  border-left: 1px solid #eee;
}
.preview-footer {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
.content-preview .content-html::-webkit-scrollbar {
  display: none;
}
@-webkit-keyframes http-image {
  0% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
@keyframes http-image {
  0% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
<style lang="scss">
#content-html {
  padding: 10px;
  overflow: auto;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  line-height: 1.5;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  @import "~assets/css/markdown.scss";
}
</style>

