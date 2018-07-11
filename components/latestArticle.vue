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

<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
}
.ht {
    height: 56px;
    line-height: 56px;
    padding: 0 30px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    background-image: linear-gradient(
        rgba(200, 200, 200, 0),
        rgba(200, 200, 200, 0.12)
    );
    color: rgba(0, 0, 0, 0.4);
}
.content {
    ul {
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            padding: 13px;
            -webkit-transition: all 0.1s ease-in;
            transition: all 0.1s ease-in;
            color: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            line-height: 18px;
            &:last-child {
                border-radius: 0 0 10px 10px;
            }
            a {
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
                line-height: 18px;
                text-decoration: none;
            }
            &:hover {
                background: #44cef6;
                color: #fff;
                text-decoration: none;
                a {
                    color: #fff;
                }
            }
        }
    }
}
</style>

