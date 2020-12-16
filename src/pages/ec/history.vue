<template>
  <div class="container">
    <h2>EC 購入履歴</h2>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec" nuxt>EC TOPへ</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-card class="mx-auto">
          <v-card-title>2020年 12月10日 13:26:51</v-card-title>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-row>

    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
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
