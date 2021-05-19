<template>
  <div class="container mypage">
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <h4>お知らせ一覧</h4>
          <v-divider></v-divider>
          <v-simple-table :fixed-header="false">
            <template v-slot:default>
              <tbody>
                <router-link
                  v-for="item in displayLists"
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
          <v-simple-table>
            <v-col>
              <td>
                <v-btn class="detail-btn" to="/" nuxt>TOPへ</v-btn>
              </td>
              <!-- ページネーション -->
              <div class="shop-wrap">
                <v-pagination
                v-model="pageNumber"
                :length="page_length"
                :total-visible="4"
                @input = "getInfo"
                ></v-pagination>
              </div>
            </v-col>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    topics_list1: [],
    pageNumber: 1,
    count: 0,
    page_length:0,
    displayLists: [],
    pageSize: 10
  }),
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      if (this.$auth.loggedIn) {
        let self = this
        self.$auth.ctx.$axios
          .get("/rcms-api/1/infos")
          .then(function (response) {
        let topics_list= response.data.list
        self.displayLists = topics_list.slice(self.pageSize*(self.pageNumber -1), self.pageSize*(self.pageNumber))
        self.page_length = Math.ceil(Object.values(topics_list).length/self.pageSize)
        })
      }
    },
  },
}
</script>
<style scoped>
.detail-btn{
background-color: rgb(255 255 255 / 12%) !important;
border-color: #171C61  !important;
color: #171C61  !important;
border-width: 1px;
border-style: solid !important;
margin-top: 3px;
box-shadow: none;
padding: 0px 25px !important;
}
</style>
