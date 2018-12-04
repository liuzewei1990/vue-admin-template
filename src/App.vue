<template>
  <div>
    <el-progress :percentage="$store.state.loadingBar" :stroke-width="2" :show-text="false"></el-progress>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
</style>
