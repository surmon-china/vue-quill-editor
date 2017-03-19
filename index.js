/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = require('quill/dist/quill.js')
var quillEditor = require('./editor.vue')
var VueQuillEditor = {
  Quill: Quill,
  quillEditor: quillEditor,
  install: function(Vue) {
    Vue.component('quill-editor', quillEditor)
  }
}

module.exports = VueQuillEditor
