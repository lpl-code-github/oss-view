<!--对象管理-->
<template>

  <div class="ossadmin">

    <!-- 查找 and 上传-->
    <div class="ui  placeholder segment" style="background-color: transparent">
      <div class="ui two column stackable center aligned grid">
        <div class="ui inverted vertical divider">Or</div>
        <div class="middle aligned row">
          <div class="column">
            <div class="ui inverted icon header">
              <i class="search icon"></i>
              <div class="wrapper-header">
                <span>S</span>
                <span>e</span>
                <span>a</span>
                <span>r</span>
                <span>c</span>
                <span>h</span>
                &nbsp;
                <span>O</span>
                <span>b</span>
                <span>j</span>
                <span>e</span>
                <span>c</span>
                <span>t</span>
              </div>
            </div>
            <div class="field">
              <div class="ui search">
                <div class="ui icon input">
                  <!--搜索输入框-->
                  <input v-model.trim="content" @input="getObjList(content,1)" class="prompt" type="text"
                         placeholder="Input Object Name">
                  <i class="search icon"></i>
                </div>
                <div class="results"></div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="gradient">
              <el-upload
                  weight="100%"
                  ref="upload"
                  action=""
                  class="upload-demo"
                  drag
                  :http-request="uploadRequest"
                  multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text" style="color: #d8cccc">拖拽或<em>点击上传</em></div>
              </el-upload>
            </div>

            <div style="display: flex;align-items: center;justify-content: space-evenly;margin-top: 10px">
              <span v-if="uploadProgressShow" :style="{'width': (uploadSliceFlag? '20%':'15%')}"><span
                  v-if="uploadSliceFlag">分片</span>上传进度：</span>
              <el-progress v-if="uploadProgressShow" :style="{'width': (uploadSliceFlag? '80%':'85%')}"
                           :text-inside="true"
                           :stroke-width="15"
                           :percentage="progressPercent"></el-progress>
              <span v-if="hashProgressShow" style="width:20%">上传前准备工作：</span>
              <el-progress v-if="hashProgressShow" style="width:80%" :text-inside="true"
                           :stroke-width="15"
                           :percentage="hashProgressPercent"></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  对象信息列表  -->
    <table class="ui seven column  selectable inverted table" style="margin-top: 10px">
      <thead>
      <tr>
        <th class="two wide"><font style="vertical-align: inherit;"><font
            style="vertical-align: inherit;">对象名称</font></font>
        </th>
        <th class="two wide"><font style="vertical-align: inherit;"><font
            style="vertical-align: inherit;">版本号</font></font>
        </th>
        <th class="two wide"><font style="vertical-align: inherit;"><font
            style="vertical-align: inherit;">大小</font></font>
        </th>
        <th class="five wide"><font style="vertical-align: inherit;"><font
            style="vertical-align: inherit;">对象散列值</font></font>
        </th>
        <th class="two wide" style="text-align: center"><font style="vertical-align: inherit;"><font
            style="vertical-align: inherit;">操作</font></font>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="tableData.length === 0">
        <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          暂无数据
        </font></font>
        </td>
      </tr>

      <tr v-for="(item,index) in tableData.Data" :key="index">
        <td>
          <span
              style="max-width: 200px;word-break:normal;width:auto;display:block;white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">{{item.Name}}</span>
        </td>
        <td class="single line">
          {{ item.Version }}
          <div style="display:inline-block;margin-left: 5px" v-if="item.Size === '0B'">
            <el-tooltip class="item" effect="dark"
                        content="包含此标签代表对象该版本为删除标记，但仍可以查看历史版本"
                        placement="left-start">
              <el-tag size="mini" style="background-color: #7c7b7b;border: #848181;color: #ffffff">
                <i class="el-icon-delete"></i>
              </el-tag>
            </el-tooltip>
          </div>
        </td>
        <td class="single line"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
          {{ (item.Size !== '0B' ? item.Size : '/') }}
        </font></font>
        </td>

        <td>
          <span
              style="max-width: 400px;word-break:normal;width:auto;display:block;white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">{{(item.Size !== '0B' ? item.Hash : '/') }}</span>
        </td>

        <td style="display: grid;place-items: center;width: 100%">
          <!--          <el-button-->
          <!--              class="button el-buttons"-->
          <!--              size="mini"-->
          <!--              @click="handleDownload(index, item)"-->
          <!--              v-if="item.Size !== '0B'">-->
          <!--            <button class="ui mini teal button" style="margin: 0"><font style="vertical-align: inherit;"><font-->
          <!--                style="vertical-align: inherit;">-->
          <!--              <i class="download icon"></i>最新版本-->
          <!--            </font></font></button>-->
          <!--          </el-button>-->
          <!--          &lt;!&ndash;紧随其下的el-button只有在当行中Size=0时才显示，为禁用状态 &ndash;&gt;-->
          <!--          <el-button-->
          <!--              class="button el-buttons"-->
          <!--              size="mini"-->
          <!--              @click="handleDownload(index, item)"-->
          <!--              v-if="item.Size === '0B'"-->
          <!--              disabled>-->
          <!--            <button class="ui mini disabled button" style="margin: 0;background-color: #ede9e9;">-->
          <!--              <font style="vertical-align: inherit;"><font-->
          <!--                  style="vertical-align: inherit;">-->
          <!--                <i class="download icon"></i>最新版本-->
          <!--              </font></font></button>-->
          <!--          </el-button>-->
          <!--          <el-button-->
          <!--              class="button el-buttons"-->
          <!--              size="mini"-->
          <!--              @click="handAll(index, item)">-->
          <!--            <button class="ui mini primary button" style="margin: 0"><font style="vertical-align: inherit;"><font-->
          <!--                style="vertical-align: inherit;">-->
          <!--              <i class="server icon"></i>历史版本-->
          <!--            </font></font></button>-->
          <!--          </el-button>-->
          <!--          <el-button-->
          <!--              size="mini"-->
          <!--              type="danger"-->
          <!--              @click="handleDelete(index, item)"-->
          <!--              v-if="item.Size !== '0B'">-->
          <!--            <i class="trash alternate icon"></i><span style="font-weight:900">删除</span>-->
          <!--          </el-button>-->
          <!--          &lt;!&ndash;紧随其下的el-button只有在当行中Size=0时才显示，为禁用状态 &ndash;&gt;-->
          <!--          <el-button-->
          <!--              size="mini"-->
          <!--              style="background-color: #f5f5f5;color: #C0C4CC;border: transparent 0px dashed;"-->
          <!--              @click="handleDelete(index, item)"-->
          <!--              v-if="item.Size === '0B'"-->
          <!--              disabled>-->
          <!--            <i class="trash alternate icon"></i><span style="font-weight:600">删除</span>-->
          <!--          </el-button>-->
          <div class="multi-button">
            <button @click="handleDownload(index, item)" :disabled="(item.Size === '0B'? true:false)" :style="(item.Size === '0B'? 'opacity: 0.6;cursor:not-allowed;':'')" >
              <i class=" download icon"></i>
              <div class="animate-normal ">下载最新版本</div>
            </button>
            <button @click="handAll(index, item)">
              <i class=" server icon"></i>
              <div class="animate-normal ">查看历史版本</div>
            </button>
            <button @click="handleDelete(index, item)" :disabled="(item.Size === '0B'? true:false)" :style="(item.Size === '0B'? 'opacity: 0.6;cursor:not-allowed;':'')">
              <i class=" trash alternate icon"></i>
              <div class="animate-normal ">删除</div>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>


    <!--
   分页组件
     1、在列表数据objDataSize长度为0的时候不显示
     2、约定每页显示5条
     3、总条数total为 objDataSize
     4、切换页码的函数为handleCurrentChange
 -->
    <el-pagination
        v-if="tableData.length !==0 & tableData.Size!==0"
        :page-size="5"
        :pager-count="11"
        background
        :current-page="1"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="tableData.Size">
    </el-pagination>

    <!--查看某个对象历史版本的抽屉组件-->
    <el-drawer
        ref="upload"
        size="50%"
        title="全部版本"
        :with-header="false"
        :visible.sync="drawer">
      <p style="text-align: center;margin: 20px;font-size: 16px;color: gray">[ {{ objName }} ] 历史版本</p>
      <!--抽屉中是table组件-->
      <el-table
          :data="othersVersion"
          style="width: 100%">
        <el-table-column
            label="版本"
            width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.Version }}</span>
            <!--紧随其下的div只有在当行中Size=0时才显示 -->
            <div style="display:inline-block;margin-left: 5px" v-if="scope.row.Size === '0B'">
              <el-tooltip class="item" effect="dark"
                          content="包含此标签代表对象该版本为删除标记，但仍可以查看历史版本"
                          placement="left-end">
                <el-tag size="mini" type="danger">
                  <i class="el-icon-delete"></i>
                </el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="大小"
            width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.Size != '0B'">{{ scope.row.Size }}</span>
            <!--紧随其下的span只有在当行中Size=0时才显示 -->
            <span v-if="scope.row.Size === '0B'"> / </span>
          </template>
        </el-table-column>
        <el-table-column
            label="散列值">
          <template slot-scope="scope">
            <span>{{ scope.row.Hash }}</span>
            <!--紧随其下的span只有在当行中Size=0时才显示 -->
            <span v-if="scope.row.Size === '0B'"> / </span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button
                class="button el-buttons"
                size="mini"
                @click="handleDownloadOther(scope.$index, scope.row)"
                v-if="scope.row.Size !== '0B'">
              <button class="ui mini teal button" style="margin: 0"><font style="vertical-align: inherit;"><font
                  style="vertical-align: inherit;">
                <i class="download icon"></i>下载
              </font></font></button>
            </el-button>
            <!--紧随其下的el-button只有在当行中Size=0时才显示，为禁用状态 -->
            <el-button
                class="button el-buttons"
                size="mini"
                v-if="scope.row.Size === '0B'"
                disabled>
              <button class="ui mini disabled button" style="margin: 0;background-color: #ede9e9;"><font
                  style="vertical-align: inherit;"><font
                  style="vertical-align: inherit;">
                <i class="download icon"></i>下载
              </font></font></button>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js/crypto-js'
