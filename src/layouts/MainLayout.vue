<template>
  <q-layout>
    <q-page-container class="sb-container text-center flex items-center q-pa-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>


export default {
  name: 'MainLayout',

}
</script>

<style scoped>
.sb-container{
  height: 100vh;
  background-image: url('../assets/images/screen-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
