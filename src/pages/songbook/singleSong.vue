<template>
  <div
    class="sb-card"
    :style="`background-color: ${background};`"
    v-touch-swipe.duration="500"
    v-touch-swipe.right="prevSong"
    v-touch-swipe.left="nextSong"
  >
    <div class="q-pt-sm row items-center justify-between q-mb-sm">
      <p
        class="text-subtitle1 q-mb-none q-pr-md q-pl-md"
        :style="`color: #377992; font-weight: bold; font-size: 20px`"
      >
        Երգ {{ number }}
      </p>
    </div>
    <div
      v-html="songWords"
      class="sb-single q-pr-md q-pl-md"
      :style="` transition: all .1s; font-size: ${newfontSize}px; background-color: ${background}`"
    ></div>
    <span
      class="material-icons sb-bookmark q-mr-sm q-mt-sm"
      v-if="isMarked"
      @click="deleteFromBookmark"
      >bookmark_remove</span
    >
    <span
      v-else
      class="material-icons sb-bookmark q-mr-sm q-mt-sm"
      @click="addToBookmark"
      >bookmark_add</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "src/services/db.service";

export default {
  name: "singleSong",
  data() {
    return {
      number: "",
      songWords: "",
      isLast: this.number === 1000,
      info: null,
      added: "",
    };
  },
  computed: {
    ...mapGetters({
      getSong: "song/getSongs",
      getBookmarks: "song/getBookmarks",
      isMarked: "song/isMarked",
      newfontSize: "setting/getFontSize",
      background: "setting/getBackground",
    }),
  },
  methods: {
    ...mapActions({
      setNumber: "song/setNumber",
      setMarked: "song/setMarked",
      setMark: "song/setMark",
      deleteMark: "song/deleteMark",
    }),
    nextSong() {
      if (this.number >= 1000) {
        return false;
      }
      this.number++;
      this.getClearShow();
    },
    prevSong() {
      if (this.number < 2) {
        return false;
      }

      this.number--;
      this.getClearShow();
    },
    clearWords(words) {
      return words
        .replaceAll(" Նոտաները", "")
        .replaceAll(" Նոտաներ", "")
        .replaceAll(" Youtube &#9834;&#9835; &#10148;", "")
        .replace(/^(\ ?<br( \/)?>\ ?)+|(\ ?<br( \/)?>\ ?)+$/, "")
        .substring(words.indexOf("1."));
    },
    addToBookmark() {
      db.insertIntoTable("bookmark", ["songNumber"], [this.number]);
      this.setMark({
        id: this.getBookmarks.length + 1,
        songNumber: this.number + "",
      });
      this.setNumber(this.number);
      this.setMarked();
    },
    deleteFromBookmark() {
      db.deleteFromTable("bookmark", "songNumber", this.number);
      this.deleteMark(this.number);
    },
    getClearShow() {
      this.songWords = this.getSong[this.number - 1].songWords;
      this.$router.push("/song/" + this.number);
      this.songWords = this.clearWords(this.songWords);
      this.setNumber(this.number);
      this.setMarked();
    },
  },
  mounted() {
    this.number = this.$route.params.number;
    this.songWords = this.getSong[this.number - 1].songWords;
    this.songWords = this.clearWords(this.songWords);
    this.setNumber(this.number);
    this.setMarked();
  },
};
</script>

<style lang="scss" scoped>
.sb-single {
  padding-bottom: 75px;
}

.sb-nextprev {
  font-size: 25px;
  color: $primary;
  font-weight: 900;
  opacity: 0.4;
  position: fixed;
  z-index: 999;
  width: 100%;
  bottom: 60px;
  left: 0;
  padding: 0 5px 0 5px;
  span {
    font-size: 45px;
  }
}

.sb-card {
  height: 100vh;
}

.sb-bookmark {
  color: $primary;
  position: absolute;
  right: 0;
  top: 33px;
  font-size: 45px;
  margin-right: 0;
}

@media screen and (max-width: 370px) {
  .sb-bookmark {
    font-size: 35px;
  }
}
</style>
