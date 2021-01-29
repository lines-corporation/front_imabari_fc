<template>
  <div class="container shop-wrap shop-cart shop-history">

    <v-container>
      <h2 class="shop-ttl">購入履歴</h2>

        <v-col cols="12" class="time-ttl">
          <h3> {{ purchaseDate }}</h3>
        </v-col>
        <!-- TODO 購入履歴ノーデータを確認できたらここを入れ替える(histories) -->
        <div v-for="product in products">
          <v-row no-gutters class="cart-list">
            <v-col class="c-img">
              <v-img
                :lazy-src="product.image"
                max-width="200"
                :src="product.image"
              ></v-img>
            </v-col>
            <v-col class="c-txt">
              <div>
              <h3>{{ product.title }}</h3>
              <p>¥ {{ product.price }}</p>
              <p>{{ product.size }}</p>
              <p>個数 {{ product.quantity }}個</p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      <v-row>
        <v-col cols="6">
          <v-btn to="/ec/histories" nuxt>購入履歴一覧へ</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn to="/ec" nuxt>EC TOPへ</v-btn>
        </v-col>
      </v-row>


    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    purchaseDate: "",
    totalPaymentPrice: 0,
    products: []
  }),
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
  },
  methods: {
    async getHistory() {
      const ids = this.$route.params.id.split(',')
      let self = this
      ids.forEach(async (id) => {
        const response = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/history/${id}`)
        self.purchaseDate = response.data.details.inst_ymdhi.replace(" +0900", "")
        self.totalPaymentPrice = parseInt(response.data.details.total)
        response.data.details.order_details.forEach((order) => {
          self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/${order.product_id}`).then((productInfoResponse) => {
            self.products.push({
              id:       order.product_id,
              quantity: order.quantity,
              title:    productInfoResponse.data.details.topics_name,
              price:    productInfoResponse.data.details.product_data.ext_col_04,
              size:     productInfoResponse.data.details.product_name,
              image:    productInfoResponse.data.details.product_data.ext_columns.straight[0].file_url,
            })
          })
        })
      })
    }
  },
  mounted() {
    this.getHistory()
  }
}
</script>
