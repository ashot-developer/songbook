<template>
  <router-view />
</template>
<script>

import db  from 'src/services/db.service';


export default {
  name: 'App',
  mounted() {
    db.createTable('bookmark', ['songNumber VARCHAR']);
    db.createTable('settings', ['fontSize VARCHAR', 'background VARCHAR']);
    db.selectAllFromTable();
  }
}
</script>
