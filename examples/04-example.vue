<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>04 Example (register modules)</span>
      </div>
      <md-button target="_blank" 
                 class="md-icon-button"
                 href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/04-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <div class="quill-code">
          <div class="title">Code</div>
          <code class="hljs xml" v-html="contentCode"></code>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  import hljs from 'highlight.js'
  import VueQuillEditor, { Quill } from 'vue-quill-editor'
  import { ImageDrop } from 'quill-image-drop-module'
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/imageResize', ImageResize)
  
  export default {
    data() {
      return {
        name: 'register-modules-example',
        content: `<p><img src="/vue-quill-editor/static/images/surmon-6.jpg" width="500"></p>
                  <br>
                  <p><strong><em>Or drag/paste an image here.</em></strong></p>`,
        editorOption: {
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
          }
        }
      }
    },
    mounted() {
      this.content = `<p><strong><em>Click on the Image Below to resize!</em></strong></p><br>` + this.content
    },
    computed: {
      contentCode() {
        return hljs.highlightAuto(this.content).value
      },
    },
    methods: {
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      }
    }
  }
</script>

<style>
  .quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 30rem;
    padding-bottom: 1rem;
  }
</style>

<style lang="scss" scoped>
  .quill-editor,
  .quill-code {
    width: 50%;
    float: left;
  }

  .quill-code {
    height: auto;
    border: none;

    > .title {
      border: 1px solid #ccc;
      border-left: none;
      height: 3em;
      line-height: 3em;
      text-indent: 1rem;
      font-weight: bold;
    }

    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-left: none;
      border-radius: 0;
      height: 30rem;
      overflow-y: auto;
    }
  }
</style>
