<template>
  <div class="fixed">
    <div class="bar">
      <div class="left">
        <button id="toggle-menu-btn" class="menubar-btn" @click="toggleMenu()">
          <icon icon="fa-solid fa-bars" />
        </button>
      </div>
      <div class="right">
        <button class="menubar-btn" id="minimize-btn" @click="minimizeWindow()"><icon icon="fa-solid fa-minus" /></button>
        <button class="menubar-btn" id="max-unmax-btn" @click="toggleMaximize()"><icon icon="fa-solid fa-plus" /></button>
        <button class="menubar-btn" id="close-btn" @click="closeWindow()"><icon icon="fa-solid fa-xmark" /></button>
      </div>
    </div>
    <Transition name="slide">
      <div class="menu" v-if="menuVisible">
        <router-link to="/new" class="menu-item">
          <icon icon="fa-solid fa-download" size="sm" /> <span class="menu-item-text">Add Software</span>
        </router-link>
        <button class="menu-item" @click="refreshData()">
          <icon icon="fa-solid fa-rotate" size="sm" /> <span class="menu-item-text">Refresh</span>
        </button>
        <button class="menu-item trash" @click="deleteData()">
          <icon icon="fa-solid fa-trash-can" size="sm" /> <span class="menu-item-text">Delete All Data</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data () {
    return {
      menuVisible: false
    }
  },
  emits: [
      'refresh'
  ],
  methods: {
    closeWindow() {
      window.close()
    },
    minimizeWindow() {
      window.menuUtils.minimize()
    },
    toggleMaximize() {
      window.menuUtils.toggleMaximize()
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    refreshData() {
      this.$emit('refresh')
    },
    deleteData() {
      window.fileUtils.deleteAllSoftware()
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped lang="sass">
.fixed
  position: fixed
  width: 100%

.menu
  background-color: #34475a
  width: calc(100vw - 50px - 12px)
  position: relative
  border-bottom-right-radius: 15px
  z-index: 1

.menu-item
  all: unset
  background-color: transparent
  font-size: 18px
  font-weight: bold
  height: 40px
  width: calc(100vw - 50px - 12px - 30px)
  padding-left: 30px
  display: flex
  align-items: center
  border: none
  outline: none
  transition: .3s
  position: relative

  &:hover
    background-color: #46586b
    cursor: pointer

  &:last-child
    border-bottom-right-radius: 15px

.menu-item-text
  margin-left: 15px

.bar
  display: flex
  justify-content: space-between
  align-items: center
  height: 30px
  background: #52677c
  position: relative
  z-index: 2
  -webkit-app-region: drag

.bar > div
  height: 100%
  display: flex
  justify-content: space-between
  align-items: center

.menubar-btn
  -webkit-app-region: no-drag
  font-size: 18px

.bar > * > button
  height: 100%
  padding: 0 15px
  border: none
  background: transparent
  outline: none
  transition: .3s

  &:hover
    background: rgba(221, 221, 221, 0.2)
    cursor: pointer

#close-btn:hover
  background: rgb(255, 0, 0)

.slide-enter-active
  transition: all 0.5s

.slide-leave-active
  transition: all 0.5s

.slide-enter-from,
.slide-leave-to
  transform: translateY(-120px)


.trash
  &:hover
    background-color: red

</style>
