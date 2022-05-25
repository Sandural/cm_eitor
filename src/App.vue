<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import url("./styles/index.css");
#app {
  display: flex;
  min-height: 100vh;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #373a3c;
  background-color: #fff;
}

* {
  padding: 0;
  margin: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}


</style>
