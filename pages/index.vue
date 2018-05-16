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
        <canvas></canvas>
        <span class="beian">
            <a href="http://www.miibeian.gov.cn">苏ICP备16044037号</a>
            陈晔版权所有
        </span>
    </div>

</template>

<script>
export default {
    head() {
        return {};
    },
    mounted() {
        document.addEventListener("touchmove", function(e) {
            e.preventDefault();
        });
        var c = document.getElementsByTagName("canvas")[0],
            x = c.getContext("2d"),
            pr = window.devicePixelRatio || 1,
            w = window.innerWidth,
            h = window.innerHeight,
            f = 90,
            q,
            m = Math,
            r = 0,
            u = m.PI * 2,
            v = m.cos,
            z = m.random;
        c.width = w * pr;
        c.height = h * pr;
        x.scale(pr, pr);
        x.globalAlpha = 0.6;
        function i() {
            x.clearRect(0, 0, w, h);
            q = [{ x: 0, y: h * 0.7 + f }, { x: 0, y: h * 0.7 - f }];
            while (q[1].x < w + f) d(q[0], q[1]);
        }
        function d(i, j) {
            x.beginPath();
            x.moveTo(i.x, i.y);
            x.lineTo(j.x, j.y);
            var k = j.x + (z() * 2 - 0.25) * f,
                n = y(j.y);
            x.lineTo(k, n);
            x.closePath();
            r -= u / -50;
            x.fillStyle =
                "#" +
                (
                    ((v(r) * 127 + 128) << 16) |
                    ((v(r + u / 3) * 127 + 128) << 8) |
                    (v(r + u / 3 * 2) * 127 + 128)
                ).toString(16);
            x.fill();
            q[0] = q[1];
            q[1] = { x: k, y: n };
        }
        function y(p) {
            var t = p + (z() * 2 - 1.1) * f;
            return t > h || t < 0 ? y(p) : t;
        }
        i();
        setInterval(function() {
            i();
        }, 3000);
    }
};
</script>

<style scoped>
#index {
    width: 100%;
    height: 100%;
    background-image: url("/hero@2x.jpg");
    background-position: center;
    background-size: cover;
    position: fixed;
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
    background: linear-gradient(to top right, #81c2d6, #dcf7a1, #83fcd8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h2 {
    color: #fff;
    font-weight: normal;
    font-size: 15px;
    letter-spacing: 0.12em;
    margin-bottom: 30px;
    left: 3px;
}

h1,
h2 {
    position: relative;
}

p {
    font-size: 16px;
    line-height: 2em;
    margin: 0;
    letter-spacing: 2px;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
}

a {
    text-decoration: none;
    color: #fff;
    transition: color 0.2s ease;
}

a:hover {
    color: #3cafff;
}
.beian {
    position: absolute;
    bottom: 0;
    left: 42%;
    color: #fff;
}
</style>
