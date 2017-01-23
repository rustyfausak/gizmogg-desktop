<style scoped>
</style>

<template>
  <div>
    <div class="panel is-dark" v-show="!getFile && !getRecent.length">
      <a class="panel-block is-active is-disabled text-italic">
        No uploads yet. Play a game and save your replay!
      </a>
    </div>

    <div class="panel is-dark" v-show="getFile || getRecent.length">
      <a class="panel-block is-active is-disabled" v-if="getFile">
        <span class="panel-icon">
          <i class="fa fa-file-video-o fa-fw"></i>
        </span>
        <a class="button is-loading is-primary is-outlined is-small">Uploading</a>
        &nbsp;{{ getFile }}
      </a>
      <a class="panel-block is-active is-disabled" v-show="getRecent.length" v-for="item in getRecent">
        <span class="panel-icon">
          <i class="fa fa-file-video-o fa-fw"></i>
        </span>
        {{ item.file }} <span class="tag is-danger" v-show="item.error">{{ item.error }}</span>
        <span class="text-italic has-text-muted">...</span>
      </a>
      <a class="panel-block is-disabled text-italic" v-show="getMore && !getFile">
        and {{ getMore }} older
      </a>
    </div>

    <div class="level">
      <div class="level-item">
        <span class="tag is-black is-monospace">
          <span class="icon is-small">
            <i class="fa fa-folder fa-fw"></i>
          </span>&nbsp;
          <span v-show="getDir">{{ getDir }}</span>
          &nbsp;
          <a @click="changeDir" v-show="!getFile">
            Change
          </a>
        </span>
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
      getFile: 'getFile',
      getRecent: 'getRecent',
      getMore: 'getMore'
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
