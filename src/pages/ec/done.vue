<template>
  <div class="container shop-wrap shop-cart">
    <v-container>


      <v-row class="d-msg">
        <v-col cols="12">
          <h3>購入完了しました！</h3>
          <p>購入したものは履歴から確認可能です。</p>
          <v-btn to="/ec/history" nuxt>購入履歴へ</v-btn>
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

      <!-- TODO kurocoから買ったもの一覧がとれたら実装 -->
      <!--
      <div v-for="product in products">
        <v-row no-gutters class="cart-list">
          <v-col class="c-img">
            <v-img
              :lazy-src="product.image"
              max-width="400"
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
    -->
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
  data: () => ({
    products: [
      {
        id: 10,
        title: "商品A",
        price: 1000,
        size: 'L',
        num: 1,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 11,
        title: "商品B",
        price: 2000,
        num: 3,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 12,
        title: "商品C",
        price: 3000,
        size: 'M',
        num: 4,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 13,
        title: "商品D",
        price: 4000,
        num: 1,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 14,
        title: "商品E",
        price: 4000,
        size: 'S',
        num: 5,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 15,
        title: "商品F",
        price: 1000,
        num: 2,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 16,
        title: "商品G",
        price: 1500,
        size: 'LL',
        num: 5,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 17,
        title: "商品H",
        price: 1800,
        num: 3,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
      {
        id: 18,
        title: "商品I",
        price: 1900,
        size: 'S',
        num: 2,
        image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
      },
    ]
  }),
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
