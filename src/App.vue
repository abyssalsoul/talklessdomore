<template>
  <router-view/>
</template>

<script>
import Router from "vue-router";
export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
html, body {
    height:100%; /*both html and body*/
    background-color: black;
}
body {
    margin: 0; /*reset default margin*/
}
</style>
