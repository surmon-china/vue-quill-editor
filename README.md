[![GitHub issues](https://img.shields.io/github/issues/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/vue-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/vue-quill-editor/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/surmon-china/vue-quill-editor/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/vue-quill-editor.svg?style=social?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/vue-quill-editor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-quill-editor/)


# Vue-Quill-Editor
🍡Quill editor component for Vue2，基于Quill、适用于Vue2的富文本编辑器。

> ### v1.1.1
> const to var

> ### v1.1.0
> 修复webpack UglifyJsPlugin中的报错Bug


# Example
[Demo Page](https://surmon-china.github.io/vue-quill-editor/)


# Use Setup


### Install vue-quill-editor

``` bash
npm install vue-quill-editor --save
```

### use
``` javascript
// import with ES6
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'


// require with Webpack/Node.js
var Vue = require('vue')
var VueQuillEditor = require('vue-quill-editor')


// use
Vue.use(VueQuillEditor)

// --------------------------------------


// or use with component(ES6)
import { quillEditor } from 'vue-quill-editor'

// use
export default {
  components: {
    quillEditor
  }
}
```

``` html
<!-- use with components - bidirectional data binding（双向数据绑定） -->
<quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
</quill-editor>


<!-- If you need to manually control the data synchronization, you can monitor the code change event like this（如果你需要手动控制数据流，就需要像这样手动监听changed事件） -->
<quill-editor ref="myTextEditor"
              :content="content"
              :config="editorOption"
              @change="onEditorChange($event)">
</quill-editor>
```


``` javascript
// editor option example:
export default {
  data () {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
       // something config
      }
    }
  },
  // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
  // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    console.log('this is my editor', this.editor)
    // this.editor to do something...
  }
}
```


# More Config

[Api docs](https://quilljs.com/docs/quickstart/)


# Author Blog
[Surmon](http://surmon.me)
