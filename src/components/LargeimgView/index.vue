<template>
  <!-- 图片查看器 -->
  <div ref="fullpate" class="fullpate-img" v-if="fadeViewVisible">
    <!-- <transition name="imgChangeTrans-fade"> -->
    <div class="imgsGroup">
      <div v-for="(item,index) in imgsArrSelf" :key="index" class="imgbox">
        <div class="imgbox-in" @click.self="hideImageView">
          <img @click="biggerFn(index)" ref="imgLarge" :class="'img-page-large '+rotateClass+' '+biggeris" :src="item[1].url" :alt="item[1].imgname" :id="item[1].imgId">
        </div>
        <!-- <img @click="biggerFn" ref="imgLarge" :class="'img-page-large '+rotateClass+' '+biggeris" :src="imgUrlSelf" :alt="imgUrlSelf"> -->
        <p class="name-box">{{item[1].imgname}}
          <span v-if="idcardVisible">身份证号：{{payStatusDetails.idCard}}</span>
          <span v-if="accountNoVisible">账号：{{payStatusDetails.accountNo}}</span>

          <span v-if="accountNoVisible">账号：{{payStatusDetails.accountNo}}</span>
          <span v-if="accountNoVisible">账号：{{payStatusDetails.accountNo}}</span>
          <span v-if="accountNoVisible">账号：{{payStatusDetails.accountNo}}</span>
        </p>
      </div>
    </div>
    <!-- </transition> -->
    <div class="largeButgroup">
      <a :href="downloadUrl" :download="downloadName" target="view_window" title="下载" class="el-icon-download but"></a>
      <!-- <i @click="downLoadImg(downloadUrl,downloadName)" title="下载" class="el-icon-download but"></i> -->
      <!-- </a> -->
      <i v-if="retateVisible" title="旋转" @click="rotateFn" class="el-icon-refresh but"></i>
      <i @click="hideImageView" title="关闭" class="el-icon-close but"></i>
    </div>
    <i title="上一张" v-if="retateVisible" @click="preFn" class="el-icon-arrow-left changebut prebut"></i>
    <i title="下一张" v-if="retateVisible" @click="nextFn" class="el-icon-arrow-right changebut nextbut"></i>
    <div class="shadow-box" @click="hideImageView"></div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.fullpate-img {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  top: 0;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
  .imgsGroup {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    // width: 100%;
    height: 100%;
    z-index: 9999;
    // overflow: auto;
  }
  .but {
    font-size: 24px;
    color: #fff;
    padding-right: 10px;
    cursor: pointer;
    z-index: 9999;
  }
  .changebut {
    font-size: 24px;
    color: #000;
    text-align: center;
    font-weight: 900;
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    cursor: pointer;
    z-index: 9999;
    position: absolute;
    transition: all 0.8ms;
    -webkit-transition: all 0.8ms;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &.prebut {
      left: 10px;
      top: 50%;
    }
    &.nextbut {
      right: 10px;
      top: 50%;
    }
  }
  .imgbox {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    // width: 100%;
    height: 100%;
    z-index: 9999;
    .imgbox-in {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      img {
        text-align: center;
        vertical-align: middle;
      }
      &:after {
        content: "";
        display: inline-block;
        height: 100%;
        text-align: center;
        vertical-align: middle;
      }
    }
    // &:nth-of-type(1) {
    //   background: #ffffff;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(2) {
    //   background: red;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(3) {
    //   background: blue;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(4) {
    //   background: black;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(5) {
    //   background: yellow;
    //   // opacity: 0.2;
    // }

    // &:nth-of-type(6) {
    //   background: green;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(7) {
    //   background: pink;
    //   // opacity: 0.2;
    // }
    // &:nth-of-type(8) {
    //   background: purple;
    //   // opacity: 0.2;
    // }

    .name-box {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      font-weight: 900;
      color: #fff;
      padding: 10px;
      // width: 100%;
      position: absolute;
      z-index: 999;
      left: 10px;
      right: 10px;
      text-align: center;
      z-index: 9999;
      bottom: 10px;
      background: rgba(0, 0, 0, 0.4);
      span {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }
  .shadow-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    vertical-align: middle;
    &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
  }
  img {
    position: relative;
    z-index: 10;
    text-align: center;
    vertical-align: middle;
  }
  .smallImg {
    cursor: zoom-in;
  }
  .bigImg {
    cursor: zoom-out;
  }
  .largeButgroup {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    // background: red;
    z-index: 1;
    height: 50px;
    text-align: right;
    z-index: 10001;
    padding-right: 10px;
    padding-top: 10px;
    cursor: pointer;
  }
  .rotate90 {
    transform: rotate(90deg);
  }
  .rotate180 {
    transform: rotate(180deg);
  }
  .rotate270 {
    transform: rotate(270deg);
  }
  .rotate0 {
    transform: rotate(0deg);
  }
}
</style>
<script>
import utils from "@src/common/utils"
export default {
  components: {},
  props: ["fadeViewVisible", "rotateClass", "largeImgUrl", "largeImgArt", "imgsArr", "largeImg", "payStatusDetails"],
  data() {
    return {
      imgVisible: true,
      retateVisible: false,
      imgWidth: "",
      imgHeight: "",
      biggeris: 'smallImg',
      nowIndex: 0,
      imgsArrSelf: [],
      imgUrlSelf: "",
      downloadUrl: "",
      downloadName: "",
      idcardVisible: false,
      accountNoVisible: false,
      canMove: true,
    };
  },
  methods: {
    // 下载
    downLoadImg(imgSrc, name) {
    },
    // 上一张
    preFn() {
      let newIndex = this.nowIndex;
      let windowWidth = $(".fullpate-img").width();
      let imgboxLen_ = $(".imgbox").length;
      if (this.nowIndex > 0) {
        newIndex = this.nowIndex - 1;
      } else {
        newIndex = 0
      }
      this.imgsGroupMove(newIndex);
    },
    // 下一张
    nextFn() {
      let newIndex = this.nowIndex;
      if (this.nowIndex < this.imgsArrSelf.length - 1) {
        newIndex = parseInt(this.nowIndex) + 1;
      } else {
        newIndex = this.imgsArrSelf.length - 1
      }
      this.imgsGroupMove(newIndex);
    },
    hideImageView() {
      this.$emit("hideImageView")
    },
    rotateFn() {
      this.$emit("rotateFn")
    },
    setImgMiddle(type) {
      let self = this;
      let imgsArrSelf = this.imgsArrSelf;
      for (var index = 0; index < imgsArrSelf.length; index++) {
        (function (index) {
          if (imgsArrSelf[index]) {
            let imgurl_ = imgsArrSelf[index][1].url || "";
            var newImg = new Image();
            newImg.src = imgurl_;
            newImg.onerror = () => {    // 图片加载错误时的替换图片
              // newImg.src = require("@src/assets/images/logo.png")
            }
            newImg.onload = () => {
              let img_width = newImg.width;
              let img_height = newImg.height;
              //图片容器宽高
              let panel_width = $(".fullpate-img").width();
              let panel_height = $(".fullpate-img").height();
              let $img = $(".imgbox").eq(index).find(".img-page-large");
              if (panel_width / panel_height < img_width / img_height) {
                if (type == "transfer") {
                  if (panel_width < img_width) {
                    // console.log(1);
                    $img.width(img_height + "px");
                  } else {
                    // console.log(2);
                    $img.width(panel_height + "px");
                  }
                  $img.height("auto")
                  $img.css('margin-top', "0px");
                } else {
                  if (panel_width < img_height) {
                    // console.log(3);
                    $img.width(panel_width + "px");
                  } else {
                    // console.log(4);
                    $img.width(img_width + "px");
                  }
                  $img.height("auto");
                }
              } else {
                if (type == "transfer") {
                  if (panel_height < img_height) {
                    // console.log(5);
                    $img.height(panel_height + "px");
                    $img.width("auto");
                  } else {
                    // console.log(6);
                    $img.width(img_height + "px");
                    $img.height("auto");
                  }

                } else {
                  if (panel_height < img_height) {
                    // console.log(7);
                    $img.height(panel_height);
                  } else {
                    // console.log(6);
                    $img.height(img_height);
                  }
                  $img.width("auto")
                }
              }
            }
          }
        })(index)
      }
    },
    imgInit() {
      this.biggeris = "smallImg";
      this.retateVisible = true;
      let imgsArrSelf = "";
      let largeImg = this.largeImg;
      let arrSelf = [];
      for (let [index, elem] of this.imgsArr) {
        let obj = {};
        obj.imgId = index;
        obj.url = elem.url;
        obj.id = elem.id;
        obj.imgname = elem.imgname || "";
        arrSelf.push(obj)
      }
      this.imgsArrSelf = Object.entries(arrSelf) // 本页面需要的数组
      imgsArrSelf = this.imgsArrSelf;
      for (let [index, elem] of imgsArrSelf) {
        if (elem.imgId == largeImg.imgname) {
          this.nowIndex = index; // 当前的路由
        }
      }
      this.$nextTick(() => {
        let imgboxLen_ = $(".imgbox").length;
        let windowWidth = $(".fullpate-img").width();
        let windowHeight = $(".fullpate-img").height();
        for (var i = 0; i < imgboxLen_; i++) {
          $(".imgbox").eq(i).css({ "width": windowWidth, "height": windowHeight });
          $(".imgbox").eq(i).css("left", utils.accMul(i, windowWidth) + "px")
        }
        $(".imgsGroup").width(utils.accMul(windowWidth, imgboxLen_));

        this.imgsGroupMove(this.nowIndex * 1);
      })
    },
    imgsGroupMove(index) {
      let canMove = this.canMove;
      let windowWidth = $(".fullpate-img").width();
      let nowLeft = $(".imgsGroup").position().left;
      if (index < this.nowIndex && canMove) {
        // 向左移动
        // if (canMove) {
        this.canMove = false;
        $(".imgsGroup").animate({ left: (nowLeft + windowWidth) + "px" }, 'fast', 'swing', () => {
          this.canMove = true;
        })
        this.nowIndex = index;
        // }
      } else if (index > this.nowIndex && canMove) {
        //向右移动
        this.canMove = false;
        $(".imgsGroup").animate({ left: (nowLeft - windowWidth) + "px" }, 'fast', 'swing', () => {
          this.canMove = true;
        })
        this.nowIndex = index;
      } else {
        // 不动
        $(".imgsGroup").css({ left: -utils.accMul(index, windowWidth) + "px" });
      }
      this.$nextTick(item => {
        let imgsrc = $(".imgbox").eq(this.nowIndex).find("img").attr('src');
        let imgalt = $(".imgbox").eq(this.nowIndex).find("img").attr('alt');
        this.downloadUrl = imgsrc;
        this.downloadName = imgalt;
      })
      this.showImgNow();
      this.setImgMiddle();
    },
    showImgNow() {
      this.$nextTick(item => {
        let img = $(".imgbox").eq(this.nowIndex).find("img");
        let imgId = img.attr("id");
        this.idcardVisible = false;
        this.accountNoVisible = false;
        if (imgId == "identityHolderImg" || imgId == "identityFrontImg" || imgId == 'cardHolderIdImg' || imgId == 'cardHolderFrontImg') {
          this.idcardVisible = true
        }
        if (imgId == "settleCardImg") {
          this.accountNoVisible = true
        }


      })
    },
    biggerFn(index) {
      let biggeris = this.biggeris;
      let $img = $(".img-page-large").eq(index);
      let $imgWidth = $img.width();
      let $imgHeight = $img.height();
      if (biggeris == "smallImg") {
        // 放大
        $img.width(utils.accMul($imgWidth, 2));
        $img.height(utils.accMul($imgHeight, 2));
        this.biggeris = "bigImg";
        this.retateVisible = false;
      } else if (biggeris == "bigImg") {
        // 缩小
        $img.width($imgWidth / 2);
        $img.height($imgHeight / 2);
        this.biggeris = "smallImg";
        this.retateVisible = true;
      }
    },
    initRotate() {
      let val = this.rotateClass;
      if (val == "rotate270" || val == "rotate90") {
        this.setImgMiddle('transfer');
      } else {
        this.setImgMiddle();
      }
    }
  },

  created() {

  },
  computed: {

  },
  watch: {
    rotateClass(val) {
      this.initRotate();
    },
    nowIndex() {
      this.$emit("rotateInit"); // 旋转恢复默认值
    },
    fadeViewVisible(val) {
      if (val) {
        this.imgInit();
      }
    },
    // nowIndex(val) {
    //   console.log(val);
    // }
  },
  mounted() {
  }
};
</script>