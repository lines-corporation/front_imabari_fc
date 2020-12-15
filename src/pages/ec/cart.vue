<template>
  <div class="container">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn to="/ec" nuxt>買い物を続ける</v-btn>
        </v-col>
      </v-row>

      <!-- ここをループさせる -->
      <div>
        <v-row no-gutters>
          <v-col>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-width="400"
              src="https://picsum.photos/id/11/500/300"
            ></v-img>
          </v-col>
          <v-col>
            <h3>商品名</h3>
            <p>¥ 3000</p>
            <p>size : L</p>
            <!-- select box -->
            <v-select
              :items="quantities"
              label="個数"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-divider></v-divider>
      </div>

    <!-- 支払い方法 TODO これはコンポーネント化する -->
    <v-row>
      <v-col cols="4">
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
    }
  }
}
</script>
