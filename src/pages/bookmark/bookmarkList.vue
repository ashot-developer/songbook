<template>
  <div>
    <q-list
      v-if="bookmarksList.length"
      bordered
      padding
      class="rounded-borders"
    >
      <q-item-label header style="font-size: 17px">Էջանշված երգեր</q-item-label>
      <q-item
        v-for="song in bookmarksList"
        :key="song.songNumber"
        clickable
        v-ripple
        class="justify-between"
      >
        <router-link
          :to="`/song/${song.songNumber}`"
          class="row marked-link marked_content"
        >
          <q-item-section avatar top>
            <q-avatar
              icon="bookmark_added"
              color="primary"
              text-color="white"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Համար՝ {{ song.songNumber }}</q-item-label>
            <q-item-label caption>{{
              getSongPart(song.songNumber)
            }}</q-item-label>
          </q-item-section>
        </router-link>
        <q-item-section side>
          <q-icon
            name="delete"
            color="primary"
            @click="
              db.deleteFromTable('bookmark', 'songNumber', song.songNumber)
            "
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else style="margin: 50px auto; font-size: 20px" class="text-center">
      Դուք ոչ մի երգ դեռ չեք էջանշել
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "src/services/db.service";

export default {
  name: "bookmarkList",
  data() {
    return {
      db,
    };
  },
  computed: {
    ...mapGetters({
      bookmarksList: "song/getBookmarks",
      getSongs: "song/getSongs",
    }),
  },
  methods: {
    getSongPart(n) {
      let song = this.getSongs.filter(function (song) {
        return song.songNumber == n;
      });
      let words = new DOMParser().parseFromString(
        song[0].songWords,
        "text/html"
      ).body.textContent;
      return words.substring(0, 50) + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
.marked-link {
  text-decoration: none;
  color: #000;
}
.marked-link:visited {
  color: #000;
}
.q-item__section--side {
  padding-right: 0;
}
.marked_content {
  width: 100%;
}
</style>
