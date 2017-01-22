<style scoped>
</style>

<template>
  <div class="is-maximized is-centered">
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <i class="fa fa-rocket fa-2x"></i>
            <div>gizmo.gg replay auto-uploader</div>
          </h1>
          <hr class="is-dark">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'splash-page'
}
</script>
