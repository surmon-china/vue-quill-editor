<template>
  <md-card>
    <md-card-actions v-md-ink-ripple>
      <div class="md-subhead">
        <span>03 Example (custom toolbar)</span>
      </div>
      <md-button class="md-icon-button" target="_blank" href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/03-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <div id="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <!-- Add font size dropdown -->
          <select class="ql-size">
            <option value="small"></option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
          <!-- Add subscript and superscript buttons -->
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
          <button @click="customButtonClick">custom button</button>
        </div>
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
  export default {
    data() {
      return {
        name: 'custom-toolbar-example',
        content: '<h2>I am Example 3</h2>',
        editorOption: {
          modules: {
            toolbar: '#toolbar'
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
      },
      customButtonClick() {
        alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储...等等`)
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
