<!-- 页面的主容器 -->
<template>
  <div class='console'>
    <el-container direction="vertical">
      <div class="header">
        <div class="header-left-box">
          <img src="../../assets/img/logo.png" alt="">
          <div style="font-size: 20px;color: #99a9bf"> LPL对象存储控制台</div>
        </div>
        <div style="font-size: 18px;color: #99a9bf;margin-right: 20px" @click="toHome">回到首页</div>
      </div>

      <el-header>
        <!--        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>-->
        <!--          <el-menu-item index="/overview">节点监控</el-menu-item>-->
        <!--          <el-menu-item index="/ossAdmin">对象管理</el-menu-item>-->
        <!--          <el-menu-item index="/system">系统维护</el-menu-item>-->
        <!--        </el-menu>-->

        <headers>
          <nav>
            <ul>
              <li >
                <router-link to="/overview"  class="active">节点监控</router-link>
              </li>
              <li>
                <router-link to="/ossAdmin">对象管理</router-link>
              </li>
              <li>
                <router-link to="/system">系统维护</router-link>
              </li>
            </ul>
          </nav>
        </headers>
      </el-header>

      <el-main style="padding: 20px 20px 20px 20px">
        <router-view></router-view>
      </el-main>


      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// 引入组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Overview from '@/components/Overview.vue'
import OssAdmin from '@/components/OssAdmin.vue'
import System from '@/components/System.vue'
import $ from 'jquery'

export default {
  name: 'console',
  components: {
    //组件名
    Header,
    Footer,
    Overview,
    OssAdmin,
    System
  },
  data() {
    return {
      // activeIndex: this.$route.path,
    }
  },
  computed: {},
  watch: {},

  methods: {
    toHome() {
      this.$router.push("/")
    }
  },
  created() {
  },
  mounted() {
    console.log(this.$route.path);

    var nav = $('nav');
    // nav.find('.active').removeClass('active');
    // $('router-link:first').addClass('active')
    // var nav = $('nav');
    nav.delegate('a', 'click', function (e) {
      nav.find('.active').removeClass('active');
      $(e.target).closest('a').addClass('active');
    })
  }
}
</script>

<style lang='less' scoped>
.console {
  min-height: 100vh;
  overflow: auto;
  background: #1A1E23;
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;

  .el-container.is-vertical {
    height: 100%;
  }
  .header {
    display: flex;
    align-items: center;
    color: whitesmoke;
    justify-content: space-between;
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;

    .header-left-box {
      margin: 10px 0px 20px 20px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }

      div {
        margin-left: 10px;
      }
    }
  }

  .el-header {
    //background-color: #1b1c1d;
    //background-color: white;
    //padding: 0px;
    //height: 50px !important;
    headers {
      background-color: #181a1b;
      border-radius: 90px;
      box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.05), inset 1px 1px 1px rgba(0, 0, 0, 0.3);
      left: 50%;
      max-width: 1000px;
      position: absolute;
      margin-top: 20px;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    nav {
      border-radius: 90px;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
      margin: 0.5em;
    }

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ul a {
      background-color: #35393b;
      color: #fff;
      display: block;
      line-height: 1em;
      padding: 1em;
      text-align: center;
      text-decoration: none;
      transition: all 100ms ease-out;
    }

    ul a:hover, ul a:active, ul a.active {
      background-color: #2ba6cb;
      box-shadow: inset 0 -0.3em 0 rgba(0, 0, 0, 0.3);
      margin-top: -0.3em;
      padding-bottom: 1.3em;
      position: relative;
    }

    ul a:hover:after, ul a:active:after, ul a.active:after {
      background-color: rgba(0, 0, 0, 0.05);
      border-bottom: 1px solid rgba(43, 166, 203, 0.7);
      bottom: -0.5em;
      content: "";
      display: block;
      left: 0;
      position: absolute;
      right: 0;
      top: 0.3em;
    }

    ul li {
      flex: 1;
    }

    ul li + li {
      box-shadow: -2px 0 0 rgba(0, 0, 0, 0.2), -1px 0 0 rgba(255, 255, 255, 0.15);
    }

    ul li:first-child a {
      border-top-left-radius: 90px;
      border-bottom-left-radius: 90px;
    }

    ul li:first-child a:hover:after, ul li:first-child a:active:after, ul li:first-child a.active:after {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      left: -0.5em;
    }

    ul li:last-child a {
      border-top-right-radius: 90px;
      border-bottom-right-radius: 90px;
    }

    ul li:last-child a:hover:after, ul li:last-child a:active:after, ul li:last-child a.active:after {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      right: -0.5em;
    }

    .el-container.is-vertical {
      height: 100%;
    }
  }

  .el-footer {
    //background-color: #1b1c1d;
    color: gray;
    //background-color: white;
    text-align: center;

    line-height: 50px;

    //height: 80px !important;
    //padding-top: 20px;
  }

  .el-main {

    margin-top: 10px;
    //background-color: white;
    color: #333;
    text-align: center;
    padding: 0;
    overflow-x: hidden;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
