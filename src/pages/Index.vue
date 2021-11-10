<template>
  <div class="q-ma-md">
    <q-scroll-area
      v-if="Songs.length"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 500px; max-width: 300px"
    >
      <div
        v-for="song in Songs"
        :key="song.number"
        v-html="song.song"
        class="q-pa-xs"
      ></div>
    </q-scroll-area>
    <q-btn to="/">back</q-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      text: "",
      songs: [],
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
    };
  },
  methods: {
    ...mapActions({
      addSong: "song/addSong",
    }),
    addName() {
      db.collection("songs").add({
        number: 933,
        song:
          '<div dir="ltr" style="text-align: left;" trbidi="on">1. Երգեցե՛ք Տերոջ նոր երգ մը օրհնության (3), <br>Երգեցեք Տերոջ: (2) <br><br>2. Հիսուսն է մեր Տերը, ամե՜ն, ալելուիա (3), <br>Հիսուսն է մեր Տերը: (2) <br><br>' +
          +" 3. Հիսուս կկանչե. «Եկո՛ւր իմ ետևես» (3), <br>" +
          +" Հիսուս կկանչե: (2) <br>" +
          +"<br>" +
          +"*** <br>" +
          +"1. Տիրոջը երգի՛ր, ողջ երկիր, <br>" +
          +"Մեծարի՛ր փրկությանդ համար, <br>" +
          +"Նրա մեծ և հզոր գործերը <br>" +
          +"Ամեն մարդ երկրի վրա պիտ լսի: <br>" +
          +"<br>" +
          +"&nbsp; &nbsp; Չէ՞ որ Նա է միայն <br>" +
          +"&nbsp; &nbsp; Սքանչելի Արքա, <br>" +
          +"&nbsp; &nbsp; Ցնծա՛, ողջ երկիր, <br>" +
          +"&nbsp; &nbsp; Տիրոջդ՝ Հիսուսին փառաբանի՛ր:<br>" +
          +"<hr>" +
          +"</div>",
      });
      this.addSong({
        number: 933,
        song:
          '<div dir="ltr" style="text-align: left;" trbidi="on">1. Երգեցե՛ք Տերոջ նոր երգ մը օրհնության (3), <br>Երգեցեք Տերոջ: (2) <br><br>2. Հիսուսն է մեր Տերը, ամե՜ն, ալելուիա (3), <br>Հիսուսն է մեր Տերը: (2) <br><br>' +
          +" 3. Հիսուս կկանչե. «Եկո՛ւր իմ ետևես» (3), <br>" +
          +" Հիսուս կկանչե: (2) <br>" +
          +"<br>" +
          +"*** <br>" +
          +"1. Տիրոջը երգի՛ր, ողջ երկիր, <br>" +
          +"Մեծարի՛ր փրկությանդ համար, <br>" +
          +"Նրա մեծ և հզոր գործերը <br>" +
          +"Ամեն մարդ երկրի վրա պիտ լսի: <br>" +
          +"<br>" +
          +"&nbsp; &nbsp; Չէ՞ որ Նա է միայն <br>" +
          +"&nbsp; &nbsp; Սքանչելի Արքա, <br>" +
          +"&nbsp; &nbsp; Ցնծա՛, ողջ երկիր, <br>" +
          +"&nbsp; &nbsp; Տիրոջդ՝ Հիսուսին փառաբանի՛ր:<br>" +
          +"<hr>" +
          +"</div>",
      });
      this.text = "";
    },

    getTasks() {
      db.collection("songs")
        .get()
        .then((songs) => {
          songs.forEach((element) => {
            this.addSong(element);
          });
        });
    },
  },
  mounted() {
    if (this.Songs.length < 1) {
      this.addName();
    }
    this.getTasks();
    this.songs = this.Songs;
  },
  computed: {
    ...mapGetters({
      Songs: "song/getSongs",
    }),
  },
};
</script>
