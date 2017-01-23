<template>
  <div>
    <button class="button is-loading is-dark"></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var os = require('os')
var path = require('path')
var fs = require('fs')

export default {
  computed: {
    ...mapGetters({
      getDir: 'getDir',
      getFile: 'getFile'
    })
  },
  name: 'loading',
  methods: {
    useDir: function (dir) {
      this.$store.dispatch('chooseDir', dir)
      this.$router.push('watch')
    },
    load: function () {
      console.log('Loading..')
      var vm = this
      if (fs.existsSync('path.txt')) {
        console.log('Found path.txt')
        fs.readFile('path.txt', 'utf8', function (error, data) {
          if (error) {
            vm.$router.push('choose')
          }
          vm.useDir(data.trim())
        })
      } else {
        console.log('No path.txt found')
        var dir = null
        switch (os.platform()) {
          case 'win32':
            dir = path.join(os.homedir(), 'Documents', 'My Games', 'Rocket League', 'TAGame', 'Demos')
            break
          case 'darwin': // mac
            dir = path.join(os.homedir(), 'Library', 'Application Support', 'Rocket League', 'TAGame', 'Demos')
            break
          case 'linux':
            dir = path.join(os.homedir(), '.local', 'share', 'Rocket League', 'TAGame', 'Demos')
            break
        }
        if (dir) {
          console.log('use dir', dir)
          vm.useDir(dir)
        } else {
          console.log('no dir')
          vm.$router.push('choose')
        }
      }
    }
  },
  created: function () {
    this.load()
  }
}
</script>
