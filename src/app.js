import "./index.less"
import editorConfig from './config/editor.config'

window.onload = () => {
  const editorBox = document.getElementById('editor')
  const editorHeader = document.getElementById('toolbar-container')
  const btn = document.getElementById('btn')
  editorConfig({ editor: editorBox, editorHeader: editorHeader }).then(editor => {
    btn.addEventListener('click', (e) => {
      let data = editor.getData()
    })
  })
}