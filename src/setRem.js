const designWidth = 750
const HD = 2
let setRootFomtSize = function (designWidth, HD) {
  let W = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  let rem = ((HD * 100) / designWidth) * W
  document.body.style.fontSize = rem + 'px'
}
setRootFomtSize(designWidth, HD)