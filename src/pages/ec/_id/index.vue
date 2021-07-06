<template>
  <div class="container shop-wrap">
    <v-container>
      <v-row class="d-flex flex-row-reverse">
        <v-col cols="2" class="cart-nvi" @click="moveCart">
          <v-badge
            v-if="cartItems.length > 0"
            color="green"
            :content="total_quantity"
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
          　v-cloak
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
                  　v-cloak
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
          <p v-if="flag">有料会員限定の割引価格 ¥ {{ discount }}</p>
          <p v-if="discount_price > 0">特別価格 ¥ {{ special_price }}</p>
          <!--シーズンパス以外及びSKU一つの場合-->
          <v-select
            v-if="apparelFlg"
            v-model="productVal"
            @change="getSelectedOne()"
            :items="sku_one"
            label="選択"
            outlined
          ></v-select>

          <!-- シーズンパスの場合には種別を選択させる -->
          <v-select
            v-if="seasonPassFlg"
            v-model="seasonPassVal"
            @change="getSelectedOne()"
            class="p-select"
            :ref="`${productId}_num`"
            :items="sku_one"
            label="選択"
            outlined
          ></v-select>

          <v-select
            v-if="apparelFlg && second_flag == 2"
            v-model="productId"
            :ref="`${productId}_num`"
            label="選択"
            :items="name_result"
            item-text="name_second"
            item-value="id"
            outlined
          ></v-select>


          <v-select
            v-if="seasonPassFlg && second_flag == 2"
            v-model="seasonPassKind"
            class="p-select"
            :ref="`${productId}_num`"
            :items="name_result"
            item-text="name_second"
            item-value="id"
            label="選択"
            outlined
          ></v-select>

          <v-select
            v-if="apparelFlg && second_flag == 3"
            v-model="productVal2"
            @change="getSelectedTwo()"
            :ref="`${productId}_num`"
            label="選択"
            :items="sku_two"
            outlined
          ></v-select>

          <v-select
            v-if="seasonPassFlg && second_flag == 3"
            v-model="seasonPassVal2"
            @change="getSelectedTwo()"
            class="p-select"
            :ref="`${productId}_num`"
            :items="sku_two"
            label="選択"
            outlined
          ></v-select>

           <v-select
            v-if="apparelFlg && second_flag == 3"
            v-model="productId"
            :ref="`${productId}_num`"
            label="選択"
            :items="sku_three"
            item-text="name_third"
            item-value="id"
            outlined
          ></v-select>


          <v-select
            v-if="seasonPassFlg && second_flag == 3"
            v-model="seasonPassKind"
            class="p-select"
            :ref="`${productId}_num`"
            :items="sku_three"
            item-text="name_third"
            item-value="id"
            label="選択"
            outlined
          ></v-select>

          <v-select
            v-if="apparelFlg && second_flag > 3"
            v-model="productId"
            :ref="`${productId}_num`"
            label="選択"
            :items="more_three"
            item-text="name_last"
            item-value="id"
            outlined
          ></v-select>

          <v-select
            v-if="seasonPassFlg && second_flag > 3"
            v-model="seasonPassKind"
            class="p-select"
            :ref="`${productId}_num`"
            :items="more_three"
            item-text="name_last"
            item-value="id"
            label="選択"
            outlined
          ></v-select>


          <!-- 個数設定 -->
          <v-select
            v-if="apparelFlg && stock != 0 && stock != null"
            v-model="quantity"
            class="p-select"
            :ref="`${productId}_num`"
            :items="items"
            label="個数"
            outlined
          ></v-select>
          <!-- シーズンパスの場合には個数設定 -->
          <v-select
            v-if="seasonPassFlg && stock != 0 && stock != null"
            v-model="quantity"
            class="p-select"
            :ref="`${productId}_num`"
            :items="items"
            label="個数"
            outlined
          ></v-select>

          <!-- シーズンパスの在庫数「無制限」場合には個数設定 -->
          <v-select
            v-if="seasonPassFlg && stock_unlimited == 1"
            v-model="quantity"
            class="p-select"
            :ref="`${productId}_num`"
            :items="items"
            label="個数"
            outlined
          ></v-select>
          <!-- 個数設定 -->
          <v-select
            v-if="apparelFlg && stock_unlimited == 1"
            v-model="quantity"
            class="p-select"
            :ref="`${productId}_num`"
            :items="items"
            label="個数"
            outlined
          ></v-select>


          <!-- /シーズンパスの場合には売り切れ -->
          <v-btn
            v-if="seasonPassFlg && getStock(seasonPassKind) && stock == 0 && stock != null && stock_unlimited != 1"
            depressed
            text
            color="red lighten-1"
            class="sell-out"
          >
            売り切れ
          </v-btn>
           <!-- /売り切れ -->
          <v-btn
            v-if="apparelFlg && getStock(productId) && stock == 0 && stock != null && stock_unlimited != 1"
            depressed
            text
            color="red lighten-1"
            class="sell-out"
          >
            売り切れ
          </v-btn>
          <!--<v-select
            class="p-select"
            label="クーポンコード"
            outlined
          ></v-select>
          <p style="margin-top: -20px;">クーポンコードをお持ちの方は入力してください。</p>-->

        </v-col>
      </v-row>

      <!-- 商品説明 -->
      <v-row class="m-6">
        <v-card elevation="2" tile>
          <v-card-title>商品説明</v-card-title>
          <v-card-text>
            <p v-html = "description" />
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
    flag: false,
    stock: null,
    discount: 0,
    sale_limit: null,
    stock_unlimited: null,
    total_quantity: 0,
    discount_price: 0,
    special_price: 0,
    productId: '',
    productName: '',
    price: 0,
    sizes: [],
    quantity: 1,
    items: [1,2,3,4,5,6,7,8,9,10], // 個数選択
    seasonPassFlg: false, // シーズンパスの場合には入力項目が少し変わる
    apparelFlg: false,
    passCategories: [],
    seasonPassKind: '',
    //imageUrl: 'https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg',
    imageUrl: null,
    images: [],
    cartItems: [],
    description: "",
    split_flag: true,
    sku_one: [],
    sku_two: [],
    sku_three: [],
    more_three: [],
    productVal: null,
    seasonPassVal: null,
    productVal2: null,
    seasonPassVal2: null,
    apparelId: 1111,
    num_flag: true,
    name_third: [],
    result: null,
    second_length: null,
    second_flag: true,
    seasonId: null,
    first_flag: null
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
    async getStock(productId) {
      let self = this
      let result = await self.$auth.ctx.$axios.get(`rcms-api/1/shop/product/list?topics_id=${self.$route.params.id}`)
      let stamp = result.data.list.filter(item =>
        productId == item.product_id
      )
      if (stamp[0] != "" && stamp[0] != null ){
        self.stock = stamp[0].stock
        self.discount_price = stamp[0].discount_price
        self.special_price = stamp[0].price_02
        self.stock_unlimited = stamp[0].stock_unlimited
        self.sale_limit = stamp[0].sale_limit
        self.discount = stamp[0].group_price
        if(self.discount == null || self.discount == 0 || Object.values(JSON.parse(JSON.stringify(self.$auth.user.group_ids)))[0] == "無料会員"){
          self.flag = false
        } else {
          self.flag = true
        }
      }
    },
    async getStock(seasonPassKind) {
      let self = this
      let result = await self.$auth.ctx.$axios.get(`rcms-api/1/shop/product/list?topics_id=${self.$route.params.id}`)
      let stamp = result.data.list.filter(item =>
        seasonPassKind == item.product_id
      )
      if (stamp[0] != "" && stamp[0] != null ){
        self.stock = stamp[0].stock
        self.discount_price = stamp[0].discount_price
        self.special_price = stamp[0].price_02
        self.stock_unlimited = stamp[0].stock_unlimited
        self.sale_limit = stamp[0].sale_limit
        self.discount = stamp[0].group_price
        if(self.discount == null || self.discount == 0 || Object.values(JSON.parse(JSON.stringify(self.$auth.user.group_ids)))[0] == "無料会員"){
          self.flag = false
        } else {
          self.flag = true
        }
      }
    },
    // 商品情報の取得
    async getProducts(topics_id) {
      let self = this
      let paramStr = '?cnt=999'
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/topic/${topics_id}`)
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

      // カテゴリーIDを取得
      let category_list = []
      let response4 = await this.$auth.ctx.$axios.get(`rcms-api/1/shop/categories`)
      // シーズンパスIDを取得
      let seasonpass_list= response4.data.list.filter(item => item.category_nm == "年間パス")
      let seasonpass_id = seasonpass_list[0].contents_type
      // シーズンパス以外のIDを取得
      let season_besides = response4.data.list.filter(item => item.category_nm != "年間パス")
      season_besides.forEach(item => {
      self.topics_category_id = parseInt(item.topics_category_id)
      category_list.push(self.topics_category_id)
      })
      // シーズンパス稼働波の判定
      if(this.category == seasonpass_id) {
        this.seasonPassFlg = true
      }
      if(category_list.includes(this.category)) {
        this.apparelFlg = true
      }

      // サイズや写真などの複数商品データの取得
      let response2 = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}&topics_id=${topics_id}`)

      let name_list = []
      response2.data.list.forEach(product => {
        self.pickupImages(product.product_data)
        name_list.push(product.combination_name.split(",")[0])
        function unique (arr) {
          return Array.from(new Set(arr))
        }
        self.sku_one = unique(name_list)
      })
    },

    //SKUの判断
    async getSelectedOne() {
        let self = this
        let paramStr = '?cnt=999'
        let sizes = []
        let name_result = []
        let name_list = []
        let more_three = []
        let response2 = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}&topics_id=${self.$route.params.id}`)
        if(self.seasonPassFlg) {
          self.seasonPassKind = ""
          self.seasonPassVal2 = ""
          sizes = response2.data.list.filter(item => item.combination_name.split(",")[0] == self.seasonPassVal)
          sizes.forEach(item => {
            self.second_flag = item.combination_name.split(",").length
            if(self.second_flag == 1) {
              self.seasonPassKind = sizes[0].product_id
            } else if(self.second_flag == 2) {
              name_result.push({
                 id:item.product_id,
                 name_second:item.combination_name.split(",")[1]
              })
              self.name_result = name_result
            } else if (self.second_flag == 3) {
              name_list.push(item.combination_name.split(",")[1])
              function unique (arr) {
                return Array.from(new Set(arr))
              }
              self.sku_two = unique(name_list)
            } else if(self.second_flag > 3) {
              more_three.push({
                id: item.product_id,
                name_last: item.combination_name.substring(item.combination_name.indexOf(",") + 1)
              })
              self.more_three = more_three
            }
          })
        }
        if(self.apparelFlg) {
          self.productId = ""
          self.productVal2 = ""
          
          sizes = response2.data.list.filter(item => item.combination_name.split(",")[0] == self.productVal)
          sizes.forEach(item => {
            self.second_flag = item.combination_name.split(",").length
            if(self.second_flag == 1) {
              self.productId = sizes[0].product_id
            } else if(self.second_flag == 2) {
              name_result.push({
                 id:item.product_id,
                 name_second:item.combination_name.split(",")[1]
              })
              self.name_result = name_result
            } else if (self.second_flag == 3) {
              name_list.push(item.combination_name.split(",")[1])
              function unique (arr) {
                return Array.from(new Set(arr))
              }
              self.sku_two = unique(name_list)
            } else if(self.second_flag > 3) {
              more_three.push({
                id: item.product_id,
                name_last: item.combination_name.substring(item.combination_name.indexOf(",") + 1)
              })
              self.more_three = more_three
            }
          })
        }
    },

    async getSelectedTwo() {
        let self = this
        let paramStr = '?cnt=999'
        let name_third = []
        let sku_three = []
        let response2 = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}&topics_id=${self.$route.params.id}`)
        if(self.apparelFlg) {
          self.productId = ""
          name_third = response2.data.list.filter(item => item.combination_name.split(",")[0] == self.productVal && item.combination_name.split(",")[1] == self.productVal2)
          name_third.forEach(item => {
            sku_three.push({
              id: item.product_id,
              name_third: item.combination_name.split(",")[2]
            })
          })
          self.sku_three = sku_three
        } else if(self.seasonPassFlg) {
          self.seasonPassKind = ""
          name_third = response2.data.list.filter(item => item.combination_name.split(",")[0] == self.seasonPassVal && item.combination_name.split(",")[1] == self.seasonPassVal2)
          name_third.forEach(item => {
            sku_three.push({
              id: item.product_id,
              name_third: item.combination_name.split(",")[2]
            })
          })
          self.sku_three = sku_three
        }
    },

    async addCart() {
      // 未ログインユーザーは購入できない
      if(!this.$auth.loggedIn) {
        this.$store.dispatch("snackbar/setError", "購入するには会員登録が必要です")
        this.$store.dispatch("snackbar/snackOn")
        return
      }

      // シーズンパスの場合には種別を選択しているのを確認する (アパレル)
      if(this.seasonPassFlg) {
        if(!this.seasonPassKind) {
          this.$store.dispatch("snackbar/setError", "種別を選択してください")
          this.$store.dispatch("snackbar/snackOn")
          return
        }
        this.productId = this.seasonPassKind
        let result = await this.$auth.ctx.$axios.get(`rcms-api/1/shop/product/list?topics_id=${this.$route.params.id}`)
        let response3 = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${this.$auth.user.ec_cart_id}`)
        let stamp = result.data.list.filter(item =>
          this.seasonPassKind == item.product_id
        )
        let product_num = response3.data.details.items.filter(item =>
          this.seasonPassKind == item.product_id
        )
        if (stamp[0] != "" && stamp[0] != null &&  product_num[0] != "" && product_num[0] != null){
          this.sale_limit = stamp[0].sale_limit
          this.product_sum = product_num[0].quantity
          if(product_num[0].quantity == stamp[0].sale_limit){
            this.$store.dispatch("snackbar/setError", "購入可能数を超えています。")
            this.$store.dispatch("snackbar/snackOn")
            return   
          }
        }
      }
      
      // シーズンパス以外の場合
      if(this.apparelFlg) {
        this.productId = this.productId
        let result = await this.$auth.ctx.$axios.get(`rcms-api/1/shop/product/list?topics_id=${this.$route.params.id}`)
        let response5 = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${this.$auth.user.ec_cart_id}`)
        let stamp = result.data.list.filter(item =>
          this.productId == item.product_id
        )
        let product_num = response5.data.details.items.filter(item =>
          this.productId == item.product_id
        )
        if (stamp[0] != "" && stamp[0] != null &&  product_num[0] != "" && product_num[0] != null){
          this.sale_limit = stamp[0].sale_limit
          this.product_sum = product_num[0].quantity
          if(product_num[0].quantity == stamp[0].sale_limit){
            this.$store.dispatch("snackbar/setError", "購入可能数を超えています。")
            this.$store.dispatch("snackbar/snackOn")
            return   
          }
        }
      }

      // 商品をカートに保存する
      await this.$auth.ctx.$axios.post(`/rcms-api/1/shop/cart`, {
        ec_cart_id: this.$auth.user.ec_cart_id,
        item: {
          product_id: this.productId,
          quantity: this.quantity
        }
      }).then((value) =>{
        this.$store.dispatch(
        "snackbar/setMessage",
        "商品を追加しました"
        )
        this.$store.dispatch("snackbar/snackOn")
        this.getCartItems()
        this.$router.go(0)
      }).catch((error) => {
        // self.$store.dispatch("snackbar/setError", "商品を選択下さい。")
        if(error.response.status === 400){
          this.$store.dispatch("snackbar/setError", "商品を選択下さい。")
          this.$store.dispatch("snackbar/snackOn")
          return
        } else if (error.response.status === 422) {
          this.$store.dispatch("snackbar/setError", "在庫がありません")
          this.$store.dispatch("snackbar/snackOn")
          return
        }
      })
    },
    async getCartItems() {
      if(!this.$auth.user || !this.$auth.user.ec_cart_id) {
        return
      }
      this.cartItems = []
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${this.$auth.user.ec_cart_id}`)
      this.total_quantity = response.data.details.total_quantity
      if(response.data.details.items) {
        response.data.details.items.forEach((item, index) => {
          this.cartItems.push(item)
        })
      }
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
        // とりあえず今表示される画像データがなければ入れる
        if(info.file_url) {
          if(!this.imageUrl) {
            this.imageUrl = info.file_url
          }
          this.images.push(info.file_url)
        }
      })
    },
  },
  mounted() {
    this.getProducts(this.$route.params.id)
    this.getCartItems()
  }
}
</script>
<style scoped>
.sell-out{
  font-weight: 800;
  border-color: crimson !important;
}
[v-cloak]{
    display:none !important;
}
</style>
