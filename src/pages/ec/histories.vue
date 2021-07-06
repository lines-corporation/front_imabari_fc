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
            v-for="(history, date) in histories"
            :key="date"
            @click="moveHistoryPage(history.ids)"
          >
            <v-list-item-icon  class="history-icon" v-if="history.labels == `マニュアル決済`">
              <v-img :src="require('@/assets/images/mpos.png')" class="history-icon"></v-img>
            </v-list-item-icon>
            <v-list-item-icon v-else>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div  style="display: inline-block;" >
                <div v-text="date" style="display: inline-block;"></div> &nbsp;&nbsp;&nbsp;&nbsp;
                <div v-if="history.labels == `マニュアル決済`" style="display: inline-block;">
                  (ECサイト以外で購入)
                </div>
                <div v-else style="display: inline-block;">
                  (ECサイト購入)
                </div>
              </div>
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
    histories: {},
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
      self.histories = {}
      let resumeResult = response.data.list.filter((item) => item.generic_payment_status.label == "注文済み" || item.generic_payment_status.label == "未入金状態" || item.generic_payment_status.label == "決済完了")
      let arr = [	41715,41724,41725,41717,41718,41719,41720,41721,41722,41723,41726,41727,41728,41729,41730,41731,41732,41716]
      let history_filter = resumeResult.filter((res) => arr.includes(res.order_details[0].product_id) ==false)
      history_filter.forEach((history, index) => {
        const date = history.inst_ymdhi.replace("+09:00", "").replace("T", " ").substring(0,16)
        if(self.histories[date]) {
          self.histories[date].ids.push(history.ec_order_id)
        } else {
          self.$set(self.histories, date, {
            ids: [history.ec_order_id],
            labels: history.payment_method.label
          })
        }
      })
    },
    moveHistoryPage(ecOrderIds) {
      this.$router.push(`/ec/history/${ecOrderIds.join(',')}`)
    }
  },
  mounted() {
    this.getPurchaseHistories()
  }
}
</script>
<style scoped>
.history-icon {
 width: 5px !important;
}
</style>
