import Cookie from "js-cookie"
import axios from "axios"
//获取服务端cookie
let getcookiesInServer = req => {
    let service_cookie = {}
    req &&
        req.headers.cookie &&
        req.headers.cookie.split(";").forEach(function(val) {
            let parts = val.split("=")
            service_cookie[parts[0].trim()] = (parts[1] || "").trim()
        })
    return service_cookie
}
//获取客户端cookie
let getcookiesInClient = key => {
    return Cookie.get(key) ? Cookie.get(key) : ""
}
export default function({ route, req, res, redirect }) {
    let isClient = process.client
    let isServer = process.server
    let redirectURL = "/admin/signin"
    var token, path
    //在服务端
    if (isServer) {
        let cookies = getcookiesInServer(req)
        path = req.originalUrl
        token = cookies.token ? cookies.token : ""
    }
    //在客户端判读是否需要登陆
    if (isClient) {
        token = getcookiesInClient("token")
        path = route.path
    }

    if (path) {
        redirectURL = "/admin/signin?ref=" + encodeURIComponent(path)
    }

    //需要进行权限判断的页面开头

    return new Promise((resolve, reject) => {
        if (token) {
            axios
                .post("https://api.chenyeah.com/blog/user/is_sign_in.php", {
                    token
                })
                .then(res => {
                    res.data.code != 0 && redirect(redirectURL)
                    resolve()
                })
        } else {
            redirect(redirectURL)
            resolve()
        }
    })
}
