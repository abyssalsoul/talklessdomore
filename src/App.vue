<template>
  <Login></Login>
</template>

<script>

import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
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
