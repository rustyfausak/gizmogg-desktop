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
