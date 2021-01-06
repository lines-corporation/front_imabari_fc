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
      :src="item.src"

    ></v-carousel-item>
  </v-carousel>

    <v-container class="shop-top">
      <v-row no-gutters>
        <!-- カテゴリー一覧 -->
        <v-col cols="4" class="brk" sm="12">
          <v-card class="d-flex flex-row mb-2" max-width="300">
            <v-list flat subheader three-line>
              <v-subheader>商品カテゴリー</v-subheader>
              <v-list-item-group
                v-model="settings"
                multiple
                active-class=""
              >
                <v-list-item v-for="category in categories">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active"></v-checkbox>
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
              <v-col cols="10" sm="6" md="4">
                <v-text-field dense label="商品検索" prepend-icon="mdi-magnify"></v-text-field>
              </v-col>
              <v-col cols="2" @click="moveCart">
                <v-icon large color="darken-2">
                  mdi-cart-variant
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="product in products" :key="product.id" cols="4" sm="12">
                <v-card class="p-card">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    width="300px"
                    :src="product.image"
                  />
                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-card-text class="text--primary">
                    <div>価格： ¥{{ product.price }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="moveProductDetail(product.id)" color="orange" text>
                      商品詳細
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

      </v-row>
    </v-container>

    <!-- ページネーション -->
    <div class="text-center">
      <v-pagination
      v-model="page"
      :length="6"
      ></v-pagination>
    </div>

  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    settings: [],
    length: 3,
    page: 1,
    onboarding: 0,
    


    items: [
      {
        src: 'http://fcimabari.design-view.link:8120/_nuxt/src/assets/images/temp_banner.jpg',
      },
      {
        src: 'http://fcimabari.design-view.link:8120/_nuxt/src/assets/images/temp_banner.jpg',
      },
      {
        src: 'http://fcimabari.design-view.link:8120/_nuxt/src/assets/images/temp_banner.jpg',
      },

    ],


    categories: [
      {
        title: "全て",
      },
      {
        title: "新着商品"
      },
      {
        title: "ウェア"
      },
      {
        title: "グッズ"
      },
    ],
    products: [
      {
        id: 10,
        title: "商品A",
        price: 1000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 11,
        title: "商品B",
        price: 2000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 12,
        title: "商品C",
        price: 3000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 13,
        title: "商品D",
        price: 4000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 14,
        title: "商品E",
        price: 4000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 15,
        title: "商品F",
        price: 1000,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 16,
        title: "商品G",
        price: 1500,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 17,
        title: "商品H",
        price: 1800,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 18,
        title: "商品I",
        price: 1900,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
    ],
  }),
  methods: {
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
}
</script>
