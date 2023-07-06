<template>
  <div class="sb-card q-pa-md">
    <div class="sb-findsong row justify-between items-center q-mb-md">
      <q-input
        outlined
        dense
        @keydown.enter.prevent="
          $q.loading.show();
          findSongByWord();
        "
        type="text"
        v-model="keyword"
        class="col-7"
        label="Որոնել ըստ բառի"
      />
      <q-btn
        color="primary"
        @click="findSongByWord"
        label="Որոնել"
        class="col-4"
      />
    </div>
    <q-list v-if="getSearchedSongs.length" bordered padding class="rounded-borders">
      <q-item
        v-for="song in getSearchedSongs"
        :key="song.songNumber"
        :to="`/song/${song.songNumber}`"
        clickable
        v-ripple
      >
        <q-item-section avatar top>
          <q-avatar icon="library_music" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Համար՝ {{ song.songNumber }}</q-item-label>
          <q-item-label caption>{{ getSongPart(song.songWords) }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="arrow_forward_ios" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="errorMessage !== ''"
      v-html="errorMessage"
      class="sb-notfound vertical-middle"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";



export default {
  name: "searchSong",
  data() {
    return {
      result: [],
      errorMessage: "",
      keyword: ""
    };
  },
  methods: {
    ...mapActions({
      setSearchedSongs: 'song/setSearchedSongs',
      setKeyword: 'song/setKeyword'
    }),
    findSongByWord() {
      if(!this.keyword) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Լրացրեք դաշտը",
          timeout: 500
        });

        return;
      }
      this.setKeyword(this.keyword);
      this.$q.loading.show();

      setTimeout(
        function () {
          this.result = this.getSongs.filter((song) => {
            return (
              song.songWords
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                .replaceAll("br", "")
                .replaceAll(/[0-9]/g, "")
                .replaceAll("nbsp;", "")
                .replaceAll(";", "")
                .toLowerCase()
                .search(this.keyword.toLowerCase()) !== -1
            );
          }, this);
          if (this.result.length) {
            this.errorMessage = "";
            this.setSearchedSongs(this.result);
          } else {
            this.errorMessage = `<strong>${this.keyword}</strong> բառով կամ բառակապակցությամբ երգ չի գտնվել:`;
          }
        }.bind(this),
        2000
      );

      setTimeout(
        function () {
          this.$q.loading.hide();
        }.bind(this),
        2000
      );
    },

    getSongPart(song) {
      let words = new DOMParser().parseFromString(song, "text/html").body
        .textContent;
      return words.substring(0, 50) + "...";
    },
  },
  mounted() {
    this.keyword = this.keywordS;
  },
  computed: {
    ...mapGetters({
      getSongs: "song/getSongs",
      getSearchedSongs: "song/getSearchedSongs",
      keywordS: "song/getKeyword"
    }),
  },
}
</script>

<style scoped>
.sb-notfound {
  font-size: 17px;
  max-width: 410px;
  width: 100%;
  text-align: center;
  margin: 50px auto 0 auto;
}

.sb-card {
  padding-bottom: 60px;
}
</style>
