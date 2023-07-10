<template>
  <header class="header">
    <h1 class="header__title">
      Illiada shows info about asteroids
    </h1>
    <ElButton v-if="isChangeTitleButtonVisible" @click="setTitle">&#10084;</ElButton>
  </header>
</template>

<script>
  import { ElButton } from 'element-plus'
  
  export default {
    name: 'TheHeader',
    components: {
      ElButton,
    },

    data() {
      return {
        isChangeTitleButtonVisible: true,
      }
    },

    methods: {
      setTitle() {
        document.title = 'NeoWs'
        this.isChangeTitleButtonVisible = false
      }
    }
  }
</script>

<style lang="scss">
  .header {
    background-color: #7e7e7e;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    &__title {
      color: #fff;
      border: 1px solid black;
      padding: 5px;
    }
  }
</style>