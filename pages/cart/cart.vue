<template>
  <view>
    <my-address></my-address>
    
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true" :num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  // 按需导入 mapState 这个辅助函数
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart']),
    },
    data() {
      return {
        options:[{
          text:"删除",
          style:{
            backgroundColor:'#C00000'
          }
        }]
      };
    },
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart']),
    },
    watch: {
      total: {
        handler(newVal) {
          this.setBadge()
        },
        immediate: true
      },

    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        console.log(e);
        this.updateGoodsState(e)

      },
      // 商品数量发生了变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
        console.log('e', e);
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
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
