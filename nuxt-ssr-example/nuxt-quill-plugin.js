
import Vue from 'vue'

if (process.BROWSER_BUILD) {
	const VueQuillEditor = require('vue-quill-editor/ssr')
	Vue.use(VueQuillEditor)
}