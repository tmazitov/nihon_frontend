<template>
<div class="app">
  <MainTemplate/>
</div>
</template>

<script>
import MainTemplate from './templates/MainTemplate.vue'

export default {
  name: 'App',
  components: {
    MainTemplate
  }
}
</script>

<style>
#app {
font-family: rubik, sans-serif;
font-weight: 400;
font-style: normal;

  color: #2c3e50;
}

body{
  margin: 0;
  padding: 0;
}
</style>
