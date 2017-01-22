import * as types from '../mutation-types'
var chokidar = require('chokidar')

const state = {
  dir: null,
  watcher: null
}

const getters = {
  getDir: state => state.dir
}

const actions = {
  chooseDir ({ commit }, dir) {
    commit(types.CHOOSE_DIR, dir)
  }
}

const mutations = {
  [types.CHOOSE_DIR] (state, dir) {
    state.dir = dir
    var watcher = null
    if (dir) {
      console.log('dir set')
      watcher = chokidar.watch(dir, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
        persistent: true
      }).on('add', function (path) {
        console.log(path)
      })
    } else {
      if (state.watcher) {
        state.watcher.close()
      }
    }
    state.watcher = watcher
    console.log('state now ' + state.dir)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
