<template>
  <div>
    <q-tabs
      inline-label
      class="sb-navigation bg-primary fixed-bottom text-white shadow-2"
      style="height: 55px"
    >
      <q-route-tab exact :to="'/songs'" name="list" icon="list" label="Ցանկ" />
      <q-route-tab
        exact
        :to="'/bookmarks'"
        name="bookmarks"
        icon="bookmarks"
        label="Էջանշված"
      />
      <q-route-tab
        exact
        :to="'/search-song'"
        name="search"
        icon="search"
        label="Որոնել"
      />
    </q-tabs>
  </div>
</template>

<script>
export default {
  name: "BaseTab",
};
</script>

<style lang="scss">
@media screen and (max-width: 370px) {
  .sb-navigation {
    .q-tab__label {
      font-size: 12px;
    }
    a.q-tab {
      padding: 0 14px;
    }
  }
}
</style>
