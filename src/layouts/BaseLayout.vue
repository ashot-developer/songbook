<template>
  <q-layout class="sb-baselayout">
    <ToolBar></ToolBar>
    <router-view />
    <SettingBar class="q-mb-lg sb-settings-bar" />
    <BaseTab></BaseTab>
  </q-layout>
</template>

<script >

export default {
  name: "BaseLayout",
  components: {
    BaseTab: require("src/components/tabs/BaseTab.vue").default,
    ToolBar: require("src/components/bars/toolBar.vue").default,
  },
}
</script>

<style scoped>
.sb-baselayout {
  padding-bottom: 75px;
  height: 100vh;
}

.sb-settings-bar{
  position: fixed;
  bottom: 40px;
  right: 8px;
}
</style>
