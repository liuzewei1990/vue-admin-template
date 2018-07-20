<template>
  <!-- 埋点图表 -->
  <!-- 表格与分页展示区域 -->

  <div>
    <div :style="{height:chartHeight}" class="chart-box" ref="myChart">
      <span class="nodata" v-if="nodata">暂无数据,换个时间段试试</span>
    </div>
  </div>

</template>
<style lang="scss">
.chart-box {
  height: 100%;
  // background: #eee;
  overflow: auto;
  width: 100%;
  display: flex;
  text-align: center;
  vertical-align: middle;
  .nodata {
    width: 100%;
    text-align: center;
    color: #909399;
    font-size: 14px;
    &::before {
      content: "";
      display: inline-block;
      height: 100%;

      vertical-align: middle;
      text-align: center;
    }
  }
}
</style>
<script>
var echarts = require("echarts");
import $ from "jquery";
import qs from "qs";
import Vue from "vue";
export default {
  props: ["tableDataInit", "page", "limit", "search"],
  data() {
    return {
      nodata: false,
      chartHeight: "0",
      dataSuccess: this.tableDataInit.dataSuccess, // 数据家在完成
      ifloading: false,
      getUrl: this.tableDataInit.getDataUrl.url, // 请求函数
      getSearch: this.search // 搜索条件
    };
  },
  methods: {
    initChart(json) {
      console.log(json);
      var option = {
        title: {
          text: "埋点数据图表"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: "2%",
          top: "50",
          data: json.legend
        },
        grid: {
          left: "5%",
          right: "12%",
          containLabel: true
        },
        dataZoom: [
          {
            // 这个dataZoom组件，默认控制x轴。
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 0 的位置。
            end: 100
          }
        ],
        toolbox: {
          show: true,
          right: 20,
          feature: {
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: json.xSeries
        },
        yAxis: {
          type: "value"
        },
        series: json.ySeries
      };
      let myChart = echarts.init(this.$refs["myChart"]);
      // 绘制图表
      // myChart.setOption({
      //   title: {
      //     text: "ECharts 入门示例"
      //   },
      //   tooltip: {},
      //   xAxis: {
      //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: "销量",
      //       type: "bar",
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // });
      myChart.setOption(option, true);
    },
    visibleArrFn(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    },
    //列表数据获取
    postDataInit(page, limit, searchCondition) {
      this.ifloading = true;
      this.getUrl()({
        ...searchCondition
      }).then(data => {
        if (data.code === "00") {
          // 数据获取成功
          this.$nextTick(() => {
            if (data.data) {
              this.nodata = false;
              this.initChart(data.data);
            } else {
              this.nodata = true;
            }
          });
        }
        this.ifloading = false;
      });
    },
    tableSizeHandle() {
      this.$nextTick(() => {
        let pageHeight = $(".admin-page").outerHeight(true) || 0;
        let formHeight = $(".search-page").outerHeight(true) || 0;
        let operationHeight = $(".operation-box").outerHeight(true) || 0;
        let paginationHeight = $(".el-pagination").outerHeight(true) || 0;
        this.chartHeight =
          pageHeight -
          formHeight -
          operationHeight -
          paginationHeight -
          20 +
          "px";
      });
    },
    // 表格大小
    handleSizeChange(val) {
      // 改变页数
      this.$emit("pagelimit", val);
    },
    // 更改页数
    handleCurrentChange(val) {
      this.$emit("pagecount", val);
    },
    handleLoad() {
      // 操作按钮加载完毕
      console.log("加载完毕");
    },
    formatter(row, column) {
      return row.address;
    },
    operationHandle(rowdata, cb) {
      // 点击操作按钮
      this.$emit("operation", rowdata, cb);
    },
    // 导出
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  watch: {
    visibleinput(val) {
      // 监听高级搜索与普通搜索模式转变
      this.tableSizeHandle();
    },
    getPage(value) {
      this.getPage = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getLimit(value) {
      this.getLimit = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getUrl(value) {
      this.getUrl = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    },
    getSearch() {
      this.getSearch = value;
      this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    }
  },
  mounted() {
    // 初始化数据
    this.postDataInit(this.getPage, this.getLimit, this.getSearch);
    this.tableSizeHandle();
    window.onresize = () => {
      // this.postDataInit(this.getPage, this.getLimit, this.getSearch);
      this.tableSizeHandle();
    };
  },
  computed: {
    userAll() {
      // 所有的用户信息
      return this.$store.state.userInfoAndMenu.userMessage.all;
    },
    getDataUrl() {
      // 获取父页面传递的get参数
      return this.tableDataInit.getDataUrl;
    }
    // visibleinput() {
    //   return this.$store.state.topSearch.visibleinput;
    // }
  }
};
</script>