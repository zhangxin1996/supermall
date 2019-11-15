<template>
  <div class="goodsList">
    <goods-list-item v-for="item in goodsItem" :key="item.show.img" :item="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goodsItem: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .goodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>