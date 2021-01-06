<template>
  <div class="container shop-wrap shop-cart">
    <v-container>
      <h2 class="shop-ttl">買い物カゴ</h2>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec" nuxt>買い物を続ける</v-btn>
        </v-col>
      </v-row>

      <div v-for="product in products">
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
            <p v-if="product.size">size : {{ product.size }}</p>
            </div>
            <!-- select box -->
            <v-select 
              class="p-select"
              :items="product.items"
              label="個数"
              outlined
            ></v-select>
            
          </v-col>
		  <v-col class="d-flex flex-row-reverse c-del" >
		    <v-btn @click="removeProduct">削除</v-btn>
		  </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>

    <!-- 支払い方法 TODO これはコンポーネント化する -->
    <v-row class="p-list">
      <v-col cols="4" class="p-header">
        <v-subheader>支払方法</v-subheader>
      </v-col>
      <v-col cols="8">
        <v-radio-group v-model="ec_payment_id">
          <v-radio label="カード決済" value="58" />
          <v-radio label="銀行振り込み" value="60" />
        </v-radio-group>
        <p v-if="ec_payment_id == '60'" class="body-1">
          振込先がメールで送信されますので、そちらで振込先をご確認ください。
        </p>
        <p v-if="ec_payment_id == '59'" class="body-1">
          コンビニ決済用のメールが送信されますので、そちらの案内にそってお支払いをお願いいたします。
        </p>
        <div v-if="ec_payment_id == '58'" class="card-wrapper">
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
          @click="moveConfirm"
          block
          x-large
          color="success"
          dark
          :loading="loading"
        >
          確認
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
export default {
  auth: false,
  data() {
    return {
      quantities: [1,2,3,4,5,6,7,8,9,10],
      ec_payment_id: "58",
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      loading: false,
      products: [
        {
          id: 10,
          title: "商品A",
          price: 1000,
          size: 'L',
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 11,
          title: "商品B",
          price: 2000,
          items: [1,2,3],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 12,
          title: "商品C",
          price: 3000,
          size: 'M',
          items: [1,2,3,4,5],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 13,
          title: "商品D",
          price: 4000,
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 14,
          title: "商品E",
          price: 4000,
          size: 'S',
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 15,
          title: "商品F",
          price: 1000,
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 16,
          title: "商品G",
          price: 1500,
          size: 'LL',
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 17,
          title: "商品H",
          price: 1800,
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
        {
          id: 18,
          title: "商品I",
          price: 1900,
          size: 'S',
          items: [1,2,3,4,5,6,7,8,9,10],
          image: "https://cheer-fund.s3-ap-northeast-1.amazonaws.com/product_image/12/product-1506865076.jpeg",
        },
      ],
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
    moveConfirm() {
      this.$router.push("/ec/confirm")
    },
    removeProduct() {
      this.$store.dispatch(
        "snackbar/setMessage",
        "商品を削除しました"
      )
      this.$store.dispatch("snackbar/snackOn")
    }
  }
}
</script>
