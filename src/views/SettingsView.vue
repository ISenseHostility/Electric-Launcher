<template>
  <div class="settings">
    <MenuBar />
    <div class="container">
      <router-link to="/" class="back-btn"> <icon icon="fa-solid fa-arrow-left" /></router-link>
      <SoftwareSection :title="name + ' Settings'" icon="fa-gear">
        <div class="settings-tray">
          <SettingSection setting="Software Name"> <span class="editable-text" v-if="name.length > 1">{{ this.name }}</span> </SettingSection>
          <SettingSection setting="Cover Image Path" :folder-setting="true"> <span class="editable-text" v-if="imgPath.length > 1">{{ this.imgPath }}</span> </SettingSection>
          <SettingSection setting="Executable Path" :folder-setting="true"> <span class="editable-text" v-if="exePath.length > 1">{{ this.exePath }}</span> </SettingSection>
        </div>
      </SoftwareSection>
      <router-link to="/" class="back-btn" @click="saveToFile()"> <icon icon="fa-solid fa-floppy-disk" /></router-link>
      <router-link to="/" class="back-btn delete-btn" @click="deleteSave()"> <icon icon="fa-solid fa-trash-can" /></router-link>
    </div>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import SoftwareSection from "@/components/SoftwareSection";
import SettingSection from "@/components/SettingSection";

export default {
  name: "SettingsView",
  components:{
    MenuBar,
    SoftwareSection,
    SettingSection
  },
  data () {
    return {
      id: String,
      name: String,
      imgPath: String,
      exePath: String,
      pinned: Boolean
    }
  },
  emits: [
    'refresh'
  ],
  methods: {
    getInputFieldData(setting) {
      return document.getElementById(setting.toLowerCase().replaceAll(' ', '_')).innerText
    },
    saveToFile() {
      this.name = this.getInputFieldData('Software Name')
      this.imgPath = this.getInputFieldData('Cover Image Path')
      this.exePath = this.getInputFieldData('Executable Path')

      const obj = {
        id: this.id,
        name: this.name,
        imgPath: this.imgPath,
        filePath: this.exePath,
        pinned: this.pinned
      }

      window.fileUtils.updateSoftware(obj)

      this.$emit('refresh')
    },
    setId() {
      this.id = this.$route.params.id
    },
    async getSavedData() {
      let arr = await window.fileUtils.getAllSoftware()

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.id) {
          this.name = arr[i].name
          this.imgPath = arr[i].imgPath
          this.exePath = arr[i].filePath
          this.pinned = arr[i].pinned
        }
      }
    },
    deleteSave() {
      window.fileUtils.deleteSave(this.id)
    }
  },
  mounted() {
    this.setId()
    this.getSavedData()
  }
}
</script>

<style scoped lang="sass">
.editable-text
  color: lightgray

.container
  padding-top: 50px
  box-shadow: inset 0 0 0 50vw rgba(35, 49, 61, 1)
  background-image: url("../assets/megumin_bckgr.png")
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  background-attachment: fixed
  color: white
  display: flex
  flex-direction: column
  gap: 50px

.back-btn
  all: unset
  background-color: #52677c
  height: 50px
  width: 100px
  display: flex
  justify-content: flex-end
  padding-right: 15px
  align-items: center
  font-size: 30px
  border-bottom-right-radius: 15px
  transition: .3s

  &:hover
    cursor: pointer
    background-color: #46586b

.delete-btn
  &:hover
    background-color: red

.settings-tray
  display: flex
  flex-wrap: wrap
  margin: 30px 30px 30px 0
  gap: 28px

</style>
