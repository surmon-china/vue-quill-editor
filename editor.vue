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
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
        }
      }
    },
    props: {
      content: String,
      value: String,
      options: {
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
      this.quill = null
    },
    methods: {
      initialize() {
        if (this.$el) {
          let self = this
          self.quill = new Quill(self.$el, Object.assign({
            modules: self.defaultModules,
            placeholder: 'Insert text here ...',
            readOnly: false,
            theme: 'snow',
            boundary: document.body
          }, self.options || {}))

          // set editor content
          if (self.value || self.content) {
            self.quill.pasteHTML(self.value || self.content)
          }

          // mark model as touched if editor lost focus
          self.quill.on('selection-change', (range) => {
            if (!range) {
              self.$emit('blur', self.quill)
            } else {
              self.$emit('focus', self.quill)
            }
          })

          // update model if text changes
          self.quill.on('text-change', (delta, oldDelta, source) => {
            let html = self.$el.children[0].innerHTML
            const text = self.quill.getText()
            if (html === '<p><br></p>') html = ''
            self._content = html
            self.$emit('input', self._content)
            self.$emit('change', {
              editor: self.quill,
              html: html,
              text: text
            })
          })

          // emit ready
          self.$emit('ready', self.quill)
        }
      }
    },
    watch: {
      'content'(newVal, oldVal) {
        if (this.quill) {
          if (!!newVal && newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      },
      'value'(newVal, oldVal) {
        if (this.quill) {
          if (newVal !== this._content) {
            this._content = newVal
            this.quill.pasteHTML(newVal)
          } else if(!newVal) {
            this.quill.setText('')
          }
        }
      }
    }
  }
</script>

<style>
  .quill-editor img {
    max-width: 100%;
  }
</style>
