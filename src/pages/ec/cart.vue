<template>
  <div class="container shop-wrap shop-cart">
    <v-container>
      <h2 class="shop-ttl">買い物カゴ</h2>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec" nuxt>買い物を続ける</v-btn>
        </v-col>
      </v-row>

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
            <p>¥ {{ product.price }}</p>
            <p v-if="flag && product.discount">有料会員限定の割引価格 ¥ {{ product.discount }}</p>
            <p v-if="product.size">size : {{ product.size }}</p>
            <p v-if="product.quantity">{{ product.quantity }}個</p>
            </div>
          </v-col>
      <v-col class="d-flex flex-row-reverse c-del" >
        <v-btn @click="removeProduct(product.id)">削除</v-btn>
      </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>

    <!-- 支払い方法 TODO これはコンポーネント化する -->
    <div v-if="seasonPassFlg && products.length == 1">
      <v-row>
        <span>シーズンパスのご希望の席を入力してください。（指定席を選択の場合）<br> 購入者様以外の方の分をご購入の場合は、ご利用される方の①お名前②年齢③性別④電話番号をご記入ください。</span>
      </v-row>
    </div>
    <div v-else-if="seasonPassBesidesFlg && products.length == 1">
      <v-row>
        <span>※ご要望等ありましたら入力してください。</span>
      </v-row>
    </div>
    <div v-else-if="products.length > 1">
      <v-row>
        <span>
          シーズンパスのご希望の席を入力してください。（指定席を選択の場合）<br>
          購入者様以外の方の分をご購入の場合は、ご利用される方の①お名前②年齢③性別④電話番号をご記入ください。<br><br>
          ※ご要望等ありましたら入力してください。
        </span>
      </v-row>
    </div>
    <v-row>
      <v-textarea
        name="input-7-1"
        filled
        v-model="order_note"
      ></v-textarea>
    </v-row>
    <v-row class="p-list">
      <v-col cols="4" class="p-header">
        <v-subheader>支払方法</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-radio-group v-model="ecPaymentId">
          <v-radio label="カード決済" value="61" />
          <v-radio label="銀行振り込み" value="60" />
          <!-- <v-radio label="コンビニ払い" value="59" /> -->
        </v-radio-group>
        <p v-if="ecPaymentId == '60'" class="body-1">
          ■振込先 <br>
          伊予銀行　今治支店 <br>
          普通預金口座　3907025<br>
          名義：株式会社今治．夢スポーツ <br>
          <br>
          ※本日より1週間以内にお振込みいただきますようお願いいたします。 <br>
          ※振込手数料はご本人負担でお願いいたします。 <br>
          ※お振り込みの際は、振込人名義にご本人様のお名前(フルネーム)・注文番号をご入力ください。 <br>
          <br>
          振込先はメールでも送信されますのでご確認ください。
        </p>
        <p v-if="ecPaymentId == '59'" class="body-1">
          コンビニ決済用のメールが送信されますので、そちらの案内にそってお支払いをお願いいたします。
        </p>
        <div v-if="ecPaymentId == '61'" class="card-wrapper">
          <p>クレジットカードの情報例</p>
          <v-row>
            <v-col cols="12" sm="6">
            <p>表面</p>
              <v-img :src="require('@/assets/images/img_card_f.png')" width=100%></v-img>
            </v-col>
            <v-col cols="12" sm="6">
            <p>裏面</p>
              <v-img :src="require('@/assets/images/img_cvv.png')" width=100%></v-img>
            </v-col>
          </v-row>
          <p>
            ※American ExpressのCVVはカード前面に4桁の数字で記載されています。<br/>
            <br>
          </p>
          <v-text-field
            id="cardNumber"
            v-model="cardNumber"
            type="number"
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
    
    <v-row class="p-list">
      <v-col cols="4" class="p-header">
        <v-subheader>配送先住所</v-subheader>
      </v-col>
      <v-col cols="8" class="translate">
        <v-radio-group v-model="address_elected" @change=getProductInfo()>
          <v-radio label="FC IMABARI Sailors' Clubにご登録の住所へ配送をご希望の場合" value="login-address" />
          <v-radio label="その他の住所へ配送をご希望の場合" value="new-address" />
        </v-radio-group>
        <div v-if="address_elected == 'new-address'" class="card-wrapper" style="height: 820px;">
          <v-container fluid>
            <v-row dense>
              <v-col cols="4">
                <span style="color: red;">※</span>お名前
              </v-col>
            </v-row>
            <v-row dense>
              <v-col  cols="6" sm="6">
                <v-text-field
                  v-model="name1"
                  label="姓"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
              <v-col  cols="6" sm="6">
              <v-text-field
                v-model="name2"
                label="名"
                :rules="[rules.required]"
                outlined
              />
              </v-col>
            </v-row>
            <v-row dense class="translate-zip-code">
              <v-col cols="4">
                <span style="color: red;">※</span>郵便番号
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="zip_code"
                  label="郵便番号"
                  @blur="searchAddress(zip_code)"
                  :rules="[rules.required, rules.zip_length]"
                  hint="ハイフンなしの半角数字7桁をご入力ください"
                  outlined
                />
              </v-col>
            </v-row>

            <v-row dense class="translate-tdfk-cd">
              <v-col cols="4">
                <span style="color: red;">※</span>都道府県
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="tdfk_cd"
                  :rules="[rules.required]"
                  :items="arrTdfk_cd"
                  item-text="name"
                  item-value="code"
                  menu-props="auto"
                  label="都道府県"
                  hide-details
                  single-line
                  outlined
                />
              </v-col>
            </v-row>
            <v-row dense class="translate-address1">
              <v-col cols="4">
                <span style="color: red;">※</span>市区町村
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="address1"
                  label="市区町村"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row dense class="translate-address2">
              <v-col cols="4">
                <span style="color: red;">※</span>番地
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="address2"
                  label="番地"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row dense class="translate-address3">
              <v-col cols="4">
                <span>建物名／部屋番号</span>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="address3"
                  label="建物名／部屋番号"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row dense class="translate-tel">
              <v-col cols="4">
                <span style="color: red;">※</span>電話番号
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="tel"
                  label="電話番号"
                  type="tel"
                  :rules="[rules.required, rules.tel]"
                  hint="ハイフンなしの半角数字をご入力ください"
                  outlined
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>

    <v-row class="p-list">
      <v-col cols="4" class="p-header">
        <v-subheader>合計金額</v-subheader>
      </v-col>
      <v-col cols="8">
        <p class="p-cell">割引額 -¥{{ sum }}</p>
        <p class="p-cell">¥ {{ totalPrice }} (送料 ¥{{ deliv_fee }} )</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn
          @click="executePayment"
          :loading="loading"
          :disabled="loading"
          nuxt
          class="btn-done"
        >
        決済する
      </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn to="/ec" nuxt>EC TOPへ</v-btn>
      </v-col>
    </v-row>

    </v-container>

  </div>
