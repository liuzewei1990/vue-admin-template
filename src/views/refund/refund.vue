<!-- 交易退货 -->
<template>
    <content-layout class='refund-page'>
        <el-form ref="ruleForm" :inline="true" slot="search">

            <el-form-item :label="$t('refund.formCustomerNo')" prop="formCustomerNo">
                <el-input v-model="$store.state.publicParams.customerNo" size="small" :placeholder="$t('refund.formCustomerTip')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('refund.formOrderNo')" prop="formOrderNo">
                <el-input v-model="params.merOrderNo" size="small" :placeholder="$t('refund.formOrderTip')"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="refund('ruleForm')" size="small" :loading="loading">{{$t("refund.submit")}}</el-button>
            </el-form-item>
        </el-form>
        <el-alert slot="main" title="" type="warning" :description="$t('refund.description')" show-icon :closable="false"></el-alert>
        <el-table :data="tableData" border style="width: 100%" slot="main">
            <el-table-column prop="refundMerOrderNo" :label="$t('refund.tableOrderNo')"></el-table-column>
            <el-table-column prop="msg" :label="$t('refund.tableResult')"></el-table-column>
        </el-table>
    </content-layout>
</template>

<script>

import { randomDateNow, getSignData } from "@src/common/utils";
import { onlineQuickPay } from '@src/apis';
export default {
    components: {},
    data() {
        return {
            params: {
                merOrderNo: "",
                constomerNo: "",
            },
            loading: false,
            tableData: [
                // {
                //     code: "00",
                //     msg: "成功",
                //     version: "1.0.0",
                //     service: "trade.refund",
                //     signData: "F52CCDA1EEE362BCF53D156CD9A0F051",
                //     plaOrderNo: "986155133829317193"
                // }
            ]
        }
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
        async refund() {

            //公共域
            let params = { ...this.$store.state.publicParams };
            params["service"] = "trade.refund";
            params["refundMerOrderNo"] = randomDateNow(4);
            params["merOrderNo"] = this.params.merOrderNo;
            params["signData"] = getSignData(params, this.$store.state.md5Key);

            this.loading = true;
            let data = await onlineQuickPay(params);
            this.loading = false;
            if (data.code === "00") {
                data["refundMerOrderNo"] = params.refundMerOrderNo;
                this.$store.state.refundMerOrderNo = params.refundMerOrderNo;
                this.tableData = [data];
            } else {
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'error'
                });
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() { },
    beforeMount() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.refund-page {
}
</style>