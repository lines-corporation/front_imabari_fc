// client初期化時の動作
export const actions = {
  nuxtClientInit({ commit }, context) {
    let productIdsStr = localStorage.getItem("imabari-shop") || []
    if(typeof(productIdsStr) == 'string') {
      productIdsStr.split(',').forEach((productId,index) => {
        commit('products/addCart', productId)
      })
    }
  }
}
