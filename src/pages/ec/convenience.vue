<template>
  <div class="container">
    <div class="article-page ticket-box">
      <div class="theme--light v-stepper">
        <div class="v-stepper__content">
          <v-container>
             <v-card-text>
              <p></p>
              <div>
                <div align="center">
                  <section>
                    <v-img :src="require('@/assets/images/logo_cvs.png')" width="60%"></v-img>
                  </section>
                  <v-row>
                    <v-col cols="8">
                      <v-subheader>支払方法選択</v-subheader>
                      <v-radio-group>
                        <v-radio label="セブンイレブンでのお支払い"/>
                        <v-radio label="ローソン・ミニストップでのお支払い"/>
                        <v-radio label="ファミリーマートでのお支払い"/>
                        <v-radio label="セイコーマートでのお支払い"/>
                        <v-radio label="デイリーヤマザキでのお支払い"/>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        @click="executePayment"
                        :loading="loading"
                        :disabled="loading"
                        nuxt
                        class="btn-done"
                      >
                      決済する
                    </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-card-text>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
  }),
  methods: {
  },
}
</script>
<style scoped>
</style>
