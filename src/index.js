
/*
* Vue-Quill-Editor ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-quill-editor
*/

const Quill = window.Quill || require('quill')
const quillEditor = require('./editor.vue').default
const VueQuillEditor = {
  Quill,
  quillEditor,
  install(Vue, globalOptions) {
    if (globalOptions) {
      quillEditor.props.globalOptions.default = () => globalOptions
    }
    Vue.component(quillEditor.name, quillEditor)
  }
}

module.exports = VueQuillEditor
