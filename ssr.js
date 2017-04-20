
const Quill = window.Quill = require('quill/dist/quill.js')

const quillEditor = {
  install: function(Vue) {
    Vue.directive('quill', {
      inserted: function (el, binding, vnode) {
        var _this = vnode.context
        var instanceName = binding.arg
        var options = binding.value || {}
        var quill = _this[instanceName]
        var eventEmit = function (vnode, name, data) {
          var handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners)
          if (handlers && handlers[name]) {
            handlers[name].fns(data)
          }
        }
        if (!quill) {
          // initialize
          var defaultOptions = {
            modules: {
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
            },
            placeholder: 'Insert text here ...',
            readOnly: false,
            theme: 'snow',
            boundary: document.body
          }
          options.theme = options.theme || defaultOptions.theme
          options.modules = options.modules || defaultOptions.modules
          options.readOnly = options.readOnly || defaultOptions.readOnly
          options.boundary = options.boundary || defaultOptions.boundary
          options.placeholder = options.placeholder || defaultOptions.placeholder
          options.modules.toolbar = options.modules.toolbar || defaultOptions.modules.toolbar
          quill = _this[instanceName] = new Quill(el, options)

          // data init
          const model = vnode.data.model
          const content = vnode.data.attrs ? vnode.data.attrs.content : null

          // set editor content
          if (model || content) {
            quill.pasteHTML(model ? model.value : content)
          }

          // mark model as touched if editor lost focus
          quill.on('selection-change', function(range) {
            if (!range) {
              eventEmit(vnode, 'blur', quill)
            } else {
              eventEmit(vnode, 'focus', quill)
            }
          })

          // update model if text changes
          quill.on('text-change', function(delta, oldDelta, source) {
            var html = el.children[0].innerHTML
            var text = quill.getText()
            if (html === '<p><br></p>') {
              html = ''
              quill.pasteHTML(html)
            }
            if (model) {
              model.callback(html)
            } else if (content) {
              eventEmit(vnode, 'change', {
                editor: quill,
                html: html,
                text: text
              })
            }
          })

          // emit ready
          eventEmit(vnode, 'ready', quill)
        }
      },
      componentUpdated: function (el, binding, vnode) {
        var _this = vnode.context
        var instanceName = binding.arg
        var options = binding.value || {}
        var quill = _this[instanceName]
        if (quill) {
          const model = vnode.data.model
          const content = vnode.data.attrs ? vnode.data.attrs.content : null
          var newData = model ? model.value : content
          var oldData = el.children[0].innerHTML
          if (newData) {
            if (newData != oldData) {
              quill.pasteHTML(newData)
            }
          } else {
            quill.setText('')
          }
        }
      },
      unbind: function (el, binding, vnode) {
        if (vnode.context[binding.arg]) {
          vnode.context[binding.arg] = null
          delete vnode.context[binding.arg]
        }
      }
    })
  }
}

module.exports = quillEditor
