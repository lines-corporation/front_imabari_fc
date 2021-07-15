<template>
  <div class="container">
    <client-only>
      <div v-if="!auth.loggedIn">
        <form class="login-page" @submit.prevent="login">
          <v-row>
            <p class="fnt-w col-xl-auto">
              <strong>
                FC IMABARI Sailors' Club 更新・新規入会方法の詳細は下記をご確認ください。<br />
              </strong><br />
              <!-- <NuxtLink to="/form">
                FC IMABARI Sailors' Club 更新・新規入会方法
              </NuxtLink> -->
              <a :href="join_renew_url">
                FC IMABARI Sailors' Club 更新・新規入会方法
              </a>
            </p>
          </v-row>
          <v-row>
            <div class="login-screen lgn-left">
              <h3 class="subtitle mb-3">
                FC IMABARI Sailors'Club 会員ログイン
              </h3>
              <div class="inner">
                <form @submit.prevent="login">
                  <p class="pm">
                    <strong>メールアドレスとパスワードを<br
                      class="spbr"
                      />入力してください。</strong>
                    </p>
                    <p class="fnt-s clr-red pm">
                    </p>
                    <p>
                      <v-text-field
                      v-model="email"
                      label="メールアドレス"
                      type="email"
                      outlined
                      />
                    </p>
                    <p>
                      <v-text-field
                      v-model="password"
                      label="パスワード"
                      :type="show_pwd1 ? 'text' : 'password'"
                      :append-icon="show_pwd1 ? 'mdi-eye' : 'mdi-eye-off'"
                      outlined
                      @click:append="show_pwd1 = !show_pwd1"
                      />
                    </p>
                    <v-btn
                    type="submit"
                    block
                    x-large
                    color="success"
                    dark
                    :loading="loading"
                    @click="getLogin(login_flag)"
                    >
                      ログインする
                    </v-btn>
                </form>
                <v-checkbox
                  class="box"
                  v-model="login_flag"
                  type="login_flag"
                  label="ログイン状態を保持する"
                >
                </v-checkbox>
                <p>
                  <NuxtLink to="/reminder">
                    仮パスワード発行<br />
                    (パスワードを忘れた場合もこちらからお手続きください)
                  </NuxtLink>
                </p>
              </div>
            </div>
            <div class="login-screen lgn-right">
              <h3 class="subtitle mb-3">
                FC IMABARI Sailors'Club 新規入会はこちら
              </h3>
              <div class="inner">
                <p class="body-1 new-btn">
                  <NuxtLink to="/form">
                    FC IMABARI Sailors'Club 新規入会登録
                  </NuxtLink>
                </p>
                <p class="body-1 nec-btn">
                </p>
              </div>
            </div>
          </v-row>
        </form>
      </div>

      <div v-else class="mypage">
        <v-row>
          <v-col cols="12" sm="3">
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <div class="pro-inner">
                  <p>
                    <strong>名前</strong><span>{{ user.name1 }} {{ user.name2 }}</span>
                  </p>
                  <p>
                    <strong>会員番号</strong><span>{{ user.member_no }}</span>
                  </p>
                  <p>
                    <strong>会員種別</strong><span>{{ group_nm }}</span>
                  </p>
                  <p>
                    <strong>有料会員の継続年数</strong>
                    <span v-if="can_upgrade" style="vertical-align:middle;">有料会員のみ表示されます</span>
                    <span v-else style="vertical-align:middle;">{{ cont_Years }}年目</span>
                  </p>
                </div>
                <!-- 無料会員 会員証 -->
                <v-img v-if="can_upgrade" :src="require('@/assets/images/free_member_card.png')"></v-img>
                <!-- 有料会員 会員証 -->
                <v-img v-else :src="require('@/assets/images/member_card.png')"></v-img>
                <h4>会員番号QR</h4>
                <v-img class="qr">
                  <vue-qrcode v-if="user.member_no != null && user.member_no.length > 0" :value="user.member_no" tag="img" />
                </v-img>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4" to="/profile_edit">
                  プロフィール変更はこちら
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card v-if="can_upgrade" class="mx-auto" outlined>
              <v-card-text>
                <h4>アップグレードのご案内</h4>
                <p class="body-1 ug-p fnt-w">
                  <NuxtLink to="/upgrade">
                    有料への種別変更はこちら
                  </NuxtLink>
                  <!--
                  <NuxtLink to="/ec">
                    グッズ販売はこちら
                  </NuxtLink>
                -->
                </p>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <NuxtLink to="/ec">
                  <v-img :src="require('@/assets/images/btn-ecpage.png')"></v-img>
                </NuxtLink>
              </v-card-text>
            </v-card>
            <!-- <v-card class="mx-auto" outlined>
              <v-card-actions>
                <br /><br /><br /><br />
                <v-btn text color="deep-purple accent-4" to="/vapp">
                  FC今治アプリに連携する
                </v-btn>
              </v-card-actions>
              <v-card-text class="text-center">
                <NuxtLink to="/from_fm">
                  ※「FC今治アプリ連携」とは
                </NuxtLink>
                <br /><br />
              </v-card-text>
            </v-card> -->
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <h4>お知らせ</h4>
                <v-simple-table :fixed-header="false">
                  <template v-slot:default>
                    <tbody>
                      <router-link
                        v-for="item in topics_list1"
                        :key="item.topics_id"
                        :to="'/info/' + item.topics_id"
                        tag="tr"
                      >
                        <td class="date">
                          {{ item.ymd }}
                        </td>
                        <td>{{ item.subject }}</td>
                        <td class="arw">
                          <v-btn icon :to="'/info/' + item.topics_id" nuxt>
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </td>
                      </router-link>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider></v-divider>
                <div @mouseenter="enter()" @mouseleave="leave()">
                  <v-simple-table :class="{active: seen}">
                    <router-link :to="'/info/detail'" nuxt tag="tr" style="cursor:pointer">
                      <td class="info-fond">もっと見る >></td>
                      <td class="info-fond"></td>
                    </router-link>
                  </v-simple-table>
                </div>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <h3>購入済み・予約済みのチケット</h3>

                <v-simple-table :fixed-header="false">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          日付
                        </th>
                        <th class="text-left">
                          イベント名
                        </th>
                        <th class="text-left">
                          会場
                        </th>
                        <th class="text-left" />
                      </tr>
                    </thead>
                    <tbody>
                      <router-link
                        v-for="(item,key) in ticket_result"
                        :key="key"
                        :to="'/ticket/' + item.id"
                        tag="tr"
                      > 
                        <td class="date">
                          {{ item.ymd }}
                        </td>
                        <td>{{ item.topics_name }}</td>
                        <td>{{ item.place_name }}</td>
                        <td class="arw" >
                          <v-btn icon :to="'/ticket/' + item.id" nuxt>
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </td>
                      </router-link>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <h3>現在販売中のチケット</h3>

                <v-simple-table :fixed-header="false">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          日付
                        </th>
                        <th class="text-left">
                          試合名
                        </th>
                        <th class="text-left">
                          会場
                        </th>
                        <th class="text-left" />
                      </tr>
                    </thead>
                    <tbody>
                      <router-link
                        v-for="item in ticket_list"
                        :key="item.topics_id"
                        :to="'/ticket/' + item.topics_id"
                        tag="tr"
                      >
                        <td v-if="item.topics_id != 1036" class="date">
                          {{ item.ymd }}
                        </td>
                        <td v-if="item.topics_id != 1036">{{ item.subject }}</td>
                        <td v-if="item.topics_id != 1036">{{ item.ext_col_01 }}</td>
                        <td v-if="item.topics_id != 1036" class="arw">
                          <v-btn icon :to="'/ticket/' + item.topics_id" nuxt>
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </td>
                      </router-link>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" />
        </v-row>
      </div>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQrcode from "@chenfengyuan/vue-qrcode"
