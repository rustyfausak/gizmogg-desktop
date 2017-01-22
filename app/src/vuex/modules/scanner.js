import * as types from '../mutation-types'
var chokidar = require('chokidar')
var request = require('request')
var fs = require('fs')

const state = {
  dir: null,
  file: null,
  watcher: null
}

const getters = {
  getDir: state => state.dir,
  getFile: state => state.file
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
      watcher = chokidar.watch(dir, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
        persistent: true
      }).on('add', function (path) {
        state.file = path
        var formData = {
          replay: {
            value: fs.createReadStream(path),
            options: { filename: path }
          }
        }
        request.post({
          url: 'http://159.203.137.158/upload',
          formData: formData
        }, function (error, response, body) {
          console.log('request callback', error, response, body)
          state.file = null
        })
      })
    } else {
      if (state.watcher) {
        state.watcher.close()
      }
    }
    state.watcher = watcher
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
