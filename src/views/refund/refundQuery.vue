<!-- 退货查询 -->
<template>
    <content-layout class='refund-query-page'>
        <el-form ref="ruleForm" :inline="true" slot="search">
            <el-form-item :label="$t('refundQuery.formCustomerNo')" prop="amount">
                <el-input v-model="$store.state.publicParams.customerNo" size="small" :placeholder="$t('refundQuery.formCustomerNoTip')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('refundQuery.formOrderNo')" prop="amount">
                <el-input v-model="$store.state.refundMerOrderNo" size="small" :placeholder="$t('refundQuery.formOrderTip')"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="query('ruleForm')" size="small" :loading="loading">{{$t("refundQuery.submit")}}</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="dialogFormVisible = true" size="small" :loading="loading">新增</el-button>
            </el-form-item> -->
        </el-form>

        <!-- <el-steps class="steps" :active="2" align-center slot="main">
            <el-step v-for="(item,index) in refundStatus" :key="index" :title="item" description="更新时间：2018-7-26 14:23:00"></el-step>
        </el-steps> -->
        <el-table :data="tableData" border style="width: 100%" slot="main">
            <el-table-column prop="merOrderNo" :label="$t('refundQuery.tableOrderNo')">
            </el-table-column>
            <el-table-column :label="$t('refundQuery.tableStatus')">
                <template slot-scope="scope"> {{refundStatus[scope.row.refundStatus]}}</template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('refundQuery.tableMoney')"></el-table-column>
            <el-table-column :label="$t('refundQuery.tableTime')">
                <template slot-scope="scope"> {{scope.row.refundTime | formatDateStr}}</template>
            </el-table-column>
        </el-table>

        <!-- form -->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" slot="main" :modal-append-to-body="false"  :fullscreen="fullscreen" :modal="false" custom-class="abcd1111111111111111">
            
            <div @click="fullscreen=!fullscreen">全屏</div>
            <el-form :model="form">
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" label-width="120px">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </content-layout>
</template>

<script>

import { randomDateNow, getSignData } from "@src/common/utils";
import { onlineQuickPay } from '@src/apis';
export default {
    components: {},
    data() {
        return {
            dialogFormVisible:false,
            fullscreen:false,
            loading: false,
            refundStatus: this.$t("refundQuery.refundStatus"),
            form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
            tableData: [
                // {
                //     "code": "00",
                //     "msg": "查询成功",
                //     "version": "1.0.0",
                //     "service": "trade.refund.query",
                //     "signData": "6193C7BA45B63AC6688A6DA3B7066504",
                //     "merOrderNo": "1523952668804",
                //     "plaOrderNo": "986155133829317193",
                //     "refundStatus": "SUCCESS",
                //     "amount": "1",
                //     "refundTime": "20180417161121"
                // }
            ]
        }
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
        async query() {

            //公共域
            let params = { ...this.$store.state.publicParams };
            params["service"] = "trade.refund.query";
            params["merOrderNo"] = this.$store.state.refundMerOrderNo;
            params["signData"] = getSignData(params, this.$store.state.md5Key);

            this.loading = true;
            let data = await onlineQuickPay(params);
            this.loading = false;
            if (data.code === "00") {
                this.tableData = [data];
            } else {
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'error'
                });
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        document.querySelector(".abcd1111111111111111").parentNode.style.position = "absolute";
        document.querySelector(".abcd1111111111111111").parentNode.style.background = "rgba(0,0,0,0.5)";
        
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

.steps {
  margin-top: 100px;
}
</style>