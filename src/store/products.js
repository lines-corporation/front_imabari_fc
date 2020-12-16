export const state = () => ({
  list: []
})

export const mutations = {
  add(state, product) {
    state.list.push(product)
  },
  remove(state, { product }) {
    state.list.splice(state.list.indexOf(product), 1)
  },
}
