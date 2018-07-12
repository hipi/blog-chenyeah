<template>
    <div id="index">
        <div id="wrapper">
            <h1>YU YE</h1>
            <h2>Just&nbsp;a&nbsp;Coding&nbsp;Peasant</h2>
            <p>
                <router-link :to="{path:'/blog'}">Blog</router-link>
            </p>
            <p>
                <a href="https://github.com/chenyeah" target="_blank" rel='noopener noreferrer'>Github</a>
            </p>
            <p>
                <a href="mailto:yuyehack@gmail.com">Mail</a>
            </p>
        </div>
        <Snow class="snow"></Snow>
    </div>

</template>

<script>
import Snow from "~/components/snow.vue";
export default {
    head() {
        return {};
    },
    components: {
        Snow
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
#index {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
    background-image: url(~/assets/img/index/bac.jpg);
    background-position: center;
    background-size: cover;
}
#wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    left: 50%;
    z-index: 999;
    margin-top: -160px;
    margin-left: -160px;
    width: 320px;
    text-align: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

h1 {
    left: 4px;
    margin: 12px 0;
    background: linear-gradient(to top right, #e23352, #eacf36, #e6d8be);
    -webkit-background-clip: text;
    text-transform: uppercase;
    letter-spacing: 9px;
    font-weight: 700;
    font-size: 30px;
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;

    -webkit-text-fill-color: transparent;
}

h2 {
    left: 3px;
    margin-bottom: 30px;
    color: skyblue;
    letter-spacing: 0.12em;
    font-weight: normal;
    font-size: 20px;
}

h1,
h2 {
    position: relative;
}

p {
    margin: 0;
    color: #fff;
    letter-spacing: 2px;
    font-size: 20px;
    line-height: 1.5;
}

.snow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    pointer-events: none;
}

a {
    color: #f4f5f5;
    text-decoration: none;
    transition: color 0.2s ease;
}

a:hover {
    color: skyblue;
    text-decoration: underline;
}
</style>
