<template>  
  <div class="form-page">
    <header>
      <h2 class="form-ttl">
        FC今治アプリに連携する
      </h2>
    </header>
    <div class="theme--light v-stepper">
      <form :action="vapp_url">
        <input type="hidden" name="clubId" :value="vapp_club_id" />
        <input type="hidden" name="memberId" :value="user.member_no" />
        <input type="hidden" name="encryption" :value="vapphash" />
        <v-row>
          <v-col cols="12">
            <v-subheader>
              以下の連携ボタンをタップして、VアプリのID/PWDを入力していただくと、VアプリからロケッツクラブへID、PWDを入力せずにログインできるようになります。
            </v-subheader>
          </v-col>
        </v-row>
        <v-btn
          type="submit"
          block
          x-large
          color="success"
          dark
          :loading="loading1"
        >
          連携する
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading1: false,
      vapphash: "",
      vapp_url: process.env.VAPP_URL,
      vapp_club_id: process.env.VAPP_ClubId,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  mounted() {
    this.getHash()
  },
  methods: {
    getHash() {
      if (this.$auth.loggedIn) {
        let self = this
        this.$auth.ctx.$axios
          .get("/rcms-api/1/createVappHash")
          .then(function (response) {
            self.vapphash = response.data.data.hash
            self.debug = response.data.data.debug
          })
      }
    },
  },
}
</script>
<style scoped>
.v-application button.success {
  background-color: #171C61 !important;
}
</style>