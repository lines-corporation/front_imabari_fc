<template>
  <div class="shop-wrap">
    <!-- バナー -->
    <v-col sm="12">
      <v-carousel
        class="banner-size"
        hide-delimiters
        height="100%"
      >
        <v-carousel-item v-for="(item,key) of bunner_lists" :key="key" :href="item.link">
        <img :src="item.photo" width=100%>
        
        </v-carousel-item >
      </v-carousel>
    </v-col>
   <!-- 購入履歴へ -->
    <v-row class="d-msg float-sm-right">
      <v-col md="8">
        <v-btn to="/ec/histories" nuxt>購入履歴へ</v-btn>
      </v-col>
      <v-col md="4" @click="moveCart">
        <v-badge
          v-if="cartItems.length > 0"
          color="green"
          :content="total_quantity"
        >
          <v-icon large color="darken-2">
            mdi-cart-variant
          </v-icon>
        </v-badge>
        <v-icon v-else large color="darken-2" style="float: right;">
          mdi-cart-variant
        </v-icon>
      </v-col>
    </v-row>

    <v-container class="shop-top">
      <v-row no-gutters>
        <!-- カテゴリー一覧 -->
        <v-col cols="4" class="brk" sm="12">
          <v-card class="d-flex flex-row mb-2" max-width="300">
            <v-list flat subheader three-line>
              <v-subheader>商品カテゴリー</v-subheader>
              <v-list-item-group
                v-if="!isMobile()"
                v-model="selectedCategory"
                multiple
                active-class=""
                @change="getProducts"
              >
                <v-list-item :disabled="flag" v-for="category in categories" :key="`category-${ category.id }`" :value="category.id">
                  <template v-slot:default="{ active }">
                    <v-list-item-action>
                      <v-checkbox :input-value="active" ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ category.title }}</v-list-item-title>
                      <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
              <v-list-group
                v-if="isMobile()"
                no-action
                sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>カテゴリ表示</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item-group
                  v-model="selectedCategory"
                  multiple
                  active-class=""
                  @change="getProducts"
                >
                  <v-list-item :disabled="flag" v-for="category in categories" :key="`category-${ category.id }`" :value="category.id">
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox :input-value="active" ></v-checkbox>
                      </v-list-item-action>
  
                      <v-list-item-content>
                        <v-list-item-title>{{ category.title }}</v-list-item-title>
                        <v-list-item-subtitle></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>

        <!-- 商品一覧 -->
        <v-col cols="8" class="brk2">
          <v-container class="grey lighten-5 mb-3">
            <v-row class="shoplist">
              
              <v-col cols="10" sm="6">
                <v-text-field
                  v-model="selectVal"
                  prepend-inner-icon="mdi-magnify"
                  class="content-border-redius head-border-redius"
                  label="商品検索"
                  @blur="getProducts"
                  @keyup.enter="getProducts"
                  centered
                  outlined
                  clearable
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="displayLists && !isMobile()">
              <v-col v-for="(product, topics_id) in displayLists" :key="topics_id" cols="4" sm="12">
                <v-card class="p-card">
                  <div class="pc-rightullidiv">
                    <v-img
                      class="pc-rightulliimg"
                      :src="product.images[0]"
                    />
                  </div>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-text class="text--primary">
                    <div>価格： ¥{{ product.price }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="moveProductDetail(product.data[0].topics_id)" color="orange" text>
                      商品詳細
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else-if="displayLists && isMobile()">
              <v-col v-for="(product, topics_id) in displayLists" :key="topics_id" cols="4" sm="12">
                <v-card class="p-card">
                  <div class="phone-rightullidiv">
                    <v-img
                      class="phone-rightulliimg"
                      :src="product.images[0]"
                    />
                  </div>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <v-card-text class="text--primary">
                    <div>価格： ¥{{ product.price }}</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="moveProductDetail(product.data[0].topics_id)" color="orange" text>
                      商品詳細
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <p>データがないよ</p>
            </v-row>
          </v-container>
        </v-col>

      </v-row>
    </v-container>

     <!-- ページネーション -->
    <div class="text-center">
      <v-pagination
      v-model="pageNumber"
      :length="page_length"
      @input = "getProducts"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    pageNumber: 1,
    count: 0,
    page_length:0,
    displayLists: [],
    pageSize: 18,
    selectVal:"",
    flag: true,
    settings: [],
    cartItems: [],
    total_quantity: 0,
    onboarding: 0,
    bunner_list: [],
    bunner_lists: [],
    selectedCategory: [],
    categories: [],
    products: {},
  }),
  methods: {
    // 商品一覧の取得
    async getProducts() {
      let self = this
      self.flag = true
      if(self.selectVal == "" || self.selectVal == null || self.selectVal == undefined) {
        let self = this
        // cnt 表示商品数
        self.products = {}
        let paramStr = '?cnt=999'
        if(self.selectedCategory.length > 0) {
          self.selectedCategory.forEach(categoryId => {
            paramStr += `&contents_type[]=${categoryId}`
          })
        }
        let response = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}`)
        self.flag = false
        console.warn(response)
        // エラー検知
        if(response.errors) {
          // TODO エラー表示
        }
        // 商品名 topics_name
        // id topics_id => これは種類別でこれにまとめたい
        // 価格 price_02
        // 商品説明 product_data.ext_col_01
        // 詳細説明 product_data.ext_col_02
        // 画像 product_data.ext_columns.group[0].file_url
        //     ext_columns.group[0].file_url
        // サイズ subject
        // 最初のページ response.data.pageInfo.firstIndex
        // 最後のページ response.data.pageInfo.lastIndex
        // 現在のページ response.data.pageInfo.pageNo
        response.data.list.forEach( product => {
          let sell_time = product.product_data.ymd
          let result_time = new Date(sell_time).getTime() + product.product_data.topics_id
          if(self.products[parseInt(result_time)]) {
            self.products[parseInt(result_time)].data.push(product)
          } else {
            self.$set(self.products, parseInt(result_time),
              {
                name:      product.topics_name,
                price:     product.product_data.ext_col_04,
                inst_ymdhi: parseInt(result_time),
                description: product.product_data.ext_col_01,
                // 注意書き?
                note: product.product_data.ext_col_02,
                images: self.pickupImages(product.product_data),
                data: [product]
              }
            )
          }
        })
        if(Object.values(self.products).length < self.pageSize && self.count <= 1) {
          self.pageNumber = 1
          self.count = 1
        }
        function compare(property){
        return function(a,b){
          var value1 = a[property]
          var value2 = b[property]
          return value2 - value1
          }
        }
        let resultsList = Object.values(self.products).sort(compare('inst_ymdhi'))
        self.displayLists = resultsList.slice(self.pageSize*(self.pageNumber -1), self.pageSize*(self.pageNumber))
        self.page_length = Math.ceil(Object.values(self.products).length/self.pageSize)
      } else {
        let self = this
        self.products = {}
        let paramStr = '?cnt=999'
        let response = await self.$auth.ctx.$axios.get(`/rcms-api/1/shop/product/list${paramStr}`)
        self.flag = false
        let result = response.data.list.filter(item =>item.topics_name.indexOf(self.selectVal) != -1)
        result.forEach( product => {
          let sell_time = product.product_data.ymd
          let result_time = new Date(sell_time).getTime() + product.product_data.topics_id
          if(self.products[parseInt(result_time)]) {
            self.products[parseInt(result_time)].data.push(product)
          } else {
            self.$set(self.products, parseInt(result_time),
              {
                name:      product.topics_name,
                inst_ymdhi: parseInt(result_time),
                price:     product.product_data.ext_col_04,
                description: product.product_data.ext_col_01,
                // 注意書き?
                note: product.product_data.ext_col_02,
                images: self.pickupImages(product.product_data),
                data: [product]
              }
            )
          }
        })
        if(Object.values(self.products).length < self.pageSize && self.count <= 1) {
          self.pageNumber = 1
          self.count = 1
        }
        function compare(property){
        return function(a,b){
          var value1 = a[property]
          var value2 = b[property]
          return value2 - value1
          }
        }
        let resultsList = Object.values(self.products).sort(compare('inst_ymdhi'))
        self.displayLists = resultsList.slice(self.pageSize*(self.pageNumber -1), self.pageSize*(self.pageNumber))
        self.page_length = Math.ceil(Object.values(self.products).length/self.pageSize)
      }
    },
    async getCategories() {
      let response = await this.$auth.ctx.$axios.get("/rcms-api/1/shop/categories")
      response.data.list.forEach(category => {
        this.categories.push({
          id:    parseInt(category.topics_category_id),
          title: category.category_nm,
          selected: false
        })
      })
    },
    // TODO 商品詳細とかぶっているのでどこかで共通化したい
    async getCartItems() {
      if(!this.$auth.user || !this.$auth.user.ec_cart_id) {
        return
      }
      this.cartItems = []
      let response = await this.$auth.ctx.$axios.get(`/rcms-api/1/shop/cart/${this.$auth.user.ec_cart_id}`)
      this.total_quantity = response.data.details.total_quantity
      if(response.data.details.items) {
        response.data.details.items.forEach((item, index) => {
          this.cartItems.push(item)
        })
      }
    },
    // 商品画像の抜き出し
    pickupImages(data) {
      let images = []
      data.ext_columns.straight.forEach((info, index) => {
        images.push(info.file_url)
      })
      return images
    },
    nextBanner() {
      this.onboarding = this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prevBanner() {
      this.onboarding = this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    },
    moveCart() {
      this.$router.push("/ec/cart")
    },
    moveProductDetail(product_id) {
      this.$router.push(`/ec/${product_id}`)
    },
    isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  },
  created() {
    let self = this
    let bunner_list = []
    let bunner_lists = []
    self.$auth.ctx.$axios.get(`/rcms-api/1/topics/topimg`).then(response =>{
    response.data.list.forEach(item => {
      bunner_list.push({
        link : item.ext_col_02,
        photo: item.ext_col_01
      })
    })
    // console.log(bunner_list)
    for (let index = 0; index < bunner_list.length; index++) {
      for (let j = 0; j < bunner_list[index].photo.length; j++) {
        bunner_lists.push({
          link: bunner_list[index].link,
          photo: bunner_list[index].photo[j].url
        })
      }
    }
    self.bunner_lists = bunner_lists
    })
  },
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
  },
  mounted() {
    this.getProducts()
    this.getCategories()
    this.getCartItems()
    this.isMobile() 
  }
}
</script>
<style scoped>
.content-border-redius{
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
}
.head-border-redius{
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
}
.pc-rightullidiv {
  width: 100%;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pc-rightulliimg {
  max-width: 100%;
  max-height: 270px;
}
.phone-rightullidiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.phone-rightulliimg {
  max-width: 100%;
  max-height: 200px;
}
</style>
