<style scoped>
</style>

<template>
  <div>
    Watching
    <div class="is-monospace">{{ getDir }}</div>
    <a class="button is-dark" @click="changeDir">
      Change Directory
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getDir: 'getDir'
    })
  },
  components: {
  },
  name: 'watch',
  methods: {
    changeDir: function (e) {
      this.$store.dispatch('chooseDir', null)
      this.$router.push('/')
    }
  }
}
</script>
