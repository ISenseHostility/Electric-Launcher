<template>
 <div class="settings">
   <MenuBar />
   <div class="container">
      <router-link to="/" class="back-btn"> <icon icon="fa-solid fa-arrow-left" /></router-link>
     <SoftwareSection title="New Software" icon="fa-gear">
        <div class="settings-tray">
          <SettingSection setting="Software Name" />
          <SettingSection setting="Cover Image Path" :folder-setting="true" />
          <SettingSection setting="Executable Path" :folder-setting="true" />
        </div>
     </SoftwareSection>
     <router-link to="/" class="back-btn" @click="saveToFile()"> <icon icon="fa-solid fa-floppy-disk" /></router-link>
   </div>
 </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import SoftwareSection from "@/components/SoftwareSection";
import SettingSection from "@/components/SettingSection";
import { v4 as uuid } from 'uuid'

export default {
  name: "SettingsView",
  components:{
    MenuBar,
    SoftwareSection,
    SettingSection
  },
  data () {
    return {
      name: String,
      imgPath: String,
      exePath: String
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
        id: uuid(),
        name: this.name,
        imgPath: this.imgPath,
        filePath: this.exePath,
        pinned: false
      }

      window.fileUtils.addSoftware(obj)

      this.$emit('refresh')
    }
  }
}
</script>

<style scoped lang="sass">
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

.settings-tray
  display: flex
  flex-wrap: wrap
  margin: 30px 30px 30px 0
  gap: 28px

</style>
