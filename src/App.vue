<template>
  <div id="app" >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
html, body{
  overflow: hidden;
}
body {
  background-color: #f1f1f1;
}
#app{
  height: 100vh;
}
</style>
