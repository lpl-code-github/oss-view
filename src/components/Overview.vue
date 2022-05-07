<!--心跳检测及节点信息-->
<template>
  <div>
    <!-- 心跳检测echarts节点图 -->
    <div id="main" :style="styles"></div>
    <!-- 心跳检测列表数据 -->
    <div>
      <el-table
          :data="HeartbeatTableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
        <el-table-column
            prop="name"
            label="节点"
            width="180">
        </el-table-column>
        <el-table-column
            prop="value"
            label="IP"
            width="180">
        </el-table-column>
        <el-table-column
            :formatter="dateFormat"
            prop="date"
            label="实时心跳检测时间">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <temdplate slot-scope="scope">
            <el-button v-if="scope.row.state !=='故障'" @click="handleClick(scope.row)" type="text" size="small">
              查看节点系统信息
            </el-button>
            <el-button v-if="scope.row.state ==='故障'" disabled type="text" size="small">查看节点系统信息</el-button>
          </temdplate>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" :visible.sync="dialogTableVisible" width="100%" @close='closeDialog'>
        <div class="ui four statistics">
          <!--系统信息-->
          <div class="statistic">
            <div class="text value"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              系统信息</font></font><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            </font></font></div>
            <div class="label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              <div style="text-align: left;display: flex;justify-content: center;align-items: center;">
                内核版本: {{ systemStatus.systemInfo.kernelVersion }} <br>
                平台信息: {{ systemStatus.systemInfo.platform }} <br>
                OS Family: {{ systemStatus.systemInfo.osFamily }}<br>
                os版本: {{ systemStatus.systemInfo.osVersion }}<br>
              </div>
            </font></font></div>

          </div>

          <!--CPU信息-->
          <div class="statistic">
            <div class="text value"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              CPU</font></font><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            </font></font></div>
            <div class="label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              <div style="text-align: left;display: flex;justify-content: center;align-items: center;">
                物理核数: {{ systemStatus.cpu.physicalCnt }} <br>
                逻辑核数: {{ systemStatus.cpu.logicalCnt }} <br>
              </div>
            </font></font></div>

            <div class="progressBox">
              <Dashboard
                  type="dashboard"
                  :width="dashboardData.width"
                  :rate="dashboardData.rate"
                  :percentage="systemStatus.cpu.cpuTotalPercent"
                  :bgColor="dashboardData.bgColor"
                  :color="dashboardData.colors"
                  :stroke-width="dashboardData.strokeWidth"
                  :stroke-linecap="dashboardData.strokeLinecap"
              />
              <div class="labelBox">负载</div>
            </div>
          </div>

          <!--内存信息-->
          <div class="statistic">
            <div class="text value"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              内存</font></font><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            </font></font></div>
            <div class="label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              <div style="text-align: left;display: flex;justify-content: center;align-items: center;">
                总大小: {{ systemStatus.mem.total }} <br>
                可用大小: {{ systemStatus.mem.available }} <br>
              </div>
            </font></font></div>
            <div class="progressBox">
              <Dashboard
                  type="dashboard"
                  :width="dashboardData.width"
                  :rate="dashboardData.rate"
                  :percentage="systemStatus.mem.memTotalPercent"
                  :bgColor="dashboardData.bgColor"
                  :color="dashboardData.colors"
                  :stroke-width="dashboardData.strokeWidth"
                  :stroke-linecap="dashboardData.strokeLinecap"
              />
              <div class="labelBox">使用率</div>
            </div>
          </div>

          <!--硬盘信息-->
          <div class="statistic">
            <div class="text value"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              硬盘分区 {{ systemStatus.disk.path }} </font></font><br><font style="vertical-align: inherit;"><font
                style="vertical-align: inherit;">
            </font></font></div>
            <div class="label"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
              <div style="text-align: left;display: flex;justify-content: center;align-items: center;">
                分区总容量: {{ systemStatus.disk.total }} <br>
                空闲容量: {{ systemStatus.disk.free }} <br>
              </div>
            </font></font></div>
            <div class="progressBox">
              <Dashboard
                  type="dashboard"
                  :width="dashboardData.width"
                  :rate="dashboardData.rate"
                  :percentage="systemStatus.disk.usedPercent"
                  :bgColor="dashboardData.bgColor"
                  :color="dashboardData.colors"
                  :stroke-width="dashboardData.strokeWidth"
                  :stroke-linecap="dashboardData.strokeLinecap"
              />
              <div class="labelBox">使用率</div>
            </div>
            <span></span>
          </div>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard";

