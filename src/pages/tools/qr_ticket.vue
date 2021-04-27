<template>
  <div class="container">
    <div class="article-page ticket-box">
      <div class="theme--light v-stepper">
        <div class="v-stepper__content">
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
              <div>
                <div v-if="cnt == 0">
                  <vue-qrcode
                    style="text-align:center;"
                    :value="hash_code"
                    tag="img"
                  />
                </div>
                <div align="center" v-else-if="cnt > 0">
                  <section>
                    <v-img :src="require('@/assets/images/used-qr.png')" width="148px"></v-img>
                  </section>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
             <v-btn
               class="update-btn"
               text
               @click="reload"
               nuxt
             >
               画面を更新
             </v-btn>
            </v-card-actions>
            <v-card-text class="c-txt" style="text-align:center;"  v-if="order_detail_id != null && order_id != null && no != null"><br/>
              <span> チケット状態の確認をさせて頂く場合がございます。 </span><br/>
              <span> スタジアム入場後に画面更新ボタンを押下して、 </span><br/>
              <span> QRコードの状態を更新して下さい。 </span><br/><br/>
            </v-card-text>
          </v-container>
        </div>
      </div>
    </div>
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
    topics_id: "",
    ec_order_id:null,
    qrcode_string: "",
    order_detail_id:null,
    no: null,
    product_name: null,
    note: null,
    subject: null,
    cnt: null
  }),
  methods: {
    async hash_check(){
      let self = this
      self.qrcode_string = self.$route.query.qrcode_string
      self.topics_id = self.$route.query.topics_id
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
         let hash = `/rcms-api/1/qrcode/url?ec_order_id=${self.order_id}&order_detail_id=${self.order_detail_id}&no=${self.no}`
         self.$auth.ctx.$axios.get(hash).then(function (response1) {
           self.cnt = response1.data.data.cnt
         })
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
.update-btn{
  background-color: #171C61 !important;
  color:aliceblue !important;
  padding: 0px 37px !important;
}
</style>

