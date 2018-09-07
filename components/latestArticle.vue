<template>
    <div class="cont">
        <div class="ht">
            最新修改
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
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    let except = this.$route.params.hash;
    this.$axios
      .$post("/api/blog/article/get_lastest.php", {
        limit: 8
      })
      .then(res => {
        this.list = res.list;
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
    padding: 10px 0;
    li {
      padding: 10px 10px;
      color: #5f5f5f;
      list-style: none;
      font-size: 14px;
      line-height: 18px;
      -webkit-transition: all 0.1s ease-in;
      transition: all 0.1s ease-in;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:last-child {
        border-radius: 0 0 10px 10px;
      }
      a {
        color: #5f5f5f;
        text-decoration: none;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
}
</style>

