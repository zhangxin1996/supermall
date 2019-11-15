<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" :title="item.title" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      // 只需要发出一次即可
      if(!this.isLoad) {
        this.$emit('swiperImgLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>