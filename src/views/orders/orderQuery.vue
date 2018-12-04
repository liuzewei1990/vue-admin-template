<template>
  <content-layout :isFluid="false">
    <el-form ref="form" label-width="80px" slot="search">
      <el-row>
        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="即时配送">
            <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-date"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button-group slot="action">
      <el-button type="primary" icon="el-icon-edit">新增</el-button>
      <el-button type="primary" icon="el-icon-share">导出</el-button>
      <el-button type="primary" icon="el-icon-delete">导入</el-button>
    </el-button-group>

    <div slot="main">内容主体</div>
    <div slot="footer">底部footer</div>
  </content-layout>
</template>

<script>

import { randomDateNow, getSignData } from "@src/common/utils";
import { onlineQuickPay } from '@src/apis';
export default {

}
</script>

<style>
</style>
