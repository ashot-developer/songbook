<template>
  <div class="justify-center text-center" style="width: 100%">
    <div class="sb-imagebox flex row justify-center items-center q-pa-md q-mb-xl">
      <q-img src="../assets/images/bethel.png" width="125px" />
    </div>
    <p class="sb-textbox q-pa-md text-center">
      Օրհնիր Տիրոջը, ով իմ անձ, եւ բոլոր իմ ներսը՝ Նրա սուրբ անունը։
    </p>
    <q-btn
      stretch
      :loading="loading1"
      @click="simulateProgress(1)"
      :to="'/songs'"
      exact
      color="primary"
      class="q-mt-md"
      icon="list"
      label="Բացել ցանկը"
    >
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Բեռնում...
      </template>
    </q-btn>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { allSongs } from 'src/services/api/songs.api';


export default {
  name: "MainPage",
  data() {
    return {
      loading1: false,
    };
  },
  methods: {
    ...mapActions({
      'addSongs': 'song/addSongs'
    }),
    simulateProgress(number) {
      // we set loading state
      this.loading1 = true;
      // simulate a delay

      setTimeout(() => {
        // we're done, we reset loading state
        this.loading1 = false;
      }, 500);
    },
  },
  computed: {
    ...mapGetters({
      'getSong': 'song/getSongs'
    })
  },
  mounted() {
    this.addSongs(allSongs);
  }
}
</script>

<style scoped>
.sb-textbox {
  color: #fff;
  background-color: #377a928e;
  font-size: 18px;
  border-radius: 3px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  margin-right: auto;
  margin-left: auto
}

.sb-imagebox {
  border-radius: 50%;
  background: radial-gradient(rgba(255, 255, 255, 0.945), #377a9260);
  width: 160px;
  height: 160px;
  margin-right: auto;
  margin-left: auto;
}
</style>
