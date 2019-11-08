<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    color: var(--color-text);
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
    font-size: 14px;

    .recommend-item {
      flex: 1;

      img {
        width: 70px;
        height: 70px;
        margin-bottom: 6px;
      }
    }
  }
</style>