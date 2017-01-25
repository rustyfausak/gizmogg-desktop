<style scoped>
.fa {
  font-size: 36px;
}
.version {
  position: absolute;
  top: 2px;
  right: 5px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
</style>

<template>
  <div class="is-maximized is-centered">
    <section class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container is-fullheight">
          <h1 class="title">
            <i class="fa fa-rocket fa-fw"></i>
            <span><a @click="openSite" class="text-primary">gizmo.gg</a> replay auto-uploader</span>
          </h1>
          <router-view></router-view>
        </div>
      </div>
      <div class="version">
        v0.0.3
      </div>
    </section>
  </div>
</template>

<script>
var open = require('open')

export default {
  name: 'splash-page',
  methods: {
    openSite: function () {
      open('http://gizmo.gg')
    }
  }
}
</script>
