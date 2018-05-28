<template>
  <div refs="comments">
  </div>
</template>
<script>
import "gitment/style/default.css";
import Gitment from "gitment";
export default {
  data() {
    return {};
  },
  mounted() {
    const gitment = new Gitment({
      id: location.href, // optional
      owner: "chenyeah",
      repo: "chenyeah",
      oauth: {
        client_id: "11fa4735df6563f2e9c2",
        client_secret: "090bc3eeb2c0201fc159778fa067e6df1eb8a17b"
      }
      // ...
      // For more available options, check out the documentation below
    });
    gitment.render(this.$refs.comments);
  }
};
</script>
