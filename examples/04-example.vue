<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>04 Example (register modules)</span>
      </div>
      <md-button class="md-icon-button" target="_blank" href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/04-example.vue">
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
        <div class="html ql-editor" v-html="content"></div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  import Quill from 'quill'
  import { ImageImport } from '../modules/ImageImport.js'
  import { ImageResize } from '../modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
  
  export default {
    data() {
      return {
        name: 'register-modules-example',
        content: '<p>Click on the Image Below to resize</p>' + 
                 '<p><img src="https://surmon-china.github.io/vue-video-player/static/images/author.jpg" width="400"></p>' +
                 '<p>Or drag/paste an image here</p>',
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
            imageImport: true,
            imageResize: {
              displaySize: true
            }
          }
        }
      }
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

<style lang="scss">
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }

  .html {
    height: 9em;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    resize: vertical;
  }
</style>
