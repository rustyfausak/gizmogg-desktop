import * as types from '../mutation-types'
var chokidar = require('chokidar')
var request = require('request')
var fs = require('fs')

const state = {
  dir: null, // the directory to watch
  file: null, // the file currently being uploaded
  watcher: null, // the directory watcher instance
  last_file: null,
  last_error: null,
  last_at: null,
  total: 0 // the total number of files uploaded
}

const getters = {
  getDir: state => state.dir,
  getFile: state => state.file,
  getLast: state => [state.last_file, state.last_error, state.last_at]
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
          state.last_file = state.file
          state.last_error = error
          state.last_at = 0
          state.file = null
        })
      })
    } else {
      if (state.watcher) {
        state.watcher.close()
      }
      state.last_file = null
      state.last_error = null
      state.last_at = null
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
