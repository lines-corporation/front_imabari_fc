<template>
  <div class="container">
    <v-container>
      <v-row class="d-flex flex-row-reverse" >
        <v-col cols="2" @click="moveCart">
          <v-icon large color="darken-2">
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
          <h3>商品名</h3>
          <p>¥ 3000</p>
          <!-- select box -->
          <v-select
            :items="sizes"
            label="Size"
            outlined
          ></v-select>
          <!-- サムネイル -->
          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group class="pa-4" center-active show-arrows>
              <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-4"
                width="200"
                @click="toggle"
              >
                <v-row class="fill-height" ALIGN="CENTER" justify="center">
                  <v-img
                    :lazy-src="imageUrl"
                    :src="imageUrl"
                    max-width="200"
                  ></v-img>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
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
        <v-btn to="/ec" nuxt>一覧に戻る</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    sizes: ['S', 'M', 'L', 'LL'],
    imageUrl: 'https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg',
    description: `
      商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
      商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
      商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
      商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
      商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明商品説明
    `
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
    addCart() {
      // 商品をカートに保存する
      //this.$store.commit('products/add', { id: 10, title: 'hoge' })
      this.$store.dispatch(
        "snackbar/setMessage",
        "商品を追加しました"
      )
      this.$store.dispatch("snackbar/snackOn")
    },
    moveCart() {
      this.$router.push("/ec/cart")
    },
  }
}
</script>
