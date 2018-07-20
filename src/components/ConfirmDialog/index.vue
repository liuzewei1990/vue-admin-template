<template>
  <el-dialog :title="title" :visible.sync="visible" width="30%" :before-close="handleClose">
    <span>{{msg}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="noFn">取 消</el-button>
      <el-button type="primary" @click="yesFn">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["visible", "msg", "title"],
  name: "confirmDialog",
  methods: {
    yesFn() {
      this.$emit("confirmSure")
    },
    noFn() {
      this.$emit("confirmNo")
    }
  }
}
</script>

