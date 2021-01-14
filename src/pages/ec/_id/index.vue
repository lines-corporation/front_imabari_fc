<template>
  <div class="container shop-wrap">
    <v-container>
      <v-row class="d-flex flex-row-reverse">
        <v-col cols="2" class="cart-nvi" @click="moveCart">
          <v-badge
            v-if="$store.state.products.cartList.length > 0"
            color="green"
            :content="$store.state.products.cartList.length"
          >
            <v-icon large color="darken-2">
              mdi-cart-variant
            </v-icon>
          </v-badge>
          <v-icon v-else large color="darken-2">
            mdi-cart-variant
          </v-icon>
        </v-col>
      </v-row>

      <v-row no-gutters class="m-6">
        <v-col>
          <v-img
            :lazy-src="imageUrl"
            :src="imageUrl"
            max-width="500"
          ></v-img>
        </v-col>
        <v-col>
          <!-- サムネイル -->
          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group class="pa-4" center-active show-arrows>
              <v-slide-item v-for="(image, index) in images" :key="`image-${index}`" v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-4"
                width="101"
                @click="toggle"
              >
                <v-row class="fill-height" ALIGN="CENTER" justify="center">
                  <v-img
                    :lazy-src="image"
                    :src="image"
                    max-width="101"
                    @click="changeImage(image)"
                  ></v-img>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
          <h3>{{ productName }}</h3>
          <p>¥ {{ price }}</p>
          <v-textarea
            v-if="seasonPassFlg"
            name="input-7-1"
            filled
            label="シーズンパスのご希望の席を誤入力ください"
            v-model="seasonPassRemarks"
          ></v-textarea>
          <!-- select box -->
          <v-select
            v-else
            :items="sizes"
            label="Size"
            outlined
          ></v-select>

        </v-col>
      </v-row>

      <!-- 商品説明 -->
      <v-row class="m-6">
        <v-card elevation="2" tile>
          <v-card-title>商品説明</v-card-title>
          <v-card-text>
            <div>{{ description }}</div>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row class="spacing-playground pa-6">
        <v-btn @click="addCart" color="primary" elevation="2" large>カートに入れる</v-btn>
      </v-row>
      <v-row class="spacing-playground pa-6">
        <v-btn to="/ec" nuxt>一覧に戻る</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    productName: '',
    price: 0,
    sizes: [],
    seasonPassFlg: false, // シーズンパスの場合には入力項目が少し変わる
    //imageUrl: 'https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg',
    imageUrl: null,
    images: [],
    description: ``,
    seasonPassRemarks: ""
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
    // 商品情報の取得
    async getProducts(topics_id) {
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/topic/${topics_id}`)
      console.warn(response)
      // id
      // 商品名 : subject
      // カテゴリー : contents_type_nm
      // 価格 : data.details.ext_col_04
      // 商品詳細 : ext_col_03
      // 注意書き? : ext_col_02
      this.description = response.data.details.ext_col_03
      this.price = response.data.details.ext_col_04
      this.productName = response.data.details.subject
      this.category = response.data.details.contents_type
      // シーズンパス稼働波の判定
      if(response.data.details.contents_type == 33) {
        this.seasonPassFlg = true
      }

      // サイズや写真などの複数商品データの取得
      let response2 = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list?topics_id=${topics_id}`)
      this.sizes = []
      response2.data.list.forEach((product, index) => {
        this.sizes.push(product.product_name)
        this.pickupImages(product.product_data)
        this.productId = product.product_id
      })
      // TODO とりあえず初めの商品を入れる
      // カートの情報整理
    },
    async addCart() {
      // 未ログインユーザーは購入できない
      if(!this.$auth.loggedIn) {
        this.$store.dispatch("snackbar/setError", "購入するには会員登録が必要です")
        this.$store.dispatch("snackbar/snackOn")
        return
      }

      // 商品をカートに保存する
      this.$store.commit('products/addCart', this.productId)
      /*
      console.warn("shop cart add")
      let response = await this.$auth.ctx.$axios.post(`/rcms-api/1/shop/cart`, {
        item: {
          product_id: this.productId,
          quantity: 1
        }
      })
      console.warn(response)
      */

      this.$store.dispatch(
        "snackbar/setMessage",
        "商品を追加しました"
      )
      this.$store.dispatch("snackbar/snackOn")
    },
    moveCart() {
      this.$router.push("/ec/cart")
    },
    changeImage(image) {
      this.imageUrl = image
    },
    // 商品画像の抜き出し TODO 共通化したい
    pickupImages(data) {
      this.images = []
      data.ext_columns.straight.forEach((info, index) => {
        // とりあえず今表示される画像データがなけれrば入れる
        if(info.file_url) {
          if(!this.imageUrl) {
            this.imageUrl = info.file_url
          }
          this.images.push(info.file_url)
        }
      })
      console.warn(this.images)
    },
  },
  mounted() {
    this.getProducts(this.$route.params.id)
  }
}
</script>
