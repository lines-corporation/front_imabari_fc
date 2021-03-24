<template>
  <div class="form-page">
    <v-flex class="text-left container howto kiyaku">
      <header>
        <h2 class="form-ttl">
          FC今治アプリのログイン
        </h2>
      </header>
      <div class="theme--light v-stepper">
        <form>
          <v-row>
            <v-col cols="12">
              <v-subheader>
                ログイン処理中です。。10秒以上経っても画面が移動しない場合は再度、お試しください。
              </v-subheader>
            </v-col>
          </v-row>
        </form>
      </div>
    </v-flex>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      loading: false,
      memberId: "",
      encryption: "",
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  created() {
    this.loading = true
    this.memberId = this.$route.query.memberId
    this.encryption = this.$route.query.encryption
    if (this.memberId && this.encryption) {
      let self = this
      this.$auth.ctx.$axios
        .get("/rcms-api/1/chkhash", {
          params: {
            memberId: self.memberId,
            encryption: self.encryption,
          },
        })
        .then((response) => {
          if (response.data.data.login_ok) {
            //const group_ids = JSON.parse(JSON.stringify(response.data.data.user.group_ids))
            this.$auth.ctx.$axios
              .get("/rcms-api/1/profile")
              .then((response) => {
                console.log(response.data)
                self.$auth.setUser(response.data)
                self.$store.dispatch(
                  "snackbar/setMessage",
                  "ログインしました。"
                )
                self.$store.dispatch("snackbar/snackOn")
                self.$router.push("/")
              })
          } else {
            self.$store.dispatch(
              "snackbar/setError",
              "ログインできませんでした。再度、アプリからアクセスをお願いします。"
            )
            self.$store.dispatch("snackbar/snackOn")
          }
          self.loading = false
        })
        .catch(function (error) {
          console.log(error)
          self.$store.dispatch(
            "snackbar/setError",
            "ログインできませんでした。再度、アプリからアクセスをお願いします。"
          )
          self.$store.dispatch("snackbar/snackOn")
          self.loading = false
        })
    } else {
      this.$store.dispatch("snackbar/setError", "URLが不正です。")
      this.$store.dispatch("snackbar/snackOn")
    }
  },
}
</script>