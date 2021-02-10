<template>
  <div class="shop-wrap">
    <!-- バナー -->
    <v-carousel
      cycle
      hide-delimiter-background
    >
      <v-carousel-item 
        v-for="(item,i) in items"
        :key="i"
        :src="item.url"
      ></v-carousel-item >
    </v-carousel>
   <!-- 購入履歴へ -->
    <v-row class="d-msg float-sm-right">
      <v-col cols="12">
        <v-btn to="/ec/histories" nuxt>購入履歴へ</v-btn>
      </v-col>
    </v-row>

    <v-container class="shop-top">
      <v-row no-gutters>
        <!-- カテゴリー一覧 -->
        <v-col cols="4" class="brk" sm="12">
          <v-card class="d-flex flex-row mb-2" max-width="300">
            <v-list flat subheader three-line>
              <v-subheader>商品カテゴリー</v-subheader>
              <v-list-item-group
                v-model="selectedCategory"
                multiple
                active-class=""
                @change="getProducts"
              >
                <v-list-item v-for="category in categories" :key="`category-${ category.id }`" :value="category.id">
                  <template>
                    <v-list-item-action>
                      <v-checkbox :disabled="flag" ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ category.title }}</v-list-item-title>
                      <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <!-- 商品一覧 -->
        <v-col cols="8" class="brk2">
          <v-container class="grey lighten-5 mb-3">
            <v-row class="shoplist">
              <!--
              <v-col cols="10" sm="6" md="4">
                <v-text-field dense label="商品検索" prepend-icon="mdi-magnify"></v-text-field>
              </v-col>
            -->
              <v-col cols="2" @click="moveCart">
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
            <v-row v-if="products">
              <v-col v-for="(product, topics_id) in products" :key="topics_id" cols="4" sm="12">
                <v-card class="p-card">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    width="300px"
                    :src="product.images[0]"
                  />
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-text class="text--primary">
                    <div>価格： ¥{{ product.price }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="moveProductDetail(topics_id)" color="orange" text>
                      商品詳細
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <p>データがないよ</p>
            </v-row>
          </v-container>
        </v-col>

      </v-row>
    </v-container>

    <!-- ページネーション 一旦OFF -->
    <!--
    <div class="text-center">
      <v-pagination
      v-model="page"
      :length="6"
      ></v-pagination>
    </div>
  -->
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    flag: true,
    settings: [],
    cartItems: [],
    total_quantity: 0,
    length: 3,
    page: 1,
    onboarding: 0,
    items: [
      {
        url: require('@/assets/images/uniform_img.jpg'),
      },
      {
        url: require('@/assets/images/temp_banner.jpg'),
      },
    ],
    selectedCategory: [],
    categories: [],
    products: {},
  }),
  methods: {
    // 商品一覧の取得
    async getProducts() {
      this.flag = true
      // cnt 表示商品数
      this.products = {}
      let paramStr = '?cnt=999'
      if(this.selectedCategory.length > 0) {
        this.selectedCategory.forEach((categoryId, index) => {
          paramStr += `&contents_type[]=${categoryId}`
        })
      }
      //let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list?contents_type[]=33&contents_type[]=32&cnt=12`)
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}`)
      this.flag = false
      console.warn(response)
      // エラー検知
      if(response.errors) {
        // TODO エラー表示
      }
      // 商品名 topics_name
      // id topics_id => これは種類別でこれにまとめたい
      // 価格 price_02
      // 商品説明 product_data.ext_col_01
      // 詳細説明 product_data.ext_col_02
      // 画像 product_data.ext_columns.group[0].file_url
      //     ext_columns.group[0].file_url
      // サイズ subject
      // 最初のページ response.data.pageInfo.firstIndex
      // 最後のページ response.data.pageInfo.lastIndex
      // 現在のページ response.data.pageInfo.pageNo
      response.data.list.forEach((product, index) => {
        if(this.products[product.topics_id]) {
          this.products[product.topics_id].data.push(product)
        } else {
          this.$set(this.products, product.topics_id,
            {
              name:      product.topics_name,
              price:     product.product_data.ext_col_04,
              description: product.product_data.ext_col_01,
              // 注意書き?
              note: product.product_data.ext_col_02,
              images: this.pickupImages(product.product_data),
              data: [product]
            }
          )
        }
      })
      console.warn(this.products)
    },
    async getCategories() {
      let response = await this.$auth.ctx.$axios.get("/rcms-api/1/shop/categories")
      response.data.list.forEach((category, index) => {
        this.categories.push({
          id:    parseInt(category.topics_category_id),
          title: category.category_nm,
          selected: false
        })
      })
    },
    // TODO 商品詳細とかぶっているのでどこかで共通化したい
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
    // 商品画像の抜き出し
    pickupImages(data) {
      let images = []
      data.ext_columns.straight.forEach((info, index) => {
        images.push(info.file_url)
      })
      return images
    },
    nextBanner() {
      this.onboarding = this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prevBanner() {
      this.onboarding = this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    },
    moveCart() {
      this.$router.push("/ec/cart")
    },
    moveProductDetail(product_id) {
      this.$router.push(`/ec/${product_id}`)
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
  mounted() {
    this.getProducts()
    this.getCategories()
    this.getCartItems()
  },
}
</script>
