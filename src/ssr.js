
/*
* vue-quill-editor ssr.js
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-quill-editor
*/

// Require sources.
const defaultOptions = require('./options')
const objectAssign = require('./object-assign')
const Quill = window.Quill || require('quill')

const quillEditor = {

  // Quill
  Quill,

   // Global quill default options.
  install(Vue, globalOptions) {

    // Get quill instace name in directive.
    const getInstanceName = (el, binding, vnode) => {
      let instanceName = null
      if (binding.arg) {
        instanceName = binding.arg
      } else if (vnode.data.attrs && vnode.data.attrs.instanceName) {
        instanceName = vnode.data.attrs.instanceName
      } else if (el.id) {
        instanceName = el.id
      }
      return instanceName || 'quill'
    }

    // Mount quill directive for Vue global.
    Vue.directive('quill', {
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

          // Options and instance
          const quillOptions = objectAssign({}, defaultOptions, globalOptions || {}, options)
          quill = self[instanceName] = new Quill(el, quillOptions)

          // Data init
          const model = vnode.data.model
          const content = vnode.data.attrs ? vnode.data.attrs.content : null
          const disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null

          // Set editor content
          if (model || content) {
            quill.pasteHTML(model ? model.value : content)
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
          const content = vnode.data.attrs ? vnode.data.attrs.content : null
          const disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null
          const newData = model ? model.value : content
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
    })
  }
}

module.exports = quillEditor
