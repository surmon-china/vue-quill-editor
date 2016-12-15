/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = require('quill/dist/quill.js')
const quillEditor = require('./editor.vue')
const VueQuillEditor = {
  Quill,
  quillEditor,
  install(Vue) {
    Vue.component('quill-editor', quillEditor)
  }
}

module.exports = VueQuillEditor
