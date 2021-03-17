<template>
  <div class="container howto">
    <header>
      <h2 class="form-ttl">
        よくある質問
      </h2>
    </header>
    <v-list>
      <v-list-group
        v-for="(item,index) in category_items"
        :key="index"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </template>
        <br /> 
        <v-list-item v-for="subItem in item.items" :key="subItem.subject">
          <v-list-item-content>
            <v-list-item-title v-text="subItem.subject" />
            <v-list-item-subtitle>
              <div >
                <p  v-html="subItem.contents" class="p-label" />
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      category_items: [
        {
          action: "FC IMABARI Sailors'Club",
          title: "FC IMABARI Sailors'Clubについてのご質問はこちら",
          active: false,
          items: [],
          category_id: 19,
        },
        {
          action: "入会・更新・退会について",
          title: "入会、更新、退会などに関するご質問はこちら",
          active: false,
          items: [],
          category_id: 23,
        },
        {
          action: "会員情報設定について",
          title: "",
          active: false,
          items: [],
          category_id: 28,
        },
        {
          action: "チケット購入について",
          title: "",
          active: false,
          items: [],
          category_id: 38,
        },
        {
          action: "グッズ購入について",
          title: "",
          active: false,
          items: [],
          category_id: 39,
        }
      ],
    }
  },
  mounted() {
    let self = this
    this.$auth.ctx.$axios.get("/rcms-api/1/qanda").then(function (response) {
      Object.keys(response.data.list).forEach(function (key) {
        Object.keys(self.category_items).forEach(function (key2) {
          if (
            self.category_items[key2].category_id ==
            response.data.list[key].contents_type
          ) {
            self.category_items[key2].items.push(response.data.list[key])
          }
        })
      })
    })
  },
}
</script>
<style scoped>
.p-label{
  max-width: 800px;
  white-space: pre-wrap;
}
</style>
