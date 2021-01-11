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
            </div>
            <!-- select box -->
            <v-select
              v-model="selectedBox"
              class="p-select"
              :ref="`${product.id}_num`"
              :items="product.items"
              label="個数"
              outlined
            ></v-select>

          </v-col>
		  <v-col class="d-flex flex-row-reverse c-del" >
		    <v-btn @click="removeProduct(product.id)">削除</v-btn>
		  </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>

    <!-- 支払い方法 TODO これはコンポーネント化する -->
    <v-row>
      <v-col cols="12">
        <v-btn
          @click="moveConfirm"
          block
          x-large
          color="success"
          dark
          :loading="loading"
        >
          確認
        </v-btn>
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
      products: [],
      selectedBox: [],
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
      // product_idを取得する
      let id = ""
      this.$store.state.products.cartList.forEach((productId, index) => {
        // TODO ここはいくつもの商品を扱えるようにする
        id = productId
      })
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/${id}`)
      console.warn(response)
      // 商品名 : response.data.details.topics_name
      // 価格  :  response.data.details.product_data.ext_col_04
      // size :  response.data.details.product_name
      // 画像 :   response.data.details.product_data.ext_columns.straight[0].file_url
      this.products.push({
        id:    response.data.details.product_id,
        title: response.data.details.topics_name,
        price: response.data.details.product_data.ext_col_04,
        size:  response.data.details.product_name,
        items: [1,2,3,4,5,6,7,8,9,10],
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        // response.data.details.product_data.ext_columns.straight[0].file_url
      })
    },
    moveConfirm() {
      this.products.forEach((product, index) => {
        let num = this.$refs[`${product.id}_num`][0].selectedItems[0]
        console.warn(product)
        this.$store.commit('products/addConfirmList', { id: product.id, num: num })
      })
      this.$router.push("/ec/confirm")
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
