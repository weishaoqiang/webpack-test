<script>
import axios  from 'axios'
import utils from './utils/index'
export default {
  name: 'app',
  data: () => {
    return {}
  },
  methods: {
    uploadFile(e) {
      let file = e.path[0].files[0]
      var reader = new FileReader()
      reader.onload = function(evt) {
        axios.put('http://localhost:5000/admin/api/uploadFile',{
          file: evt.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  },
  mounted() {
    
  },
}
</script>

<template>
  <div id="root">
    <input type="file" @change="uploadFile">
  </div>
</template>

<style lang="less">
  
</style>