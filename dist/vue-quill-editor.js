! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("quill")) : "function" == typeof define && define.amd ? define(["quill"], e) : "object" == typeof exports ? exports.VueQuillEditor = e(require("quill")) : t.VueQuillEditor = e(t.Quill)
}(this, function (t) {
    return function (t) {
        function e(i) {
            if (n[i]) return n[i].exports;
            var l = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(l.exports, l, l.exports, e), l.l = !0, l.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, i) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "/", e(e.s = 2)
    }([function (e, n) {
        e.exports = t
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(4),
            l = n.n(i),
            o = n(6),
            r = n(5),
            u = r(l.a, o.a, !1, null, null, null);
        e.default = u.exports
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.install = e.quillEditor = e.Quill = void 0;
        var l = n(0),
            o = i(l),
            r = n(1),
            u = i(r),
            s = window.Quill || o.default,
            a = function (t, e) {
                e && (u.default.props.globalOptions.default = function () {
                    return e
                }), t.component(u.default.name, u.default)
            },
            c = {
                Quill: s,
                quillEditor: u.default,
                install: a
            };
        e.default = c, e.Quill = s, e.quillEditor = u.default, e.install = a
    }, function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            theme: "snow",
            boundary: document.body,
            modules: {
                toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    [{
                        header: 1
                    }, {
                        header: 2
                    }],
                    [{
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }],
                    [{
                        script: "sub"
                    }, {
                        script: "super"
                    }],
                    [{
                        indent: "-1"
                    }, {
                        indent: "+1"
                    }],
                    [{
                        direction: "rtl"
                    }],
                    [{
                        size: ["small", !1, "large", "huge"]
                    }],
                    [{
                        header: [1, 2, 3, 4, 5, 6, !1]
                    }],
                    [{
                        color: []
                    }, {
                        background: []
                    }],
                    [{
                        font: []
                    }],
                    [{
                        align: []
                    }],
                    ["clean"],
                    ["link", "image", "video"]
                ]
            },
            placeholder: "Insert text here ...",
            readOnly: !1
        }
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var l = n(0),
            o = i(l),
            r = n(3),
            u = i(r),
            s = window.Quill || o.default;
        "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function (t, e) {
                if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(t), i = 1; i < arguments.length; i++) {
                    var l = arguments[i];
                    if (null != l)
                        for (var o in l) Object.prototype.hasOwnProperty.call(l, o) && (n[o] = l[o])
                }
                return n
            },
            writable: !0,
            configurable: !0
        }), e.default = {
            name: "quill-editor",
            data: function () {
                return {
                    _options: {},
                    _content: "",
                    defaultOptions: u.default
                }
            },
            props: {
                content: String,
                value: String,
                disabled: {
                    type: Boolean,
                    default: !1
                },
                options: {
                    type: Object,
                    required: !1,
                    default: function () {
                        return {}
                    }
                },
                globalOptions: {
                    type: Object,
                    required: !1,
                    default: function () {
                        return {}
                    }
                }
            },
            mounted: function () {
                this.initialize()
            },
            beforeDestroy: function () {
                this.quill = null, delete this.quill
            },
            methods: {
                initialize: function () {
                    var t = this;
                    this.$el && (this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options), this.quill = new s(this.$refs.editor, this._options), this.quill.enable(!1), (this.value || this.content) && this.quill.setContents(this.quill.clipboard.convert(this.value || this.content)), this.disabled || this.quill.enable(!0), this.quill.on("selection-change", function (e) {
                        e ? t.$emit("focus", t.quill) : t.$emit("blur", t.quill)
                    }), this.quill.on("text-change", function (e, n, i) {
                        var l = t.$refs.editor.children[0].innerHTML,
                            o = t.quill,
                            r = t.quill.getText();
                        "<p><br></p>" === l && (l = ""), t._content = l, t.$emit("input", t._content), t.$emit("change", {
                            html: l,
                            text: r,
                            quill: o
                        })
                    }), this.$emit("ready", this.quill))
                }
            },
            watch: {
                content: function (t, e) {
                    this.quill && (t && t !== this._content ? (this._content = t, this.quill.setContents(this.quill.clipboard.convert(t))) : t || this.quill.setText(""))
                },
                value: function (t, e) {
                    this.quill && (t && t !== this._content ? (this._content = t, this.quill.setContents(this.quill.clipboard.convert(t))) : t || this.quill.setText(""))
                },
                disabled: function (t, e) {
                    this.quill && this.quill.enable(!t)
                }
            }
        }
    }, function (t, e) {
        t.exports = function (t, e, n, i, l, o) {
            var r, u = t = t || {},
                s = typeof t.default;
            "object" !== s && "function" !== s || (r = t, u = t.default);
            var a = "function" == typeof u ? u.options : u;
            e && (a.render = e.render, a.staticRenderFns = e.staticRenderFns, a._compiled = !0), n && (a.functional = !0), l && (a._scopeId = l);
            var c;
            if (o ? (c = function (t) {
                    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o)
                }, a._ssrRegister = c) : i && (c = i), c) {
                var d = a.functional,
                    f = d ? a.render : a.beforeCreate;
                d ? (a._injectStyles = c, a.render = function (t, e) {
                    return c.call(e), f(t, e)
                }) : a.beforeCreate = f ? [].concat(f, c) : [c]
            }
            return {
                esModule: r,
                exports: u,
                options: a
            }
        }
    }, function (t, e, n) {
        "use strict";
        var i = function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "quill-editor"
                }, [t._t("toolbar"), t._v(" "), n("div", {
                    ref: "editor"
                })], 2)
            },
            l = [],
            o = {
                render: i,
                staticRenderFns: l
            };
        e.a = o
    }])
});