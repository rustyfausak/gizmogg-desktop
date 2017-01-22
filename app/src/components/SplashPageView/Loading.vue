<style scoped>
</style>

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
    load: function () {
      console.log('Loading..')
      var dir = null
      if (fs.existsSync('path.txt')) {
        console.log('Found path.txt')
        fs.readFile('path.txt', function (error, data) {
          if (error) {
            throw error
          }
          dir = data.trim()
        })
      } else {
        console.log('No path.txt found')
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
      }
      if (dir) {
        console.log('use dir', dir)
        this.$store.dispatch('chooseDir', dir)
        this.$router.push('watch')
      } else {
        console.log('no dir')
        this.$router.push('choose')
      }
    }
  },
  created: function () {
    this.load()
  }
}
</script>
