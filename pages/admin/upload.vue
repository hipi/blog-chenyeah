<template>
  <div>
    <div class="imgC">
      <div class="up">
        <form action="">
          <label>
            <input type="file" @change="upload" accept="image/gif,image/jpeg,image/png">
            <span>
              <i class="icon iconfont icon-add"></i>
            </span>
          </label>
        </form>
      </div>
      <div class="list" v-for="(n,i) in imgList" :key="i">
        <a :href="`//cloud.yuyehack.cn/${n.Key}`"><img :src="`//cloud.yuyehack.cn/${n.Key}`" alt=""></a>
        <input type="text" :value="`//cloud.yuyehack.cn/${n.Key}`">
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    layout: "admin",
    head() {
        return {
            title: "腾讯对象存储上传",
            titleTemplate: "%s - 羽叶丶"
        };
    },
    data() {
        return {
            imgList: []
        };
    },
    methods: {
        getLists() {
            axios.post("//api.yuyehack.cn/cos/list.php").then(D => {
                this.imgList = D.data;
            });
        },
        upload() {
            let formdata = new FormData();
            formdata.append("body", event.target.files[0]);
            // formdata.append("action", "test");
            axios({
                url: "//api.yuyehack.cn/cos/upload.php",
                method: "post",
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                if (res.data.code == 0) {
                    this.getLists();
                }
            });
        }
    },
    mounted() {
        this.getLists();
    }
};
</script>

<style lang="scss" scoped>
.imgC {
    overflow: hidden;
}
.up {
    float: left;
    width: 204px;
    margin: 10px;
    margin-right: 0;
    margin-bottom: 0;
    input {
        display: none;
    }
    span {
        display: inline-block;
        width: 100%;
        height: 124px;
        line-height: 124px;
        text-align: center;
        border: 1px solid #ccc;
        cursor: pointer;
        .icon {
            font-size: 60px;
        }
    }
}
.list {
    width: 204px;
    float: left;
    margin: 10px;
    margin-right: 0;
    margin-bottom: 0;
    > a {
        width: 100%;
        overflow: hidden;
        height: 124px;
        display: block;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    input {
        margin-top: 10px;
        background: transparent;
        width: 100%;
        border: none;
        outline: none;
        text-align: center;
    }
}
</style>

