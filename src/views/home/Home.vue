<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="home-title">购物街</div>
    </nav-bar>
    <scroll 
      class="content" 
      ref="scroll" 
      :probeType="3" 
      @getPosition="getPos" 
      :pullUpLoad="true" 
      @getMore="getMore">
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control :tabTitle="['流行', '新款', '精选']" @tabIndex="tabI" />
      <goods-list :goodsItem="goods[tabCurrentType].info" />
    </scroll>
    <back-to-top @click.native="backTo" v-show="isShowBackToIcon" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackToTop from 'components/content/backToTop/BackToTop'

import {homeMultiData, goodsInfo} from 'network/home.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackToTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, info: []},
        'new': {page: 0, info: []},
        'sell': {page: 0, info: []}
      },
      tabCurrentType: 'pop',
      isShowBackToIcon: false
    }
  },
  created() {
    // 请求多个数据
    this.homeMultiData();

    // 请求商品数据
    this.goodsInfo('pop');
    this.goodsInfo('new');
    this.goodsInfo('sell');
  },
  methods: {
    // 进行事件相关的方法
    tabI(index) {
      switch (index) {
        case 0:
          this.tabCurrentType = "pop";
          break;
        case 1:
          this.tabCurrentType = "new";
          break;
        case 2:
          this.tabCurrentType = "sell";
          break;
      }
      // console.log(this.tabCurrentType);
    },
    backTo() {
      this.$refs.scroll.backToTop(0, 0, 500);
    },
    getPos(pos) {
      const posY = Math.abs(Math.floor(pos.y));
      this.isShowBackToIcon = posY > 1000;
    },
    getMore() {
      // console.log("加载更多");
      this.goodsInfo(this.tabCurrentType);
    },

    // 进行网络封装的方法
    homeMultiData() {
      homeMultiData().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    goodsInfo(type) {
      let page = this.goods[type].page + 1;
      goodsInfo(type, page).then(res => {
        // console.log(res);
        this.goods[type].info.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      })
    }
  },
}
</script>

<style lang="less" scoped>
  #home {
    height: 100vh;
    padding: 44px 0 49px;

    .home-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9;
      background: var(--color-tint);

      .home-title {
        font-size: 18px;
        color: #fff;
      }
    }

    .content {
      overflow: hidden;
      position: fixed;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
  }
</style>