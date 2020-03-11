[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/stargazers)
[![Build Status](https://travis-ci.org/surmon-china/vue-quill-editor.svg?branch=master)](https://travis-ci.org/surmon-china/vue-quill-editor)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor)

[![NPM](https://nodei.co/npm/vue-quill-editor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-quill-editor/)
[![NPM](https://nodei.co/npm-dl/vue-quill-editor.png?months=9&height=3)](https://nodei.co/npm/vue-quill-editor/)


# Vue-Quill-Editor

[Quill](https://github.com/quilljs/quill) editor component for Vue.

基于 [Quill](https://github.com/quilljs/quill)、适用于 Vue 的富文本编辑器，支持服务端渲染和单页应用。


### Example

- [Component example page](https://surmon-china.github.io/vue-quill-editor/)
- [CDN example page](https://jsfiddle.net/surmon/fpojgkmy/)


### Install

**NPM**

``` bash
npm install vue-quill-editor --save

# or
yarn add vue-quill-editor
```

**CDN**

``` html
<link rel="stylesheet" href="path/to/quill.core.css"/>
<link rel="stylesheet" href="path/to/quill.snow.css"/>
<link rel="stylesheet" href="path/to/quill.bubble.css"/>
<script type="text/javascript" src="path/to/quill.js"></script>
<script type="text/javascript" src="path/to/vue.min.js"></script>
<script type="text/javascript" src="path/to/dist/vue-quill-editor.js"></script>
<script type="text/javascript">
  Vue.use(window.VueQuillEditor)
</script>
```

### Mount

**Mount with global**

``` javascript
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)
```

**Mount with local component**

```javascript
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  }
}
```

**Mount with SSR**

View [Nuxt.js example code](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-quill-editor/nuxt).

### Register Quill module

```javascript
import Quill from 'quill'
import yourQuillModule from '../yourModulePath/yourQuillModule.js'
Quill.register('modules/yourQuillModule', yourQuillModule)

// Vue app...
```

### Component

``` vue
<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />

  <!-- Or manually control the data synchronization -->
  <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  />
</template>

<script>
  // You can also register Quill modules in the component
  import Quill from 'quill'
  import someModule from '../yourModulePath/someQuillModule.js'
  Quill.register('modules/someModule', someModule)
  
  export default {
    data () {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // Some Quill options...
        }
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>
```

### Projects using vue-quill-editor
- [Tamiat CMS](https://github.com/tamiat/tamiat/)
- ...


### Issues
- [Add attributes from toolbar options](https://github.com/quilljs/quill/issues/1084)
- [Option to insert an image from a URL](https://github.com/quilljs/quill/issues/893)
- [How vue-quill-editor combine with the syntax highlighter module of highlight.js](https://github.com/surmon-china/vue-quill-editor/issues/39)
- [配合 element-ui 实现上传图片/视频到七牛 demo](https://github.com/surmon-china/vue-quill-editor/issues/102)
- [How to fix “Can’t find variable: Quill”, “Quill is undefined”, “window.Quill is undefined” errors when trying to use Quill modules that use Webpack in Nuxt/SSR](https://github.com/surmon-china/vue-quill-editor/issues/171#issuecomment-370253411)


### Quill Modules
- [quill-image-extend-module](https://github.com/NextBoy/quill-image-extend-module)
- [quill-image-resize-module](https://github.com/kensnyder/quill-image-resize-module)
- [quill-image-drop-module](https://github.com/kensnyder/quill-image-drop-module)
- [quilljs-table](https://github.com/dost/quilljs-table)
- [more modules...](https://github.com/search?o=desc&q=quill+module&s=stars&type=Repositories&utf8=%E2%9C%93)


### Quill
[Quill API document](https://quilljs.com/docs/quickstart/)

