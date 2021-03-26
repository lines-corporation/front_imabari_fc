<template>
  <div class="container shop-wrap shop-cart">
    <!-- <tr
      v-for="order_detail in order.order_details"
      :key="order_detail.product_id"
    > 
      <td
        v-for="index in parseInt(order_detail.quantity)"
        :key="index"
        style="display:block"
      >
    <v-card-text style="text-align:center">
      <br />
      <p style="text-align:center" v-text="prodcut_nm(order_detail.product_id)" />
      <p style="text-align:center" v-if="prodcut_nm(order_detail.product_id).search('自由席') == -1 && order.note != 0 && order.note != null ">
        <span v-if="index == 1" >ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1].substring(0,3) }}</span> 
        <span v-if="index != 1">
          ゾーン {{ order.note.split('-')[index-1].substring(3,6).replace(",","") }} / 座席 {{ order.note.split('-')[index].substring(0,3).replace(",","") }}
        </span>
      </p>
      <p>
        <vue-qrcode :value="prodcut_qr(order.ec_order_id + ':' + 'imabari' + ':' + order_detail.order_detail_id + ':' + index)" tag="img" />
      </p>
    </v-card-text>
    </td>
    </tr> -->
      
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
  components: {
    VueQrcode,
    md5
  },
  data: () => ({
    hash_code:0,
    ec_order_id:0,
    order_detail_id:0,
  }),
  methods: {
    async getQrcode() {
      let self = this
      self.ec_order_id = this.$route.query.ec_order_id
      self.index = this.$route.query.no
      self.order_detail_id = this.$route.query.order_detail_id
      self.hash_code = md5(self.ec_order_id + ":imabari:" + self.order_detail_id + ':' + self.index)
    },
    prodcut_nm(product_id) {
      for (const p of this.product_list) {
        if(p.product_id == product_id){
        return p.subject
        }
      }
      return ""
    },
  },
  mounted() {
    this.getQrcode()
  }
}
</script>
