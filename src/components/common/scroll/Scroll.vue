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
    this.scroll.on('scroll', (pos) => {
      // console.log(pos);
      this.$emit('getPosition', pos);
    })

    // 3、上拉加载更多
    this.scroll.on('pullingUp', () => {
      // console.log("上拉加载更多");
      this.$emit('getMore');
    })
  },
  methods: {
    backToTop(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
    // 标识一次上拉加载动作结束
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
}
</script>

<style lang="less" scoped>
</style>