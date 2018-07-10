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
import Snow from "~/components/snow.vue"
export default {
    head() {
        return {};
    },
    components:{
        Snow
    },
    methods: {},
    mounted() {}
};
</script>

<style scoped>
#index {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    position: fixed;
    background-color: #fff;
    background-image: url(~/assets/img/index/bac.jpg);
}
#wrapper {
    position: absolute;
    left: 0;
    width: 320px;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-left: -160px;
    margin-top: -160px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    z-index: 999;
}

h1 {
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 9px;
    text-transform: uppercase;
    margin: 12px 0;
    left: 4px;
    background: linear-gradient(to top right, #e23352, #eacf36, #e6d8be);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h2 {
    color: skyblue;
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 0.12em;
    margin-bottom: 30px;
    left: 3px;
}

h1,
h2 {
    position: relative;
}

p {
    font-size: 20px;
    line-height: 1.5;
    margin: 0;
    letter-spacing: 2px;
    color: #fff;
}

.snow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    pointer-events: none;
}

a {
    text-decoration: none;
    color: #f4f5f5;
    transition: color 0.2s ease;
}

a:hover {
    color: skyblue;
    text-decoration: underline;
}
</style>
