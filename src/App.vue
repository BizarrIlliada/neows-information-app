<template class="page">
  <TheHeader />
  <TheMain />
  <TheFooter />
</template>

<script>
  import TheHeader from './layouts/TheHeader.vue'
  import TheMain from './layouts/TheMain.vue'
  import TheFooter from './layouts/TheFooter.vue'

  export default {
    name: 'App',
    components: { TheHeader, TheMain, TheFooter }
  }
</script>

<style lang="scss">
  .page {
    max-width: 1260px;
    background-color: #555;
  }
</style>