import fileDownload from 'js-file-download';

export default {
  name: 'OssAdmin',
  data() {
    return {
      objName: "",// 某行操作按钮点击时获取的对象name
      content: "",// 搜索框
      progressPercent: 0, // 上传进度条默认为0
      uploadProgressShow: false, // 上传进度条默认不显示
      hashProgressShow: false,// 计算hash进度条默认不显示
      uploadSliceFlag: false,// 分片 默认不显示
      drawer: false, // 其它版本的抽屉 是否显示flag
      tableData: [], // 全部对相列表 表格数据
      othersVersion: [], // 单个对象全部版本 表格数据
      bytesPerPiece: 5242880, // 约定每个切片的长度
      // bytesPerPiece: 32000, // 约定每个切片的长度
      hashProgressPercent: 0,//计算hash进度
      notification: null,// 计算hash消息通知默认不关闭
    }
  },
  mounted() {
    console.log()
    this.content = "" //加载组件时，搜索框内容为空
    this.getObjList(this.content, 1) // 默认获取第一页数据
  },
  methods: {
    // 上传对象
    async uploadRequest(param) {
      this.progressPercent = 0// 上传新文件时，将进度条值置为零
      if (param.file.size > 104857600) { //大于100M显示hash计算进度和弹窗
        this.hashProgressPercent = 0 // 进度条为0
        this.hashProgressShow = true // 进度条显示
        this.notification = this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `文件有点大，计算hash过程可能比较长～`,
          duration: 0,
          showClose: false
        });
      }

      // 获取对象hash值的base64编码值
      let hash = "";
      hash = await this.getFileHash(param);
      this.hashProgressShow = false

      setTimeout(() => { // 成功获取hash值后
        if (this.notification !== null) {
          this.notification.close() // 关闭通知
        }
      }, 1000);

      // 进度条
      const uploadProgressEvent = progressEvent => {
        this.progressPercent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      }

      if (param.file.size <= 52428800) { // 50mb 以下 普通上传;以上 分片上传
        this.uploadSliceFlag = false // 不显示分片二字
        this.uploadProgressShow = true // 显示进度条
        this.uploadObj(param, hash, uploadProgressEvent)// 普通上传
      } else {
        // 判断sessionStorage中有没有hash对应的token
        var sessionToken = sessionStorage.getItem(hash);
        if (sessionToken === null) { // 如果sessionStorage中没有token
          this.$message.info("文件大小超过50MB，将分片上传，请稍候")
          // 发送分片上传请求
          this.$request.getSliceUploadToken(param.file.name, hash, param.file.size).then(val => {
            if (val.status === 201) {  // 201表示token创建成功
              var token = val.headers.location // 保存token
              // 文件切片上传
              this.uploadSliceFlag = true // 显示分片二字
              this.uploadProgressShow = true // 显示进度条
              this.uploadSlice(param, token, hash)
            } else if (val.status === 200) { // 200表示hash已存在，直接显示已上传，新增版本
              this.uploadSliceFlag = true // 显示分片二字
              this.uploadProgressShow = true // 显示进度条
              this.progressPercent = 100 // 进度条拉到100

              setTimeout(() => {
                this.progressPercent = 0 // 进度条归0
                this.uploadProgressShow = false // 关闭进度条
                this.$message.success("上传成功")
                this.getObjList(this.content, 1)
              }, 2000);
            } else {
              this.$message.error("获取token失败")
            }
          })
        } else { // 如果有，使用上传失败的token继续上传
          await this.uploadSlice(param, sessionToken, hash)
        }
      }
    },

    // 分片读取文件 增量计算hash值，并base64编码
    async getFileHash(param) {
      let sha256 = CryptoJS.algo.SHA256.create();
      const sliceSize = 10_485_760; // 10 MiB
      let start = 0;

      while (start < param.file.size) {
        this.hashProgressPercent = Math.floor((100 / param.file.size) * start)
        const slice = await this.readSlice(param.file, start, sliceSize);
        const wordArray = CryptoJS.lib.WordArray.create(slice);
        sha256 = sha256.update(wordArray);
        start += sliceSize;
      }

      sha256.finalize();
      var hash = sha256._hash.toString()
      // console.log("js计算sha256值：" + hash)
      var hashValue = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(hash));
      // console.log("散列值的base64编码" + hashValue)
      return hashValue;
    },

    async readSlice(file, start, size) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const slice = file.slice(start, start + size);

        fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(slice);
      });
    },

    // 文件普通上传
    uploadObj(param, hash, uploadProgressEvent) {
      this.$request.uploadObj(param.file.name, param.file, hash, uploadProgressEvent).then(val => {
        if (val.status === 200) {
          this.$message.success("上传成功")
        } else {
          this.$message.error("上传失败")
        }
      }).finally(() => {
        // 延时2秒刷新对象列表，并将对象进度条清0
        setTimeout(() => {
          this.progressPercent = 0 // 进度条归0
          this.uploadProgressShow = false // 关闭进度条
          this.getObjList(this.content, 1)
        }, 2000);
      })
    },

    // 分片上传
    async uploadSlice(param, token, hash) {
      var start = parseInt(await this.headUploadSliceProgress(token)) // 分片起点
      if (start === -1) { // -1代表查看分片起点的请求失败
        return
      }
      var lastSlice = (param.file.size - start) <= this.bytesPerPiece // 最后一个分片标记

      var end = start + this.bytesPerPiece// 分片终点
      // 请求头部range
      var range = 'bytes=' + start + '-' + end
      if (lastSlice) { // 如果是最后一个分片
        range = 'bytes=' + start + '-'
      }
      // 文件分片
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice; // 兼容方式获取slice方法
      var chunk_file = blobSlice.call(param.file, start, end);

      // 发送上传请求
      this.$request.uploadSlice(token, chunk_file, range).then(val => {
        if (val.status === 200) {
          this.progressPercent = Math.floor((100 / param.file.size) * start)
          if (lastSlice) { // 最后一个分片上传成功
            // 循环结束提示上传成功 进度条=100
            this.progressPercent = 100
            this.$message.success("上传成功")
            // 最后进度条清零，重新获取对象列表
            setTimeout(() => {
              if (sessionStorage.getItem(hash) !== null) {
                sessionStorage.removeItem(hash)
              }
              this.progressPercent = 0 // 进度条归0
              this.uploadProgressShow = false // 关闭进度条
              this.getObjList(this.content, 1)
            }, 2000);
          } else { // 不是最后一个分片，递归调用uploadSlice方法
            this.uploadSlice(param, token)
          }
        } else {
          // 上传过程中出现错误 给出错误提示，并且保存token到sessionStorage中
          this.$message.error("上传错误，请重新上传")
          sessionStorage.setItem(hash, token)
        }
      })
    },

    // 检查上传进度
    async headUploadSliceProgress(token) {
      var start = 0
      await this.$request.headUploadSliceProgress(token).then(val => {
        if (val.status === 200) {
          start = val.headers['content-length']// 长度
        } else {
          this.$message.error("检查进度失败")
          start = -1
        }
      })
      return start
    },

    // 下载对象最新版本
    handleDownload(index, row) {
      this.$request.getObj(row.Name).then(val => {
        console.log(val)
        if (val.status == 200) {
          fileDownload(val.data, row.Name);
        } else {
          this.$message.error("下载失败，对象不存在或者可能已经丢失")
        }
      })
    },

    // 下载对象其它版本
    handleDownloadOther(index, row) {
      this.$request.getObj(this.objName + "?version=" + row.Version).then(val => {
        if (val.status == 200) {
          fileDownload(val.data, row.Name);
        } else {
          this.$message.error("下载失败，对象不存在或者可能已经丢失")
        }
      })
    },

    // 获取全部版本列表
    handAll(index, row) {
      this.othersVersion = []
      this.objName = row.Name
      this.$request.getObjOtherLists(row.Name).then(val => {
        if (val.status == 200) {
          for (let valKey in val.data) {
            val.data[valKey].Size = this.conver(val.data[valKey].Size)
          }
          this.othersVersion = val.data
        } else {
          this.$message.error("获取其他版本失败")
        }
      }).finally(() => {
        // 请求成功才打开抽屉
        this.drawer = true
      })
    },

    // 删除对象
    handleDelete(index, row) {
      // 再次提示
      this.$confirm('此操作不会永久删除您的对象文件，会保留版本元数据，除非元数据消失，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //如果点击确定
        this.$request.deleteObj(row.Name).then(val => {
          if (val.status == 200) {
            this.$message.success("删除成功")
          } else {
            this.$message.success("删除失败")
          }
        }).finally(() => {
          // 发送请求后重新获取全部对象列表数据
          setTimeout(() => {
            this.getObjList(this.content, 1)
          }, 2000);
        })
      }).catch(() => { // 如果点击取消
        this.$message.info('已取消删除');
      });
    },

    //分页切换函数
    handleCurrentChange(val) {    //分页的点击函数current-change，在currentPage 改变时会触发
      this.getObjList(this.content, val)
    },

    // 获得全部对象列表
    getObjList(name, page) {
      this.$request.getObjLists(name + "?page=" + page).then(val => {
        if (val.status === 200) {
          // 把接口数据中的size单位B重新设置为KB、MB、GB等单位
          for (let valKey in val.data.Data) {
            val.data.Data[valKey].Size = this.conver(val.data.Data[valKey].Size)
          }
          this.tableData = val.data
        } else {
          this.$message.error("获取对象列表失败")
        }
      })
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

.ossadmin {
  width: 100%;
  height: 100%;
}

.gradient, .upload-demo {
  --border-width: 2px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 170px;
  font-family: Lato, sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: white;
  background: #1A1E23;
  border-radius: 20px;
}

.gradient {
  z-index: 1;
  margin: 0 auto;
}

.upload-demo::after {
  position: absolute;
  content: "";
  top: calc(-1 * 2px);
  left: calc(-1 * 2px);
  z-index: -1;
  width: calc(100% + 2px * 2);
  height: calc(100% + 2px * 2);
  background-size: 300% 300% !important;
  background: linear-gradient(60deg, #a19e9e, #8e8c8c, #6c6b6b, #4d4c4c, #f9f7f7, #a19e9e, #d8cccc, #b0adad) 0 50%;
  border-radius: 20px;
  animation: moveGradient 5s alternate infinite;
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}

.button {
  padding: 0;
  background-color: transparent;
  border: transparent 0px dashed;
}

.el-buttons:active {
  background: transparent !important;
  font-weight: bold;
}

/*按钮悬浮*/
.el-buttons:hover {
  background: transparent !important;
  color: white !important;
  font-weight: bold;
  border-color: transparent !important;
}

/*按钮点击*/
.el-buttons:focus {
  background: transparent !important;
  color: white !important;
  font-weight: bold;
  border-color: transparent !important;
}

.ui.icon.header .icon {
  margin: 1px !important;
}

.el-upload-dragger {
  border: 0px dashed #838181;
  background-color: transparent;
  border-radius: 30px;
}

.multi-button {
  display: flex;
  width: 100%;
  padding: 8px 10px;
  border-radius: 50px;
  background: rgba(0,0,0,.15);
  /*border: 0.5px solid rgba(146, 152, 176, 0.4);*/
  background: linear-gradient(60deg, #8d8b8b, #807e7e, #a9a5a5, #716e6e) 0 50% ;
  box-shadow: 0 0 10px rgba(200, 203, 217, 0.2), 4px 4px 10px rgba(113, 119, 144, 0.2);
  cursor: default;
}

.multi-button button {
  width: calc(100% / 3);
  border: 0 solid transparent;
  background: transparent;
  padding: 10px 30px;
  /*margin: 0 -2px;*/
  /*color: #114cce;*/
  font-size: 18px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  outline: none;
  transition: background 0.2s ease-in-out;
}

.multi-button button:first-child {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}

.multi-button button:last-child {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}

.multi-button button div {
  position: absolute;
  top: -43px;
  left: calc(50% - 60px);
  width: 130px;
  font-size: 15px;
  color: #fff;
  background: rgba(63, 64, 68, 0.8);
  border-radius: 16px;
  line-height: 30px;
  font-family: "Raleway", Arial, sans-serif;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: 0 0 5px rgba(39, 48, 68, 0.3), 1px 1px 5px rgba(39, 48, 68, 0.2);
  display: none;
  cursor: pointer;
}

.multi-button button:hover {
  background: #c3c3c7;
}

.multi-button button:hover div {
  display: block;
  animation: tooltip-animation-normal 0.3s ease-out forwards;
}

.multi-button button:hover div.animate-right {
  animation: tooltip-animation-right 0.3s ease-out forwards;
}

.multi-button button:hover div.animate-left {
  animation: tooltip-animation-left 0.3s ease-out forwards;
}

.multi-button button:active {
  outline: none;
  background: #d6d8e1;
}

@keyframes tooltip-animation-right {
  0% {
    transform: translateX(-75px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes tooltip-animation-left {
  0% {
    transform: translateX(75px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes tooltip-animation-normal {
  0% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}


</style>