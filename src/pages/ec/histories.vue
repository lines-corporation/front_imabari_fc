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
      let arr = [41441,41442,41443,41444,41445,41446,41613]
      let history_filter = resumeResult.filter((res) => arr.includes(res.order_details[0].product_id) == false)
      // 公開するのEC商品Idを取得
      let open1_ids = []
      await self.$auth.ctx.$axios.get(`/rcms-api/1/goods`).then(response =>{
        response.data.list.forEach(item => {
          open1_ids.push(item.product_ids) 
        })
     })
    
    let ec_list = []
    for(var i = 0; i < open1_ids.length;i++) {
       for(var j = 0; j < open1_ids[i].length;j++){
         ec_list.push(open1_ids[i][j])
       }
     }
     // 公開するのチケットIdを取得
      let open2_ids = []
      await self.$auth.ctx.$axios.get("/rcms-api/1/ticket_list").then(response1 => {
        response1.data.list.forEach(item => {
          open2_ids.push(item.product_ids) 
        })
      })
    
    let result = []

     for(var i = 0; i < open2_ids.length;i++) {
       for(var j = 0; j < open2_ids[i].length;j++){
         result.push(open2_ids[i][j])
       }
     }
      //EC商品IdとチケットId合わせて
      for(var i in result){
          ec_list.push(result[i]);
      }

      //未公開の商品を除く
      // console.log(history_filter)
      let order_details = history_filter.filter(item => ec_list.indexOf(item.order_details[0].product_id) > -1)
      //購入履歴のデータを取得
      order_details.forEach(history => {
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
