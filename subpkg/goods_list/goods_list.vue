<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 分类ID
          cid: '',
          // 页数索引 
          pagenum: 1,
          // 每页长度
          pagesize: 10
        },
        // 商品列表数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 默认空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 节流阀,是否请求数据
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = res.message.goods
        this.total = res.message.total
        console.log('goodsList', this.goodsList);
      },
      // 触底事件
      onReachBottom() {
        // 判断是否还有下一页的数据，
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('加载完毕')
        // 判断是否正在请求其他数据，如果是，则不发起额外的请求
        if (this.isLoading) return
        // 让页码自增+1
        this.queryObj.pagenum += 1
        // 重新获取列表数据
        this.getGoodsList()
      },
      // 下拉刷新
      onPullDownRefresh() {
        // 1. 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        // 重新发起请求
        this.getGoodsList(() => {
          uni.stopPullDownRefresh()
        })
      },
      async getGoodsList(cb) {
        this.isLoading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        // 只要数据请求完毕，就立即按需调用cb回调函数
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值，沟通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total

      },
      gotoDetail(item) {
        console.log(11);
        uni.navigateTo({
          url:'/subpkg/goods-detail/goods-detail?goods_id=' + item.goods_id
        })
        console.log(22);
      }
    }
  }
</script>

<style lang="scss" scroped>
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;

      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
