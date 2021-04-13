<template>
  <div class="container shop-wrap shop-cart">
　   <v-container>
       <v-card-text v-if="product_name != null" class="c-txt" style="text-align:center;">
         <p v-if="order_detail_id != null && order_id != null && no != null"> <b>{{ `イベント名:` + subject }}</b> </p>
         <p style="font-size:18px;" v-if="order_detail_id != null && order_id != null && no != null"> <b>{{ `券種:` + product_name }}</b> </p>
         <span  v-if="product_name.search('自由席') == -1 && note != 0 && note != null ">
           <span v-if="no == 1" >座席番号:ゾーン {{ note.split('-')[0] }} / 座席 {{ note.split('-')[1].substring(0,3) }}</span> 
           <span v-if="no > 1">
             {{ `座席番号:ゾーン` + note.split('-')[no-1].substring(3,6).replace(",","") }} / 座席 {{ note.split('-')[no].substring(0,3).replace(",","") }}
           </span>
            <br/> <br/>
         </span>
         <p v-if="order_detail_id != null && order_id != null && no != null" > 注文番号:{{ order_id }} </p>
         <p style="text-align:center;" v-if="order_detail_id != null && order_id != null">
           <vue-qrcode
             v-if="order_detail_id != null && order_id != null"
             style="text-align:center;"
             :value="hash_code"
             tag="img"
           />
         </p>
       </v-card-text>
       <v-card-actions class="justify-end">
        <v-btn
          class="update-btn"
          depressed
          color="primary"
          text
          @click="reload"
          nuxt
        >
          画面を更新
        </v-btn>
       </v-card-actions>
       <v-card-text v-if="product_name != null" class="c-txt" style="text-align:center;"><br/>
         <span v-if="order_detail_id != null && order_id != null && no != null"> チケット状態の確認をさせて頂く場合がございます。 </span><br/>
         <span v-if="order_detail_id != null && order_id != null && no != null"> スタジアム入場後に画面更新ボタンを押下して、 </span><br/>
         <span v-if="order_detail_id != null && order_id != null && no != null"> QRコードの状態を更新して下さい。 </span><br/><br/>
       </v-card-text>
       <v-card-actions class="justify-end">
        <v-btn
          class="close-btn"
          text
          :to="'/ticket/' + topics_id"
          nuxt
        >
          閉じる
        </v-btn>
       </v-card-actions>
    </v-container>
  </div>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode"
import md5 from "js-md5"
export default {
  auth: false,
  components: {
    VueQrcode,
    md5
  },
  data: () => ({
    hash_code:null,
    order_id: null,
    ec_order_id:null,
    topics_id: "",
    order_detail_id:null,
    no: null,
    product_name: null,
    note: null,
    subject: null
  }),
  methods: {
    async hash_check(){
      let self = this
      self.qrcode_string = self.$route.query.qrcode_string
      self.topics_id = window.location.pathname.replace(/[^\d]/g,'')
      let check_message = `rcms-api/1/qrcode/hash?hash=${self.qrcode_string}&topics_id=${self.topics_id}`
      self.$auth.ctx.$axios.get(check_message).then(function (response) {
        self.subject = response.data.data.subject
        self.order_id = response.data.data.order_id
        self.order_detail_id = response.data.data.order_detail_id
        self.product_name = response.data.data.product_name
        self.note = response.data.data.note
        self.no = response.data.data.no
        if(self.order_detail_id == null || self.order_id  == null) {
        self.$store.dispatch("snackbar/setError", "譲渡/分配の取消しが実施されてURLが無効になっています")
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
        } else {
          self.hash_code = self.qrcode_string
        }
      })
    },
    async reload(){
      window.location.reload()
    }
  },
  mounted() {
    this.hash_check()
  }
}
</script>
<style scoped>
.close-btn{
  padding: 0px 53px !important;
}
.update-btn{
  background: #1976d2 !important;
  padding: 0px 37.75px !important;
}
</style>
