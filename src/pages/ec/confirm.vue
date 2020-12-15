<template>
  <div class="container">
    <h2>EC 購入確認</h2>
    <v-container>

      <!-- ここをループさせる -->
      <div>
        <v-row no-gutters>
          <v-col>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="400"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col>
            <h3>商品名</h3>
            <p>¥ 3000</p>
            <p>size : L</p>
            <p>個数 1個</p>
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
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 6,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
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
