<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      // 是否展示价格右测的组件
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      // 把数字处理为带两位小数的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        // 通过this.$emit()触发外界通过@绑定的radio-change事件,将参数传给radio-change事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      // numberBox组件的change事件处理函数
      numberChangeHandler(val){
        this.$emit('num-change',{
          // 商品的id
          goods_id:this.goods.goods_id,
          // 商品的最新数量
          goods_count:+val,   
        })
        console.log('this.goods_count',this.goods_count);
      }
    }
  }
</script>

<style lang="scss" scroped>
  .goods-item {
      // 让 goods-item 项占满整个屏幕的宽度
      width: 750rpx;
      // 设置盒模型为 border-box
      box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
      
    }
  }
</style>
