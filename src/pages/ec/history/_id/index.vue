<template>
  <div class="container shop-wrap shop-cart shop-history">
    <v-container>
      <h2 class="shop-ttl">購入履歴</h2>

      <v-col cols="12" class="time-ttl">
        <h3>{{ purchaseDate }}</h3>
      </v-col>
      <!-- TODO 購入履歴ノーデータを確認できたらここを入れ替える(histories) -->
      <div v-for="product in products" :key="product.id">
        <v-row no-gutters class="cart-list">
          <v-col class="c-img">
            <v-img
              :lazy-src="product.image"
              max-width="200"
              :src="product.image"
            ></v-img>
          </v-col>
          <v-col class="c-txt">
            <div>
              <h3>{{ product.title }}</h3>
              <p v-if="product.group_price > 0">¥ {{ product.group_price*product.quantity }}</p>
              <p v-else-if="product.discount_price > 0">¥ {{ product.price_02*product.quantity }}</p>
              <p v-else-if="product.discount_price == 0 && product.price_01 == 0">¥ {{ product.price_02*product.quantity }}</p>
              <p v-else>¥ {{ product.price }}</p>
              <p>{{ product.size }}</p>
              <p>個数 {{ product.quantity }}個</p>
              <p v-if="product.size.search('自由席') == -1">{{ note }}</p>
              <p>お支払い状態： {{ generic_payment_status }}</p>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
      <div>
          <v-row>
          <v-col>
            <h3>合計金額</h3>
            <p>{{ total_price1 + deliv_fee }}円(送料 ¥{{ deliv_fee }})</p>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="6">
          <v-btn to="/ec/histories" nuxt>購入履歴一覧へ</v-btn>
        </v-col>
        <v-col cols="6">
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
    purchaseDate: "",
    totalPaymentPrice: 0,
    note: "",
    deliv_fee: 0,
    total_price: 0,
    total_price1: 0,
    products: [],
    generic_payment_status: "",
    file_url: "",
  }),
  computed: {
    user() {
      return this.$auth.user;
    },
    auth() {
      return this.$store.$auth;
    },
  },
  methods: {
    async getHistory() {
      const ids = this.$route.params.id.split(",");
      let self = this;
      ids.forEach(async (id) => {
        const response = await self.$auth.ctx.$axios.get(
          `/rcms-api/1/shop/history/${id}`
        );
        if (response.data.details.inst_ymdhi == undefined) {
          self.purchaseDate = "キャンセル済み";
        } else {
          self.purchaseDate = response.data.details.inst_ymdhi
            .replace("+09:00", "")
            .replace("T", " ")
            .substring(0, 16);
          self.note = response.data.details.note;
          self.deliv_fee = response.data.details.deliv_fee
          self.generic_payment_status =
            response.data.details.generic_payment_status.label;
          self.totalPaymentPrice = parseInt(response.data.details.total);

          // 公開するのEC商品Idを取得
          let open1_ids = [];
          let paramStr = "?cnt=999";
          await self.$auth.ctx.$axios
            .get(`/rcms-api/1/shop/product/list${paramStr}`)
            .then((response) => {
              response.data.list.forEach((item) => {
                open1_ids.push(item.product_id);
              });
            });

          let ec_list = [];
          for (var i = 0; i < open1_ids.length; i++) {
            for (var j = 0; j < open1_ids[i].length; j++) {
              ec_list.push(open1_ids[i][j]);
            }
          }
          // 公開するのチケットIdを取得
          let open2_ids = [];
          await self.$auth.ctx.$axios
            .get("/rcms-api/1/ticket_list")
            .then((response1) => {
              response1.data.list.forEach((item) => {
                open2_ids.push(item.product_ids);
              });
            });

          let result = [];
          for (var i = 0; i < open2_ids.length; i++) {
            for (var j = 0; j < open2_ids[i].length; j++) {
              result.push(open2_ids[i][j]);
            }
          }
          //EC商品IdとチケットId合わせて
          for (var i in result) {
            open1_ids.push(result[i]);
          }
          let products = []
          let total_price = []
          let _this = this
          response.data.details.order_details.forEach((order) => {
            if (open1_ids.indexOf(order.product_id) >= 0) {
              self.$auth.ctx.$axios
                .get(`/rcms-api/1/shop/product/${order.product_id}`)
                .then((productInfoResponse) => {
                  if (productInfoResponse.data.details.product_data.ext_columns.straight[0] != undefined) {
                    products.push({
                      id: order.product_id,
                      quantity: order.quantity,
                      title: productInfoResponse.data.details.topics_name,
                      group_price: productInfoResponse.data.details.group_price,
                      price_01: productInfoResponse.data.details.price_01,
                      price_02: productInfoResponse.data.details.price_02,
                      discount_price: productInfoResponse.data.details.discount_price,
                      size: productInfoResponse.data.details.product_name,
                      image:
                        productInfoResponse.data.details.product_data
                          .ext_columns.straight[0].file_url,
                    })
                    products.forEach(item => {
                      if(item.group_price != undefined) {
                        total_price.push(parseInt(item.group_price)*parseInt(item.quantity))
                      } else if(item.group_price == undefined && item.discount_price > 0) {
                        total_price.push(parseInt(item.price_02)*parseInt(item.quantity))
                      } else if(item.discount_price == 0 && item.price_01 == 0) {
                        total_price.push(parseInt(item.price_02)*parseInt(item.quantity))
                      }
                    })
                    self.total_price1 += total_price[total_price.length-1]
                  } else {
                    products.push({
                      id: order.product_id,
                      quantity: order.quantity,
                      title: productInfoResponse.data.details.topics_name,
                      group_price: productInfoResponse.data.details.group_price,
                      price_01: productInfoResponse.data.details.price_01,
                      price_02: productInfoResponse.data.details.price_02,
                      discount_price: productInfoResponse.data.details.discount_price,
                      size: productInfoResponse.data.details.product_name,
                    })
                    products.forEach(item => {
                      if(item.group_price != undefined) {
                        total_price.push(parseInt(item.group_price)*parseInt(item.quantity))
                      } else if(item.group_price == undefined && item.discount_price > 0) {
                        total_price.push(parseInt(item.price_02)*parseInt(item.quantity))
                      } else if(item.discount_price == 0 && item.price_01 == 0) {
                        total_price.push(parseInt(item.price_02)*parseInt(item.quantity))
                      }
                    })
                    self.total_price1 += total_price[total_price.length-1]
                  }
                })
                // .catch(function (error) {
                //   self.$store.dispatch(
                //     "snackbar/setError",
                //     error.response.data.errors?.[0]
                //   );
                //   self.$store.dispatch("snackbar/snackOn");
                //   self.loading2 = false;
                // });
            } else {
              products.push({
                id: order.product_id,
                size: "一覧画面非表示の商品",
                quantity: order.quantity
              })
            }
          })
        self.products = products
        }
      })
    }
  },
  mounted() {
    this.getHistory();
  },
};
</script>
