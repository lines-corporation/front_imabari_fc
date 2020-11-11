<template>
  <div class="container">
    <client-only>
      <div v-if="!auth.loggedIn">
        <form class="login-page" @submit.prevent="login">
          <p>
            <strong>今治FC<br />
              今シーズンは以前ご入会されていた方も改めて新規入会が必要になりますので、必ず新規入会のお手続きをお願い致します。<br />
              詳しくは下記をご確認ください。</strong><br />
            <br />
            <a href="https://w-volley.necsports.net/topics_detail1/id=1919"
              >今治FCのご案内</a
            ><br />
            <a href="https://rugby.necsports.net/topics_detail1/id=1946"
              >今治FCご案内</a
            ><br />
          </p>
          <div class="login-screen lgn-left">
            <h3 class="subtitle mb-3">
              今治FC 会員ログイン
            </h3>
            <div class="inner">
              <form @submit.prevent="login">
                <p class="pm">
                  <strong>メールアドレスとパスワードを<br
                    class="spbr"
                  />入力してください。</strong>
                </p>
                <p class="fnt-s clr-red pm">
                  ◆NECスポーツ後援会ログイン画面とは<br
                    class="spbr"
                  />異なりますのでご注意ください
                </p>
                <p>
                  <v-text-field
                    v-model="form.email"
                    label="メールアドレス"
                    type="email"
                    outlined
                  />
                </p>
                <p>
                  <v-text-field
                    v-model="form.password"
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
                >
                  ログインする
                </v-btn>
              </form>
              <p>
                <NuxtLink to="/reminder">
                  パスワードを忘れた方はこちらから
                </NuxtLink>
              </p>
            </div>
          </div>
          <div class="login-screen lgn-right">
            <h3 class="subtitle mb-3">
              今治FC新規入会はこちら
            </h3>
            <div class="inner">
              <p class="body-1 new-btn">
                <NuxtLink to="/form">
                  今治FC会員新規入会登録
                </NuxtLink>
              </p>
              <p class="body-1 nec-btn">
              </p>
            </div>
          </div>
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
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="deep-purple accent-4" to="/profile_edit">
                  プロフィール変更はこちら
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-card v-if="can_upgrade" class="mx-auto" outlined>
              <v-card-text>
                <h3>アップグレードのご案内</h3>
                <p class="body-1 ug-p">
                  <NuxtLink to="/upgrade">
                    スタ―会員への種別変更はこちら
                  </NuxtLink>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto" outlined>
              <v-card-text>
                <h3>お知らせ</h3>

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
              </v-card-text>
            </v-card>
            <v-card v-if="tester" class="mx-auto" outlined>
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
                          チケット名
                        </th>
                        <th class="text-left">
                          席種
                        </th>
                        <th class="text-left" />
                      </tr>
                    </thead>
                    <tbody>
                      <router-link
                        v-for="item in my_order_ticket_list"
                        :key="item.product_id"
                        :to="'/ticket/' + item.topics_id"
                        tag="tr"
                      >
                        <td class="date">
                          {{ item.product_data.ymd }}
                        </td>
                        <td>{{ item.topics_name }}</td>
                        <td>{{ item.subject }}</td>
                        <td class="arw">
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
            <v-card v-if="tester" class="mx-auto" outlined>
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
                        <td class="date">
                          {{ item.ymd }}
                        </td>
                        <td>{{ item.subject }}</td>
                        <td>{{ item.ext_col_01 }}</td>
                        <td class="arw">
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
export default {
  middleware: "auth",
  auth: false,
  data: () => ({
    ticket_list: [],
    my_order_ticket_list: [],
    topics_list1: [],
    loading: false,
    show_pwd1: false,
    show_pwd2: false,
    form: {
      email: "",
      password: "",
    },
  }),
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
    can_upgrade() {
      if (this.$auth.loggedIn) {
        self.can_upgrade = true
        const group_ids = JSON.parse(JSON.stringify(this.$auth.user.group_ids))
        Object.keys(group_ids).forEach(function (key) {
          if (["114", "111"].indexOf(key) !== -1) {
            self.can_upgrade = false
          }
        })
        return self.can_upgrade
      }
      return false
    },
    tester() {
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
  },
  methods: {
    getInfo() {
      if (this.$auth.loggedIn) {
        let self = this

        this.$auth.ctx.$axios
          .get("/rcms-api/1/infos")
          .then(function (response) {
            self.topics_list1 = response.data.list
          })

        this.$auth.ctx.$axios
          .get("/rcms-api/1/product_list?my_order_flg=1")
          .then(function (response) {
            self.my_order_ticket_list = response.data.list
          })

        self.ticket_list = []
        this.$auth.ctx.$axios
          .get("/rcms-api/1/ticket_list")
          .then(function (response) {
            for (const p_list of response.data.list) {
              if (p_list.product_ids.length > 0) {
                self.ticket_list.push(p_list)
              }
            }
          })
      }
    },
    async login() {
      this.loading = true
      await this.$auth
        .loginWith("local", { data: this.form })
        .then(() => {
          const group_ids = JSON.parse(
            JSON.stringify(this.$auth.user.group_ids)
          )
          let upgraded_flg = false
          Object.keys(group_ids).forEach(function (key) {
            if (key == 114 || key == 111 || key == 110 || key == 113) {
              upgraded_flg = true
            }
          })
          //if (!upgraded_flg) {
          //  this.$router.push("/upgrade")
          //} else {
            this.getInfo()
            this.$router.push("/")
          //}
          this.$store.dispatch("snackbar/setMessage", "ログインしました")
          this.$store.dispatch("snackbar/snackOn")
          this.loading = false
        })
        .catch(() => {
          this.$store.dispatch("snackbar/setError", "ログインに失敗しました")
          this.$store.dispatch("snackbar/snackOn")
          this.loading = false
        })
    },
  },
}
</script>
