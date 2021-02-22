<template>
  <div class="container shop-wrap shop-cart">
    <v-container>

      <v-row class="d-msg">
        <v-col cols="12">
          <h3>購入完了しました！</h3>
          <p>購入したものは履歴から確認可能です。</p>
          <v-btn to="/ec/histories" nuxt>購入履歴へ</v-btn>
        </v-col>
      </v-row>

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
    ]
  }),
  mounted() {
    // cart_idを更新するためにprofileデータを取り直す
    this.$auth.fetchUser()
  }
}
</script>
