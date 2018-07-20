<template>
  <!-- 表单数据搜索区域 -->

  <div class="search-page" @keyup.enter="searchStart">
    <!-- Form 表单编写 start -->
    <el-form size="small" :class="[visibleinput?'showform-box':'visibleform-box','form-box']" ref="searchform" label-width="100px">
      <el-form-item :class="itemWidth(item.type)" v-for="(item,index) in searchOptions" :key="index+'in'" :label="item.label" v-show="item.show?showinput:visibleinput" v-if="item.visible=='TRUE'?false:true">

        <!-- 文本框 -->
        <el-input ref="myinput" v-if="item.type=='text'" :placeholder="item.label" @input="changeInput(item.cb,$event)" v-model="item.value"></el-input>

        <!-- 选择框 -->
        <el-select ref="myinput" class="form-select" @input="changeInput(item.cb,$event)" @change="changeFoInput(item.cb,$event)" v-if="item.type=='select'" v-model="item.value" placeholder="请选择">
          <el-option v-for="(item) in item.options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <!-- 日期组合 -->
        <div class="dateGroup" v-if="item.type=='dateGroup'">
          <!-- {{item.options}} -->
          <!-- {{item.options[1].value}} -->
          <el-date-picker value-format="yyyy-MM-dd" :blur="datepickerBlur" align="center" :picker-options="pickerOptions1" :editable="false" :clearable="item.options[0].clearable==false?item.options[0].clearable:true" id="dateGroup" ref="myinputData1" v-model="item.options[0].value" @input="changeInput(item.options[0].cb,$event,'startdate',item.options[0].clearable)" type="date" placeholder="开始时间"></el-date-picker>
          <!-- <el-date-picker :blur="datepickerBlur" align="center" :picker-options="pickerOptions1" :editable="false" :clearable="item.options[0].clearable==false?item.options[0].clearable:true" id="dateGroup" ref="myinputData1" v-model="item.options[1].value" @input="changeInput(item.options[0].cb,$event,'date',item.options[0].clearable)" type="date" placeholder="开始时间"></el-date-picker> -->
          <span class="to-line">-</span>
          <el-date-picker value-format="yyyy-MM-dd" :blur="datepickerBlur" align="center" :picker-options="pickerOptions2" :editable="false" :clearable="item.options[1].clearable==false?item.options[1].clearable:true" id="dateGroup1" ref="myinputData2" class="enddate-box" v-model="item.options[1].value" @input="changeInput(item.options[1].cb,$event,'enddate',item.options[1].clearable)" type="date" placeholder="结束时间"></el-date-picker>
        </div>

        <!-- 日期组合2 -->
        <div class="dateGroup2" v-if="item.type=='dateGroup2'" label-width="0">
          <el-date-picker :editable="false" :clearable="item.clearablee==false?item.clearablee:true" id="dateGroup2" :label="item.label" value-format="yyyy-MM-dd" :picker-options="pickerOptions7" @input="changeDateGroup(item.cb,$event,'nomal',item.limit,item.limitnum,item.type)" :unlink-panels="item.limit?false:true" v-model="item.value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <!-- 月份的日期 -->
        <!-- <el-form-item class="dateMonth" v-if="item.type=='dateMonth'"> -->
        <el-date-picker value-format="yyyy-MM" class="dateMonth" v-if="item.type=='dateMonth'" v-model="item.value" @input="changeInput(item.cb,$event,'dateMonth')" type="month" placeholder="选择月">
        </el-date-picker>
        <!-- </el-form-item> -->
      </el-form-item>
      <div class="button-box">
        <div class="searchbut-box">
          <el-button size="small" @click="searchStart" type="primary">开始搜索</el-button>
          <el-button size="small" @click="resetInput('searchform')">重置</el-button>
        </div>
        <div class="seach-mode-box">
          <el-button size="small" v-if="visibleSenior" class="seach-mode" @click="advancSeachfn()" type="text">
            <template v-if="visibleinput">
              普通搜索
              <i class="el-icon-arrow-up"></i>
            </template>
            <template v-if="!visibleinput">
              高级搜索
              <i class="el-icon-arrow-down"></i>
            </template>
          </el-button>
        </div>
      </div>

    </el-form>
    <!-- Form end -->

  </div>

