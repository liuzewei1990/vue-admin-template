<template>
  <div class="common-table">
    <div>111</div>
    <el-table ref="elTable" :data="tableData" stripe style="width: 100%" v-loading="loading" :border="true" :height="height">
      <slot></slot>
    </el-table>
    <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[10, 20, 30]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    api: {
      type: Function,
      default: () => { }
    },
    query: {
      type: Object,
      default() {
        return {
          limit: 20,
          page: 1
        };
      }
    },
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableData: [],
      count: 0,
      loading: false,
      height: 0,
    };
  },
  mounted() {
    this.setTableHeight();
    window.addEventListener("resize", this.setTableHeight)
  },
  methods: {
    // 调用api加载数据的方法
    async loadData(query) {
      try {
        this.loading = true;
        let data = await this.api(this.query);
        if (data.code == "00") {
          this.count = data.count;
          this.tableData = data.data;
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
      } catch (error) {
        this.$message({
          type: "warning",
          message: "请求失败"
        });
      }
      this.loading = false;
    },
    handleSizeChange(limit) {
      this.query.limit = limit;
      this.loadData();
    },
    handleCurrentChange(page) {
      this.query.page = page;
      this.loadData();
    },
    setTableHeight() {
      this.$nextTick(() => {
        console.log(this.$refs.elTable.$el.getBoundingClientRect())
        this.height = document.body.clientHeight - this.$refs.elTable.$el.getBoundingClientRect().top - this.$refs.elTable.$el.getBoundingClientRect().top;
      })
    },
  },
}
</script>

<style scoped>
.common-table {
  /* position: relative; */
}
.pagination {
  /* position: absolute;
  bottom: 0;
  right: 0; */
  float: right;
  margin-top: 5px;
}
</style>
