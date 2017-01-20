<style>
  /* GLOBAL non-scoped styles */
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .is-maximized {
    height: 100%;
    width: 100%;
  }

  .is-centered {
    text-align: center;
  }
</style>

<template>
  <div class="is-maximized">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'src/vuex/store'

  export default {
    store
  }
</script>
