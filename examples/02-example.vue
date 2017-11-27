<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>02 Example (theme bubble)</span>
      </div>
      <md-button target="_blank" 
                 class="md-icon-button"
                 href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/02-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor class="editor-example bubble"
                      ref="myTextEditor"
                      :content="content"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <div class="quill-code">
          <code class="hljs xml" v-html="contentCode"></code>
        </div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  import hljs from 'highlight.js'
  export default {
    data() {
      return {
        name: '02-example',
        content: `<h1 class="ql-align-center">
                    <span class="ql-font-serif"><span class="ql-cursor">﻿</span>I am Example 2!</span></span>
                  </h1>
                  <p><br></p>
                  <p><span class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</span></p>
                  <p><br></p>
                  <p><strong class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</strong></p>
                  <p><br></p>
                  <p><u class="ql-font-serif">Dead history is write in ink, the living sort in blood.</u></p>
                  <p><br></p>
                  <p><em class="ql-font-serif">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</em></p>
                  <p><br></p>
                  <p><span class="ql-font-serif">Every time we deal with an enemy, we create two more.</span></p>
                  <p><br></p>
                  <p><span class="ql-font-serif">So the king has decreed. The small council consents.</span></p>
                  <p><br></p>
                  <p><span class="ql-font-serif">Chaos not is a pit, chaos is a ladder.</span></p>
                  <p><br></p>
                  <p><span class="ql-font-serif">A chain needs all sorts of metals, and a land needs all sorts of people.</span></p>
                  <p><br></p>
                  <p><span class="ql-font-serif">When the snows fall and the white winds blow, the lone wolf dies, but the pack survives.</p>
                  `,
        editorOption: {
          theme: 'bubble',
          placeholder: "输入任何内容，支持html",
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
            ]
          }
        }
      }
    },
    methods: {
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      }
    },
    computed: {
      contentCode() {
        return hljs.highlightAuto(this.content).value
      },
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted() {
      console.log('this is my editor, example 2', this.editor)
    }
  }
</script>

<style lang="scss" scoped>

  .quill-editor,
  .quill-code {
    height: 20rem;
  }

  .quill-editor {
    border: 1px solid #ccc;
    border-bottom: none;
  }

  .quill-code {
    border: none;
    height: auto;

    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
    }
  }
</style>
