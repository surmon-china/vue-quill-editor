
import Vue from 'vue'

if (process.browser) {
	const VueQuillEditor = require('vue-quill-editor/ssr')
	Vue.use(VueQuillEditor)
}