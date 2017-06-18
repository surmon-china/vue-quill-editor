<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>02 Example (theme bubble)</span>
      </div>
      <md-button class="md-icon-button" target="_blank" href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/02-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor class="editor-example"
                      ref="myTextEditor"
                      :content="content"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <div class="html ql-editor" v-html="content"></div>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  export default {
    data() {
      return {
        name: 'base-example',
        content: '<h2>I am Example 2</h2>',
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
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted() {
      // console.log('this is my editor', this.editor)
    }
  }
</script>

<style lang="scss">
  .editor-example {
    border: 1px solid #ccc;
  }

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
