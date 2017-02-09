<template>
  <div class="quill-editor"></div>
</template>

<script>
  require('quill/dist/quill.snow.css')
  require('quill/dist/quill.bubble.css')
  require('quill/dist/quill.core.css')
  if (!window.Quill) {
    window.Quill = require('quill/dist/quill.js')
  }
  export default {
    name: 'quill-editor',
    data() {
      return {
        _content: '',
        defaultModules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image', 'video']                         // link and image, video
          ]
        }
      }
    },
    props: {
      content: String,
      value: String,
      config: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      }
    },
    mounted() {
      this.initialize()
    },
    beforeDestroy() {
      // 作者说了，等垃圾回收，不必显式清理
      this.quillEditor = null
    },
    methods: {
      initialize() {
        if (this.$el) {
          let self = this
          self.quillEditor = new Quill(self.$el, Object.assign({
            modules: self.defaultModules,
            placeholder: 'Insert text here ...',
            readOnly: false,
            theme: 'snow',
            boundary: document.body
          }, self.config || {}))

          // set editor content
          if (self.value || self.content) {
            self.quillEditor.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quillEditor.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quillEditor)
            } else {
              self.$emit('focus', self.quillEditor)
            }
          })

          // update model if text changes
          self.quillEditor.on('text-change', (delta, oldDelta, source) => {
            let html = self.$el.children[0].innerHTML
            const text = self.quillEditor.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quillEditor,
              html: html,
              text: text
            })
          })

          // 广播事件
          self.$emit('ready', self.quillEditor)
        }
      }
    },
    watch: {
      'content'(newVal, oldVal) {
        if (this.quillEditor) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quillEditor.pasteHTML(newVal)
          } else if(!newVal) {
            this.quillEditor.setText('')
          }
        }
      },
      'value'(newVal, oldVal) {
        if (this.quillEditor) {
          if (newVal !== this._content) {
            this._content = newVal
            this.quillEditor.pasteHTML(newVal)
          } else if(!newVal) {
            this.quillEditor.setText('')
          }
        }
      }
    }
  }
</script>