</template>

<script>
import Vue from 'vue'
import { VueJsonp } from 'vue-jsonp'

Vue.use(VueJsonp)
export default {
  auth: false,
  data() {
    return {
      loading: false,
      products: [],
      flag: true,
      name1: "",
      name2: "",
      zip_code: "",
      tdfk_cd: "",
      arrTdfk_cd: [
        { code: "01", name: "北海道" },
        { code: "02", name: "青森県" },
        { code: "03", name: "岩手県" },
        { code: "04", name: "宮城県" },
        { code: "05", name: "秋田県" },
        { code: "06", name: "山形県" },
        { code: "07", name: "福島県" },
        { code: "08", name: "茨城県" },
        { code: "09", name: "栃木県" },
        { code: "10", name: "群馬県" },
        { code: "11", name: "埼玉県" },
        { code: "12", name: "千葉県" },
        { code: "13", name: "東京都" },
        { code: "14", name: "神奈川県" },
        { code: "15", name: "新潟県" },
        { code: "16", name: "富山県" },
        { code: "17", name: "石川県" },
        { code: "18", name: "福井県" },
        { code: "19", name: "山梨県" },
        { code: "20", name: "長野県" },
        { code: "21", name: "岐阜県" },
        { code: "22", name: "静岡県" },
        { code: "23", name: "愛知県" },
        { code: "24", name: "三重県" },
        { code: "25", name: "滋賀県" },
        { code: "26", name: "京都府" },
        { code: "27", name: "大阪府" },
        { code: "28", name: "兵庫県" },
        { code: "29", name: "奈良県" },
        { code: "30", name: "和歌山県" },
        { code: "31", name: "鳥取県" },
        { code: "32", name: "島根県" },
        { code: "33", name: "岡山県" },
        { code: "34", name: "広島県" },
        { code: "35", name: "山口県" },
        { code: "36", name: "徳島県" },
        { code: "37", name: "香川県" },
        { code: "38", name: "愛媛県" },
        { code: "39", name: "高知県" },
        { code: "40", name: "福岡県" },
        { code: "41", name: "佐賀県" },
        { code: "42", name: "長崎県" },
        { code: "43", name: "熊本県" },
        { code: "44", name: "大分県" },
        { code: "45", name: "宮崎県" },
        { code: "46", name: "鹿児島県" },
        { code: "47", name: "沖縄県" },
      ],
      address1: "",
      address2: "",
      address3: "",
      tel: "",
      selectedBox: [],
      address_elected: "login-address",
      ecPaymentId: "61",
      quantities: [1,2,3,4,5,6,7,8,9,10],
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      totalPrice: 0,
      discount_price: 0,
      discounts: [],
      result: [],
      sum: 0,
      deliv_fee: 0, // 送料
      seasonPassFlg: false, // シーズンパスの場合には入力項目が少し変わる
      seasonPassBesidesFlg: false,// シーズンパス以外の場
      // seasonPassRemarks: "",
      order_note: "",
      rules: {
        required: (value) => !!value || "この項目は必須入力です",
        password_min: (v) => v.length >= 8 || "最低8文字以上を入力してください",
        zip_length: (v) => v.length <= 7 || "7文字の半角数字で入力してください",
        is_hankaku: (v) =>
          !!v.match(/^[ｦ-ﾟ 0-9]*$/) || "半角英数字で入力してください",
        is_card_number: (v) =>
          (v.length >= 14 && v.length <= 16) ||
          "16桁から18桁の数字で入力してください",
        zip_length: (v) => v.length == 7 || "7文字の半角数字で入力してください",
        tel: (v) =>
          v.length == 0 ||
          /^0[0-9]{9,10}$/.test(v) ||
          "ハイフンなしの半角数字をご入力ください",
      },
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
  },
  methods: {
    /**
     * 郵便番号から入力
     */
      searchAddress(zip_code) {
        let self = this
        let url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode="+zip_code
        this.$jsonp(url)
        .then(res => {
          if (res.results == null) {
             self.$store.dispatch(
             "snackbar/setError",
             "郵便番号存在しません。"
            )
            self.$store.dispatch("snackbar/snackOn")
            self.loading = false
            return
          }
          self.tdfk_cd = res.results[0]['prefcode']
          self.address1 = res.results[0]['address2'] + res.results[0]['address3']
          self.cd = self.address_elected == 'new-address' ? self.tdfk_cd : self.$auth.user.tdfk_cd
          self.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${self.$auth.user.ec_cart_id}?tdfk_cd=${self.cd}`).then(function (response) {
          // 送料の設定
          self.deliv_fee = parseInt(response.data.details.deliv_fee)
          self.totalPrice = parseInt(response.data.details.total)
          })
         }).catch(error => {
        console.log(error);
      })
    },
    async getProductInfo() {
      let self = this
      // kurocoからデータを取得してみる
      self.products = []
      self.discounts = []
      self.seasonPassFlg = false
      self.seasonPassBesidesFlg = false
      self.flag = Object.values(JSON.parse(JSON.stringify(self.$auth.user.group_ids)))[0] != "無料会員"
      if(self.address_elected != 'new-address'){
        self.tdfk_cd = self.$auth.user.tdfk_cd
      }
      let response = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${self.$auth.user.ec_cart_id}?tdfk_cd=${self.tdfk_cd}`)
      // 送料の設定
      self.deliv_fee = parseInt(response.data.details.deliv_fee)
      self.totalPrice = parseInt(response.data.details.total)
      if(response.data.details.items) {
        response.data.details.items.forEach(item => {
          let self = this
          self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/${item.product_id}`).then((productInfoResponse) => {
            // シーズンパス稼働波の判定
            if(productInfoResponse.data.details.product_data.contents_type == process.env.SEASON_PASS_CATEGORY_ID) {
              self.seasonPassFlg = true
            } else {
              self.seasonPassBesidesFlg = true
            }
            self.products.push({
              id:       item.product_id,
              quantity: item.quantity,
              discount: productInfoResponse.data.details.group_price,
              discount_price: productInfoResponse.data.details.discount_price,
              title:    productInfoResponse.data.details.topics_name,
              price:    productInfoResponse.data.details.product_data.ext_col_04,
              size:     productInfoResponse.data.details.product_name,
              image:    productInfoResponse.data.details.product_data.ext_columns.straight[0].file_url,
            })
            self.discounts.push({
              discount_prices: parseInt(item.quantity)*parseInt(productInfoResponse.data.details.discount_price)
            })
            let result = JSON.parse(JSON.stringify(self.discounts)).slice(-1)
            var values = []
            for(var property of result){
              for(var k in property)
              values.push(property[k])
            }
            for(var i=0; i < values.length; i++){
              self.sum += values[i]
            }
          })
        })
      }
    },
    async executePayment() {
      this.loading = true
      let self = this

      // firestoreに備考を保存する
      // const db = firebase.firestore()
      // let collection = db.collection(process.env.FIREBASE_COLLECTION)
      // collection.add({
      //    member_id: this.$auth.user.member_id,
      //    remarks:   this.seasonPassRemarks,
      //  }).then(ref => {
      //    // 書き込み完了
      //  })

      // その他の住所へ配送をご希望の場合
      if(self.address_elected == 'new-address'){
        if(self.name1 == "" || self.name2 == "" || self.zip_code == "" || self.tdfk_cd =="" || self.address1 =="" || self.address2 =="" || self.tel =="") {
        self.$store.dispatch(
          "snackbar/setError",
          "配送先住所に誤りがあります。ご確認ください。"
        )
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
        return
        }
        if((self.tel).match(/[\uff00-\uffff]/g) || self.zip_code.length != 7 || self.tel.length < 10 || self.tel.length>11 || self.tel.substring(0,1) != 0) {
          self.$store.dispatch(
           "snackbar/setError",
           "配送先住所に誤りがあります。ご確認ください。"
         )
         self.$store.dispatch("snackbar/snackOn")
         self.loading = false
         return
        }
        // カード払い
        if(self.ecPaymentId == 61) {
          let paygentToken = new PaygentToken()
          paygentToken.createToken(
            process.env.PAYGENT_MERCHANT_ID,
            process.env.PAYGENT_TOKEN,
            {
              card_number:  self.cardNumber,
              expire_year:  self.cardYear,
              expire_month: self.cardMonth,
              cvc:          self.cardCvv,
              name:         self.cardName,
            },
            function(response) {
              if(response.result != "0000" || self.cardYear == "" || self.cardMonth == "" || self.cardCvv == "" || self.cardName =="") {
                // paygentのエラーコードの種類が判明したらハンドリングする
                self.$store.dispatch(
                  "snackbar/setError",
                  "クレジットカード情報に誤りがあります。ご確認ください"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
                return
              }
              self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
                ec_payment_id: parseInt(self.ecPaymentId),
                ec_cart_id:    self.$auth.user.ec_cart_id,
                card_token:    response.tokenizedCardObject.token,
                order_note:    self.order_note,
                shipping_address: {
                  name1:    self.name1,
                  name2:    self.name2,
                  zip_code: self.zip_code,
                  tdfk_cd:  self.tdfk_cd,
                  address1: self.address1,
                  address2: self.address2,
                  address3: self.address3,
                  tel:      self.tel,
                },
              }).then((response) => {
                console.warn("成功!!!!!")
                console.warn(response)
                self.$store.dispatch(
                  "snackbar/setMessage",
                  "購入完了メールをご確認の上、決済手続きをお願いいたします。"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.$router.push("/ec/done")
                self.loading = false
              }).catch(function (error) {
                self.$store.dispatch(
                  "snackbar/setError",
                  error.response.data.errors?.[0]
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
                return
              })
            }
          )
        } else if(self.ecPaymentId == 60){
           // 銀行振り込み
           self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
             ec_payment_id: parseInt(self.ecPaymentId),
             ec_cart_id:    self.$auth.user.ec_cart_id,
             order_note:    self.order_note,
             shipping_address: {
               name1:    self.name1,
               name2:    self.name2,
               zip_code: self.zip_code,
               tdfk_cd:  self.tdfk_cd,
               address1: self.address1,
               address2: self.address2,
               address3: self.address3,
               tel:      self.tel,
             },
           }).then(() => {
             console.warn("成功!!")
             self.$store.dispatch(
               "snackbar/setMessage",
               "購入完了メールをご確認の上、決済手続きをお願いいたします。"
             )
             self.$store.dispatch("snackbar/snackOn")
             self.$router.push("/ec/done")
             self.loading = false
           }).catch(function (error) {
             console.warn("!!! error !!!!!!")
             console.warn(error)
             self.$store.dispatch(
               "snackbar/setError",
               error.response.data.errors?.[0]
             )
             self.$store.dispatch("snackbar/snackOn")
             self.loading = false
           })
         } else if (self.ecPaymentId == 59){
          //  コンビニ払い
           self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
             ec_payment_id: parseInt(self.ecPaymentId),
             ec_cart_id:    self.$auth.user.ec_cart_id,
             order_note:    self.order_note,
             shipping_address: {
               name1:    self.name1,
               name2:    self.name2,
               zip_code: self.zip_code,
               tdfk_cd:  self.tdfk_cd,
               address1: self.address1,
               address2: self.address2,
               address3: self.address3,
               tel:      self.tel,
             },
           }).then(() => {
             console.warn("成功!!")
             self.$store.dispatch(
               "snackbar/setMessage",
               "購入完了メールをご確認の上、決済手続きをお願いいたします。"
             )
             self.$store.dispatch("snackbar/snackOn")
             self.$router.push("/ec/done")
             self.loading = false
           }).catch(function (error) {
             console.warn("!!! error !!!!!!")
             console.warn(error)
             self.$store.dispatch(
               "snackbar/setError",
               error.response.data.errors?.[0]
             )
             self.$store.dispatch("snackbar/snackOn")
             self.loading = false
           })
         }
       } else { // FC IMABARI Sailors' Clubにご登録の住所へ配送をご希望の場合
         // カード払い
         if(self.ecPaymentId == 61) {
           let paygentToken = new PaygentToken()
           paygentToken.createToken(
             process.env.PAYGENT_MERCHANT_ID,
             process.env.PAYGENT_TOKEN,
             {
               card_number:  self.cardNumber,
               expire_year:  self.cardYear,
               expire_month: self.cardMonth,
               cvc:          self.cardCvv,
               name:         self.cardName,
             },
             function(response) {
               if(response.result != "0000" || self.cardYear == "" || self.cardMonth == "" || self.cardCvv == "" || self.cardName =="") {
                 // paygentのエラーコードの種類が判明したらハンドリングする
                 self.$store.dispatch(
                   "snackbar/setError",
                   "クレジットカード情報に誤りがあります。ご確認ください"
                 )
                 self.$store.dispatch("snackbar/snackOn")
                 self.loading = false
                 return
               }
               self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
                 ec_payment_id: parseInt(self.ecPaymentId),
                 ec_cart_id:    self.$auth.user.ec_cart_id,
                 card_token:    response.tokenizedCardObject.token,
                 order_note:    self.order_note,
               }).then((response) => {
                 console.warn("成功!!!!!")
                 console.warn(response)
                 self.$store.dispatch(
                   "snackbar/setMessage",
                   "購入完了メールをご確認の上、決済手続きをお願いいたします。"
                 )
                 self.$store.dispatch("snackbar/snackOn")
                 self.$router.push("/ec/done")
                 self.loading = false
               }).catch(function (error) {
                 self.$store.dispatch(
                   "snackbar/setError",
                   error.response.data.errors?.[0]
                 )
                 self.$store.dispatch("snackbar/snackOn")
                 self.loading = false
                 return
               })
             }
           )
         } else if (self.ecPaymentId == 60){
           // 銀行振り込み
           self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
             ec_payment_id: parseInt(self.ecPaymentId),
             ec_cart_id:    self.$auth.user.ec_cart_id,
             order_note:    self.order_note,
           }).then(() => {
             console.warn("成功!!")
             self.$store.dispatch(
               "snackbar/setMessage",
               "購入完了メールをご確認の上、決済手続きをお願いいたします。"
             )
             self.$store.dispatch("snackbar/snackOn")
             self.$router.push("/ec/done")
             self.loading = false
           }).catch(function (error) {
             console.warn("!!! error !!!!!!")
             console.warn(error)
             self.$store.dispatch(
               "snackbar/setError",
               error.response.data.errors?.[0]
             )
             self.$store.dispatch("snackbar/snackOn")
             self.loading = false
           })
         } else if (self.ecPaymentId == 59){
          //  コンビニ払い
           self.$auth.ctx.$axios.post("/rcms-api/1/ec/purchase", {
             ec_payment_id: parseInt(self.ecPaymentId),
             ec_cart_id:    self.$auth.user.ec_cart_id,
             order_note:    self.order_note,
           }).then(() => {
             console.warn("成功!!")
             self.$store.dispatch(
               "snackbar/setMessage",
               "購入完了メールをご確認の上、決済手続きをお願いいたします。"
             )
             self.$store.dispatch("snackbar/snackOn")
             self.$router.push("/ec/done")
             self.loading = false
           }).catch(function (error) {
             console.warn("!!! error !!!!!!")
             console.warn(error)
             self.$store.dispatch(
               "snackbar/setError",
               error.response.data.errors?.[0]
             )
             self.$store.dispatch("snackbar/snackOn")
             self.loading = false
           })
         }
       }
    },
    async removeProduct(productId) {
      await this.$auth.ctx.$axios.post(`/rcms-api/1/shop/cart/delete`, {
        ec_cart_id: this.$auth.user.ec_cart_id,
        item: {
          product_id: productId,
          quantity: 0 // 個数を指定できるがUIの関係で一旦1個ずつ登録する
        }
      })

      this.$store.dispatch(
        "snackbar/setMessage",
        "商品を削除しました"
      )
      this.$store.dispatch("snackbar/snackOn")
      this.getProductInfo()
      window.location.reload()
    }
  },
  mounted() {
    this.$store.commit('products/clearConfirmList')
    this.getProductInfo()
  }

}
</script>
<style scoped>
.translate-zip-code{
  transform:translateY(-15%);
}
.translate-tdfk-cd{
  transform:translateY(-40%);
}
.translate-address1{
  transform:translateY(-25%);
}
.translate-address2{
  transform:translateY(-40%);
}
.translate-address3{
  transform:translateY(-50%);
}
.translate-tel{
  transform:translateY(-60%);
}
</style>