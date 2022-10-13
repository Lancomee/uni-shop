<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="搜索"></uni-search-bar>
    </view>
    <!-- 显示搜索列表 -->
    <view class="search-list" v-if="searchResults.length!==0">
      <view class="search-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="right" size="17"></uni-icons>
      </view>
    </view>

    <!-- 历史记录  -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" type="default" size="small" v-for="(item,i) in historyList" :key="i"
          @click="gotoGoodsList(item)" />
      </view>
    </view>
  </view>


</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 历史记录
        historyList: ['a', 'b', 'c']
      };
    },
    onLoad() {
      // 加载本地存储的搜索记录
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
  methods: {
    // input 输入事件的绑定
    input(e) {
  
      // 防抖功能--使用定定时器
      // 清除 timer 对应的延时器
      clearTimeout(this.timer)
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        this.kw = e
        console.log(this.kw);
        this.getSearchList()
  
      }, 500)
    },
    async getSearchList() {
      // 判断关键字是否为空
      if (this.kw === '') {
        this.searchResults = []
        return
      }
      const {
        data: res
      } = await uni.$http.get('/api/public/v1/goods/qsearch', {
        query: this.kw
      })
      if (res.meta.status !== 200) return uni.$showMsg()
      this.searchResults = res.message
      console.log('searchRes', this.searchResults);
      // 查询到搜索建议之后，将关键词放到historylist里
      this.saveSearchHistory()
    },
    gotoDetail(goods_id) {
      uni.navigateTo({
        url: '/subpkg/goods-detail/goods-detail?goods_id=' + goods_id
      })
    },
    // 保存搜索的关键字
    saveSearchHistory() {
      this.historyList.push(this.kw)
      // 去重处理
      this.historyList = [...new Set(this.historyList)]
      uni.setStorageSync('kw', JSON.stringify(this.historyList))
    },
    cleanHistory() {
      this.historyList = []
      uni.setStorageSync('kw', '[]')
    },
    // 点击搜索历史跳转到商品列表页
    gotoGoodsList(kw) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?query=' + kw
      })
    }
  }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-list {
    padding: 0 5px;

    .search-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 10px;

    .history-title {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      position: relative;

      uni-icons {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
        font-size: 13px;
        ;
      }
    }
  }
</style>
