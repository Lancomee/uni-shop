export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    // 读取本地存储的购物车数据，对 cart 数组进行初始化
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    
  }),

  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      if (!findResult) {
        // 如果新来的商品以前不存在cart里，则加入购物车
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
       // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
       this.commit('m_cart/saveToStorage')
    },
    // 数据持久化存储到本地
      saveToStorage(state){
        uni.setStorageSync('cart',JSON.stringify(state.cart))
      }
  },


  // 模块的 getters 属性
  getters: {
    // 统计购物车中商品的总数量
      total(state) {
         let c = 0
         // 循环统计商品的数量，累加到变量 c 中
         state.cart.forEach(goods => c += goods.goods_count)
         return c
      }
  },
}
