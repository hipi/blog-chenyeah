<template>
    <canvas ref="canvas"></canvas>
</template>
<script>
import snowImg from "~/assets/img/index/snow.png";
import SNOW from "~/plugins/snow.js";
export default {
    data() {
        return {
            snows: [],
            G: 0.015,
            W: "",
            H: "",
            ctx: "",
            snowLevelTime: 250,
            timer: 0,
            lastTime: Date.now(),
            deltaTime: 0,
            interval: ""
        };
    },
    methods: {
        loop() {
            let vm = this;
            // 擦除当前画布内容，否则原有的雪花不会消失，新绘制的雪花不断覆盖看起来会像一条雪花白色实线在下降
            this.ctx.clearRect(0, 0, this.W, this.H);
            // 两个雪花之间的时间差，不能生成的太快，要不然就成了鹅毛大雪了^_^
            const now = Date.now();
            // 距离上一次绘制的时间差
            this.deltaTime = now - this.lastTime;
            // 重置结束时间
            this.lastTime = now;
            // 时间控制器，当timer > snowLevelTime的时候，才增加雪花，否则不增加雪花
            this.timer += this.deltaTime;
            if (this.timer > this.snowLevelTime) {
                this.snows.push(
                    // 绘制新雪花，x位置为随机数，y为顶部0，半径为随机数随机生成大小不一的雪花
                    new SNOW(
                        this.ctx,
                        snowImg,
                        0.015,
                        Math.random() * this.W,
                        0,
                        Math.random() * 15 + 5
                    )
                );
                this.timer %= this.snowLevelTime;
            }

            this.snows.map(function(s, i) {
                s.update();
                s.draw();
                // 雪花下落至底部则删除
                if (s.y >= vm.H) {
                    vm.snows.splice(i, 1);
                }
            });
            this.interval = requestAnimFrame(this.loop);
        },
        init() {
            let vm = this;
            let canvas = this.$refs.canvas;
            canvas.width = this.W;
            canvas.height = this.H;
            this.ctx = canvas.getContext("2d");
            if (this.W < 768) {
                this.snowLevelTime = 350;
            }
            this.loop();
        }
    },
    mounted() {
        this.W = window.innerWidth; // 浏览器可视窗口宽度
        this.H = window.innerHeight; // 浏览器可视窗口高度
        // 重新定义下requestAnimFrame
        window.requestAnimFrame = (function() {
            return (
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        })();
        this.init();
    },
    beforeDestroy() {
        cancelAnimationFrame(this.interval);
    }
};
</script>

