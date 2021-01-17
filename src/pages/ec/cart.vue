<template>
  <div class="container shop-wrap shop-cart">
    <v-container>
      <h2 class="shop-ttl">買い物カゴ</h2>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec" nuxt>買い物を続ける</v-btn>
        </v-col>
      </v-row>

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
            <p v-if="product.quantity">{{ product.quantity }}個</p>
            </div>

          </v-col>
		  <v-col class="d-flex flex-row-reverse c-del" >
		    <v-btn @click="removeProduct(product.id)">削除</v-btn>
		  </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>

    <!-- 支払い方法 TODO これはコンポーネント化する -->
    <v-row class="p-list">
      <v-col cols="4" class="p-header">
        <v-subheader>支払方法</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-radio-group v-model="ecPaymentId">
          <v-radio label="カード決済" value="61" />
          <v-radio label="銀行振り込み" value="60" />
        </v-radio-group>
        <p v-if="ecPaymentId == '60'" class="body-1">
          振込先がメールで送信されますので、そちらで振込先をご確認ください。
        </p>
        <p v-if="ecPaymentId == '59'" class="body-1">
          コンビニ決済用のメールが送信されますので、そちらの案内にそってお支払いをお願いいたします。
        </p>
        <div v-if="ecPaymentId == '61'" class="card-wrapper">
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
        <p class="p-cell">¥ {{ totalPrice }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn @click="executePayment" nuxt class="btn-done">決済する</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn to="/ec" nuxt>EC TOPへ</v-btn>
      </v-col>
    </v-row>

    </v-container>

  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      loading: false,
      //productIds: [],
      products: [],
      selectedBox: [],
      ecPaymentId: "61",
      quantities: [1,2,3,4,5,6,7,8,9,10],
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      totalPrice: 0,
      rules: {
        required: (value) => !!value || "この項目は必須入力です",
        password_min: (v) => v.length >= 8 || "最低8文字以上を入力してください",
        zip_length: (v) => v.length <= 7 || "7文字の半角数字で入力してください",
        is_hankaku: (v) =>
          !!v.match(/^[ｦ-ﾟ 0-9]*$/) || "半角英数字で入力してください",
        is_card_number: (v) =>
          (v.length >= 14 && v.length <= 16) ||
          "16桁から18桁の数字で入力してください",
      },
    }
  },
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
      // TODO loading 入れたい
      // kurocoからデータを取得してみる
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${this.$auth.user.ec_cart_id}`)
      if(response.data.details.items) {
        response.data.details.items.forEach((item, index) => {
          //this.productIds.push(item.product_id)
          console.warn(` product_id : ${item.product_id}`)
          let self = this
          this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/${item.product_id}`).then((productInfoResponse) => {
            console.warn(productInfoResponse)
            self.products.push({
              id:       item.product_id,
              quantity: item.quantity,
              title:    productInfoResponse.data.details.topics_name,
              price:    productInfoResponse.data.details.product_data.ext_col_04,
              size:     productInfoResponse.data.details.product_name,
              image:    productInfoResponse.data.details.product_data.ext_columns.straight[0].file_url,
            })
            this.totalPrice += parseInt(productInfoResponse.data.details.product_data.ext_col_04)
          })
        })
      }

      // 商品データの取得
    },
    async executePayment() {
      console.warn("executePayment")
      let self = this
      self.loading = true
      // TODO 複数リクエストできるのか？
      self.products.forEach((product, index) => {
        // カード払い
        if(self.ecPaymentId == 61) {
          let paygentToken = new PaygentToken()
          paygentToken.createToken(
            process.env.PAYGENT_MERCHANT_ID,
            process.env.PAYGENT_TOKEN,
            {
              card_number:  self.cardNumber,
              expire_year:  self.cardYear,
              expire_month: self.cardMonth,
              cvc:          self.cardCvv,
              name:         self.cardName,
            },
            function(response) {
              self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
                ec_payment_id: parseInt(self.ecPaymentId),
                product_id: parseInt(product.id),
                quantity: parseInt(product.quantity),
              }).then((response) => {
                console.warn("成功!!!!!")
                console.warn(response)
                self.$store.dispatch("snackbar/snackOn")
                self.$router.push("/ec/done")
                self.loading = false
              }).catch(function (error) {
                self.$store.dispatch(
                  "snackbar/setError",
                  error.response.data.errors?.[0]
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
                return
              })
            }
          )
        } else {
          // 銀行振り込み
          self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
            ec_payment_id: parseInt(self.ecPaymentId),
            product_id: parseInt(product.id),
            quantity: parseInt(product.quantity),
          }).then(() => {
            self.$store.dispatch(
              "snackbar/setMessage",
              self.success_message +
              "メールをご確認の上、決済手続きをお願いいたします。"
            )
            self.$store.dispatch("snackbar/snackOn")
            self.$router.push("/ec/done")
            self.loading = false
          }).catch(function (error) {
            self.$store.dispatch(
              "snackbar/setError",
              error.response.data.errors?.[0]
            )
            self.$store.dispatch("snackbar/snackOn")
            self.loading = false
          })
        }
      })
    },
    removeProduct(productId) {
      this.$store.commit('products/removeCart', productId)
      this.$store.dispatch(
        "snackbar/setMessage",
        "商品を削除しました"
      )
      this.$store.dispatch("snackbar/snackOn")
      this.getProductInfo()
    }
  },
  mounted() {
    this.$store.commit('products/clearConfirmList')
    this.getProductInfo()
  }

}
</script>
