<template>
  <v-layout>
    <v-flex class="text-left container howto kiyaku">
      <header>
        <h2 class="form-ttl">
          規約
        </h2>
      </header>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      items: [
        {
          title: "FC IMABARI Sailors'Club会員規約",
          to: "/kiyaku_imabari",
        },
        {
          title: "特定商取引法に基づく表示",
          to: "/tokutei",
        },
      ],
    }
  },
}
</script>
