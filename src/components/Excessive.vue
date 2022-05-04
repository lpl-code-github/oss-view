<!--此组件为echarts过渡动画，用于首页跳转控制台-->
<template>
  <div style="width: 100%;height: 100%;margin: auto">
    <div class="excessive" id="tex" :style="styles"></div>
    <div class="excessive" id="loading" style="height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: 'Excessive',
  data() {
    return {
      styles: {
        width: '100%',
        height: "250px"
      },
      myChart1: null,
      myChart2: null,
      timer1: null,
      timer2: null
    }
  },
  mounted() {
    this.echarts2()// 先执行一次加载loading
    this.timer1 = setInterval(this.echarts1, 2000);//两秒后关闭loading，执行文字动画
    this.timer2 = setInterval(this.push, 5000);// 文字动画为3秒，连同加载loading共5秒后跳转到控制台
  },
  beforeDestroy() {// 实例销毁之前调用
    if (this.timer1) { //如果定时器还在运行 直接关闭
      clearInterval(this.timer1); //关闭
    }
    if (this.timer2) { //如果定时器还在运行 直接关闭
      clearInterval(this.timer2); //关闭
    }
  },
  methods: {
    // loading动画
    echarts2() {
      // 如果myChart2存在就先关闭
      if (this.myChart2 != null && this.myChart2 != "" && this.myChart2 != undefined) {
        this.myChart2.dispose();
      }
      // 渲染myChart2
      this.myChart2 = this.$echarts.init(document.getElementById('loading'))

      this.myChart2.setOption({
        graphic: {
          elements: [
            {
              type: 'group',
              left: 'center',
              top: 'center',
              children: new Array(7).fill(0).map((val, i) => ({
                type: 'rect',
                x: i * 20,
                shape: {
                  x: 0,
                  y: -40,
                  width: 10,
                  height: 80
                },
                style: {
                  fill: '#5470c6'
                },
                keyframeAnimation: {
                  duration: 1000,
                  delay: i * 200,
                  loop: true,
                  keyframes: [
                    {
                      percent: 0.5,
                      scaleY: 0.3,
                      easing: 'cubicIn'
                    },
                    {
                      percent: 1,
                      scaleY: 1,
                      easing: 'cubicOut'
                    }
                  ]
                }
              }))
            }
          ]
        }
      })

      // 让图表跟随屏幕自动的去适应
      window.addEventListener('resize',  ()=> {
        this.myChart2.resize()
      })
    },

    // 文字动画
    echarts1() {
      if (this.timer1) { //如果定时器还在运行
        clearInterval(this.timer1); //关闭
      }
      // 关闭myChart2
      this.myChart2.dispose();
      // 如果myChart1存在则关闭
      if (this.myChart1 != null && this.myChart1 != "" && this.myChart1 != undefined) {
        this.myChart1.dispose();
      }
      // 渲染myChart1
      this.myChart1 = this.$echarts.init(document.getElementById('tex'))

      this.myChart1.setOption({
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: 'Simple Distributed Object Storage',
                fontSize: 80,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 3000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: '#5470c6',
                      stroke: '#5470c6',
                    }
                  }
                ]
              }
            }
          ]
        }
      })

      // 让图表跟随屏幕自动的去适应
      window.addEventListener('resize',  ()=> {
        this.myChart1.resize()
      })
    },
    // 跳转控制台
    push() {
      this.$router.push("/console")
    }
  }
}
</script>

<style>
.excessive {
  width: 100px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>


