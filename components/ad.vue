<template>
    <div class="cont">
        <div class="list" v-for="(n , i) in adData" :key="i">
            <a target="_blank" :href="n.url">
                <img :src="n.imgUrl" :alt="n.title">
            </a>
        </div>

    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            adData: [
                {
                    title: "tencent",
                    imgUrl:
                        "https://wx1.sinaimg.cn/large/0079V2lRgy1ft5yx05491j30dw08c76w.jpg",
                    url:
                        "https://cloud.tencent.com/redirect.php?redirect=1010&cps_key=e5d789ce9240a104fbcd388b3916604f"
                },
                {
                    title: "aliyun",
                    imgUrl:
                        "https://wx2.sinaimg.cn/large/0079V2lRgy1ft5y1z3hyfj306y05k0u4.jpg",
                    url:
                        "https://promotion.aliyun.com/ntms/act/xsgroup/buy.html?group=TnO9tWAMYq"
                }
            ]
        };
    }
};
</script>

<style lang="less" scoped>
.cont {
    // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-radius: 10px;
    background: transparent;
    .list {
        margin-bottom: 10px;
        width: 260px;

        a {
            position: relative;
            display: block;

            img {
                display: block;
                width: 100%;
                border-radius: 10px;
            }
            &:after {
                position: absolute;
                right: 4px;
                bottom: 4px;
                padding: 1px 2px;
                border: 1px solid;
                border-radius: 1px;
                background: #000;
                color: #fff;
                content: "广告";
                font-size: 12px;
                opacity: 0.4;
            }
        }
    }
}
</style>

