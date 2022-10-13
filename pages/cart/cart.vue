<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="(goods, i) in cart" :key="i">    
  <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler"></my-goods>
    </block>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  // 按需导入 mapState 这个辅助函数
  import {
    mapState
  } from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {

      };
    },
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart']),
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .cart-title {  
  height: 40px;  
  display: flex;
    align-items: center;  
  font-size: 14px;  
  padding-left: 5px;  
  border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
