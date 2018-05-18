<template>
    <div class="cont"></div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        search(e) {
            this.$router.replace({ path: "/blog", query: { s: this.s } });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

