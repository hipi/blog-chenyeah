<template>
    <div class="cont">
        <div class="ht">
            最近文章
        </div>
        <div class="content">
            <ul>
                <li v-for="(n,i) in list" :key="i">
                    <nuxt-link :to="`/blog/${n.hash}`">{{n.title}}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            list: []
        };
    },
    mounted() {
        let except = this.$route.params.hash;
        axios
            .post("https://api.yuyehack.cn/blog/article/get_articlelist.php", {
                page: 1,
                pageSize: 5,
                except: except
            })
            .then(res => {
                this.list = res.data.list;
            });
    }
};
</script>

<style lang="less" scoped>
.cont {
    border-radius: 10px;
    background: #fff;
}
.ht {
    padding: 0 30px;
    height: 56px;
    border-bottom: 1px solid #eee;
    background-image: linear-gradient(
        rgba(200, 200, 200, 0),
        rgba(200, 200, 200, 0.12)
    );
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.4);
    line-height: 56px;
}
.content {
    ul {
        margin: 0;
        padding: 0;
        li {
            padding: 13px;
            color: rgba(0, 0, 0, 0.5);
            list-style: none;
            font-size: 14px;
            line-height: 18px;
            -webkit-transition: all 0.1s ease-in;
            transition: all 0.1s ease-in;
            &:last-child {
                border-radius: 0 0 10px 10px;
            }
            a {
                color: rgba(0, 0, 0, 0.5);
                text-decoration: none;
                font-size: 14px;
                line-height: 18px;
            }
        }
    }
}
</style>

