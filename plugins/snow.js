/**
 * 雪花对象
 * @param {x} x
 * @param {y} y
 * @param {半径或长宽} radius
 */
const _img = new Image();
class Snow {
    constructor(ctx, snowImage, G, x, y, radius) {
        this.ctx = ctx;
        this.snowImage = snowImage;
        this.G = G;
        this.x = x;
        this.y = y;
        // 如果是圆形就是半径，否则就是长宽相同的正方形
        this.radius = radius;
        // x方向的移动速度，可以向左也可以向右，范围在[-1, 1]
        this.speed_x = 0;
        // y方向的移动速度,只能向下，最快为1
        this.speed_y = 0;
        // 雪花自身旋转的角度
        this.deg = 0;
        // x方向，下落速度参数，飘落效果 > 0向左飘； < 0 向右飘
        this.ax = Math.random() < 0.5 ? 0.005 : -0.005;
    }
    update() {
        // 雪花自身旋转的角度增值
        const deltaDeg = Math.random() * 0.6 + 0.2;
        // 不断变化x方向的移动速度
        this.speed_x += this.ax;
        // x向左或者向右速度过大的时候改变方向
        if (this.speed_x >= 1 || this.speed_x <= -1) {
            this.ax *= -1;
        }
        // 雪花下落速度，最高是1
        if (this.speed_y < 1) {
            // 雪花下落速度不断增加
            this.speed_y += this.G;
        }
        // 角度不断变化
        this.deg += deltaDeg;
        // x坐标不断变化
        this.x += this.speed_x;
        // y坐标不断变化
        this.y += this.speed_y;
    }
    draw() {
        // 获取半径宽高
        const radius = this.radius;
        const snowImage = this.snowImage;
        // 保存画布的当前状态，因为下面用到了变换坐标和旋转画布
        this.ctx.save();
        /**
         * 下面这两句变化也挺重要的，因为旋转是按照画布远点进行的
         * 因此，如果想让雪花旋转明显，就需要将画布坐标移动到雪花的坐标点
         * 如果不加上坐标转换，那么所有雪花都在左上角也就是坐标原点旋转，x, y也不会变，没有飘落效果
         */
        // 将画布的坐标原点移动到(x, y)的位置，canvas默认是(0, 0)
        this.ctx.translate(this.x, this.y);
        // 将画布顺时针旋转的角度
        this.ctx.rotate((this.deg * Math.PI) / 180);
        //let img = new Image();
        _img.src = snowImage;
        // 绘制雪花图像，因为画布坐标移动到了(x, y)，所以从0,0开始就是(-radius, radius)
        this.ctx.drawImage(_img, -radius, -radius, radius * 2, radius * 2);
        // 恢复canvas旋转、translate等操作的状态，一般与save配合使用就是恢复到上一个save的状态
        // 如果不恢复上一个状态的话，话不旋转角度坐标都没变化，也就不会出现动画效果，必须恢复
        this.ctx.restore();
    }
}
export default Snow;