import { Base64 } from 'js-base64'
import CryptoJS from "crypto-js";
Vue.use(CryptoJS)
export default {
  components: {
   VueQrcode,
   Base64,
   CryptoJS
  },
  auth: false,
  data: () => ({
    ticket_list: [],
    my_order_ticket_list: [],
    order_ticket_list:[],
    ticket_list:[],
    topics_name: "",
    ymd: 0,
    seen: true,
    subject: "",
    place_name: [],
    id: 0,
    buy_finish_ticket: [],
    ticket_sort: [],
    ticket_result: [],
    topics_list1: [],
    loading: false,
    show_pwd1: false,
    show_pwd2: false,
    can_ticket_sales: false,
    email: "",
    password: "",
    login_save: 0,
    login_flag: false,
    join_renew_url:"https://www.fcimabari.com/support/FISC.html",
    reg_date: 0,
    cont_Years: 0  //継続年数
  }),
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
   
    tester() {
      // チケット販売を許可していない場合には項目を表示しない
      if (!this.can_ticket_sales) { return false }
      if (this.$auth.loggedIn) {
        self.tester = false
        const group_ids = JSON.parse(JSON.stringify(this.$auth.user.group_ids))
        console.log(group_ids)
        Object.keys(group_ids).forEach(function (key) {
          if (["102"].indexOf(key) !== -1) {
            self.tester = true
          }
        })
        return true
      }
      return true
    },
    group_nm() {
      if (this.$store.$auth.loggedIn) {
        const group_ids = JSON.parse(JSON.stringify(this.$auth.user.group_ids))
        let group_idnms = ""
        Object.keys(group_ids).forEach(function (key) {
          if (key == 114 || key == 111) {
            group_idnms += " " + group_ids[key]
          }
        })
        if (!group_idnms) {
          Object.keys(group_ids).forEach(function (key) {
            if (key == 110 || key == 113) {
              group_idnms += " " + group_ids[key]
            }
          })
        }
        return group_idnms
      } else {
        return ""
      }
    },
  },
  mounted() {
    this.getInfo()
    this.can_upgrade()
    this.enter()
    this.leave()
  },
  created () {
   this.getCookie()
   if(this.$auth.user != null) {
    this.reg_date = this.$auth.user.reg_date
    if (this.reg_date != null) {
      this.cont_Years = (new Date()).getFullYear() - parseInt(this.reg_date.substr(0, 4))
      this.cont_Years = this.cont_Years + 1
    }
   }
  },
  methods: {
     enter(){
        let self = this
        self.seen = true
      },
      leave(){
        let self = this
        self.seen = false
      },
     can_upgrade() {
      let self = this
      if (self.$auth.loggedIn) {
        self.can_upgrade = true
        const group_ids = JSON.parse(JSON.stringify(self.$auth.user.group_ids))
        console.warn("************ group_ids *************")
        console.warn(group_ids)
        Object.keys(group_ids).forEach(function (key) {
          if (["114", "111"].indexOf(key) !== -1) {
            self.can_upgrade = false
          }
        })
        return self.can_upgrade
      }
      return false
    },
    getInfo() {
      if (this.$auth.loggedIn) {
        let self = this
        self.$auth.ctx.$axios
          .get("/rcms-api/1/infos")
          .then(function (response) {
            self.topics_list1 = response.data.list.slice(0,5)
          })
        self.my_order_ticket_list = []
        self.$auth.ctx.$axios
          .get("/rcms-api/1/product_list?my_order_flg=1")
          .then(function (response) {
           for (const order_ticket_list of response.data.list) {
            if (order_ticket_list.order_list.filter(item => item.payment_status != 410).length > 0) {
              self.my_order_ticket_list.push(order_ticket_list)
            }
          }
          let my_order_ticket = self.my_order_ticket_list || []
          for(const my_order of my_order_ticket){
            let obj = {
              ymd: my_order.product_data.ymd,
              topics_name: my_order.topics_name,
              id: my_order.topics_id,
              place_name: my_order.product_data.ext_col_01,
            }
           self.order_ticket_list[my_order.topics_id] = obj
          }
          let buy_finish_ticket = self.order_ticket_list || []
          self.ticket_sort = buy_finish_ticket.sort(item => item.id)
          self.ticket_result = self.ticket_sort.filter(item => item.ymd != null)
        })
        self.$auth.ctx.$axios.get("/rcms-api/1/ticket_list")
        .then(function (response) {
          for (const p_list of response.data.list) {
            if (p_list.product_ids.length > 0) {
              self.ticket_list.push(p_list)
            }
          }
        })
      }
    },
    getLogin(info){
      self = this
      if(info == false){
        self.login_save= 0
      } else {
        self.login_save= 1
      }
    },
    checkedPwd(username,pwd){
      self = this
      if (self.login_flag){
        // base64 暗号化処理
        let base64Pwd=Base64.encode(pwd);
        // Encrypt 暗号化処理
        let cryptoJsPwd=CryptoJS.AES.encrypt(base64Pwd,"secretkey123").toString()
        // アカウントとパスワード保存日数
        self.setCookie(username,cryptoJsPwd,2)
      }else{
        // データをクリーンアップ
        self.clearCookie()
      }
    },
    //cookieを設定
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date()
      // 保存日数
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      //文字列の切り替え
      window.document.cookie = "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString()
      window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString()
    },
    //cookieを読み込み
    getCookie: function() {
      if (document.cookie.length > 0) {
        this.checked=true
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=');
          if (arr2[0] == "username") {
          this.email = arr2[1];
          } else if (arr2[0] == "password") {
          // Decrypt デコード
          let bytes = CryptoJS.AES.decrypt(arr2[1],"secretkey123")
          let originalText=bytes.toString(CryptoJS.enc.Utf8)
          // base64 デコード
          let pwd=Base64.decode(originalText)
          this.password = pwd;
          }
        }
      }
    },
    // cookieをクリーンアップ
    clearCookie: function() {
      this.setCookie("", "", -1);
    },
    async login() {
      self = this
      self.loading = true
      self.form = {
          email: self.email,
          password: self.password,
          login_save: self.login_save,
        }
      await self.$auth
        .loginWith("local", { data: self.form })
        .then(() => {
        const group_ids = JSON.parse(
            JSON.stringify(self.$auth.user.group_ids)
          )
          let upgraded_flg = false
          Object.keys(group_ids).forEach(function (key) {
            if (key == 114 || key == 111 || key == 110 || key == 113) {
              upgraded_flg = true
            }
          })
        self.getInfo()
        self.$router.push("/")
        self.$store.dispatch("snackbar/setMessage", "ログインしました")
        self.$store.dispatch("snackbar/snackOn")
        self.checkedPwd(self.email,self.password)
        location.reload()
        self.loading = false
      })
      .catch(() => {
        self.$store.dispatch("snackbar/setError", "ログインに失敗しました")
        self.$store.dispatch("snackbar/snackOn")
        self.loading = false
      })
    },
  }
}
</script>
<style scoped>
.qr{
   text-align: center; 
   display: block;
 }
.box {
  text-align: center;
  display:inline-block;
}
.active {
  background-color: #ddd;
  box-shadow: none;
}
.info-fond{
  text-align: right;
  padding: 2px;
  font-weight: bold;
  font-size: 14px !important ;
  color: #171C61 ;
  padding-top: 10px;
  padding-bottom: 6px;
}
</style>