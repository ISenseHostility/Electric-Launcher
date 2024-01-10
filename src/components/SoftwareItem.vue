<template>
  <div :class="'item ' + id">
    <div class="bottom-bar">
      <h3>{{truncate(name)}}</h3>
      <div class="buttons">
        <button class="software-btn" @click="launchSoftware()"> <icon icon="fa-solid fa-play" /> </button>
        <router-link :to="'/settings/' + id" class="software-btn"> <icon icon="fa-solid fa-gear" /> </router-link>
        <button class="software-btn" @click="pinSoftware()"> <icon icon="fa-solid fa-thumbtack" /> </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SoftwareItem",
  props: {
    id: String,
    name: String,
    imgPath: String,
    filePath: String,
    pinned: Boolean
  },
  expose: [
      'setImage'
  ],
  methods: {
    truncate(string) {
      return string.length > 14 ? string.substring(0, 14 - 3) + "..." : string.substring(0, 14)
    },
    launchSoftware() {
      const obj = {
        id: this.id,
        name: this.name,
        imgPath: this.imgPath,
        filePath: this.filePath,
        pinned: this.pinned,
        time: Date.now()
      }

      window.fileUtils.updateSoftware(obj)

      this.$emit('refresh')
      window.fileUtils.launchSoftware(this.filePath)
    },
    async pinSoftware() {
      let saves = await window.fileUtils.getAllSoftware()
      let pinned

      for (let i = 0; i < saves.length; i++) {
        if (saves[i].id === this.id) {
          pinned = !saves[i].pinned
        }
      }

      const obj = {
        id: this.id,
        name: this.name,
        imgPath: this.imgPath,
        filePath: this.filePath,
        pinned: pinned
      }

      window.fileUtils.updateSoftware(obj)

      this.$emit('refresh')
    },
    setImage() {
      let set = this.imgPath.replace(/\\/g, '/')
      let items = document.getElementsByClassName(this.id)
      for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundImage = "url('"+set+"')"
      }
    }
  },
  emits: [
      'refresh'
  ],
  mounted() {
    this.setImage()
  }
}
</script>

<style scoped lang="sass">
.item
  background-color: rgba(35, 49, 61, 1)
  background-image: url("../assets/bolt-solid.svg")
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  height: 300px
  width: 200px
  border-bottom-right-radius: 15px
  border-bottom-left-radius: 15px
  display: flex
  align-items: flex-end

.bottom-bar
  width: 100%
  height: 120px
  background-color: rgba(82, 103, 124, 0.85)
  border-bottom-right-radius: 15px
  border-bottom-left-radius: 15px
  font-size: 16px
  display: flex
  flex-direction: column

h3
  margin-top: 10px
  display: flex
  justify-content: center
  word-wrap: unset

.buttons
  margin: 5px
  flex-grow: 1
  display: flex
  justify-content: center
  align-items: center
  gap: 10px

.software-btn
  all: unset
  background-color: #34475a
  display: flex
  justify-content: center
  align-items: center
  width: 50px
  height: 50px
  border-radius: 10px
  transition: .3s
  font-size: 20px

  &:hover
    background-color: #46586b
    cursor: pointer

</style>
