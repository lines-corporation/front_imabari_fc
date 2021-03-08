<template>
  <div class="container">
    <div v-if="topics_id" class="article-page ticket-box">
      <header>
        <h2 class="form-ttl">
          {{ item.subject }}
        </h2>
      </header>
      <div class="theme--light v-stepper">
        <div class="v-stepper__content">
          <p class="date-t">
            {{ item.ymd }}
          </p>
          <v-form
            ref="form3"
            v-model="valid"
            lazy-validation
            @submit.prevent="purchase"
          >
            <v-container fluid>
              <v-row>
                <v-col cols="4">
                  <v-subheader>会場名</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_01 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>対戦相手</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_02 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>イベント概要</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_03 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>試合詳細</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_04 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>当日受付時間</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_05 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>試合会場開場時間</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_06 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>注意事項</v-subheader>
                </v-col>
                <v-col cols="8">
                  {{ item.ext_col_07 }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>申込可能枚数</v-subheader>
                </v-col>
                <v-col cols="8">
                  お一人様{{ item.ext_col_08 }}枚まで
                </v-col>
              </v-row>
            </v-container>

            <v-container fluid>
              <v-container fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                    <h3>購入済み・予約済みのチケット</h3>
                    <v-simple-table :fixed-header="false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              注文番号
                            </th>
                            <th class="text-left">
                              内容
                            </th>
                            <th class="text-left">
                              QRコード
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="order in order_list"
                            :key="order.ec_order_id"
                          >
                            <td>
                              {{ order.ec_order_id }}<br />
                              [<span v-text="order_status(order.ec_payment_id,order.payment_status)" />]
                            </td>
                            <td>
                              <table>
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                >
                                  <td class="text-left">
                                    <br />
                                    <span v-text="prodcut_nm(order_detail.product_id)" /><br />
                                    {{ order_detail.price }}円<br />
                                    {{ order_detail.quantity }}枚<br />
                                    <span v-if="order.note != 0 && order.note != null && prodcut_nm(order_detail.product_id).search('自由席') == -1">
                                      ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1] }}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                            <td>
                              <div v-if="order.payment_status == 450 || order.payment_status == 150">
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <td
                                    v-for="index in parseInt(order_detail.quantity)"
                                    :key="index"
                                    style="display:block"
                                  >
                                    <p style="margin-bottom:0"> {{ order.ec_order_id + ':' + 'imabari' + ':' + order_detail.order_detail_id+ ':' +  index }} </p>
                                    <v-dialog
                                      max-width="1000"
                                      transition="dialog-bottom-transition"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                          class="btn"
                                          v-bind="attrs"
                                          outlinedlargefabcolor="indigo"
                                          v-on="on"
                                        >QRコードを表示</v-btn>
                                      </template>
                                      <template v-slot:default="dialog">
                                        <v-card>
                                          <v-toolbar
                                            color="primary"
                                            dark
                                          >
                                            <v-spacer></v-spacer>
                                            <v-card-actions class="justify-end">
                                              <v-btn
                                                text
                                                @click="dialog.value = false"
                                              >
                                                閉じる
                                              </v-btn>
                                            </v-card-actions>
                                          </v-toolbar>
                                          <v-card-text style="text-align:center">
                                            <p>
                                              <br />
                                              <span v-text="prodcut_nm(order_detail.product_id)" /> <br/>
                                              <span v-if="order.note != 0 && order.note != null">
                                               ゾーン {{ order.note.split('-')[0] }} / 座席 {{ order.note.split('-')[1] }}
                                              </span>
                                            </p>
                                            <p>
                                              <vue-qrcode :value="prodcut_qr(order.ec_order_id + ':' + 'imabari' + ':' + order_detail.order_detail_id + ':' + index)" tag="img" />
                                            </p>
                                          </v-card-text>
                                          <v-card-text>
                                            <p style="text-align:center">QRコードを送信する場合。</p>
                                            <p style="text-align:center">LINEなどで送信する場合には、QRコード画像箇所を長押しして表示される共有機能にて送信ください。</p>
                                            <div class="d-flex flex-column justify-space-between align-center">
                                            <v-img :src="require('@/assets/images/share.png')" width=20%></v-img>
                                            </div>
                                            <p style="text-align:center">※共有を押すと画像共有ツールが表示されます。</p>
                                          </v-card-text>
                                        </v-card>
                                      </template>
                                    </v-dialog>
                                  </td>
                                </tr>
                              </div>
                              
                              <div v-else-if="order.payment_status == 410">
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <div v-if="order.order_details.length == 1">
                                    <br/><p>決済お手続き完了後に表示されます。</p>
                                  </div>
                                  <div v-else-if="order.order_details.length > 1 && order.note != null && order.note != 0">
                                    <br/><br/><p>決済お手続き完了後に表示されます。</p><br/>
                                  </div>
                                  <div v-else>
                                    <br/><br/><p>決済お手続き完了後に表示されます。</p>
                                  </div>
                                </tr>
                              </div>

                              <div v-else>
                                <tr
                                  v-for="order_detail in order.order_details"
                                  :key="order_detail.product_id"
                                > 
                                  <div v-if="order.order_details.length == 1">
                                    <br/><p>キャンセル済み。</p>
                                  </div>
                                   <div v-else-if="order.order_details.length > 1 && order.note != null && order.note != 0">
                                    <br/><br/><p>キャンセル済み。</p><br/>
                                  </div>
                                  <div v-else>
                                    <br/><br/><p>キャンセル済み。</p>
                                  </div>
                                </tr>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-container v-if="quantity_list.length > 1 && product_list.length > 0" fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                  <div class="center">
                  　　<v-subheader class="center-text">夢スタ　座席マップ</v-subheader>
                  </div>
                  <v-row align="center">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div align="center" class="resize-logo">
                        <section>
                          <img :src="zoneImg.url" :preview="zoneImg.preview" width=100%>
                        </section>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div align="center" class="resize-logo">
                        <section>
                          <img :src="seatImg.url" :preview="seatImg.preview" width=100%>
                        </section>
                      </div>
                    </v-col>
                  </v-row>
                  </v-card-text>
                </v-card>
              </v-container>

              <v-container v-if="quantity_list.length > 1 && product_list.length > 0" fluid>
                <v-card class="mx-auto" outlined>
                  <v-card-text>
                    <h3>チケットの購入</h3>
                    <v-simple-table :fixed-header="false">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              席種
                            </th>
                            <th class="text-left">
                              チケット単価
                            </th>
                            <th class="text-left">
                              枚数
                            </th>
                          </tr>
                        </thead>
                        <tbody v-for="t in product_list" :key="t.product_id">
                          <template>
                            <tr>
                              <td>{{ t.subject }}</td>
                              <td>{{ t.price_02 }}円</td>
                              <td>
                                <v-select
                                  v-if="t.stock > 0"
                                  v-model="order_products[t.product_id]"
                                  :items="quantity_list"
                                  menu-props="auto"
                                  label="枚数"
                                  hide-details
                                  single-line
                                  outlined
                                />
                                <p v-if="t.stock == 0">
                                  完売
                                </p>
                              </td>
                            </tr>
                            <template v-if="order_products[t.product_id] > 0 && seat_reserved_product.has(t.class_options[19].ec_class_option_id+'')">
                              <tr style="background-color: #EEEEEE" v-for="i in order_products[t.product_id]" :key="t.product_id+''+i">
                                <td style="vertical-align:top" v-if="$vuetify.breakpoint.xs ? false : true">
                                  <div>座席選択{{i}}</div>
                                </td>
                                <td style="vertical-align:top" colspan="1">
                                  <div style="height:50%;">▼ゾーン選択</div>
                                  <div>▼座席選択</div>
                                </td>
                                <td style="vertical-align:top" colspan="2">
                                  <div>
                                    <v-select
                                      style="padding-bottom: 10px;"
                                      no-data-text=''
                                      :items="t.zone_list"
                                      v-model="t['zone'+i]"
                                      label="ゾーンを選択してください"
                                      single-line
                                      hide-details
                                      outlined
                                      @change="getSeats(t['zone'+i], t, i)"
                                    ></v-select>
                                  </div>
                                  <div>
                                    <v-select
                                      no-data-text=''
                                      ref='seatlist'
                                      :items="t['seat_list'+i]"
                                      v-model="t['seat'+i]"
                                      :rules="[rules.required]"
                                      label="座席を選択してください"
                                      single-line
                                      outlined
                                    ></v-select>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>

                    <v-row>
                      <v-col cols="4">
                        <v-subheader>
                          <span style="color: red;">*</span>支払方法
                        </v-subheader>
                      </v-col>
                      <v-col cols="8">
                        <v-radio-group v-model="ec_payment_id">
                          <v-radio label="カード決済" value="61" />
                          <v-radio label="銀行振り込み" value="60" />
                        </v-radio-group>
                        <p v-if="ec_payment_id == '60'" class="body-1">
                          振込先がメールで送信されますので、そちらで振込先をご確認ください。
                        </p>
                        <div v-if="ec_payment_id == '61'" class="card-wrapper">
                          <v-text-field
                            id="cardNumber"
                            v-model="cardNumber"
                            label="クレジットカード番号"
                            outlined
                            :rules="[rules.required]"
                          />
                          <v-text-field
                            id="cardName"
                            v-model="cardName"
                            label="お名前（ローマ字）"
                            outlined
                            :rules="[rules.required]"
                          />
                          <v-row dense>
                            <v-col cols="4">
                              <v-select
                                v-model="cardMonth"
                                :items="[
                                  { value: '1', text: '1月' },
                                  { value: '2', text: '2月' },
                                  { value: '3', text: '3月' },
                                  { value: '4', text: '4月' },
                                  { value: '5', text: '5月' },
                                  { value: '6', text: '6月' },
                                  { value: '7', text: '7月' },
                                  { value: '8', text: '8月' },
                                  { value: '9', text: '9月' },
                                  { value: '10', text: '10月' },
                                  { value: '11', text: '11月' },
                                  { value: '12', text: '12月' },
                                ]"
                                menu-props="auto"
                                label="月"
                                hide-details
                                single-line
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="cardYear"
                                :items="[
                                  { value: '20', text: '2020年' },
                                  { value: '21', text: '2021年' },
                                  { value: '22', text: '2022年' },
                                  { value: '23', text: '2023年' },
                                  { value: '24', text: '2024年' },
                                  { value: '25', text: '2025年' },
                                  { value: '26', text: '2026年' },
                                  { value: '27', text: '2027年' },
                                  { value: '28', text: '2028年' },
                                  { value: '29', text: '2029年' },
                                  { value: '30', text: '2030年' },
                                ]"
                                menu-props="auto"
                                label="年"
                                hide-details
                                single-line
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                id="cardCvv"
                                v-model="cardCvv"
                                label="CVV"
                                outlined
                                :rules="[rules.required]"
                              />
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          type="submit"
                          block
                          x-large
                          color="success"
                          dark
                          :loading="loading"
                        >
                          購入する
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-container>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQrcode from "@chenfengyuan/vue-qrcode"
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import md5 from "js-md5"
Vue.use(preview)

