<template>
  <div id="edit">
    <div class="top">
      <div class="title">
        <input v-model="editor.title" placeholder="输入文章标题..." class="title-input">
      </div>
      <div class="info">
        <textarea v-model="editor.info" spellcheck="false" placeholder="输入导语..."></textarea>
      </div>
      <div class="tag">
        <input v-model="editor.tag" placeholder="输入标签..." type="text">
      </div>
      <div class="cover">
        <input v-model="editor.cover" spellcheck="false" placeholder="输入封面图片地址">
      </div>
      <div @click="submitEditor" class="sub">
        发布修改
      </div>
    </div>
    <div class="content">
      <div class="editor-box">
        <textarea placeholder="Markdown 格式" @keydown.tab.prevent="printTab()" @scroll="scroll" ref="edit" v-model="editor.content" spellcheck="false"></textarea>
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
export default {
    validate({ params }) {
        return Boolean(params.hash);
    },
    asyncData(context) {
        return axios
            .post("https://api.chenyeah.com/blog/article/get_note.php", {
                hash: context.params.hash
            })
            .then(res => {
                // res.data.data.content = marked(res.data.data.content);
                return { editor: res.data.data };
            })
            .catch(e => {
                context.error({ statusCode: 404, message: "笔记不存在" });
            });
    },
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
            return marked(this.editor.content);
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
        submitEditor() {
            this.$confirm("确认发布？")
                .then(() => {
                    axios
                        .post(
                            "https://api.chenyeah.com/blog/article/update_article.php",
                            {
                                hash: this.editor.hash,
                                title: this.editor.title,
                                info: this.editor.info,
                                tag: this.editor.tag,
                                cover: this.editor.cover,
                                content: this.editor.content
                            }
                        )
                        .then(res => {
                            if (res.data.code == 0) {
                                this.$router.go(-1);
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
                        o.substring(0, n - a.length) +
                        "\t" +
                        a +
                        o.substring(r, o.length);
                } else
                    i.match(/^\s*-\s+\S*/)
                        ? (t.value =
                              o.substring(0, n - i.length) +
                              "\t" +
                              i +
                              o.substring(r, o.length))
                        : (t.value =
                              o.substring(0, n) +
                              "\t" +
                              o.substring(r, o.length));
                t.selectionStart = t.selectionEnd = n + 1;
            } else alert("Error: Browser version is too low");
            this.content = t.value;
            t.focus();
        }
    },
    mounted() {}
};
</script>
<style scoped lang="less">
#edit {
    .top {
        display: flex;
        height: 60px;
        border-bottom: 1px solid #eee;
        .title {
            width: 500px;
            border-right: 1px solid #eee;
            .title-input {
                margin: 0;
                padding: 0;
                padding: 0 20px;
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
                color: #333;
                font-weight: 700;
                font-size: 24px;
            }
        }
        .info {
            flex: 1;
            textarea {
                padding: 10px;
                width: 100%;
                height: 100%;
                outline: none;
                border: 0;
                font-size: 16px;
                resize: none;
            }
        }
        .tag {
            width: 80px;
            border-right: 1px solid #eee;
            border-left: 1px solid #eee;
            input {
                margin: 0;
                padding: 0;
                padding: 0 10px;
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
                color: #333;
                font-weight: 700;
                font-size: 12px;
            }
        }
        .cover {
            width: 200px;
            border-right: 1px solid #eee;
            input {
                margin: 0;
                padding: 0;
                padding: 0 10px;
                width: 100%;
                height: 100%;
                outline: none;
                border: none;
                color: #333;
                font-weight: 700;
                font-size: 12px;
            }
        }
        .sub {
            width: 80px;
            background: #fff;
            color: #007fff;
            text-align: center;
            font-size: 16px;
            line-height: 60px;
            cursor: pointer;

            user-select: none;
        }
    }
    .content {
        display: flex;
        height: calc(100vh - 66px);
        > div {
            flex: 1;
        }
        .editor-box {
            textarea {
                margin: 0;
                padding: 10px;
                width: 100%;
                height: 100%;
                outline: none;
                border: 0;
                color: #2c3e50;
                font-size: 15px;
                font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
                    "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei",
                    sans-serif;
                line-height: 1.5;
                resize: none;
            }
        }
    }
}
.content-preview {
    position: relative;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    border-left: 1px solid #eee;
    background-color: #fff;
}
.preview-footer {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
.content-html::-webkit-scrollbar {
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
<style lang="less">
#content-html {
    overflow: auto;
    padding: 10px;
    color: #24292e;
    word-wrap: break-word;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
        sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    line-height: 1.5;
    line-height: 1.5;

    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    @import "~assets/css/markdown.less";
}
</style>
