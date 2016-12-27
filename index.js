/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = require('quill/dist/quill.js')
const quillEditor = require('./editor.vue')
const VueQuillEditor = {
  Quill: Quill,
  quillEditor: quillEditor,
  install: function(Vue) {
    Vue.component('quill-editor', quillEditor)
  }
}

module.exports = VueQuillEditor
