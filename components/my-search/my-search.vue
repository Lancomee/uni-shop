<template>

  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17" ></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>

</template>

<script>
  export default {
    name: "my-search",
    props:{
      bgcolor:{
        type:String,
        default:'#C00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    data() {
      return {
        // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
        wh: 0,
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
    },
    methods:{
      
      // 点击模拟的input输入框
      searchBoxHandler(){
        // 触发外界通过@cilck绑定的事件处理函数
        this.$emit('click')
        
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
