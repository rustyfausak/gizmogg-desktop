<template>
  <div>

    <div class="level">
      <div class="level-item">
        <a class="button is-primary is-outlined" @click="chooseDir">
          <span class="icon">
            <i class="fa fa-folder"></i>
          </span>
          <span>Choose Directory</span>
        </a>&nbsp;
        <a class="button is-info" @click="watchDir" v-show="dir">
          Watch
        </a>
      </div>
    </div>

    <div class="level">
      <div class="level-item">
        <span class="tag is-black is-monospace" v-show="dir">{{ dir }}</span>
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
