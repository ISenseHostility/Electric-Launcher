<template>
  <div class="home">
    <MenuBar v-on:refresh="loadData()" />
    <div class="container">
      <SoftwareSection title="Pinned" icon="fa-thumbtack">
        <div class="software-tray">
          <div v-if="loaded && hasSoftware" class="software-wrapper">
            <div v-for="save in saves" :key="save.id">
              <SoftwareItem class="stop" v-on:refresh="loadData()" v-if="save.pinned" :id="save.id" :name="save.name" :img-path="save.imgPath" :file-path="save.filePath" :pinned="save.pinned" />
            </div>
          </div>
        </div>
      </SoftwareSection>
      <SoftwareSection title="Recent" icon="fa-clock-rotate-left">
        <div class="software-tray">
          <div v-if="loaded && hasSoftware" class="software-wrapper">
            <div v-for="(save, key) in recent" :key="key">
              <SoftwareItem class="stop" v-on:refresh="loadData()" v-if="save.time > 0" :id="save.id" :name="save.name" :img-path="save.imgPath" :file-path="save.filePath" :pinned="save.pinned" />
            </div>
          </div>
        </div>
      </SoftwareSection>
      <SoftwareSection class="bottom" title="All" icon="fa-icons">
        <div class="software-tray">
          <div v-if="loaded && hasSoftware" class="software-wrapper">
            <div v-for="(save, key) in saves" :key="key">
              <SoftwareItem class="stop" v-on:refresh="loadData()" :id="save.id" :name="save.name" :img-path="save.imgPath" :file-path="save.filePath" :pinned="save.pinned" />
            </div>
          </div>
        </div>
      </SoftwareSection>
    </div>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import SoftwareSection from "@/components/SoftwareSection";
import SoftwareItem from "@/components/SoftwareItem";

export default {
  name: 'HomeView',
  components: {
    MenuBar,
    SoftwareSection,
    SoftwareItem
  },
  data () {
    return {
      saves: [],
      recent: [],
      loaded: false,
      hasSoftware: false
    }
  },
  methods: {
    async loadData() {
      this.saves = await window.fileUtils.getAllSoftware()
      this.recent = await window.fileUtils.getAllSoftware()
      this.saves.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      this.recent.sort((a,b) => a.time - b.time).reverse()
      this.recent = this.recent.slice(0, 8)
      this.loaded = true
      if (this.saves.length > 0) this.hasSoftware = true
    }
  },
  async mounted() {
    await this.loadData()
  }
}
</script>

<style scoped lang="sass">
.bottom
  margin-bottom: 50px

.stop
  margin-left: 28.5px
  margin-bottom: 30px

.software-tray
  margin-top: 30px

.software-wrapper
  display: flex
  flex-wrap: wrap

.container
  padding-top: 80px
  height: 200vh
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

</style>
