<template>
  <div class="imgs-box">
    <h3>{{label}}</h3>
    <el-upload :data="imgData_" :with-credentials="true" :headers='{"X-requested-With": "XMLHttpRequest"}' :limit="1" :action="action" class="avatar-uploader" :show-file-list="false" :before-upload="imgBeforeUpload">
      <img v-if="imgUrl" :src="imgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.imgs-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  h3 {
    padding: 10px 0px 5px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
<script>
export default {
  props: ["action", "upType", "imgKey", "label", "sendData", "uploadApi", "defaultImg"],
  components: {},
  data() {
    return {
      imgUrl: "",
      imgData_: {
        businessNo: "",
        businessType: "",
        imgString: "",
      }
    };
  },
  computed: {
  },

  methods: {
    imgBeforeUpload(file) {
      if (this.checkUpload(file)) {
        this.imgTransBase(file);
      }
      return false;
    },
    // 上传文件格式校验
    checkUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPEG && !isPNG && !isJPG) {
        this.$message.error("上传图片只能是 jpeg,jpg,png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return (isJPEG || isPNG || isJPG) && isLt2M;
    },
    //img转化base64
    imgTransBase(file) {
      console.log(file);
      let reader = new FileReader();
      let self = this;
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        // base64编码
        self.imgData_.imgString = this.result;
        // base64编码压缩成更小的
        // console.log(
        //   "压缩前：" + this.result.length / 1024 / 1024 + " " + this.result
        // );
        // utils.dealImage(this.result, { width: 200 }, function(data) {
        //   console.log("压缩后：" + data.length / 1024 + " " + data);
        self.uploadApi()(self['imgData_']).then(data => {
          if (data.code == "00") {
            self.imgUrl = self.imgData_.imgString;
            self.$emit("result", self.imgKey, data.data)
          } else {
            self.$message({
              message: data.msg,
              type: "warning"
            });
          }
        });
        // });
      };
    },
    init() {
      this.imgData_ = {
        imgType: this.upType,
        ...this.sendData
      };
      this.imgUrl = this.defaultImg;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    defaultImg(val) {
      this.init();
    },
    upType() {
      this.init();
    },
    sendData() {
      this.init();
    }
  }
};
</script>