/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

var quill = require('quill/dist/quill.js')
var quillEditor = require('./src/editor.vue')
quillEditor = quillEditor.default || quillEditor

var VueQuillEditor = {
  Quill: quill,
  quillEditor: quillEditor,
  install: function(Vue) {
    Vue.component(quillEditor.name, quillEditor)
  }
}

module.exports = VueQuillEditor
