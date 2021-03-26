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
       <v-col class="c-txt">
         <td style="padding-left: 550px;">
           <vue-qrcode
             :value="hash_code"
             tag="img"
           />
         </td>
       </v-col>
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
        self.hash_code = md5(self.ec_order_id + ":imabari:" + self.order_detail_id + ':' + self.no)
      })
    }
  },
  mounted() {
    this.hash_check()
  }
}
</script>
