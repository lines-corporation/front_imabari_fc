<template>
  <div class="container shop-wrap shop-cart">
    <v-container>
	  <h2 class="shop-ttl">ご注文内容の確認</h2>
      <!-- ここをループさせる -->
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
            <p v-if="product.size">size : {{ product.size }}</p>
            <p>個数 {{ product.num }}個</p>
            </div>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec/cart" nuxt>戻る</v-btn>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
export default {
  auth: true,
  data: () => ({
    ecPaymentId: "58",
    quantities: [1,2,3,4,5,6,7,8,9,10],
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    loading: false,
    products: [],
    rules: {
      required: (value) => !!value || "この項目は必須入力です",
      is_hankaku: (v) =>
        !!v.match(/^[ｦ-ﾟ 0-9]*$/) || "半角英数字で入力してください",
      is_card_number: (v) =>
        (v.length >= 14 && v.length <= 16) ||
      "16桁から18桁の数字で入力してください",
    },
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
    async getProductInfo() {
      let id = ""
      let num = ""
      this.$store.state.products.comfirmlist.forEach((productInfo, index) => {
        // TODO ここはいくつもの商品を扱えるようにする
        id = productInfo.id
        num = productInfo.num
      })
      console.warn(id)
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/${id}`)
      console.warn(response)
      // 商品名 : response.data.details.topics_name
      // 価格  :  response.data.details.product_data.ext_col_04
      // size :  response.data.details.product_name
      // 画像 :   response.data.details.product_data.ext_columns.straight[0].file_url
      this.products = []
      this.products.push({
        id:    response.data.details.product_id,
        title: response.data.details.topics_name,
        price: response.data.details.product_data.ext_col_04,
        size:  response.data.details.product_name,
        num:   num,
        image: response.data.details.product_data.ext_columns.straight[0].file_url,
        //image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      })
    },
    async executePayment() {
      console.warn("executePayment")
      let self = this

/*
      this.products.forEach((product, index) => {

      })
*/

      // TODO 複数リクエストできるのか？
      const response = this.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
        ec_payment_id: parseInt(this.ecPaymentId),
        product_id: parseInt(this.products[0].id),
        quantity: parseInt(this.products[0].num),
      }).catch(function (error) {
        this.$store.dispatch(
          "snackbar/setError",
          error.response.data.errors?.[0]
        )
        this.$store.dispatch("snackbar/snackOn")
        this.loading = false
        return
      })

      // TODO 銀行振り込みの場合
      if(this.ecPaymentId == '60') {
        this.$store.dispatch(
          "snackbar/setMessage",
          self.success_message +
          "メールをご確認の上、決済手続きをお願いいたします。"
        )
      } else {
        // クレジットカード払いの場合
        "snackbar/setMessage",
        self.success_message +
        "購入処理が完了しました"
      }
      self.$store.dispatch("snackbar/snackOn")
      self.$router.push("/ec/done")
      self.loading = false
    }
  },
  mounted() {
    this.getProductInfo()
  }
}
</script>
