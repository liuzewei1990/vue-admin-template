<!-- 内容区通用布局组件,父级需要时flex布局 -->
<template>
        <div class='content-layout' :class="{fluid:!isFluid}">
                <!-- 搜索区域 -->
                <div class="content-search" v-if="$slots.search">
                        <slot name="search"></slot>
                </div>
                <!-- 操作区域 -->
                <div class="content-action" v-if="$slots.action">
                        <slot name="action"></slot>
                </div>
                <!-- 主体内容区域 -->
                <div class="content-main">
                        <el-table ref="elTable" :data="tableData" stripe style="width: 100%" v-loading="loading" :border="true" :height="height">
                                <slot></slot>
                        </el-table>
                </div>
                <!-- 底部footer -->
                <div class="content-footer">
                        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[20, 30, 40]" :page-size="query.limit" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
                </div>
        </div>
</template>

<script>
import './global-table.css'
export default {
        name: "common-table",
        components: {},
        props: {
                isFluid: { type: Boolean, default: false },
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
                async loadData() {
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
                // 分页size改变时触发
                handleSizeChange(limit) {
                        this.query.limit = limit;
                        this.loadData();
                },
                // 点击页数时触发
                handleCurrentChange(page) {
                        this.query.page = page;
                        this.loadData();
                },
                // 刷新表格数据的方法
                refreshTableData() {
                        this.query.page = 1;
                        this.loadData();
                },
                setTableHeight() {
                        this.$nextTick(() => {
                                console.log(this.$refs.elTable.$el.getBoundingClientRect())
                                this.height = document.body.clientHeight - this.$refs.elTable.$el.getBoundingClientRect().top - 37;
                        })
                },
        },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.content-layout {
        padding: 10px 0px 0px 20px;
        box-sizing: border-box;
        min-width: 800px;
}

.content-search {
        padding: 0px 0 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
}
.content-action {
        padding: 10px 0px;
        box-sizing: border-box;
}

.content-main {
        //   padding: 10px 10px 0;
        box-sizing: border-box;
        overflow: hidden;
}
.content-footer {
        padding-bottom: 2px;
        box-sizing: border-box;
        .pagination {
                float: right;
        }
}

//flex布局方案
.fluid {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        flex-direction: column;
        .content-main {
                flex: 1;
                overflow: hidden;
        }
}
</style>