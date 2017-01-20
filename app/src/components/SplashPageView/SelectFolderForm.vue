<style scoped>
</style>

<template>
  <div>
    <a class="button is-info" @click="chooseDir">
      Choose Directory
    </a>
    <div>
      <p class="is-italics">{{ dir }}</p>
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
      }
    }
  }
</script>
