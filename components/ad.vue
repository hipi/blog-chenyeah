<template>
  <div class="cont">
    <img :src="url" alt="">
  </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            url: "https://ws1.sinaimg.cn/large/0079V2lRgy1fs5zcwh50tj30c80c8aaa.jpg"
        };
    }
};
</script>

<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 4px 10px rgba(0, 0, 0, 0.06);
    img {
        display: block;
        width: 100%;
        border-radius: 10px;
    }
}
</style>

