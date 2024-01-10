<template>
  <div class="section">
    <div class="title-bar">
      <h2> <icon class="icon" :icon="'fa-solid ' + icon" size="xs" />{{title}} </h2>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "SoftwareSection",
  props: {
    title: String,
    icon: String
  }
}
</script>

<style scoped lang="sass">
.section
  background-color: #34475a
  width: calc(100vw - 50px - 12px)
  border-bottom-right-radius: 20px

.title-bar
  height: 50px
  background-color: #52677c
  display: flex
  align-items: center
  font-size: 20px

.icon
  margin-left: 50px
  margin-right: 25px

</style>
