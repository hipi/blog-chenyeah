module.exports = {
    head: {
        title: "羽叶のBlog",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content:
                    "initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
            },
            {
                name: "keywords",
                content:
                    "羽叶のBlog 羽叶丶 轻技术 重生活 个人博客 这是一个记录博主学习和成长的一个平台"
            },
            {
                hid: "description",
                name: "description",
                content:
                    "羽叶のBlog是一个轻技术、重生活的个人博客。自创建以来，一直致力并专注记录博主学习和成长，推动并帮助人们通过互联网分享知识学习，从而让更多人从中受益。我们的使命是分享与交流，用代码改变世界。"
            },
            {
                name: "renderer",
                content: "webkit"
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href:
                    "https://cdn.bootcss.com/prism/9000.0.1/themes/prism-tomorrow.min.css"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Open+Sans"
            },
            { rel: "stylesheet", href: "/css/reset.css" },
            { rel: "stylesheet", href: "/css/iconfont.css" }
        ],
        script: [
            {
                src:
                    "https://hm.baidu.com/hm.js?4acd4332b8b5641542150bb2453c8450"
            } /*引入百度统计的js*/
        ]
    },
    css: [
        // 加载一个 过渡 效果
        "~assets/css/transition.css"
    ],
    loading: { color: "#3cafff" },
    plugins: [
        { src: "~plugins/main", ssr: true },
        { src: "~plugins/marked", ssr: true },
        { src: "~plugins/utils", ssr: false },
        //{ src: "~plugins/pv", ssr: false },
        { src: "~plugins/baidupv", ssr: false }
    ],
    build: {
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
                const vueLoader = config.module.rules.find(
                    rule => rule.loader === "vue-loader"
                );
                vueLoader.options.loaders.less =
                    "vue-style-loader!css-loader!less-loader";
            }
        },
        vendor: ["marked", "js-cookie", "prismjs"],
        publicPath: "//cdn.chenyeah.com/blog/"
    },
    modules: ["@nuxtjs/axios"],
    axios: {
        proxy: true
    },

    proxy: {
        "/api/": {
            target: "http://api.chenyeah.com",
            pathRewrite: { "^/api/": "" }
        }
    }
};
