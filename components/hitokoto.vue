<template>
    <div class="cont">
        <div class="ht">
            一言
        </div>
        <div class="content">
            {{hitokoto.hitokoto}}
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            hitokoto: 1
        };
    },
    mounted() {
        axios
            .get("https://v1.hitokoto.cn/?c=d")
            .then(res => {
                this.hitokoto = res.data;
            })
            .catch(e => {
                this.hitokoto = {
                    hitokoto: "过去也只是过去 ",
                    from: "羽叶丶"
                };
            });
    }
};
</script>

<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .02), 0 4px 10px rgba(0, 0, 0, .06);
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
    padding: 20px 10px;
    font-size: 14px;
    color: #444;
    line-height: 18px
}
</style>

