<template>
    <div>
        asd
    </div>
</template>
<script>
import marked from "marked";
import axios from "axios";

export default {
    validate({ params }) {
        return  Boolean(params.hash)
    },
    asyncData(context) {
        return axios
            .post("https://api.yuyehack.cn/blog/article/get_note.php", {
                hash: context.params.hash
            })
            .then(res => {
                res.data.data.content = marked(res.data.data.content);
                return { asyncData: res.data.data };
            })
            .catch(e => {
                context.error({ statusCode: 404, message: "笔记不存在" });
            });
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

