
/*
* vue-quill-editor ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-quill-editor
*/

// Require sources.
const Quill = require('quill')
const defaultOptions = require('../utils/options')

const quillEditor = globalOptions => {

  // Get quill instace name in directive.
  const getInstanceName = (el, binding, vnode) => {
    let instanceName = null
    if (binding.arg) {
      instanceName = binding.arg
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])
    } else if (el.id) {
      instanceName = el.id
    }
    return instanceName || 'quill'
  }

  return {
    inserted(el, binding, vnode) {
      const self = vnode.context
      const options = binding.value || {}
      const instanceName = getInstanceName(el, binding, vnode)
      let quill = self[instanceName]

       // Emit event in Vue directive.
      const eventEmit = (vnode, name, data) => {
        const handlers = (vnode.data && vnode.data.on) || 
                         (vnode.componentOptions && vnode.componentOptions.listeners)
        if (handlers && handlers[name]) handlers[name].fns(data)
      }

      // Initialize quill options.
      if (!quill) {

        // Options
        const quillOptions = ['theme', 'modules', 'readOnly', 'boundary', 'placeholder'].reduce((ops, key) => {
          const [ov, gv, dv] = [options[key], globalOptions[key], defaultOptions[key]]
          if (ov !== undefined) {
            ops[key] = ov
          } else if (gv !== undefined) {
            ops[key] = gv
          } else if (dv !== undefined) {
            ops[key] = dv
          }
          return ops
        }, {})

        const [omt, gomt, domt] = [
          options.modules ? options.modules.toolbar : null,
          globalOptions.modules ? globalOptions.modules.toolbar : null,
          defaultOptions.modules ? defaultOptions.modules.toolbar : null
        ]
        quillOptions.modules.toolbar = quillOptions.modules.toolbar || (omt ? omt : (gomt ? gomt : domt))

        // Instance
        quill = self[instanceName] = new Quill(el, quillOptions)

        // Data init
        const model = vnode.data.model
        const _value = vnode.data.attrs ? vnode.data.attrs.value : null
        const _content = vnode.data.attrs ? vnode.data.attrs.content : null
        const disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null
        const content = model ? model.value : (_value || _content)

        // Set editor content
        if (content) {
          quill.pasteHTML(content)
        }

        // Disabled editor
        if (disabled) {
          quill.enable(false)
        }

        // Mark model as touched if editor lost focus
        quill.on('selection-change', range => {
          if (!range) {
            eventEmit(vnode, 'blur', quill)
          } else {
            eventEmit(vnode, 'focus', quill)
          }
        })

        // Update model if text changes
        quill.on('text-change', (delta, oldDelta, source) => {
          let html = el.children[0].innerHTML
          const text = quill.getText()
          if (html === '<p><br></p>') {
            html = ''
            quill.root.innerHTML = html
          }
          if (model) {
            model.callback(html)
          }
          eventEmit(vnode, 'input', html)
          eventEmit(vnode, 'change', { text, html, quill })
        })

        // Emit ready event
        eventEmit(vnode, 'ready', quill)
      }
    },
    
    // Parse text model change.
    componentUpdated(el, binding, vnode) {
      const self = vnode.context
      const instanceName = getInstanceName(el, binding, vnode)
      const options = binding.value || {}
      const quill = self[instanceName]
      if (quill) {
        const model = vnode.data.model
        const _value = vnode.data.attrs ? vnode.data.attrs.value : null
        const _content = vnode.data.attrs ? vnode.data.attrs.content : null
        const disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null
        const content = model ? model.value : (_value || _content)
        const newData = content
        const oldData = el.children[0].innerHTML
        quill.enable(!disabled)
        if (newData) {
          if (newData != oldData) {
            const range = quill.getSelection()
            quill.root.innerHTML = newData
            setTimeout(() => {
              quill.setSelection(range)
            })
          }
        } else {
          quill.setText('')
        }
      }
    },
    
    // Destroy this directive.
    unbind(el, binding, vnode) {
      if (vnode.context[binding.arg]) {
        vnode.context[binding.arg] = null
        delete vnode.context[binding.arg]
      }
    }
  }
}

const VueQuillEditor = {

  // Quill
  Quill,

  // quillEditor
  quillEditor: quillEditor({}),

   // Global quill default options.
  install(Vue, globalOptions = {}) {

    // Mount quill directive for Vue global.
    Vue.directive('quill', quillEditor(globalOptions))
  }
}

module.exports = VueQuillEditor
