import * as types from '../mutation-types'
var chokidar = require('chokidar')
var request = require('request')
var fs = require('fs')
var _path = require('path')

const state = {
  dir: null, // the directory to watch
  file: null, // the file currently being uploaded
  watcher: null, // the directory watcher instance
  recent: [],
  total: 0 // the total number of files uploaded
}

const getters = {
  getDir: state => state.dir,
  getFile: state => state.file,
  getRecent: state => state.recent.reverse(),
  getTotal: state => state.total,
  getMore: state => state.total - state.recent.length
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
      fs.writeFile('path.txt', dir, 'utf8')
      watcher = chokidar.watch(dir, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
        persistent: true
      }).on('add', function (path) {
        state.file = _path.basename(path)
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
          state.recent.push({
            file: state.file,
            error: error
          })
          state.recent = state.recent.slice(-3)
          state.file = null
          state.total++
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
