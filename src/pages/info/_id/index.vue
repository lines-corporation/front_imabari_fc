<template>
  <div class="container">
    <div class="article-page ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
      <header>
        <h2 class="form-ttl">
          {{ item.subject }}
        </h2>
      </header>
     
      <div class="theme--light v-stepper">
        <div class="v-stepper__content">
          <p>
            {{ item.ymd }}
          </p>
          <p v-html="item.contents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    item: [],
  }),
  mounted() {
    let self = this
    let url = "/rcms-api/1/info/" + this.$route.params.id
    this.$auth.ctx.$axios.get(url).then(function (response) {
      self.item = response.data.details
    })
  },
}
</script>
<style scoped>
p{ line-height:22px} 
</style>