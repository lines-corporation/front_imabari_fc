<template>
  <div class="container shop-wrap shop-cart shop-history">

    <v-container>
      <h2 class="shop-ttl">購入履歴</h2>

        <v-col cols="12" class="time-ttl"><h3>2021年 1月4日 13:26:51</h3></v-col>
        <!-- TODO 購入履歴ノーデータを確認できたらここを入れ替える(histories) -->
        <!--
        <div>
          <v-row no-gutters class="cart-list">
            <v-col class="c-img">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-width="200"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-col>
            <v-col class="c-txt">
              <div>
              <h3>商品名</h3>
              <p>¥ 3000</p>
              <p>size : L</p>
              <p>個数 1個</p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
        <div>
          <v-row no-gutters class="cart-list">
            <v-col class="c-img">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-width="200"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-col>
            <v-col class="c-txt">
              <div>
              <h3>商品名</h3>
              <p>¥ 3000</p>
              <p>size : L</p>
              <p>個数 1個</p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
         <div>
          <v-row no-gutters class="cart-list">
            <v-col class="c-img">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-width="200"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-col>
            <v-col class="c-txt">
              <div>
              <h3>商品名</h3>
              <p>¥ 3000</p>
              <p>size : L</p>
              <p>個数 1個</p>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>

        <v-col cols="12" class="time-ttl"><h3>2020年 12月10日 13:26:51</h3></v-col>
        <div>
          <v-row no-gutters class="cart-list">
            <v-col class="c-img">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-width="200"
                src="https://picsum.photos/id/11/500/300"
              ></v-img>
            </v-col>
            <v-col class="c-txt">
              <div>
              <h3>商品名</h3>
              <p>¥ 3000</p>
              <p>size : L</p>
              <p>個数 1個</p>
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
    histories: []
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
    async getPurchaseHistories() {
      console.warn(`getPurchaseHistories: ${this.$auth.user.ec_cart_id}`)
      const response = await this.$auth.ctx.$axios.get("/rcms-api/1/order_list")
      console.warn(response)
    }
  },
  mounted() {
    this.getPurchaseHistories()
  }
}
</script>
