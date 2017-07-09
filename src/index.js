/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = require('quill/dist/quill.js')
var quillEditor = require('./editor.vue')
quillEditor = quillEditor.default || quillEditor

var VueQuillEditor = {
  Quill: Quill,
  quillEditor: quillEditor,
  install: function(Vue) {
    Vue.component(quillEditor.name, quillEditor)
  }
}

module.exports = VueQuillEditor
