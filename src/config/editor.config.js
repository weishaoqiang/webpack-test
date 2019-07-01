/**
 * 该文件用于ckeditor的配置
 */
import ClassicEditor from 'assets/ckeditor5-build-classic/build/ckeditor'

/**
 * 引入插件
 */
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// import Heading from '@ckeditor/ckeditor5-heading/src/heading'

const editorConfig = function(config) {
  config = config || {}
  const promise = new Promise((resolve, reject) => {
    ClassicEditor.create(config.editor, {
      // 配置插件
      // plugins: [Alignment],
      plugins: '',
      toolbar: ['heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'alignment'],
      // alignment: {
      //   options: ['left', 'center','right']
      // },
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