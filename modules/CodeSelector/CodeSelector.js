/**
 * @author IWANABETHATGUY
 * 
 */
export class CodeSelector {
  constructor(quill, options) {
    this.quill = quill
    this.options = options
    this.container = quill.options.container
    this.codeBlockList = this.container.getElementsByClassName('ql-syntax')
    this.codeSelectList = []
    this.languages = this.quill.options.codetypelist || ['asp', 'javascript', 'html', 'css', 'scss', 'sass', 'less', 'python', 'c++', 'java'].sort()
    this.quill.on('text-change', function (delta, olddelta, source) {
      for (let d in delta.ops) {
        if (delta['ops'][d].hasOwnProperty('attributes')) {
          if (delta['ops'][d]['attributes'].hasOwnProperty('code-block')) {
            if (delta['ops'][d]['attributes']['code-block']) {
              this.onAddCodeBlock()
            } else {
              this.onAddCodeBlock('inhriet')
            }
          }
        } else if (delta['ops'][d].hasOwnProperty('insert')) {
          if (delta['ops'][d]['insert'] === "\n") {
            this.Arrange()
          }
        } else if (delta['ops'][d].hasOwnProperty('delete') && delta['ops'][d]['delete'] === 1) {
          this.onAddCodeBlock()
        }
      }

    }.bind(this))
  }
  Arrange() {
    for (let i = 0, len = Math.min(this.codeBlockList.length, this.codeSelectList.length); i < len; i++) {
      this.codeSelectList[i].style.top = this.codeBlockList[i].offsetTop + 'px'
    }

  }
  onRemoveCodeBlock() {
    let i = 0
    while (i < this.codeSelectList.length) {
      if (!this.codeBlockList[i] || this.codeBlockList[i].offsetTop !== parseInt(this.codeSelectList[i].style.top, 10)) {
        this.container.removeChild(this.codeSelectList[i])
        this.codeSelectList.splice(i, 1)
        break
      }
      i++
    }
  }
  onAddCodeBlock(flag) {
    if (this.codeBlockList.length > this.codeSelectList.length) {
      for (let i = 0, len = this.codeBlockList.length; i < len; i++) {
        if (!this.codeSelectList[i] || this.codeBlockList[i].offsetTop !== parseInt(this.codeSelectList[i].style.top, 10)) {
          let item = this.codeBlockList[i],
            cur = new CodeSelectBlock(item.offsetTop, item.offsetLeft, item.offsetWidth, this.languages)
          this.codeSelectList.splice(i, 0, cur)
          if (flag === 'inhriet') {
            this.codeSelectList[i].getElementsByTagName('input')[0].value = this.codeSelectList[i - 1].getElementsByTagName('input')[0].value
            this.container.insertBefore(cur,this.codeSelectList[i+1])
            
          } else {
            this.container.appendChild(cur)
          }

          break
        }
      }
    } else if (this.codeBlockList.length < this.codeSelectList.length) {
      this.onRemoveCodeBlock()
    }
    this.Arrange()
  }
}
class CodeSelectBlock {
  constructor(top, left, width, languages) {
    this.init(top, left, width, languages)
    this.initEvent()
    return this.container
  }
  init(top, left, width, languages) {
    //init style
    this.container = this.itemConstructor("div", {
      'position': 'absolute',
      'background-color': '#fff',
      'height': '30px',
      'width': '130px',
      'border': '1px solid #ccc',
      'box-sizing': 'border-box',
      'border-radius': '5px',
      'opacity': '1'
    }, 'code-type-container')
    this.list = this.itemConstructor('ul', {
      'width': '120px',
      'max-height': '200px',
      'position': 'absolute',
      'padding': '0',
      'text-align': 'center',
      'margin': '0',
      'box-sizing': 'border-box',
      'top': '30px',
      'overflow-y': 'scroll',
      'visibility': 'hidden'
    }, 'code-type-list')
    this.input = this.itemConstructor('input', {
      'height': '23px',
      'outline': 'none',
      'position': 'absolute',
      'top': '2.5px',
      'left': '0',
      'width': '100px',
      'border': 'none',
    }, 'code-type-input')
    this.button = this.itemConstructor('button', {
      'position': 'absolute',
      'outline': 'none',
      'box-sizing': 'border-box',
      'background': 'none',
      'height': '30px',
      'top': '-1px',
      'width': '30px',
      'right': '-1px',
      'border': '1px solid #ccc',
      'border-radius': '5px'
    })
    this.button.innerHTML = "<span class=\"label\">▼</span>"
    this.container.appendChild(this.list)
    this.container.appendChild(this.input)
    this.container.appendChild(this.button)
    //130px is the width of  this container
    this.extendStyle(this.container, {
      top: top + 'px',
      left: width + left - 130 + 'px'
    })
    //initData 
    this.languages = languages
    for (let i = 0; i < this.languages.length; i++) {
      this.list.appendChild(this.itemConstructor('li', {
        'list-style': 'none',
        'height': '30px',
        'user-select': 'none',
        'cursor': 'pointer',
        'font-size': '13px'
      }, 'code-type-item', this.languages[i]))
    }
  }
  itemConstructor(tagName, style, className = "", innerHTML = "") {
    let item = document.createElement(tagName)
    item.className = className
    item.innerHTML = innerHTML
    this.extendStyle(item, style)
    return item
  }
  extendStyle(element, style) {
    for (let s in style) {
      element.style[s] = style[s]
    }
  }
  getValue() {
    return this.input.value
  }
  initEvent() {
    //input event
    this.input.addEventListener("blur", () => {
      this.list.style.visibility = "hidden"
    })

    this.input.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        let filter_list = Array.prototype.filter.call(this.list.children, (item) => {
          return item.style.display === "block"
        })
        if (filter_list.length > 0 && filter_list[0].innerText.length > 0) {
          this.input.value = filter_list[0].innerText
          this.list.style.visibility = "hidden"
        }
      } else {
        this.list.style.visibility = "initial"
        Array.prototype.forEach.call(this.list.children, (item, index) => {
          if (new RegExp('^' + this.input.value + '.*').test(item.innerText)) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      }
    })
    this.button.onclick = () => {
      if (this.list.style.visibility === "hidden") {
        this.list.style.visibility = "initial"
      } else if (this.list.style.visibility === "initial") {
        this.list.style.visibility = "hidden"
      }
    }
    Array.prototype.forEach.call(this.list.children, (item) => {
      item.addEventListener("mousedown", () => {
        this.input.value = item.innerText
        this.list.style.visibility = "hidden"
      })
    })
  }
}
