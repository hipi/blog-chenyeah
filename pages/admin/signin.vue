<template>
    <div id="signin">
        <div class="pop">
            <div class="pop-content">
                <div class="logo">
                    <img v-show="logoImg==1" src="~assets/img/admin/login_1.png" alt="logo">
                    <img v-show="logoImg==2" src="~assets/img/admin/login_2.png" alt="logo">
                    <img v-show="logoImg==3" src="~assets/img/admin/login_3.png" alt="logo">
                </div>
                <form>
                    <div class="pop-input">
                        <div>
                            <span>用户名</span>
                            <div>
                                <input @focus="logoImg=2" @blur="logoImg=1" v-model="user" type="text" autocomplete="off">
                            </div>

                        </div>
                        <div>
                            <span>密码</span>
                            <div>
                                <input @focus="logoImg=3" @blur="logoImg=1" v-model="password" type="password" autocomplete="off">
                            </div>

                        </div>
                    </div>
                    <button type="submit" @click.prevent="login({user, password} )" class="pop-signin">登 录</button>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import Cookie from "js-cookie";
import axios from "axios";
export default {
    data() {
        return {
            logoImg: 1,
            redirectURL: "/",
            user: "",
            password: ""
        };
    },
    computed: {},
    mounted() {
        let rediretUrl = this.$route.query.ref;
        if (rediretUrl) {
            this.redirectURL = rediretUrl;
        }
        // Cookie.remove("token");
    },
    methods: {
        login({ user, password }) {
            axios
                .post("https://api.yuyehack.cn/blog/user/sign_in.php", {
                    user,
                    password
                })
                .then(res => {
                    if (res.data.code == 0) {
                        //将服务端的token存入cookie当中
                        Cookie.set("token", res.data.token, { expires: 7 });
                        //返回上一页
                        this.$router.replace(this.redirectURL);
                    } else {
                        alert(res.data.msg);
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
#signin {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .pop {
        max-width: 432px;
        background: #fff;
        /* min-width: 330px; */
        margin: 0 40px;
        width: 100%;

        .pop-content {
            .logo {
                height: 274px;
                padding: 30px 40px 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    display: block;
                    max-width: 100%;
                }
            }
            .pop-input {
                padding: 0 40px 10px;
                > div {
                    display: flex;
                    height: 48px;
                    border-bottom: 1px solid #ebebeb;
                    line-height: 48px;
                    align-items: center;
                    span {
                        display: inline-block;
                        width: 100px;
                        height: 30px;
                        line-height: 30px;
                        color: #77839c;
                        border-right: 1px solid #ebebeb;
                    }
                    input {
                        background: transparent;
                        border: none;
                        outline: none;
                        resize: none;
                        height: 48px;
                        padding: 0 20px;
                        width: 100%;
                    }
                }
            }
            .pop-signin {
                width: 100%;
                background: #0084ff;
                border: 1px solid #0084ff;
                color: #fff;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>

