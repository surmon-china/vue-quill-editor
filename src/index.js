
/*
* Vue-Quill-Editor ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-quill-editor
*/

import _Quill from 'quill'
import quillEditor from './editor.vue'
const Quill = window.Quill || _Quill

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

export default VueQuillEditor
