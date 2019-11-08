<template>
  <div class="tabControl">
    <div class="tabControl-item" v-for="(item,index) in tabTitle" :key="item" @click="tabClick(index)" >
      <span :class="{'active':currentIndex === index}">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    tabTitle: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabIndex', index);
    }
  },
}
</script>

<style lang="less" scoped>
  .tabControl {
    position: sticky;
    top: 44px;
    z-index: 8;
    display: flex;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: var( --color-text);
    font-size: 16px;
    font-weight: bold;

    .tabControl-item {
      flex: 1;
    }
  }
  .active {
    border-bottom: 4px solid var(--color-high-text);
    padding: 0 10px 3px;
  }
</style>