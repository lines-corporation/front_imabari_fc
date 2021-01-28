<template>
  <div class="container shop-wrap shop-cart shop-history">

    <v-container>
      <h2 class="shop-ttl">購入履歴</h2>
      <v-list>
        <v-list-item-group
          v-model="histories"
          color="primary"
        >
          <v-list-item
            v-for="history in histories"
            :key="history.ec_cart_id"
            @click="moveHistoryPage(history.ec_order_id)"
          >
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="history.date"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

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
      const response = await this.$auth.ctx.$axios.get("/rcms-api/1/order_list")
      let self = this
      response.data.list.forEach((history, index) => {
        self.histories.push({
          ec_order_id: history.ec_order_id,
          date:        history.inst_ymdhi.replace(" +0900", ""),
        })
      })
    },
    moveHistoryPage(ec_order_id) {
      this.$router.push(`/ec/history/${ec_order_id}`)
    }
  },
  mounted() {
    this.getPurchaseHistories()
  }
}
</script>
