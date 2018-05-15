<template>
    <div class="cont">
        <div class="ht">
            最近文章
        </div>
        <div class="content">
            <ul>
                <li>
                    <nuxt-link to="/blog">羽叶</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/blog">羽叶</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/blog">羽叶</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.cont {
    background: #fff;
    border-radius: 10px;
}
.ht {
    height: 56px;
    line-height: 56px;
    padding: 0 30px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.05);
    background-image: linear-gradient(
        rgba(200, 200, 200, 0),
        rgba(200, 200, 200, 0.12)
    );
    color: rgba(0, 0, 0, 0.4);
}
.content {
    ul {
        padding: 0;
        margin: 0;
        li {
            list-style: none;
            padding: 13px;
            -webkit-transition: all 0.1s ease-in;
            transition: all 0.1s ease-in;
            color: rgba(0, 0, 0, 0.5);
            font-size: 14px;
            line-height: 18px;
            &:last-child{
                border-radius: 0 0 10px 10px;
            }
            a {
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
                line-height: 18px;
                text-decoration: none;
            }
            &:hover {
                background: #44cef6;
                color: #fff;
                text-decoration: none;
                a {
                    color: #fff;
                }
            }
        }
    }
}
</style>

