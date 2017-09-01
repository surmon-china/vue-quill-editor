
var Quill = window.Quill = require('quill/dist/quill.js')

var quillEditor = {
  install: function(Vue) {
    var getInstanceName = function(el, binding, vnode) {
      var customInstanceName = ''
      if (binding.arg) {
        customInstanceName = binding.arg
      } else if (vnode.data.attrs && vnode.data.attrs.instanceName) {
        customInstanceName = vnode.data.attrs.instanceName
      } else if (el.id) {
        customInstanceName = el.id
      }
      var instanceName = customInstanceName || 'quill'
      return instanceName
    }
    Vue.directive('quill', {
      inserted: function (el, binding, vnode) {
        var _this = vnode.context
        var instanceName = getInstanceName(el, binding, vnode)
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
          options.modules.toolbar = options.modules.toolbar !== undefined 
                                      ? options.modules.toolbar 
                                      : defaultOptions.modules.toolbar
          quill = _this[instanceName] = new Quill(el, options)

          // data init
          var model = vnode.data.model
          var content = vnode.data.attrs ? vnode.data.attrs.content : null

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
              quill.root.innerHTML = html
            }
            if (model) {
              model.callback(html)
            }
            eventEmit(vnode, 'change', {
              editor: quill,
              html: html,
              text: text
            })
          })

          // emit ready
          eventEmit(vnode, 'ready', quill)
        }
      },
      componentUpdated: function (el, binding, vnode) {
        var _this = vnode.context
        var instanceName = getInstanceName(el, binding, vnode)
        var options = binding.value || {}
        var quill = _this[instanceName]
        if (quill) {
          var model = vnode.data.model
          var content = vnode.data.attrs ? vnode.data.attrs.content : null
          var newData = model ? model.value : content
          var oldData = el.children[0].innerHTML
          if (newData) {
            if (newData != oldData) {
              var range = quill.getSelection();
              quill.root.innerHTML = newData;
              setTimeout(function() {
                quill.setSelection(range);
              });
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
