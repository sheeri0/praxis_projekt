<template>
  <div id="app" class="container-fluid p-0">
    <Header></Header>
    <div class="p-3">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style>
 @import '../node_modules/@fontsource/asap-condensed';

* {
  user-select:none;
  font-family: "Asap Condensed";
  letter-spacing:0.5px;
  }
#app {
  width: 100%;
  min-height: 100vh;
}

</style>
