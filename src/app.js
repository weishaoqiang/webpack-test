import "./index.less"
import CK from "./assets/ckeditor5-build-classic/build/ckeditor"

console.log(CK)
window.onload = () => {
  let editor = document.getElementById('editor')
  CK.create(editor).then(editor)
}
