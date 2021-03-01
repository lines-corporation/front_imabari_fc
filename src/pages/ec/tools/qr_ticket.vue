<template>
  <div class="container shop-wrap shop-cart">
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
      self.order_detail_id = this.$route.query.order_detail_id
      self.hash_code = md5(self.ec_order_id + ":imabari:" + self.order_detail_id)
    }
  },
  mounted() {
    this.getQrcode()
  }
}
</script>
