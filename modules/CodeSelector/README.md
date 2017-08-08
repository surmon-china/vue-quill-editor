# A moduel for quill (codeSelector)

# Example

![](https://github.com/IWANABETHATGUY/vue-quill-editor/blob/master/modules/CodeSelector/screenshot/screeshot.png?raw=true)
# Use Setup
## Register

``` javascript
// if you need register quill modules, you need to introduce and register before the vue program is instantiated
import Quill from 'quill'
import { CodeSelector } from '../yourModulePath/yourQuillModule.js'
Quill.register('modules/yourQuillModule', CodeSelector)

var quill = new Quill('#editor-container', {
  modules: {
    yourQuillModule:true
  },
  //you can custom your codetypelist here or the module will use the default codetypelist(Array).
  codetypelist:[]
  );

```
# how to get the code type  
  the easy wat to get the code type list
  ```javascript 
  let list =document.getElementById('yourcodeContainer').getElementsByClassName('code-type-input')
  let result =Array.prototype.map.call(list,(item)=>{
    return item.value
  })
  ```
## if you wnat to use it in vue-quill-editor ,you need to modified it in the init options








