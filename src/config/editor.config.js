/**
 * 该文件用于ckeditor的配置
 */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg'
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
/**
 * 引入插件
 */
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Image from '@ckeditor/ckeditor5-image/src/image'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Heading from '@ckeditor/ckeditor5-heading/src/heading'

// 自己编写的插入图片的方法
class InsertImage extends Plugin {
  init() {
    const editor = this.editor
    editor.ui.componentFactory.add('insertImage', locale => {
      const view = new ButtonView(locale)
      view.set({
        label: 'Insert image',
        icon: imageIcon,
        tooltip: true
      })
      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const dom = document.createElement('input')
        dom.type = 'file'
        dom.addEventListener('change', (e) => {
          console.log(e)
          const file = e.path[0].files[0]
          var reader = new FileReader()
          reader.onload = function (e) {
            let data = e.target.result
            editor.model.change(writer => {
              const imageElement = writer.createElement('image', {
                src: data
              })

              // Insert the image in the current selection location.
              editor.model.insertContent(imageElement, editor.model.document.selection);
            })
          }
          // 以DataURL的形式读取文件:
          reader.readAsDataURL(file)
        }, false)
        dom.click()
      })
      return view
    })
  }
}

const editorConfig = function(config) {
  config = config || {}
  const promise = new Promise((resolve, reject) => {
    ClassicEditor.create(config.editor, {
      // 配置插件
      plugins: [Heading ,Essentials, Paragraph, Bold, Italic, Image, InsertImage, Alignment ],
      toolbar: ['heading', '|', 'bold', 'italic', 'insertImage', 'alignment'],
      alignment: {
        options: ['left', 'center','right']
      },
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        ]
      }
    }).then(editor => {
      config.editorHeader.appendChild(editor.ui.view.toolbar.element)
      resolve(editor)
    }).catch(error => {
      reject(error)
    })
  })
  return promise
}

export default editorConfig