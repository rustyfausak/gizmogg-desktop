<style scoped>
</style>

<template>
  <div>
    <div class="level">
      <div class="level-item">
        <a class="button is-info" @click="chooseDir">
          Choose Directory
        </a>&nbsp;
        <a class="button is-success" @click="watchDir" v-show="dir">
          Watch
        </a>
      </div>
    </div>
    <div class="level">
      <div class="level-item">
        <div class="is-monospace">
          {{ dir }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const {dialog} = require('electron').remote

export default {
  data: function () {
    return {
      dir: ''
    }
  },
  methods: {
    chooseDir: function (e) {
      var vm = this
      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, function (filePaths) {
        vm.dir = ''
        if (filePaths && Array.isArray(filePaths)) {
          vm.dir = filePaths[0]
        }
      })
    },
    watchDir: function (e) {
      this.$store.dispatch('chooseDir', this.dir)
      this.$router.push('watch')
    }
  }
}
</script>
