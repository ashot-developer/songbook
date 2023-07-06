<template>
  <div class="q-pa-md sb-list-card">
    <div class="sb-findsong row justify-between items-center q-mb-md">
      <q-input
        outlined
        dense
        @keydown.enter.prevent="findSongByNumber"
        type="number"
        v-model="needNumber"
        class="col-7"
        label="Գրեք համարը"
      />
      <q-btn
        color="primary"
        @click="findSongByNumber"
        label="Գտնել"
        class="col-4"
      />
    </div>
    <q-list bordered class="rounded-borders">
      <SongList
        v-for="n in drpCount"
        :key="n"
        :min="n"
        :max="n * 100 + 1"
      ></SongList>
    </q-list>
  </div>
</template>

<script>
import { Notify } from "quasar";
import resetSearchMixin from 'src/mixins/resetSearchMixin';

export default {
  name: "songList",
  data() {
    return {
      drpCount: 10,
      needNumber: "",
    };
  },
  components: {
    SongList: require("src/components/songbook/SongList.vue").default,
  },
  methods: {
    findSongByNumber() {
      if (this.needNumber != "") {
        this.$router.push(`/song/${this.needNumber}`);
      } else {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Խնդրում ենք գրել համարը",
          timeout: 500,
        });
      }
    },
  },
  mounted() {
    this.resetSearch()
  },
  mixins: [resetSearchMixin]
};
</script>

<style lang="sass">
.q-field
  &--dense
    .q-field__control, .q-field__marginal
      height: 40px !important

.sb-list-card
  padding-bottom: 60px
</style>
