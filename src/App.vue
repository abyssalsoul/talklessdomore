<template>
  <Three3D/>
</template>

<script>
import Three3D from './components/Three3D.vue'

export default {
  name: 'App',
  components: {
    Three3D,
  }
}
</script>
<style>
html, body {
    height:100%; /*both html and body*/
}
body {
    margin: 0; /*reset default margin*/
}
</style>
