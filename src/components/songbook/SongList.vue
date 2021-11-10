<template>
  <div>
    <q-expansion-item
      expand-separator
      expand-icon-class="sb-list-icon"
      icon="fact_check"
      :label="label"
      height="25px"
      style="font-size: 17px"
      class="sb-expanasion"
      @click="showList"
    >
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-card v-if="show">
          <q-card-section>
            <q-list dense bordered padding class="rounded-borders song-numbers">
              <q-item v-for="n in 100" :key="n" clickable v-ripple>
                <q-item-section>
                  <router-link
                    :to="`/song/${n + minLoop - 1}`"
                    class="sb-songs-link"
                    >{{ n + minLoop - 1 }}</router-link
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </transition-group>
    </q-expansion-item>
  </div>
</template>

<script>

export default {
  name: "SongList",
  data() {
    return {
      label: this.max - 100 + "  -  " + (this.max - 1),
      numbers: this.max - 1,
      minLoop: this.max - 100,
      show: false,
    };
  },
  props: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  methods: {
    showList() {
      this.show = !this.show;
    },
  },
}
</script>

<style lang="scss">
.q-item {
  min-height: 40px;
}
.song-numbers {
  columns: 4;
}
a.sb-songs-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
}

.sb-expanasion {
  i {
    color: $primary;
  }
}
</style>
>
