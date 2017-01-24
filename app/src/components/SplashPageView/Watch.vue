<template>
  <div>

    <div class="panel is-dark" v-show="!getFile && !getRecent.length">
      <a class="panel-block is-active is-disabled text-italic">
        No uploads yet. Play a game and save your replay!
      </a>
    </div>

    <div class="panel is-dark" v-show="getFile || getRecent.length">

      <div class="panel-block is-active" v-if="getNumInQueue">
        <span class="panel-icon">
          <i class="fa fa-clock-o fa-fw"></i>
        </span>
        {{ getNumInQueue }} in queue
        <div class="flex-pull-right">
          <a class="button is-danger is-outlined is-small" @click="clearQueue">cancel</a>
        </div>
      </div>

      <div class="panel-block is-active" v-if="getFile">
        <span class="panel-icon">
          <i class="fa fa-file-video-o fa-fw"></i>
        </span>
        <a class="button is-loading is-primary is-outlined is-small">Uploading</a>
        <span class="is-spacer"></span>
        {{ getFile }}
      </div>

      <div class="panel-block" v-show="getRecent.length" v-for="item in getRecent.slice().reverse()">
        <span class="panel-icon">
          <i class="fa fa-file-video-o fa-fw"></i>
        </span>
        {{ item.file }}
        <span class="tag is-danger" v-show="item.error">{{ item.error }}</span>
        <div class="text-italic has-text-muted flex-pull-right"><timeago :since="item.at" :auto-update="10"></timeago></div>
      </div>

      <div class="panel-block text-italic" v-show="getNumMore && !getFile">
        and {{ getNumMore }} older
      </div>

    </div>

    <div class="level">
      <div class="level-item">
        <span class="tag is-black is-monospace">
          <span class="icon is-small">
            <i class="fa fa-folder fa-fw"></i>
          </span>
          <span class="is-spacer"></span>
          <span v-show="getDir">{{ getDir }}</span>
          <span class="is-spacer"></span>
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
      getNumMore: 'getNumMore',
      getNumInQueue: 'getNumInQueue'
    })
  },
  name: 'watch',
  methods: {
    clearQueue: function (e) {
      this.$store.dispatch('clearQueue')
    },
    changeDir: function (e) {
      this.$store.dispatch('clearQueue')
      this.$store.dispatch('chooseDir', null)
      this.$router.push('/choose')
    }
  }
}
</script>
