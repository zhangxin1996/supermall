<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center" class="home-title">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'

import {homeMultiData} from 'network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    homeMultiData().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
}
</script>

<style lang="less" scoped>
  .home-nav {
    // background: #fb696f;
    background: var(--color-tint);

    .home-title {
      font-size: 18px;
      color: #fff;
    }
  }
</style>