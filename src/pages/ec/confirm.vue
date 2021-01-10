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


      <v-row class="p-list">
        <v-col cols="4" class="p-header">
          <v-subheader>支払方法</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-radio-group v-model="ecPaymentId">
            <v-radio label="カード決済" value="58" />
            <v-radio label="銀行振り込み" value="60" />
          </v-radio-group>
          <p v-if="ecPaymentId == '60'" class="body-1">
            振込先がメールで送信されますので、そちらで振込先をご確認ください。
          </p>
          <p v-if="ecPaymentId == '59'" class="body-1">
            コンビニ決済用のメールが送信されますので、そちらの案内にそってお支払いをお願いいたします。
          </p>
          <div v-if="ecPaymentId == '58'" class="card-wrapper">
            <v-text-field
              id="cardNumber"
              v-model="cardNumber"
              label="クレジットカード番号"
              outlined
              :rules="[rules.required]"
            />
            <v-text-field
              id="cardName"
              v-model="cardName"
              label="お名前（ローマ字）"
              outlined
              :rules="[rules.required]"
            />
            <v-row dense>
              <v-col cols="4">
                <v-select
                  v-model="cardMonth"
                  :items="[
                    { value: '1', text: '1月' },
                    { value: '2', text: '2月' },
                    { value: '3', text: '3月' },
                    { value: '4', text: '4月' },
                    { value: '5', text: '5月' },
                    { value: '6', text: '6月' },
                    { value: '7', text: '7月' },
                    { value: '8', text: '8月' },
                    { value: '9', text: '9月' },
                    { value: '10', text: '10月' },
                    { value: '11', text: '11月' },
                    { value: '12', text: '12月' },
                  ]"
                  menu-props="auto"
                  label="月"
                  hide-details
                  single-line
                  outlined
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="cardYear"
                  :items="[
                    { value: '20', text: '2020年' },
                    { value: '21', text: '2021年' },
                    { value: '22', text: '2022年' },
                    { value: '23', text: '2023年' },
                    { value: '24', text: '2024年' },
                    { value: '25', text: '2025年' },
                    { value: '26', text: '2026年' },
                    { value: '27', text: '2027年' },
                    { value: '28', text: '2028年' },
                    { value: '29', text: '2029年' },
                    { value: '30', text: '2030年' },
                  ]"
                  menu-props="auto"
                  label="年"
                  hide-details
                  single-line
                  outlined
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  id="cardCvv"
                  v-model="cardCvv"
                  label="CVV"
                  outlined
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-row class="p-list">
        <v-col cols="4" class="p-header">
          <v-subheader>合計金額</v-subheader>
        </v-col>
        <v-col cols="8">
          <p class="p-cell">¥ 2500</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn @click="executePayment" nuxt class="btn-done">決済する</v-btn>
        </v-col>
      </v-row>



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
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        // response.data.details.product_data.ext_columns.straight[0].file_url
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
