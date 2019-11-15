<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="home-title">购物街</div>
    </nav-bar>
    <!-- 克隆的TabControl -->
    <tab-control ref="tabControlClone" 
                 class="tabControlClone"
                 :tabTitle="['流行', '新款', '精选']" 
                 @tabIndex="tabI"
                 v-show="istabFixed" />

    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            @getPosition="getPos"
            :pullUpLoad="true"
            @pullUpLoad="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control ref="tabControl" 
                   :tabTitle="['流行', '新款', '精选']" 
                   @tabIndex="tabI" />
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

import {debounce} from 'common/utils.js'

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
      isShowBackToIcon: false,
      tabOffsetTop: 0,
      istabFixed: false,
      saveY: 0
    }
  },
  created() {
    // 1、请求多个数据
    this.homeMultiData();

    // 2、请求商品数据
    this.goodsInfo('pop');
    this.goodsInfo('new');
    this.goodsInfo('sell');
  },
  mounted() {
    // 1、图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on('itemImgLoad', () => {
      refresh();
    })
  },
  activated() {
    // 当进入的时候，回到之前的y坐标
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 当离开的时候，记录当前的y坐标
    this.saveY = this.$refs.scroll.getScrollY();
    console.log(this.saveY);
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
      this.$refs.tabControlClone.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
      // console.log(this.tabCurrentType);
    },
    backTo() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    getPos(pos) {
      // 1、BackTop的显隐
      this.isShowBackToIcon = -(pos.y) > 1000;

      // 2、tabControlClone和tabControl的显隐
      this.istabFixed = -(pos.y) > this.tabOffsetTop;

    },
    loadMore() {
      this.goodsInfo(this.tabCurrentType);
    },
    swiperImgLoad() {
      // 所有的组件都有一个属性叫$el，用于获取组件中的元素的
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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

        // 每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法
        this.$refs.scroll.finishPullUp();
      })
    }
  },
}
</script>

<style lang="less" scoped>
  #home {
    height: 100vh;

    .home-nav {
      position: relative;
      z-index: 9;
      background: var(--color-tint);

      .home-title {
        font-size: 18px;
        color: #fff;
      }
    }

    .tabControlClone {
      position: relative;
      z-index: 9;
      left: 0;
      right: 0;
    }

    .content {
      overflow: hidden;
      background: #fff;
      position: fixed;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
  }

  
</style>