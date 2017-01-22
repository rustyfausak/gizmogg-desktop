<style scoped>
</style>

<template>
  <div>
    Watching
    <div class="is-monospace">{{ getDir }}</div>
    <a class="button is-dark" @click="changeDir" v-show="!getFile">
      Change Directory
    </a>
    <div v-show="getFile">
      <button class="button is-primary is-loading">Uploading..</button>
      <div>
        Uploading {{ getFile }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getDir: 'getDir',
      getFile: 'getFile'
    })
  },
  name: 'watch',
  methods: {
    changeDir: function (e) {
      this.$store.dispatch('chooseDir', null)
      this.$router.push('/choose')
    }
  }
}
</script>
