<template>
  <div class="error-404">
    <div class="box">
      <h3>404</h3>
      <p>该页面不存在⊙﹏⊙‖∣°</p>
      <button @click="$router.back()">返回上一页</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error-404 {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  text-align: center;

  .box {
    margin: 0 auto;
  }

  h3 {
    font-size: 120px;
    color: #cfcfcf;
  }

  p {
    color: #999;
    margin-bottom: 30px;
  }

  button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #42b983;
    border: 1px solid #42b983;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    padding: 12px 20px;
    font-size: 14px;
    color: #fff;
  }

  button:active {
    opacity: 0.8;
  }
}
</style>
