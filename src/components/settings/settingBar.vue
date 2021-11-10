<template>
  <div>
    <q-btn icon="settings">
      <q-menu>
        <div class="text-bold q-pt-sm q-pl-sm">Կարգավորումներ</div>
        <div class="row q-pa-md q-mb-sm">
          <div class="col-12">
            <q-badge color="primary"> Տառաչափ {{ basicModel }} փիք․ </q-badge>
            <q-slider
              @change="saveSettings()"
              v-model="basicModel"
              :step="1"
              :min="8"
              :max="35"
            />
          </div>
          <q-separator class="q-mr-sm q-ml-sm" />
          <div class="col-12">
            <div>
              <q-badge color="primary" text-color="white" class="q-mb-sm">
                Ֆոնի գույն՝
              </q-badge>
              <q-avatar
                :style="`background: ${hex};`"
                size="15px"
                class="q-ml-sm"
              />
              <q-color
                @change="saveSettings()"
                v-model="hex"
                default-view="palette"
                :palette="[
                  '#ffffff',
                  '#dcdcdc',
                  '#f0f8ff',
                  '#faebd7',
                  '#377992',
                  '#f2d8f2',
                  '#f7d7d7',
                  '#a5cfdd',
                  '#49a47f',
                  '#4c4c4c',
                ]"
                class="my-picker"
                no-footer
                no-header
              />
            </div>
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import db from "src/services/db.service";

export default {
  name: "settingBar",
  data() {
    return {
      basicModel: "",
      hex: "",
    };
  },
  methods: {
    ...mapActions({
      setSettings: "setting/setSettings",
    }),
    saveSettings() {
      this.setSettings({ fontSize: this.basicModel, background: this.hex });
      db.insertIfExistsUpdate("settings", [this.basicModel, this.hex]);
    },
  },
  computed: {
    ...mapGetters({
      fontSize: "setting/getFontSize",
      background: "setting/getBackground",
    }),
  },
  mounted() {
    this.basicModel = Math.ceil(this.fontSize);
    this.hex = this.background;
  },
};
</script>

<style lang="scss" scoped>
.q-btn {
  padding: 0;
  min-height: 1.572em;
}
.q-btn:before {
  content: none;
}
</style>
