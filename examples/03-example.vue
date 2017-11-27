<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>03 Example (custom toolbar)</span>
      </div>
      <md-button target="_blank" 
                 class="md-icon-button" 
                 href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/03-example.vue">
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
          <div id="toolbar" slot="toolbar">
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
            <select class="ql-font">
              <option selected="selected"></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select>
            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <!-- You can also add your own -->
            <button id="custom-button" @click="customButtonClick">[ Click me ]</button>
          </div>
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
  export default {
    data() {
      return {
        name: '03-example',
        content: `<h1 class="ql-align-center">
                    <span class="ql-font-serif"><span class="ql-cursor">﻿</span>I am Example 3!</span></span>
                  </h1>
                  <p><br></p>
                  <p><strong class="ql-font-serif">Whenever you play the game of thrones, you either win or die. There is no middle ground.</strong></p>
                  <p><br></p>
                  <p><u class="ql-font-serif">Some war against sword and spear to win, and the others the crow and the paper to win.</u></p>
                  <p><br></p>
                  <p><em class="ql-font-serif">Dead history is write in ink, the living sort in blood.</em></p>
                  <p><br></p>
                  <p><span class="ql-font-serif" style="color: rgb(0, 102, 204);">They're only numbers. Numbers on paper. Once you understand that, it's easy to make them behave.</span></p>
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
          modules: {
            toolbar: '#toolbar'
          }
        }
      }
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
      },
      customButtonClick() {
        alert(`You can custom the button and listen click event to do something...\n你可以定义一些自定义按钮做你想做的事，如上传图片至第三方存储再插入内容区...等等`)
      }
    }
  }
</script>

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