export default {
  name: 'Overview',
  components: {
    Dashboard
  },
  data() {
    return {
      index: 0,
      tableIndexFaultColor: [],// 故障节点
      styles: {
        width: '100%',
        height: "300px"
      },
      timer: null,
      myChart: null,
      links: [], // echarts 节点连接
      HeartbeatTableData: [],
      HeartbeatEChartsData: [], // echarts数据
      checks: null, // 检查
      title: '', // dialog的表头
      dialogTableVisible: false, // 查看节点系统信息的dialog
      systemStatus: {// 节点系统信息
        cpu: {
          physicalCnt: 0,
          logicalCnt: 0,
          cpuTotalPercent: 0
        },
        mem: {
          total: 0,
          available: 0,
          memTotalPercent: 0
        },
        disk: {
          path: "/",
          total: 0,
          used: 0,
          free: 0,
          usedPercent: 0
        },
        systemInfo: {
          kernelVersion: "",
          platform: "",
          osFamily: "",
          osVersion: ""
        }
      },
      dashboardData: { // 仪表盘
        width: 100,
        strokeLinecap: "square",
        strokeWidth: 10,
        rate: 0.75,
        percentage: 90,
        bgColor: "#cfcfcf",
        colors: [
          {color: "#5090FF", percentage: 20},
          {color: "#5090FF", percentage: 40},
          {color: "#5090FF", percentage: 60},
          {color: "#5090FF", percentage: 80},
          {color: "#5090FF", percentage: 100},
        ],
      },
      getNodeSystemInfoTimer: null,// 获取系统节点信息的定时器
    }
  },
  mounted() {
    this.getHeartbeat()
    this.checks = setInterval(this.check, 0);// 防止定时任务时间问题，再多跑一次执行检查
    this.timer = setInterval(this.getHeartbeat, 5000); //5秒去执行一次定时任务
  },
  beforeDestroy() {// 实例销毁时清除定时任务
    if (this.timer) { //如果定时器还在运行
      clearInterval(this.timer); //关闭
    }
    if (this.checks) { //如果定时器还在运行
      clearInterval(this.checks); //关闭
    }
  },
  methods: {
    // 获得心跳检测
    getHeartbeat() {
      this.$request.getHeartbeat().then(async val => {
        await this.splitData(val)// 组装数据
        this.check() // 检查是否有心跳失败节点
      })
    },

    // 组装echarts数据
     splitData(val) {
      let i = 1;
      this.links = [];
      this.HeartbeatTableData = []
      this.HeartbeatEChartsData = [{
        symbol: 'image://https://pic.imgdb.cn/item/6276198809475431298d85b6.png',
        name: "",
        value: "接口服务",
        x: 300,
        y: 0,
        colors: '#009991'
      }]
      for (let key in val) {
        let tableData = Object.create(null)
        let EChartsData = Object.create(null)
        let nodeLink = Object.create(null)

        tableData["name"] = "node" + i
        tableData["value"] = key
        tableData["date"] = val[key]
        tableData["state"] = "正常"

        EChartsData["symbol"] = 'image://https://pic.imgdb.cn/item/6276134a094754312978eea7.png'
        EChartsData["name"] = "node" + i
        EChartsData["value"] = key
        if (i % 2 === 0) {
          EChartsData["x"] = 700
          EChartsData["y"] = i * 100
        } else {
          EChartsData["x"] = -100
          EChartsData["y"] = (i + 1) * 100
        }
        EChartsData["colors"] = "#5470c6"


        nodeLink["source"] = ""
        nodeLink["target"] = "node" + i
        nodeLink["lineStyle"] = {}


        if (this.tableIndexFaultColor.indexOf(i - 1) !== -1) { //宕机
          EChartsData["colors"] = "#F72C5B"
          nodeLink["lineStyle"] = {
            color: "#F72C5B",
            type: 'dotted'
          }
        }

        this.HeartbeatTableData.push(tableData)
        this.HeartbeatEChartsData.push(EChartsData)
        this.links.push(nodeLink)
        this.HeartbeatEChartsData[0].y = (i * 100) / 2 + 100
        i++
      }
      this.styles.height = (i - 3) * 100
      this.echarts()
    },

    // 检查心跳失败的节点
    check() {
      this.tableIndexFaultColor = []
      this.HeartbeatTableData.map((item) => { // 获取时间小于当前时间10秒的,将节点添加到 故障节点
        var date1 = item.date;  //开始时间
        var date2 = new Date();    //结束时间
        var date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数
        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)

        if (seconds > 10) {
          // console.log(parseInt(item.name.charAt(item.name.length - 1)) - 1 + "应该变色")
          this.tableIndexFaultColor.push(parseInt(item.name.charAt(item.name.length - 1)) - 1)
          item.state = "故障"
        }
      })
    },

    // 心跳检测列表颜色状态的改变
    tableRowClassName({row, rowIndex}) {
      // 如果故障节点数组tableIndexFaultColor中存在行索引
      if (this.tableIndexFaultColor.indexOf(rowIndex) !== -1) {
        // 将该行列表设置为红色
        return 'warning-row';
      }
      // 正常节点为绿色
      return 'success-row';
    },

    // echarts节点图
    echarts() {
      if (this.myChart != null && this.myChart !== "" && this.myChart !== undefined) {
        this.myChart.dispose();
      }
      this.myChart = this.$echarts.init(document.getElementById('main'));
      // window.onresize = this.myChart.resize

      this.myChart.setOption({
        //animation:false,// 取消动画
        title: {
          text: '数据服务节点(Refresh every 5 seconds)'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            // roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: this.HeartbeatEChartsData.map((item) => {
              return {
                symbol: item.symbol,
                name: item.name,
                value: item.value,
                colors: item.colors,
                x: item.x,
                y: item.y
              }
            }),
            links: this.links.map((item) => {
              return {
                source: item.source,
                target: item.target,
                lineStyle: item.lineStyle
              }
            }),
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.2
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return params.data.colors; //获取具体的参数
                }
              }
            }
          }
        ]
      })

      // 让图表跟随屏幕自动的去适应
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },

    // 表格日期格式化
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        var date = new Date(daterc);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始，11结束，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
      }
    },

    // 获取节点信息按钮事件
    handleClick(row) {
      this.title = row.value + " 节点系统信息"
      this.getNodeSystemStatus(row) // 先执行一次
      this.getNodeSystemInfoTimer = setInterval(() => {
        this.getNodeSystemStatus(row)
      }, 5000); //5秒去执行一次定时任务
    },

    // 获取节点系统信息的数据
    getNodeSystemStatus(row) {
      this.$request.getNodeSystemInfo(row.value).then(val => {
        if (val.status === 200) {
          // 重新组装数据
          var info = val.data
          info.mem.total = this.conver(info.mem.total)
          info.mem.available = this.conver(info.mem.available)

          info.disk.total = this.conver(info.disk.total)
          info.disk.used = this.conver(info.disk.used)
          info.disk.free = this.conver(info.disk.free)

          this.systemStatus = info
          this.dialogTableVisible = true
        } else {
          this.dialogTableVisible = false
          this.$message.error("获取节点系统信息失败")
        }
      })
    },

    //关闭弹框的事件
    closeDialog() {
      this.dialogTableVisible = false
      if (this.getNodeSystemInfoTimer) { //如果定时器还在运行
        clearInterval(this.getNodeSystemInfoTimer); //关闭
      }
    },

    // B转KB、MB、GB其它单位
    conver(limit) {
      var size = "";
      if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else { //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

::v-deep .myText {
  font-weight: bolder;
  font-size: 20px !important;
  background-image: linear-gradient(0deg, #498dff, #8bb7fe);
}

.progressBox {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.labelBox {
  background: #4c8fff;
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  border-radius: 15px;
  margin-top: -20px;
}
</style>