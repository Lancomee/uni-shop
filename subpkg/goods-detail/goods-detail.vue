<template>
  <view>
    <view class="goods-detail-container" v-if="goods_info.goods_name">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
        <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
          <!-- 把当前点击的图片的索引，传递到 preview() 处理函数中 -->
          <image :src="item.pics_big" @click="preview(i)"></image>
        </swiper-item>

      </swiper>
      <!-- 商品信息区域 -->
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="price">￥{{goods_info.goods_price}}</view>
        <!-- 信息主体区域 -->
        <view class="goods-info-body">
          <!-- 商品名称 -->
          <view class="goods-name">{{goods_info.goods_name}}</view>
          <!-- 收藏 -->
          <view class="favi">
            <uni-icons type="star" size="18" color="gray"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <!-- 运费 -->
        <view class="yf">快递：免运费</view>
      </view>
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    </view>
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>


<script>
 // 从 vuex 中按需导出 mapState 辅助方法
 import { mapState } from 'vuex'
 import { mapMutations,mapGetters } from 'vuex'
  export default {
    data() {
      return {
        // 商品详情对象
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: "店铺"
        }, {
          icon: 'cart',
          text: "购物车",
          info: 0
        }],
        // 右边按钮组的配置对象
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        }, {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }]
      };
    },
    computed: {
        // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
        // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
        ...mapState('m_cart', ['cart']),
        ...mapGetters('m_cart',['total'])
      },
     watch: {
         // 定义 total 侦听器，指向一个配置对象
          total: {
             // handler 属性用来定义侦听器的 function 处理函数
             handler(newVal) {
                const findResult = this.options.find(x => x.text === '购物车')
                if (findResult) {
                   findResult.info = newVal
                }
             },
             // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
             immediate: true
          }
       },
    onLoad(options) {
      const goods_id = options.goods_id
      
      this.getGoodsDetail(goods_id)
      console.log(goods_id);
    },
  
    methods: {
         ...mapMutations('m_cart', ['addToCart']),
      // 定义请求商品详情数据的方法
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
        // 为 data 中的数据赋值  
        this.goods_info = res.message
        console.log('goods_info', this.goods_info);
      },
      preview(i) {
        uni.previewImage({
          // 调用previewImage()方法预览图片
          current: i,
          // map返回一个新数组，在新数组里包含所有图片的路径
          urls: this.goods_info.pics.map(x => x.pics_big)

        })
      },
      onClick(e) {
        console.log(e);
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        console.log(e)
        // this.options[0].info++
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
           // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
                this.addToCart(goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 700rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域的样式
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      // 收藏区域
      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    // 运费
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }

  .goods-detail-container {
    padding-bottom: 50px;
  }

  .goods_nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
