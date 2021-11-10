<template>
  <div>
    <q-toolbar class="q-pa-sm text-white bg-primary">
      <span
        class="material-icons sb-go-back"
        v-if="!$route.params.number"
        @click="$router.back()"
        >arrow_back_ios</span
      >
      <span
        class="material-icons sb-go-back"
        v-else
        @click="$router.push('/songs')"
        >arrow_back_ios</span
      >
      <q-toolbar-title
        v-if="!$route.params.number"
        class="text-center text-bold"
        style="padding-left: 0; font-size: 16px"
        >{{ $route.meta.title }}</q-toolbar-title
      >
      <q-toolbar-title v-else style="font-size: 14px">
        {{ getSongPart($route.params.number) }}</q-toolbar-title
      >

      <SettingBar class="sb-settings-bar" v-if="$route.params.number" />
    </q-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "src/services/db.service";

export default {
  name: "toolBar",
  methods: {
    getSongPart(n) {
      if (n !== undefined) {
        let song = this.getSongs.filter(function (song) {
          return song.songNumber == n;
        });
        let words = new DOMParser().parseFromString(
          song[0].songWords,
          "text/html"
        ).body.textContent;

        if (words.indexOf("1.") != -1) {
          return (
            words.substring(words.indexOf("1.") + 2).substring(0, 30) + "..."
          );
        } else {
          return words.substring(0, 30) + "...";
        }
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapGetters({
      getSongs: "song/getSongs",
    }),
  },
  mounted() {
    db.selectAllSettings();
  },
  components: {
    SettingBar: require("src/components/settings/settingBar.vue").default,
  },
};
</script>

<style scoped>
.sb-go-back {
  font-size: 18px;
}

.q-toolbar {
  height: 40px;
  min-height: 40px;
}
</style>