</template>
<script>
import { todayStr, yesterdayStr } from "@src/common/dateSerialize";
import Vue from "vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    searchOptions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      startDateTime: "",
      endDateTime: "",
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.endDateTime != "") {
            return time.getTime() > Date.now() || time.getTime() > this.endDateTime;
          } else {
            return time.getTime() > Date.now();
          }

        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "上一周",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptions2: {
        disabledDate: (time) => {
          return time.getTime() < (this.startDateTime - (3600 * 1000 * 24)) || time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      visibleinput: false,
      pickerOptions7: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value6: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value8: "",
      advancSeach: false,
      showinput: true
      //   visibleinput:false // true为高级搜索 false为普通搜索
    };
  },
  computed: {
    // visibleinput() {
    //   return this.$store.state.topSearch.visibleinput;
    // },

    visibleSenior() {
      //隐藏高级搜索
      var showlen = 0;
      this.searchOptions.forEach(element => {
        if (element.show) {
          showlen++;
        }
      });
      if (showlen == this.searchOptions.length) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    document.onkeydown = event => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        this.searchStart();
      }
    };
  },
  methods: {
    itemWidth(type) {
      // console.log(type);
      if (type == "dateGroup") {
        return "form-item-data";
      } else if (type == "dateMonth") {
        return "form-item-month";
      } else {
        return "form-item";
      }
      // =='dateGroup'||item.type=='dateGroup'?'dateMonth':'form-item'
    },
    visibleinputHandle() {
      // 高级搜索与普通搜索转变
      this.visibleinput = !this.visibleinput;
      this.$emit("changeSearchVisible", this.visibleinput);
    },
    changeInput2(value) {
      console.log(value);
    },
    advancSeachfn() {
      // 高级搜索与普通搜索转换
      // this.$store.commit("visibleinputHandle");
      this.visibleinputHandle();
    },
    changeInput(cb, event, type, clearable) {
      // 表单内容双向绑定 把表单输入的内容交给父页面进行操作
      if (event) {
        var val = "";
        if (type == "startdate" || type == "enddate") {
          var date = new Date(event);
          type == "startdate" ? this.startDateTime = date : this.endDateTime = date;
          var month = date.getMonth() + 1;
          month = month * 1 < 10 ? "0" + month : month;
          var day =
            date.getDate() * 1 < 10 ? "0" + date.getDate() : date.getDate();
          date = date.getFullYear() + "-" + month + "-" + day;
          val = date;
        } else if (type == "dateMonth") {
          var date = new Date(event);
          var month = date.getMonth() + 1;
          month = month * 1 < 10 ? "0" + month : month;
          date = date.getFullYear() + "-" + month;
          val = date;
        } else {
          val = event;
        }
      } else {
        val = "";
      }
      // console.log(val);
      this.$emit("changeform", cb, val);
    },
    changeFoInput(cb, event, type, clearable) {
      // console.log(clearable);
    },
    //日期组合
    changeDateGroup(cb, event, type, limit, limitnum, option1) {
      if (event) {
        var startTime = event[0];
        var endTime = event[1];
        if (limit) {
          // var numtime = 3600 * 1000 * 24 * limit;
          var star = new Date(startTime) * 1;
          var end = new Date(endTime) * 1;
          var days = (end - star) / (3600 * 1000 * 24);
          if (days > limitnum) {
            this.$message({
              message: "时间间隔最多为" + limitnum + "天，请重新选择时间段",
              type: "",
              center: true
            });
            startTime = "";
            endTime = "";
            this.$emit("resetSome", option1);
          }
        }
        this.$emit("changeform", cb, startTime, endTime);
      } else {
        this.$emit("changeform", cb, "", "");
      }
    },
    searchStart() {
      //交给父页面操作
      this.$emit("seachstart");
    },
    resetInput(formName) {
      //交给父页面操作
      this.$emit("resetInput");
    },
    datepickerBlur() {
      console.log("失去");
    }
    // resetSome() {
    //   this.$emit("resetSome");
    // }
  },
  watch: {
    visibleinput: function (val) {
      if (!val) {
        //普通搜索的时候
        this.$emit("visiblesome");
      }
    }
  }
};
</script>
<style lang="scss">
@media screen and (min-width: 500px) {
  .search-page {
    min-width: 600px;
    padding: 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .searchbut-box {
      width: 170px;
      flex-grow: 0;
      flex-shrink: 0;
      flex-wrap: wrap;
      // display: flex;
      // white-space: nowrap;
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
    .form-box {
      margin-top: 10px !important;
      .form-item {
        // width: 340px;
        width: 281px;
        flex-shrink: 0;
      }
      .form-item-month {
        width: 281px;
        flex-shrink: 0;
        .dateMonth {
          width: 100%;
        }
      }
      .form-select {
        width: 100%;
        margin-left: 0;
      }
      .dateMonth {
        width: 240px;
      }
      // .dateGroup,
      .dateGroup2 {
        width: 179px;
        display: flex;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        .el-date-editor .el-range__close-icon {
          position: absolute;
          top: 0;
          right: 3px;
        }
        input {
          padding-right: 0px;
          border: 0px;
          background: none;
        }
        .el-input__suffix {
          right: 0;
        }
        .el-date-editor .el-input__inner {
          padding-left: 8px;
        }
        .el-date-editor .el-input__prefix {
          display: none;
        }
        .el-input__icon {
          width: 12px;
        }
      }
      .dateGroup {
        @extend .dateGroup2;
        border: 1px solid #dcdfe6;
        .el-date-editor {
          position: relative;
        }
      }
      // .dateGroup {
      //   width: 240px;
      //   display: flex;
      //   background-color: #fff;
      //   background-image: none;
      //   border-radius: 4px;
      //   .el-date-editor .el-range__close-icon {
      //     position: absolute;
      //     top: 0;
      //     right: 3px;
      //   }
      //   input {
      //     padding-right: 0px;
      //     border: 0px;
      //     background: none;
      //   }
      //   .el-input__suffix {
      //     right: 0;
      //   }
      //   border: 1px solid #dcdfe6;
      //   .el-date-editor {
      //     position: relative;
      //   }
      // }
    }
    .seach-mode-box {
      display: flex;
      width: 100px;
      flex-grow: 0;
      flex-shrink: 0;

      .seach-mode {
        height: 28px;
        font-size: 14px;
        color: #f74f52;
        font-weight: bold;
        i {
          font-weight: bold;
        }
      }
    }
    /*普通样式start*/
    .showform-box,
    .visibleform-box {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .button-box {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        flex-wrap: wrap;
        padding-bottom: 10px;
        // display: inline-block;
        button {
          margin-left: 10px;
        }
      }
    }
    /*普通搜索样式end*/

    /*高级搜索样式start*/
    .showform-box {
      .button-box {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        padding-bottom: 10px;
        width: 400px;
        flex-basis: 400px;
        flex-shrink: 0;
      }
    }
    /*高级搜索样式end*/
  }
  .el-form-item__label {
    padding-right: 5px;
  }
}
</style>
