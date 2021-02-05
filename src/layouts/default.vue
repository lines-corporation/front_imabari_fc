<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="#333"
      dark
      fixed
      app
      right
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              v-text="
                auth.loggedIn && item.title_loggedIn
                  ? item.title_loggedIn
                  : item.title
              "
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="#171C61" dense dark fixed app>
      <v-toolbar-title>
        <a href="/">

          <img
            src="@/assets/images/temp_icon.png"
            style="width: auto; height: 75px;"
          />

        </a>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-title height="30" to="/" v-text="subtitle" />
      <v-btn v-if="!auth.loggedIn" icon to="/" nuxt>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn v-if="auth.loggedIn" icon @click="logout">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-btn icon to="/faq" nuxt>
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer color="#171C61" padless app absolute inset>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2" :href="inquiry_url">
          お問い合わせ
        </v-btn>
        <!-- <v-btn color="white" text rounded class="my-2" to="/inquiry">
          お問い合わせ
        </v-btn> -->
        <v-btn color="white" text rounded class="my-2" to="/faq">
          よくある質問
        </v-btn>
        <v-btn color="white" text rounded class="my-2" to="/tokutei">
          特定商取引法に基づく表示
        </v-btn>
        <!-- <v-col class="#171C61 text-center white--text" cols="12">

          <img
            src="@/assets/images/temp_icon.png"
            style="height: 100px; padding: 5px;"
          />

        </v-col> -->
        <v-col class="#171C61 text-center white--text" cols="12">
          <span>Copyright FC Imabari. All rights reserved.</span>
        </v-col>
      </v-row>
    </v-footer>

    <v-snackbar
      v-model="snackbarVisible"
      top
      :color="snackbarColor"
      timeout="2000"
    >
      {{ this.$store.getters["snackbar/message"] }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbarVisible = false">
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      inquiry_url: "https://docs.google.com/forms/d/e/1FAIpQLSdYPh3YEm5fzrCxBVnEd64xvSVpHBwpaeKan0ODSa8thr6Gtw/viewform",
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "HOME",
          title_loggedIn: "マイページ",
          to: "/",
        },
        {
          icon: "mdi-help",
          title: "よくある質問",
          to: "/faq",
        },
        {
          icon: "mdi-send",
          title: "お問い合わせ",
          to: "/inquiry",
        },
        {
          icon: "mdi-information",
          title: "規約等",
          to: "/kiyaku",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
    subtitle() {
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
        return this.$auth.user.name1 + "さん" + group_idnms
      } else {
        return ""
      }
    },
    // snackbarが自動でfalseに設定するためセッタを用意して、明示的にdispatchからOffするようにする
    snackbarVisible: {
      get() {
        return this.$store.state.snackbar.isEnable
      },
      set() {
        return this.$store.dispatch("snackbar/snackOff")
      },
    },
    snackbarColor() {
      return this.$store.state.snackbar.color
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout().then((response) => {
        this.$store.dispatch("snackbar/setMessage", "ログアウトしました")
        this.$store.dispatch("snackbar/snackOn")
        this.$router.push("/")
      })
    },
  },
}
</script>
