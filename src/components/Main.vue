<!-- 首页 -->
<template>
  <div>
    <div class="main">
      <div class="header">
        <Header></Header>
      </div>
      <div class="title">Simple Distributed Object Storage</div>
      <div class="sub-title">
        基于Golang实现的一个简单的分布式对象存储<span class="caret"></span>
      </div>
      <div class="wave1"></div>
      <div class="wave2"></div>
      <div>
        <el-button class="to-btn" type="primary" @click="toConsole">进入控制台</el-button>
        <el-button class="to-btn" type="primary" @click="toDoc">帮助文档</el-button>
      </div>
    </div>
    <!-- 首页内容组件 -->
    <Content></Content>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Main",
  components: {
    Content,
    Header
  },
  data() {
    return {
      size: "40%"
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    // 跳转到excessive过渡动画
    toConsole() {
      this.$router.push("/excessive")
    },
    // 跳转到文档链接
    toDoc() {
      window.open("http://localhost:8080", '_blank')
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;

  .title {
    margin-top: 20px;
    font-size: 35px;
  }

  /deep/ .divider1 {
    margin-top: 10px;
  }

  /deep/ .divider2 {
    margin-top: 50px;
  }

  .to-btn {
    margin-top: 50px;
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    border: 0.1rem white solid;
    font-weight: 800;
  }

  .to-btn:hover {
    background-color: white;
    color: black;
  }

  .caret {
    animation-name: flash;
    width: 4px;
    height: 20px;
    background-color: #fff;
    margin-left: 5px;
    // margin-bottom: 12px;
    animation-duration: 3s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    display: inline-block;
    vertical-align: bottom;
  }

  @keyframes flash {
    from,
    50%,
    to {
      opacity: 1;
    }

    25%,
    75% {
      opacity: 0;
    }
  }

  .wrapper {
    position: absolute;
    width: 100px;
    bottom: 150px;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 26px;
    z-index: 100;
  }

  .wrapper i {
    font-size: 60px;
    opacity: 0.5;
    cursor: pointer;
    position: absolute;
    top: 55px;
    left: 20px;
    animation: opener 0.5s ease-in-out alternate infinite;
    transition: opacity 0.2s ease-in-out, transform 0.5s ease-in-out 0.2s;
  }

  .wrapper i:hover {
    opacity: 1;
  }

  .sub-title {
    font-size: 15px;
    margin: 30px 10px 0px 10px;
  }

  .wave1,
  .wave2 {
    position: absolute;
    bottom: 0;
    transition-duration: 0.4s, 0.4s;
    z-index: 80;
  }

  .wave1 {
    background: url("https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/wave1.png") repeat-x;
    height: 75px;
    width: 100%;
    animation-name: flash;
    animation-duration: 10s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    display: inline-block;
    vertical-align: bottom;
  }

  .wave2 {
    background: url("https://cdn.jsdelivr.net/gh/yoyling/JsDelivr/bg/wave2.png") repeat-x;
    height: 90px;
    width: calc(100% + 100px);
    left: -100px;
    animation-name: flash;
    animation-duration: 5s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    display: inline-block;
    vertical-align: bottom;
  }
}

// PC
@media only screen and (min-width: 768px) {
  .main {
    width: 100%;
    height: 60vh;
    line-height: 20px;
    background: url(../assets/img/bak.jpg) no-repeat;
    background-size: 100% 100%;
    object-fit: contain;

    .header {
      top: 0;
      position: absolute;
      width: 100%;
      padding: 20px 150px;
    }
  }
}

// 移动端
@media only screen and (max-width: 768px) {
  .main {
    width: 100%;
    height: 60vh;
    background: url(../assets/img/bak.jpg) no-repeat;
    background-size: -100% 100%;
    line-height: 50px;
    object-fit: contain;

    .header {
      top: 0;
      position: absolute;
      width: 100%;
      padding: 20px 40px;
    }
  }
}
</style>
