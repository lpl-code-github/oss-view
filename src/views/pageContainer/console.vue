<!-- 页面的主容器 -->
<template>
  <div class='console'>
    <el-container>
      <div class="header">
        <div class="header-left-box">
          <img src="../../assets/img/logo.png" alt="">
          <div style="font-size: 20px;color: #99a9bf"> LPL对象存储控制台</div>
        </div>
        <div style="font-size: 18px;color: #99a9bf;margin-right: 20px" @click="toHome">回到首页</div>
      </div>

      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/overview">节点监控</el-menu-item>
          <el-menu-item index="/ossAdmin">对象管理</el-menu-item>
          <el-menu-item index="/system">系统维护</el-menu-item>
        </el-menu>
      </el-header>

      <el-main style="padding: 20px 20px 20px 20px">
        <router-view></router-view>
      </el-main>

      <el-divider></el-divider>   <!--   分割线   -->

      <el-footer>
        <Footer style="background-color: white"></Footer>
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
      activeIndex: this.$route.path,
    }
  },
  computed: {},
  watch: {},

  methods: {
    toHome() {
      this.$router.push("/")
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang='less' scoped>
.console {
  height: 100%;
  overflow: auto;

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
      margin: 10px 0px 0px 40px;
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

  .el-container.is-vertical {
    height: 100%;
  }

  .el-header {
    //background-color: #1b1c1d;
    background-color: white;
    //padding: 0px;
    height: 50px !important;

  }

  .el-footer {
    //background-color: #1b1c1d;
    color: gray;
    background-color: white;
    text-align: center;

    line-height: 20px;
    /* height: 80px !important; */
    //padding-top: 20px;
  }

  .el-main {
    margin-top: 10px;
    background-color: white;
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
