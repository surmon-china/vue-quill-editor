'use strict';

var Quill = require('quill');
var defaultOptions = require('../utils/options');

var quillEditor = function quillEditor(globalOptions) {
  var getInstanceName = function getInstanceName(el, binding, vnode) {
    var instanceName = null;
    if (binding.arg) {
      instanceName = binding.arg;
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'];
    } else if (el.id) {
      instanceName = el.id;
    }
    return instanceName || 'quill';
  };

  return {
    inserted: function inserted(el, binding, vnode) {
      var self = vnode.context;
      var options = binding.value || {};
      var instanceName = getInstanceName(el, binding, vnode);
      var quill = self[instanceName];

      var eventEmit = function eventEmit(vnode, name, data) {
        var handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;
        if (handlers && handlers[name]) handlers[name].fns(data);
      };

      if (!quill) {
        var quillOptions = ['theme', 'modules', 'readOnly', 'boundary', 'placeholder'].reduce(function (ops, key) {
          var _ref = [options[key], globalOptions[key], defaultOptions[key]],
              ov = _ref[0],
              gv = _ref[1],
              dv = _ref[2];

          if (ov !== undefined) {
            ops[key] = ov;
          } else if (gv !== undefined) {
            ops[key] = gv;
          } else if (dv !== undefined) {
            ops[key] = dv;
          }
          return ops;
        }, {});

        var omt = options.modules ? options.modules.toolbar : null,
            gomt = globalOptions.modules ? globalOptions.modules.toolbar : null,
            domt = defaultOptions.modules ? defaultOptions.modules.toolbar : null;

        quillOptions.modules.toolbar = quillOptions.modules.toolbar || (omt ? omt : gomt ? gomt : domt);

        quill = self[instanceName] = new Quill(el, quillOptions);

        var model = vnode.data.model;
        var _value = vnode.data.attrs ? vnode.data.attrs.value : null;
        var _content = vnode.data.attrs ? vnode.data.attrs.content : null;
        var disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null;
        var content = model ? model.value : _value || _content;

        if (content) {
          quill.pasteHTML(content);
        }

        if (disabled) {
          quill.enable(false);
        }

        quill.on('selection-change', function (range) {
          if (!range) {
            eventEmit(vnode, 'blur', quill);
          } else {
            eventEmit(vnode, 'focus', quill);
          }
        });

        quill.on('text-change', function (delta, oldDelta, source) {
          var html = el.children[0].innerHTML;
          var text = quill.getText();
          if (html === '<p><br></p>') {
            html = '';
            quill.root.innerHTML = html;
          }
          if (model) {
            model.callback(html);
          }
          eventEmit(vnode, 'input', html);
          eventEmit(vnode, 'change', { text: text, html: html, quill: quill });
        });

        eventEmit(vnode, 'ready', quill);
      }
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      var self = vnode.context;
      var instanceName = getInstanceName(el, binding, vnode);
      var options = binding.value || {};
      var quill = self[instanceName];
      if (quill) {
        var model = vnode.data.model;
        var _value = vnode.data.attrs ? vnode.data.attrs.value : null;
        var _content = vnode.data.attrs ? vnode.data.attrs.content : null;
        var disabled = vnode.data.attrs ? vnode.data.attrs.disabled : null;
        var content = model ? model.value : _value || _content;
        var newData = content;
        var oldData = el.children[0].innerHTML;
        quill.enable(!disabled);
        if (newData) {
          if (newData != oldData) {
            var range = quill.getSelection();
            quill.root.innerHTML = newData;
            setTimeout(function () {
              quill.setSelection(range);
            });
          }
        } else {
          quill.setText('');
        }
      }
    },
    unbind: function unbind(el, binding, vnode) {
      if (vnode.context[binding.arg]) {
        vnode.context[binding.arg] = null;
        delete vnode.context[binding.arg];
      }
    }
  };
};

var VueQuillEditor = {
  Quill: Quill,

  quillEditor: quillEditor({}),

  install: function install(Vue) {
    var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Vue.directive('quill', quillEditor(globalOptions));
  }
};

module.exports = VueQuillEditor;
