<template>
  <div class="goodsListItem">
    <a :href="item.link">
      <img class="itemImg" :src="item.show.img" alt="">
    </a>
    <p class="itemText">{{item.title}}</p>
    <div class="itemInfo">
      <span class="itemPrice">￥{{item.price | priceFormat}}</span>
      <span class="itemCollect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    priceFormat(priceStr) {
      return priceStr.toString().padStart(2, "0");
    }
  }
}
</script>

<style lang="less" scoped>
  .goodsListItem {
    width: 48%;
    padding: 6px 2px;

    .itemImg {
      max-width: 100%;
      border-radius: 5px;
    }
    .itemText {
      margin-bottom: 10px;
      width: 100%;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }

    .itemInfo {
      display: flex;
      justify-content: space-between;
      
      .itemPrice {
        color: var(--color-high-text);
        
      }

      .itemCollect {
        position: relative;
      }
      .itemCollect::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -15px;
        right: 0;
        width: 14px;
        height: 14px;
        background-image: url("~assets/img/common/collect.svg");
        background-repeat: no-repeat;
        background-size: 14px;
        background-position: 0px 1px;
      }
    }
  }
</style>