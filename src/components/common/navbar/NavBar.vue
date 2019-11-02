<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="righ"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="less" scoped>
  .nav-bar {
    height: 44px;
    display: flex;
    text-align: center;
    line-height: 44px;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.2);

    .left, .right {
      width: 60px;
    }

    .center {
      flex: 1;
    }
  }
</style>