<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1、创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2、获取滚动实时位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (pos) => {
        this.$emit('getPosition', pos);
      })
    }
    
    // 3、监听scroll滚到底部，下拉刷新
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad');
      })
    }
  },
  methods: {
    // 返回顶部的方法
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 从新计算better-scroll，当DOM结构发生变化的时候重新调用
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style lang="less" scoped>
</style>