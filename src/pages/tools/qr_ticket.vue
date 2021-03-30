<template>
  <div class="container shop-wrap shop-cart">
    <!-- <v-card-text style="text-align:center">
      <br />
      <p style="text-align:center"> {{  }} </p>
      <p style="text-align:center" v-if="prodcut_nm(order_detail.product_id).search('自由席') == -1 && order.note != 0 && order.note != null ">
        <span v-if="index == 1" >ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1].substring(0,3) }}</span> 
        <span v-if="index != 1">
          ゾーン {{ order.note.split('-')[index-1].substring(3,6).replace(",","") }} / 座席 {{ order.note.split('-')[index].substring(0,3).replace(",","") }}
        </span>
      </p>
      <p>
        <vue-qrcode :value="prodcut_qr(order.ec_order_id + ':' + 'imabari' + ':' + order_detail.order_detail_id + ':' + index)" tag="img" />
      </p>
    </v-card-text> -->
　   <v-container>
       <v-card-text class="c-txt" style="text-align:center;">
         <p> {{ product_name }} </p>
         
         <span v-if="product_name != null && note != 0 && note != null">
           <span v-if="no == 1" >ゾーン {{ note.split('-')[0] }} / 座席 {{ note.split('-')[1].substring(0,3) }}</span> 
           <span v-if="no != 1">
             ゾーン {{ note.split('-')[no-1].substring(3,6).replace(",","") }} / 座席 {{ note.split('-')[no].substring(0,3).replace(",","") }}
           </span>
         </span>


         <p style="text-align:center;">
           <vue-qrcode
             v-if="order_detail_id != null && order_id != null"
             style="text-align:center;"
             :value="hash_code"
             tag="img"
           />
         </p>
       </v-card-text>
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
    hash_code:0,
    order_id: 0,
    ec_order_id:0,
    order_detail_id:0,
    no: 0,
    product_name: "",
    note: "",
  }),
  methods: {
    async hash_check(){
      let self = this
      self.qrcode_string = self.$route.query.qrcode_string
      self.topics_id = self.$route.query.topics_id
      let check_message = `rcms-api/1/qrcode/hash?hash=${self.qrcode_string}&topics_id=${self.topics_id}`
      self.$auth.ctx.$axios.get(check_message).then(function (response) {
        self.order_id = response.data.data.order_id
        self.order_detail_id = response.data.data.order_detail_id
        self.product_name = response.data.data.product_name
        self.note = response.data.data.note
        self.no = response.data.data.no
        console.log(response)
        if(self.order_detail_id == null || self.order_id  == null || product_name == null || note == null) {
        self.$store.dispatch("snackbar/setError", "HASHの存在しません")
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
        } else {
          self.hash_code = md5(self.ec_order_id + ":imabari:" + self.order_detail_id + ':' + self.no) 
        }
      })
    }
  },
  mounted() {
    this.hash_check()
  }
}
</script>
