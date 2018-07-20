import { todayStr, yesterdayStr } from "@src/common/dateSerialize";
// 公用table页与search页功能
const mixinDataTable = {
    data() {
        return {
            postPage: 1,
            postLimit: 10,
        }
    },
    methods: {
        /**TABLE页交互 START ************************************************************ */
        showDialog(dialogName) {
            this[dialogName] = true;
        },
        // 重新获取数据
        reloadData(page, limit, search) {
            let page_ = page ? page : this.postPage;
            let limit_ = limit ? limit : this.postLimit;
            console.log("page:" + page_ + "limit:" + limit_ + "search:" + this.postSearch)
            this.$refs.dataTable.postDataInit(page_, limit_, this.postSearch);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 普通搜索 具备隐藏
        seachstartHandle() {
            // 开始搜索
            this.reloadData();
        },
        // 重置某输入框
        visiblesomeHandle() {
            // this.searchOptions.forEach(element => {
            //     // searchOptions数组里面的corresattr 是索引
            //     if (!element.show) {
            //         if (element.type == "dateGroup") {
            //             // 开始时间 到结束时间组合 特殊处理
            //             element.options.forEach(element => {
            //                 var corresattr = element.corresattr;
            //                 element.value = "";
            //                 this.searchCondition[corresattr] = "";
            //             });
            //         } else {
            //             var corresattr = element.corresattr;
            //             element.value = "";
            //             this.searchCondition[corresattr] = "";
            //         }
            //     }
            // });
        },
        callbackformHandle(cb, data1, data2) {
            // 表单双向绑定 得到输入的内容并返回到本页面
            cb(data1, data2);
        },
        resetSearchHandle() {
            // 重置查询表单
            this.searchOptions.forEach(element => {
                if (element.type == "dateGroup") {
                    element.options[0].value = todayStr;
                    element.options[1].value = todayStr;
                    this.searchCondition[element.options[0].corresattr] = todayStr;
                    this.searchCondition[element.options[1].corresattr] = todayStr;
                } else if (element.type == "dateGroup2") {
                    element.value = [todayStr, todayStr]
                    this.searchCondition[element.option1] = todayStr;
                    this.searchCondition[element.option2] = todayStr;
                } else {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                }
            });
        },
        resetSomeInputHandle(value) {
            this.searchOptions.forEach(element => {
                if (element.type == value) {
                    element.value = "";
                    this.searchCondition[element.corresattr] = "";
                }
            });
        },
        pagelimitHandle(value) {
            //每页条数改变
            this.postLimit = value;
        },
        pagecountHandle(value) {
            // 页数改变
            this.postPage = value;
        },
        operationHandle(data, cb) {
            // 操作按钮回调
            cb(data);
        }
        /**END ***********************************************/
    },
    computed: {
        oaIp() {
            // nginx配置的路由
            return this.$store.state.Base.oaIp;
        }
    },
    mounted() {
        // this.$store.commit("initSearchVisibleFn");
    }
}
export {
    mixinDataTable
}