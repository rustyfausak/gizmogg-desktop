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
          <select-folder-form></select-folder-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import SelectFolderForm from './SplashPageView/SelectFolderForm'

  export default {
    components: {
      SelectFolderForm
    },
    name: 'splash-page'
  }
</script>
