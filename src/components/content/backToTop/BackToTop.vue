<template>
  <div class="backToTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
}
</script>

<style lang="less" scoped>
  .backToTop {
    position: fixed;
    bottom: 62px;
    right: 12px;
    z-index: 10;

    img {
      width: 43px;
      height: 43px;
    }
  }
</style>