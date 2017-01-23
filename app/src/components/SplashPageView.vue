<template>
  <div class="is-maximized is-centered">
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container is-fullheight">
          <h1 class="title">
            <i class="fa fa-rocket fa-2x"></i>
            <div>gizmo.gg replay auto-uploader</div>
          </h1>
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
