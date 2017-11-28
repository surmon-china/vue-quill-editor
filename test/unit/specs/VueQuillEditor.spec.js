
// import Quill from 'quill'
import Vue from 'vue/dist/vue.js'
import VueQuillEditor, { Quill } from '../../../src/index.js'
import VueQuillEditorSsr from '../../../src/ssr.js'

console.log('--------VueQuillEditor', VueQuillEditor)
console.log('--------VueQuillEditorSsr', VueQuillEditorSsr)

describe('vue-quill-editor', () => {

  Vue.use(VueQuillEditor, {
    placeholder: 'global placeholder'
  })

  // 全局安装
  describe('Global install component', () => {
    it(' - should can get the quill element', done => {
      const vm = new Vue({
        template: `<div><quill-editor v-model="content"></quill-editor></div>`,
        data: {
          content: '<p>test content</p>',
        }
      }).$mount()
      expect(vm.$children[0].value).to.deep.equal('<p>test content</p>')
      Vue.nextTick(() => {
        expect(vm.$children[0].quill instanceof Quill).to.equal(true)
        expect(vm.$children[0].quill.getText()).to.deep.equal('test content\n')
        done()
      })
    })
  })

  // 全局配置测试
  describe('Get instance by attr ref and set global options', () => {
    it(' - should get the quill instance and global options', done => {
      const vm = new Vue({
        template: `<div><quill-editor ref="myTextEditor" v-model="content"></quill-editor></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          quill() {
            return this.editor.quill
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.quill instanceof Quill).to.equal(true)
        expect(vm.quill.getText()).to.deep.equal('test content\n')
        expect(Object.keys(vm.editor._options).length >= 5).to.equal(true)
        done()
      })
    })
  })

  // 全局配置覆盖
  describe('Set component options', () => {
    it(' - should quill.placeholder === component.options.placeholder', done => {
      const vm = new Vue({
        template: `<div><quill-editor ref="myTextEditor" :options="editorOption" v-model="content"></quill-editor></div>`,
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          quill() {
            return this.editor.quill
          }
        }
      }).$mount()
      Vue.nextTick(() => {
        // 配置是否等同局部配置
        const placeholder = vm.editor._options.placeholder
        const isInclude = placeholder === 'component placeholder' || placeholder === undefined
        expect(isInclude).to.equal(true)
        done()
      })
    })
  })

  // 数据绑定
  describe('Component data binding', () => {
    it(' - should change the quill content after change the component content data', done => {
      const vm = new Vue({
        template: `<div><quill-editor v-model="content" ref="myTextEditor"></quill-editor></div>`,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          quill() {
            return this.$refs.myTextEditor.quill
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(vm.quill.getText()).to.deep.equal('test change\n')
        expect(vm.quill.editor.delta.ops).to.deep.equal([{ insert: "test change\n" }])
        done()
      })
    })
  })

  // 广播事件
  describe('Component emit event and data binding by evennt', () => {
    it(' - should capture event after the quill emit event', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <quill-editor ref="myTextEditor"
                                    :value="content"
                                    @blur="onEditorBlur"
                                    @focus="onEditorFocus"
                                    @ready="onEditorReady"
                                    @change="onEditorChange"
                                    @input="onEditorInput">
                      </quill-editor>
                  </div>
                  `,
        data: {
          content: '<p>test content</p>'
        },
        computed: {
          editor() {
            return this.$refs.myTextEditor
          },
          quill() {
            return this.editor.quill
          }
        },
        methods: {
          onEditorBlur(quill) {
            console.log('onEditorBlur', quill)
            eventLogs.push('onEditorBlur')
          },
          onEditorFocus(quill) {
            console.log('onEditorFocus', quill)
            eventLogs.push('onEditorFocus')
          },
          onEditorReady(quill) {
            eventLogs.push('onEditorReady')
            // mockEvennt(this.editor.$el.children[1])
            // triggerEvent(this.editor.$el.children[0].children[0].children[0], 'MouseEvent')
          },
          onEditorChange({ quill, text, html }) {
            eventLogs.push('onEditorChange' + text)
            // expect(quill instanceof Quill).to.deep.equal(true)
            // expect(!!text).to.deep.equal(true)
            // expect(!!html).to.deep.equal(true)
          },
          onEditorInput(html) {
            eventLogs.push('onEditorInput' + html)
            // expect(html).to.deep.equal('<p>test change</p>')
          }
        },
        mounted() {
          eventLogs.push('mounted')
          this.content = '<span>test change</span>'
        }
      }).$mount()

      // console.log('----------', eventLogs)
      expect(eventLogs[0]).to.deep.equal('onEditorReady')
      expect(eventLogs[1]).to.deep.equal('mounted')
      done()
      // console.log('onEditorReady', this.editor.$el.children[1].children[0].dispatchEvent(event), event)
      // expect(quill instanceof Quill).to.deep.equal(true)
        // setTimeout(() => {
          // this.content = '<p>test change</p>'
        // }, 1000)
    })
  })

  // 局部安装
  describe('Local install component', () => {
    it(' - should work', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <vue-quill-editor ref="myTextEditor"
                                        v-model="content"
                                        :options="editorOption"
                                        @ready="onEditorReady">
                      </vue-quill-editor>
                  </div>
                  `,
        components: {
          'VueQuillEditor': VueQuillEditor.quillEditor
        },
        data: {
          content: '<p>test content</p>',
          editorOption: {
            placeholder: 'component placeholder'
          }
        },
        computed: {
          quill() {
            return this.$refs.myTextEditor.quill
          }
        },
        methods: {
          onEditorReady(quill) {
            eventLogs.push('onEditorReady')
          }
        },
        mounted() {
          this.content = '<span>test change</span>'
        }
      }).$mount()
      Vue.nextTick(() => {
        expect(eventLogs[0]).to.deep.equal('onEditorReady')
        expect(vm.quill instanceof Quill).to.deep.equal(true)
        expect(vm.quill.getText()).to.deep.equal('test change\n')
        expect(vm.quill.editor.delta.ops).to.deep.equal([{ insert: "test change\n" }])
        done()
      })
    })
  })

  // 多个循环实例
  describe('Multi edirot instance', () => {
    it(' - should update value after any change text', done => {
      const eventLogs = []
      const vm = new Vue({
        template: `<div>
                      <quill-editor :key="key"
                                    :value="content"
                                    :ref="'editor' + key"
                                    v-for="(content, key) in contents"
                                    :options="buildOptions(key)"
                                    @ready="onEditorReady(key)">
                      </quill-editor>
                  </div>
                  `,
        data: {
          contents: {
            a: '<p>a-test content</p>',
            b: '<p>b-test content</p>',
            c: '<p>c-test content</p>'
          }
        },
        methods: {
          buildOptions(key) {
            return {
              placeholder: `${key}component placeholder`
            }
          },
          onEditorReady(key) {
            eventLogs.push(`${key}-onEditorReady`)
          }
        }
      }).$mount()
      expect(eventLogs[0]).to.deep.equal('a-onEditorReady')
      expect(eventLogs[1]).to.deep.equal('b-onEditorReady')
      expect(eventLogs[2]).to.deep.equal('c-onEditorReady')
      expect(vm.$refs.editora[0].quill.getText()).to.deep.equal('a-test content\n')
      expect(vm.$refs.editorb[0].quill.getText()).to.deep.equal('b-test content\n')
      expect(vm.$refs.editorc[0].quill.getText()).to.deep.equal('c-test content\n')
      vm.contents.b = '<p>b-test change</p>'
      Vue.nextTick(() => {
        expect(vm.$refs.editorb[0].quill.getText()).to.deep.equal('b-test change\n')
        expect(vm.$refs.editorb[0].quill instanceof Quill).to.deep.equal(true)
        done()
      })
    })
  })

  // 动态配置

  /*
  // SSR 测试
  describe('Global install component', () => {
    it(' - should update value after any change text', () => {
      const vm = new Vue({
        template: `<div>
                      <quill-editor ref="myTextEditor"
                                    v-model="content"
                                    :options="editorOption"
                                    @blur="onEditorBlur"
                                    @focus="onEditorFocus"
                                    @ready="onEditorReady">
                      </quill-editor>
                  </div>
                  `,
        data: {
          content: '<p>test content</p>',
          editorOption: {}
        },
        computed: {
          quill() {
            return this.$refs.myTextEditor.quill
          }
        },
        methods: {
          onEditorBlur(quill) {
            // console.log('onEditorBlur', quill)
          },
          onEditorFocus(quill) {
            // console.log('onEditorFocus', quill)
          },
          onEditorReady(quill) {
            // console.log('onEditorReady', quill)
            expect(quill.editor.delta.ops).to.deep.equal([{ insert: "test content\n" }])
          }
        },
        mounted() {
          setTimeout(() => {
            this.content = '<p>test change</p>'
          }, 1000)
        }
      }).$mount()

      // 实例测试 innstance test
      expect(vm.quill instanceof Quill).to.deep.equal(true)
    })
  })

  // ssr全局安装

  // ssr
  */
})
