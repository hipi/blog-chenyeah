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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    .pop {
        /* min-width: 330px; */
        margin: 0 40px;
        max-width: 432px;
        width: 100%;
        background: #fff;

        .pop-content {
            .logo {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 30px 40px 10px;
                height: 274px;
                img {
                    display: block;
                    max-width: 100%;
                }
            }
            .pop-input {
                padding: 0 40px 10px;
                > div {
                    display: flex;
                    align-items: center;
                    height: 48px;
                    border-bottom: 1px solid #ebebeb;
                    line-height: 48px;
                    span {
                        display: inline-block;
                        width: 100px;
                        height: 30px;
                        border-right: 1px solid #ebebeb;
                        color: #77839c;
                        line-height: 30px;
                    }
                    input {
                        padding: 0 20px;
                        width: 100%;
                        height: 48px;
                        outline: none;
                        border: none;
                        background: transparent;
                        resize: none;
                    }
                }
            }
            .pop-signin {
                width: 100%;
                height: 60px;
                border: 1px solid #0084ff;
                background: #0084ff;
                color: #fff;
                text-align: center;
                font-size: 20px;
                line-height: 60px;
                cursor: pointer;
            }
        }
    }
}
</style>

