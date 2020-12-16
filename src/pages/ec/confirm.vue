<template>
  <div class="container">
    <v-container>

      <!-- ここをループさせる -->
      <div v-for="product in products">
        <v-row no-gutters>
          <v-col>
            <v-img
              :lazy-src="product.image"
              max-width="400"
              :src="product.image"
            ></v-img>
          </v-col>
          <v-col>
            <h3>{{ product.title }}</h3>
            <p>¥ {{ product.price }}</p>
            <p v-if="product.size">size : {{ product.size }}</p>
            <p>個数 {{ product.num }}個</p>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>


      <v-row>
        <v-col cols="4">
          <v-subheader>支払方法</v-subheader>
        </v-col>
        <v-col cols="8">
          <p>クレジット決済</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-subheader>合計金額</v-subheader>
        </v-col>
        <v-col cols="8">
          <p>¥ 2500</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn to="/ec/done" nuxt>決済する</v-btn>
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
