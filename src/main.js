import "./index.css";
import editorconfig from './config/editor.config'
window.onload = () => {
  const editorBox = document.getElementById('editor')
  const editorHeader = document.getElementById('toolbar-container')
  const btn = document.getElementById('btn')
  editorconfig({ editor: editorBox, editorHeader: editorHeader }).then(editor => {
    btn.addEventListener('click', (e) => {
      let data = editor.getData()
      console.log(data)
    })
  })
}