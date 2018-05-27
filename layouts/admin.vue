<template>
    <div id="admin">
        <div class="topbar">
            <nuxt-link to="/blog" class="logo">
                <img src="~assets/img/admin/login_1.png" alt="">
            </nuxt-link>
            <div>
                <span @click="loginOut" class="loginOut">登 出</span>
            </div>
        </div>
        <div class="container">
            <div class="sidebar" :class="{'sidebar-mini':isminisidebar}">
                <li class="menu-top" @click="isminisidebar=!isminisidebar">
                    <i class="icon iconfont icon-category"></i>
                </li>
                <nuxt-link :to="n.path" class="menu-c" v-for="(n,i) in menuList" :key="i" @click="menuListActive=i" :class="[currentRoute==n.route?'active':'']">
                    <i class="icon iconfont" :class="[n.class_name,menuListActive==i?'active':'']"></i>
                    <span class="menu-name" v-show="!isminisidebar">{{n.name}}</span>
                </nuxt-link>
            </div>
            <div ref="adminContent" class="content">
                <nuxt/>
            </div>
        </div>

    </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      menuList: [
        {
          class_name: "icon-homepage",
          name: "首页",
          route: "",
          path: "/admin"
        },
        {
          class_name: "icon-document",
          name: "文章列表",
          route: "article",
          path: "/admin/article"
        },
        {
          class_name: "icon-supply",
          name: "其他",
          route: "other",
          path: "/admin/other"
        },
        {
          class_name: "icon-upload",
          name: "存储桶",
          route: "upload",
          path: "/admin/upload"
        },
        {
          class_name: "icon-setup",
          name: "设置",
          route: "setting",
          path: "/admin/setting"
        }
      ],
      isminisidebar: false,
      menuListActive: ""
    };
  },
  middleware: "userAuth",
  computed: {
    currentRoute: function() {
      let a = this.$route.name.split("-")[1]
        ? this.$route.name.split("-")[1]
        : "";
      return a;
    }
  },
  methods: {
    loginOut() {
      Cookie.remove("token");
      this.$router.replace("/admin/signin");
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
#admin {
  .topbar {
    position: fixed;
    left: 0;
    right: 0;
    height: 50px;
    background-image: url("~assets/img/admin/texture.png");
    background-color: #93b5cf;
    color: #fff;
    display: flex;
    .logo {
      width: 50px;
      background: #fff;
      img {
        width: 50px;
        height: 50px;
        display: block;
      }
    }
    .logo + div {
      padding-right: 20px;
      line-height: 50px;
      flex: 1;
      text-align: right;
    }
  }
  .container {
    position: absolute;
    top: 50px;
    bottom: 0;
    padding: 0;
    overflow-y: auto;

    width: 100vw;
    .sidebar {
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      color: #fff;
      width: 200px;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      background-color: #d4d6dc;
      text-align: center;
      transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
      &.sidebar-mini {
        width: 50px;
        transform: translate3d(0px, 0px, 0px);
        .menu-name {
          animation: fadeOut 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
          animation-fill-mode: forwards;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
      li.menu-top {
        background: #575f6f;
        height: 30px;
        line-height: 30px;
        border-bottom: 0;
        list-style: none;
        &:hover {
          background: #575f6f;
        }
      }
      .menu-c {
        list-style: none;
        background: #aeb3be;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        display: block;
        text-decoration: none;
        color: #fff;
        .menu-name {
          animation: fadeIn 1s cubic-bezier(0.4, 0.01, 0.165, 0.99);
          animation-fill-mode: forwards;
          display: inline-block;
          width: 100px;
          text-align: left;
        }
        &.active {
          background: #626c83;
          span {
            color: #fff;
          }
        }

        &:hover {
          background: #888fa0;
          span {
            color: #fff;
          }
        }
        span {
          margin-left: 10px;
          color: #fafafa;
          display: inline-block;
        }
      }
      .menu-c {
        .icon {
          font-size: 30px;
          vertical-align: sub;
        }
      }
    }
    .content {
      padding-left: 200px;
      background: #fafafa;
    }
  }
}
</style>
<style lang='scss'>
</style>

