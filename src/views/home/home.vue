<template>
  <div>
    <el-row>
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import { oaIp } from "@src/apis/base";
console.log("oaIp=>", oaIp)
export default {

}
</script>

<style lang="scss">
$border2: 2px solid red;
.test {
  border: $border2;
}
</style>
