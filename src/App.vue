<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="sass">
*
  padding: 0
  margin: 0
  color: white
  font-family: monospace

html
  background-color: rgba(35, 49, 61, 1)

::-webkit-scrollbar
  width: 12px

::-webkit-scrollbar-track
  background: #23313d

::-webkit-scrollbar-thumb
  background: #52677c
  border-bottom-left-radius: 8px

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

nav
  padding: 30px


nav a
  font-weight: bold
  color: #2c3e50


nav a.router-link-exact-active
  color: #42b983

</style>
