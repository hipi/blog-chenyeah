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
                    title: "aliyun",
                    imgUrl:
                        "https://wx2.sinaimg.cn/large/0079V2lRgy1ft5y1z3hyfj306y05k0u4.jpg",
                    url:
                        "https://promotion.aliyun.com/ntms/act/xsgroup/buy.html?group=TnO9tWAMYq"
                },
                {
                    title: "tencent",
                    imgUrl:
                        "https://ws2.sinaimg.cn/large/0079V2lRgy1ft5yow9h1yj308c02swes.jpg",
                    url:
                        "https://cloud.tencent.com/redirect.php?redirect=1001&cps_key=e5d789ce9240a104fbcd388b3916604f"
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.cont {
    background: transparent;
    border-radius: 10px;
    // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    .list {
        margin-bottom: 10px;
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
                content: "广告";
                font-size: 12px;
                color: #fff;
                border: 1px solid;
                background: #000;
                opacity: 0.4;
                bottom: 4px;
                right: 4px;
                padding: 1px 2px;
                border-radius: 1px;
            }
        }
    }
}
</style>

