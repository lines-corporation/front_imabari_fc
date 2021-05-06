<template>
  <div class="form-page">
    <header>
      <h2 class="form-ttl">
        プロフィール編集
      </h2>
    </header>
    <div class="theme--light v-stepper">
      <div class="v-stepper__content">
        <v-form
          ref="form1"
          v-model="valid"
          lazy-validation
          @submit.prevent="update"
        >
          <v-container fluid>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  お名前
                </v-subheader>
              </v-col>
              <v-col cols="4">
                <p v-text="name1" />
              </v-col>
              <v-col cols="4">
                <p v-text="name2" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  お名前(フリガナ)
                </v-subheader>
              </v-col>
              <v-col cols="4">
                <p v-text="namekana1" />
              </v-col>
              <v-col cols="4">
                <p v-text="namekana2" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  性別
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <p v-text="sex" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  生年月日
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <p v-text="birth" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>郵便番号
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="zip_code"
                  label="郵便番号"
                  @blur="searchAddress(zip_code)"
                  type="number"
                  :rules="[rules.required, rules.zip_length]"
                  hint="ハイフンなしの半角数字7桁をご入力ください"
                  counter
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>都道府県
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="tdfk_cd"
                  :rules="[rules.required]"
                  label="都道府県"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>市区町村
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="address1"
                  label="市区町村"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>番地
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="address2"
                  label="番地"
                  :rules="[rules.required]"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>建物名／部屋番号</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="address3"
                  label="建物名／部屋番号"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>電話番号
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="tel"
                  label="電話番号"
                  type="tel"
                  :rules="[rules.required, rules.tel]"
                  hint="ハイフンなしの半角数字をご入力ください"
                  counter
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>携帯電話番号</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="m_tel"
                  label="携帯電話番号"
                  type="m_tel"
                  :rules="[rules.m_tel]"
                  hint="ハイフンなしの半角数字をご入力ください"
                  counter
                  outlined
                />
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
                <v-subheader>FAX番号</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="fax"
                  label="FAX番号"
                  type="tel"
                  :rules="[rules.tel]"
                  hint="ハイフンなしの半角数字をご入力ください"
                  counter
                  outlined
                />
              </v-col>
            </v-row> -->
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  第１メールアドレス(ログイン時のIDになります)
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <p v-text="email" />
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4">
                <v-subheader>第２メールアドレス</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="subemail"
                  label="第２メールアドレス"
                  type="email"
                  autocomplete="off"
                  outlined
                />
              </v-col>
            </v-row> -->
            <v-row>
              <v-col cols="4">
                <v-subheader>パスワード</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="login_pwd"
                  :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.password_min, rules.password]"
                  :type="password_show ? 'text' : 'password'"
                  label="パスワード"
                  hint="8文字以上の半角英数字混在でご入力ください。記号を利用する場合は -_&=+%#@$*.!: が利用可能です。"
                  persistent-hint
                  counter
                  @click:append="password_show = !password_show"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader>
                  <span style="color: red;">*</span>メールマガジン配信
                </v-subheader>
              </v-col>
              <v-col cols="8">
                <v-checkbox
                  v-model="mailmaga_flg"
                  class="mx-2"
                  label="希望する"
                />
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
                  変更する
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Vue from 'vue'
import { VueJsonp } from 'vue-jsonp'

Vue.use(VueJsonp)

export default {
  auth: false,
  data() {
    return {
      valid: true,
      e1: 1,
      access_token: "",
      password_show: false,
      password: "",
      email: "",
      fax: "",
      tel: "",
      m_tel: "",
      subemail: "",
      name1: "",
      name2: "",
      namekana1: "",
      namekana2: "",
      zip_code: "",
      tdfk_cd: "",
      address1: "",
      address2: "",
      address3: "",
      birth: "",
      sex: "",
      mailmaga_flg: false,
      login_pwd: "",
      menu: false,
      loading: false,
      rules: {
        required: (value) => !!value || "この項目は必須入力です",
        password_min: (v) =>
          v.length == 0 || v.length >= 8 || "最低8文字以上を入力してください",
        password: (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9\-_&=+%#@$*.!:]+$/.test(v) ||
          "半角英数字と記号(-_&=+%#@$*.!:)でご入力ください",
        zip_length: (v) => v.length == 7 || "7文字の半角数字で入力してください",
        tel: (v) =>
          v.length == 0 ||
          /^0[0-9]{9,10}$/.test(v) ||
          "ハイフンなしの半角数字をご入力ください",
        m_tel: (v) =>
        v == undefined ||
        v.length == 0 ||
        /^0[0-9]{9,10}$/.test(v) ||
        "ハイフンなしの半角数字をご入力ください",
      },
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"))
    },
    zip: function (val) {
      if (7 != val.length) {
        this.tdfk_cd = ""
        this.address1 = ""
        this.address2 = ""
      }

      let self = this
      let url = "https://api.zipaddress.net/?zipcode=" + val
      axios.get(url).then(function (response) {
        if (response.data.code == "200") {
          self.tdfk_cd = response.data.data.pref
          self.address1 = response.data.data.address
          self.address2 = response.data.data.town
        } else {
          self.tdfk_cd = ""
          self.address1 = ""
          self.address2 = ""
        }
      })
    },
  },
  mounted() {
    if (this.$auth.loggedIn) {
      let self = this
      this.$auth.ctx.$axios
        .get("/rcms-api/1/members/" + this.$auth.user.member_id)
        .then(function (response) {
          console.log(response)
          self.email = response.data.details.email
          self.name1 = response.data.details.name1
          self.name2 = response.data.details.name2
          self.namekana1 = response.data.details.namekana1
          self.namekana2 = response.data.details.namekana2
          self.sex = response.data.details.sex.label
          self.birth = response.data.details.birth
          self.email = response.data.details.email
          self.subemail = response.data.details.email2
          self.zip_code = response.data.details.zip_code
          self.tdfk_cd = response.data.details.tdfk_cd
          self.address1 = response.data.details.address1
          self.address2 = response.data.details.address2
          self.address3 = response.data.details.address3
          self.tel = response.data.details.tel
          self.fax = response.data.details.fax
          self.m_tel = response.data.details.m_tel
          self.mailmaga_flg = !response.data.details.email_send_ng_flg
        })
    }
  },
  methods: {
    /**
     * 郵便番号から入力
     */
    async searchAddress(zip_code) {
      let self = this
      let url = "http://zipcloud.ibsnet.co.jp/api/search?zipcode="+zip_code
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
        self.tdfk_cd = res.results[0]['address1']
        self.address1 = res.results[0]['address2'] + res.results[0]['address3']
      })
      .catch(error => {
        console.log(error);
      })
  　},
    update() {
      this.loading = true
      let self = this

      if (this.$refs.form1.validate()) {
        this.$auth.ctx.$axios
          .post("/rcms-api/1/member/update", {
            zip_code: this.zip_code,
            tdfk_cd: this.tdfk_cd,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3 == null ? "" : this.address3,
            tel: this.tel,
            m_tel: this.m_tel,
            fax: this.fax,
            email2: this.subemail,
            login_pwd: this.login_pwd,
            email_send_ng_flg: this.mailmaga_flg ? 0 : 1,
          })
          .then(function (response) {
            if (response.data.errors.length === 0) {
              self.$store.dispatch(
                "snackbar/setMessage",
                "会員情報変更しました"
              )
              self.$store.dispatch("snackbar/snackOn")
              self.loading = false
              self.$router.push("/")
            }
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
      } else {
        this.loading = false
      }
    },
    save(birth) {
      this.$refs.menu.save(birth)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
