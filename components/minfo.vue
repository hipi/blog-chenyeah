<template>
    <div class="cont" :class="{active:mactive}" @click="del($event)">
        <div class="menu" ref="mMenu">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nactive: true
        };
    },
    props: {
        mactive: Boolean
    },
    methods: {
        search(e) {
            this.$router.replace({ path: "/blog", query: { s: this.s } });
        },
        del(e) {
            if (!this.$refs.mMenu.contains(e.target)) {
                this.$emit("update:mactive", false);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.cont {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    touch-action: none;
    background: transparent;
    pointer-events: none;
    .menu {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        z-index: 1001;
        width: 200px;
        max-width: 100%;
        background: #f4f5f5;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -webkit-transition: -webkit-transform 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out;
        -ms-scroll-chaining: none;
    }
    &.active {
        background: rgba(0, 0, 0, 0.3);
        pointer-events: auto;
        .menu {
            -webkit-transform: translateX(0);
        }
    }
}
</style>