export default {
  components: {
    VueQrcode,
    md5
  },
  data: () => ({
    zoneImg: {
          url: require('@/assets/images/zone.png'),
          preview: '1'
        },
    seatImg: {
          url: require('@/assets/images/seat.png'),
          preview: '2'
        },
    item: [],
    product_list: [],
    seat_reserved_product: new Set(),
    seat_reserved_list: [],
    seat_blackAndSaved_list: [],
    order_list: [],
    valid: true,
    can_order: false,
    success_message: "",
    topics_id: null,
    ec_payment_id: "61",
    order_products: [],
    purchase_cnt:0,
    from_order_products:null,
    quantity_list: [{ value: "0", text: "0枚" }],
    token: "",
    rules: {
      required: (value) => !!value || "この項目は必須入力です",
      password_min: (v) => v.length >= 8 || "最低8文字以上を入力してください",
      zip_length: (v) => v.length <= 7 || "7文字の半角数字で入力してください",
      is_hankaku: (v) =>
        !!v.match(/^[ｦ-ﾟ 0-9]*$/) || "半角英数字で入力してください",
      is_card_number: (v) =>
        (v.length >= 14 && v.length <= 16) ||
        "16桁から18桁の数字で入力してください",
    },
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    loading: false,
    option: {
      errorCorrectionLevel: "M",
      maskPattern: 0,
      margin: 10,
      scale: 2,
      width: 300,
      color: {
        dark: "#000000FF",
        light: "#FFFFFFFF"
      }
    }
  }),
  mounted() {
    let self = this
    let topic_id = this.$route.params.id
    let url = "/rcms-api/1/ticket/" + topic_id
    let urlReserved = "/rcms-api/1/seat_reserved_list"
    let urlBlack = "/rcms-api/1/seat_black_list"
    let urlOrdered = "/rcms-api/1/ordered_order_note?topics_id=" + topic_id
    this.$auth.ctx.$axios.get(urlBlack)
    .then(function (res) {
      let seatBlack = res.data.list
      seatBlack && seatBlack.forEach(black => {
        if (topic_id == black[0]) {
          let s = {
            topic_id: black[0],
            seat: black[1]
          }
          self.seat_blackAndSaved_list.push(s)
        }
      });

      return self.$auth.ctx.$axios.get(urlOrdered)
    })
    .then(function (res) {
      let seatOrderedData = res.data.data
      let seatOrdered
      if (seatOrderedData && seatOrderedData.topics_id == topic_id) {
        seatOrdered = seatOrderedData.ordered_order_note
      }
      seatOrdered && seatOrdered.forEach(oerdered => {
        let s = {
          topic_id: topic_id,
          seat: oerdered
        }
        self.seat_blackAndSaved_list.push(s)
      });

      return self.$auth.ctx.$axios.get(urlReserved)
    })
    .then(function (res) {
      let seatReserved = res.data.list
      seatReserved && seatReserved.forEach(reserved => {
        let s = {
          ec_class_option_id: reserved[0],
          seat: reserved[1]
        }
        self.seat_reserved_list.push(s)
        self.seat_reserved_product.add(reserved[0])
      });
      self.seat_reserved_list.shift()

      self.seat_blackAndSaved_list.forEach(blackAndSaved => {
        self.seat_reserved_list = self.seat_reserved_list.filter(reserved => {
          if (blackAndSaved.seat == reserved.seat) {
            return false   
          }
          return true
        })
      })

      self.$auth.ctx.$axios.get(url).then(function (response) {
        self.item = response.data.details
        self.topics_id = self.item.topics_id
        let url_p = "/rcms-api/1/product_list?topics_id=" + self.topics_id
        self.$auth.ctx.$axios.get(url_p).then(function (res_p) {
          for (const p_list of res_p.data.list) {
            if(p_list.open_flg){
              self.product_list.push(p_list)   
              p_list.zone_list = []
              for(const reserved of self.seat_reserved_list) {
                if (p_list.class_options[19].ec_class_option_id == reserved.ec_class_option_id) {
                  let zone = reserved.seat.split('-')[0]
                  let obj = {
                    text: 'ゾーン' + self.switchZoneNo(zone),
                    value: zone,
                    disabled: false,
                  }
                  p_list.zone_list.push(obj)
                }
              }
            }
          }
        })

        let url_o = "/rcms-api/1/order_list?is_canceled=0&without_payment_error=1&topics_id=" + self.topics_id
        self.$auth.ctx.$axios.get(url_o).then(function (res_o) {
          self.order_list = res_o.data.list
          for (const o_list of res_o.data.list) {
            for (const o_detail of o_list.order_details) {
              self.purchase_cnt += parseInt(o_detail.quantity)
            }
          }
          for (let i = 1; i <= parseInt(self.item.ext_col_08) - self.purchase_cnt; i++) {
            self.quantity_list.push({ value: i, text: i + "枚" })
          }
        })

      })

      //self.product_id = response.data.details.product_id
      //self.can_order = response.data.details.order_list.length ? false : true
    })
  },
  methods: {
    getSeats(zone, product, index) {
      product['seat_list'+index] = []
      this.seat_reserved_list.forEach(reserved => {
        if(reserved.seat != null && reserved.seat != undefined && reserved.seat != ""){
          let reservedZone = reserved.seat.split('-')[0]
          let seat = reserved.seat.split('-')[1]
          if (reserved.ec_class_option_id == product.class_options[19].ec_class_option_id && reservedZone == zone) {
            let obj = {
                text: seat,
                value: reserved.seat,
                disabled: false,
              }
            product['seat_list'+index].push(obj)
          }
        }
      })
    },
    switchZoneNo(zoneNo) {
      switch (zoneNo) {
        case '1' : return '①'
        case '2' : return '②'
        case '3' : return '③'
        case '4' : return '④'
        case '5' : return '⑤'
        case '6' : return '⑥'
        case '7' : return '⑦'
        case '8' : return '⑧'
        case '9' : return '⑨'
        case '10' : return '⑩'
        default : return zoneNo
      }
    },
    prodcut_nm(product_id) {
      for (const p of this.product_list) {
        if(p.product_id == product_id){
        return p.subject
        }
      }
      return ""
    },
    prodcut_qr(qr_code){
      if(qr_code != null){
        let hash_code = md5(qr_code.toString())
        return hash_code
      }
      return ""
    },
    order_status(ec_payment_id,payment_status){
      let rtn = ""
      if(ec_payment_id==60){
        rtn += "銀行振り込み"
        if(payment_status == 410){
          rtn += "(予約中・未決済)"
        }else if(payment_status == 450){
          rtn += "(入金確認済み)"
        }else{
          rtn += "(キャンセル)"
        }
      }else if(ec_payment_id==61){
        rtn += "カード決済"
        if(payment_status == 150){
          rtn += "(決済完了)"
        }else if(payment_status == 9150){
          rtn += "(決済失敗)"
        }else{
          rtn += "(キャンセル)"
        }
      }
      
      return rtn
    },
    purchase() {
      this.loading = true
      let self = this
      let from_order_products = []
      let from_order_note = ''
      let order_cnt = 0
      Object.keys(self.order_products).forEach(function (key) {
        let obj = new Object()
        obj.product_id = key
        obj.quantity = self.order_products[key]
        order_cnt += parseInt(obj.quantity)
        Object.assign({}, obj)
        from_order_products.push(obj)
      })

      if (this.$refs.seatlist) {
        this.$refs.seatlist.forEach(seat => {
          if (seat.value) {
            from_order_note += seat.value + ','
          }
        })
        from_order_note = from_order_note.substr(0, from_order_note.length - 1)
      }

      if (from_order_note) {
        let arrLength = from_order_note.split(',').length
        let setLength = new Set(from_order_note.split(',')).size
        if (arrLength !== 0 && arrLength !== setLength) {
          self.$store.dispatch(
            "snackbar/setError",
            "1座席を二回以上購入しています。"
          )
          self.$store.dispatch("snackbar/snackOn")
          self.loading = false
          return
        }
      }
      
      if(self.purchase_cnt + order_cnt > parseInt(self.item.ext_col_08)){
        self.$store.dispatch(
          "snackbar/setError",
          "1試合でご購入いただける合計上限枚数を超えています。"
        )
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
        return
      }

      if (this.$refs.form3.validate()) {
        
        if (this.ec_payment_id == 61) {
          // eslint-disable-next-line no-undef
          let paygentToken = new PaygentToken()
          paygentToken.createToken(
            process.env.PAYGENT_MERCHANT_ID,
            process.env.PAYGENT_TOKEN,
            {
              card_number: self.cardNumber,
              expire_year: self.cardYear,
              expire_month: self.cardMonth,
              cvc: self.cardCvv,
              name: self.cardName,
            },
            function (response) {
              if (response.result == "0000") {
                self.$auth.ctx.$axios
                  .post("/rcms-api/1/ec/purchase", {
                    ec_payment_id: parseInt(self.ec_payment_id),
                    order_products: from_order_products,
                    card_token: response.tokenizedCardObject.token,
                    order_note: from_order_note
                  })
                  .then(() => {
                    self.$store.dispatch(
                      "snackbar/setMessage",
                      "チケットを購入いたしました。"
                    )
                    self.$store.dispatch("snackbar/snackOn")

                    self.$auth.fetchUser().then(() => {
                      self.$router.push("/")
                      self.loading = false
                    })
                  })
                  .catch(function (error) {
                    self.$store.dispatch(
                      "snackbar/setError",
                      error.response.data.errors?.[0]
                    )
                    self.$store.dispatch("snackbar/snackOn")
                    self.loading = false
                  })
              } else {
                self.$store.dispatch(
                  "snackbar/setError",
                  "カード入力内容に不備があります。再度、入力内容をご確認ください[code:" +
                    response.result +
                    "]"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
              }
            }
          )
        } else {
          self.$auth.ctx.$axios
            .post("/rcms-api/1/ec/purchase", {
              ec_payment_id: parseInt(self.ec_payment_id),
              order_products: from_order_products,
              order_note: from_order_note
            })
            .then(() => {
              self.$store.dispatch(
                "snackbar/setMessage",
                self.success_message +
                  "購入の申し込みを受け付けました。メールをご確認の上、決済手続きをお願いいたします。"
              )
              self.$store.dispatch("snackbar/snackOn")
              self.$router.push("/")
              self.loading = false
            })
            .catch(function (error) {
              self.$store.dispatch(
                "snackbar/setError",
                error.response.data.errors?.[0]
              )
              self.$store.dispatch("snackbar/snackOn")
              self.loading = false
            })
        }
      } else {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.col {
  white-space: pre-line;
}
.zone {
  padding: 0 !important;
}
.center{
  text-align: center;
}
.center-text{
  display: inline-block;
}
.resize-logo {
  cursor: zoom-in; 
}
.btn {
  background-color: rgb(255 255 255 / 12%) !important;
  border-color: #1976d2 !important;
  border-style: solid !important;
  border-width: 3px;
  box-shadow: none;
}
</style>