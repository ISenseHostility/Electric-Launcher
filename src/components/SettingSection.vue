<template>
  <div class="setting">
    <div class="setting-name">
      <h3>{{setting}}</h3>
    </div>
    <div class="input-bar">
      <p :id="getId()" class="input input-item" contenteditable="true"><slot>{{ getId() }}</slot></p>
      <div class="folder-selector input-item" v-if="folderSetting" @click="selectFile()">
        <icon icon="fa-solid fa-folder-open" class="setting-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingSection",
  props: {
    setting: String,
    folderSetting: Boolean
  },
  data () {
    return {
      path: String
    }
  },
  methods: {
    getId() {
      return this.setting.toLowerCase().replaceAll(' ', '_')
    },
    async selectFile() {
      switch (this.getId()) {
        case 'executable_path':
          this.path = await window.fileUtils.selectFile()
          break
        case 'cover_image_path':
          this.path = await window.fileUtils.selectImage()
          break
      }
      document.getElementById(this.getId()).innerText = this.path
    }
  }
}
</script>

<style scoped lang="sass">
.setting
  width: 100%

.setting-name
  background-color: #52677c
  height: 40px
  font-size: 18px
  display: flex
  align-items: center

.input-bar
  background-color: rgba(35, 49, 61, 1)
  height: 50px
  display: flex
  border-bottom-right-radius: 15px

  > p
    flex-grow: 1

.folder-selector
  padding-right: 5px
  padding-left: 5px
  width: 50px
  height: 50px
  display: flex
  align-items: center
  justify-content: center
  transition: .3s

  &:hover
    background-color: #46586b
    cursor: pointer

.setting-icon
  font-size: 30px

h3
  margin-left: 30px

.input
  height: 100%
  font-size: 16px
  display: flex
  align-items: center
  padding-left: 30px
  color: lightgray

.input-item:last-child
  border-bottom-right-radius: 15px

</style>
