import * as types from '../mutation-types'
var chokidar = require('chokidar')
var request = require('request')
var fs = require('fs')
var _path = require('path')

const state = {
  dir: null, // the directory to watch
  file: null, // the file currently being uploaded
  watcher: null, // the directory watcher instance
  recent: [], // an array of recent uploads and their status
  total: 0, // the total number of files uploaded
  queue: [] // a queue of files to be uploaded
}

const getters = {
  getDir: state => state.dir,
  getFile: state => state.file ? _path.basename(state.file) : null,
  getRecent: function (state) {
    var tmp = state.recent.slice()
    return tmp.map(function (item) {
      item.file = _path.basename(item.file)
      return item
    })
  },
  getTotal: state => state.total,
  getNumMore: state => state.total - state.recent.length,
  getNumInQueue: state => state.queue.length
}

const actions = {
  chooseDir ({ commit }, dir) {
    commit(types.CHOOSE_DIR, dir)
  },
  clearQueue ({ commit }) {
    commit(types.CLEAR_QUEUE)
  }
}

function uploadFile (state, path) {
  // Save the filename in `state.file`, which is the file currently being uploaded
  state.file = path

  // Create the form data with the file stream for post to the server
  var formData = {
    replay: {
      value: fs.createReadStream(path),
      options: { filename: path }
    }
  }

  // Upload the file to the server
  request.post({
    url: 'http://159.203.137.158/upload',
    formData: formData
  }, function (error, response, body) {
    // Increment the total number of uploads
    state.total++

    if (response.statusCode !== 303) {
      // 303 is a successful upload, anything else show an error
      error = response.statusCode + ' ' + response.statusMessage + (error ? ': ' + error : '')
    }

    // Add this upload to the list of recent uploads
    state.recent.push({
      file: state.file,
      error: error,
      at: new Date()
    })

    // Trim the recent uploads list
    var tmp = state.recent.slice(-3)
    state.recent = tmp

    // The file is done uploading so set `state.file` to null or the next file in the queue
    if (state.queue.length) {
      path = state.queue.shift()
      uploadFile(state, path)
    } else {
      state.file = null
    }
  })
}

const mutations = {
  /**
   * Choose the directory to watch. To reset, pass null.
   *
   * @param string|null dir
   */
  [types.CHOOSE_DIR] (state, dir) {
    state.dir = dir
    if (!dir) {
      // No directory was passed in, so reset the watcher
      if (state.watcher) {
        state.watcher.close()
      }
      state.watcher = null
    } else {
      // Save this configuration for future runs
      fs.writeFile('path.txt', dir, 'utf8')

      // Create a directory watcher and watch for file adds
      state.watcher = chokidar.watch(dir, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true,
        persistent: true
      }).on('add', function (path) {
        console.log('add', path)
        // Already uploading a file, add this one to the queue
        if (state.file) {
          console.log('queued')
          state.queue.push(path)
        } else {
          console.log('uploading..')
          uploadFile(state, path)
        }
      })
    }
  },
  /**
   * Clears the upload queue.
   */
  [types.CLEAR_QUEUE] (state) {
    state.queue = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
