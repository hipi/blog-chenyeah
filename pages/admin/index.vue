<template>
    <div>
        登录才能看到的页面
        <nuxt-link to="/admin/editor/new">添加新笔记</nuxt-link>
    </div>
</template>
<script>
export default {
  middleware: "userAuth",
  layout: "admin",
  data() {
    return {};
  },
  methods: {}
};
</script>
