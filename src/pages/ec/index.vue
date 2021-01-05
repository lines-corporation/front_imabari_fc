<template>
  <div>
    <!-- バナー -->
    <v-card flat tile>
      <v-window v-model="onboarding" reverse>
        <v-window-item v-for="n in length" :key="`card-${n}`">
          <v-card color="grey" height="200">
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                class="white--text align-end"
                width="100%"
                :src="require('@/assets/images/temp_banner.jpg')"
              />
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-btn text @click="prevBanner">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item v-for="n in length" :key="`btn-${n}`" v-slot="{ active, toggle }">
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn text @click="nextBanner">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-container>
      <v-row no-gutters>
        <!-- カテゴリー一覧 -->
        <v-col cols="4">
          <v-card class="d-flex flex-row mb-2" max-width="400" height="800">
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
        <v-col cols="8">
          <v-container class="grey lighten-5 mb-3">
            <v-row>
              <v-col cols="10" sm="6" md="4">
                <v-text-field dense label="商品検索" prepend-icon="mdi-magnify"></v-text-field>
              </v-col>
              <v-col cols="2" @click="moveCart">
                <v-icon large color="darken-2">
                  mdi-cart-variant
                </v-icon>
              </v-col>
            </v-row>
            <v-row v-if="goods">
              <p>hogehoge</p>
              <p>{{ goods["960"] }}</p>
              <v-col v-for="(product, topics_id, index) in goods" :key="topics_id" cols="4">
                <p>{{ goods["960"] }}</p>
                <p>fugafuga</p>
                <v-card>
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
                    <v-btn @click="moveProductDetail(product.topics_id)" color="orange" text>
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
    goods: {},
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
    // 商品一覧の取得
    async getProduct() {
      let response = await this.$auth.ctx.$axios.get("/rcms-api/1/shop/product/list")
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
      response.data.list.forEach((product, index) => {
        if(this.goods[product.topics_id]) {
          this.goods[product.topics_id].data.push(product)
        } else {
          this.goods[product.topics_id] = {
            name:      product.topics_name,
            price:     product.price_02,
            description: product.product_data.ext_col_01,
            // 注意書き?
            note: product.product_data.ext_col_02,
            images: this.pickupImages(product.product_data),
            data: [product]
          }
        }
      })
      console.warn("result***********")
      console.warn(this.goods)
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
    this.getProduct()
  }
}
</script>
