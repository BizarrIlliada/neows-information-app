<template>
  <main class="main">
    <section class="main__content">
      <NearOrbitalObjectsList></NearOrbitalObjectsList>
    </section>
  </main>
</template>

<script>
  import NearOrbitalObjectsList from '../components/NearOrbitalObjectsList.vue'

  export default {
    name: 'TheMain',
    components: { NearOrbitalObjectsList },
  }
</script>

<style lang="scss">
  .main {
    background-color: #fff9e7;

    &__content {
      max-width: 1260px;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
