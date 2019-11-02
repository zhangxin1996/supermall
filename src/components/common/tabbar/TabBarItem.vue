<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="acColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    link: {
      type: String
    },
    activeColor: {
      type: String,
      default: '#f00'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link);
    }
  },
  computed: {
   isActive() {
     return this.$route.path.indexOf(this.link) != -1;
   },
   acColor() {
     return this.isActive? {'color': this.activeColor} : {}
   }
  }
}
</script>

<style lang="less" scoped>
  .tabbar-item {
    flex: 1;
    height: 49px;
    text-align: center;

    img {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      margin-bottom: 2px;
      vertical-align: middle;
    }

    div {
      font-size: 14px;
    }
  }
</style>