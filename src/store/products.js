export const state = () => ({
  comfirmlist: [],
  cartList: []
})

export const mutations = {
  addCart(state, product) {
    state.cartList.push(product)
    localStorage.setItem("imabari-shop", state.cartList)
  },
  removeCart(state, { product }) {
    state.cartList.splice(state.cartList.indexOf(product), 1)
    localStorage.setItem("imabari-shop", state.cartList)
  },
  // 購入確認への追加
  addConfirmList(state, product) {
    state.comfirmlist.push(product)
  },
  // 購入確認のリセット
  clearConfirmList(state) {
    state.comfirmlist.splice(-state.comfirmlist.length)
  }
}
