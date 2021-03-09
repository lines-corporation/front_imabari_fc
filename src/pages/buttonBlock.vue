<template>
  <v-share-buttons :title="title" />
</template>

<script>
import shareButtons from '~/components/atoms/shareButtons'

export default {
  components: {
    shareButtons
  },
  data: function() {
    return {
      title: 'sns-widget'
    }
  }
}
</script>