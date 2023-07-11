<template>
  <!-- ADD DIALOG WINDOW FOR ERRORS -->
  <div v-show="isLoaderActive" class="loader">
    <img class="loader__image" src="../assets/images/icone-chargement-grise.png" alt="loader">
  </div>
  <section v-if="theMostObjArr.length">
    <!-- REMIND HOW TO USE ASYNC COMPONENTS AND CHANGE THAT V-IF -->
    <NearOrbitalObject
      v-for="dailyInfo in theMostObjArr"
      :key="dailyInfo.date"
      :date="dailyInfo.date"
      :biggest="dailyInfo.biggestObject"
      :closest="dailyInfo.closestObject"
      :fastest="dailyInfo.fastestObject"
      :hazardousAmount="dailyInfo.hazardousAmount"
    />
  </section>
</template>

<script>
  import NearOrbitalObject from './NearOrbitalObject.vue'
  import loadOrbitalObjects from '../core/loadOrbitalObjectRequest'

  export default {
    name: 'NearOrbitalObjectsList',
    components: {
      NearOrbitalObject,
    },

    data() {
      return {
        theMostObjArr: [],
        isLoaderActive: true,
      }
    },

    methods: {},
    
    async created() {
      try {
        this.isLoaderActive = true;
        const fetchedArray = await loadOrbitalObjects()
        const mutatedFetchedArray = [...fetchedArray].sort((a, b) => a.date.localeCompare(b.date))

        this.theMostObjArr.push(mutatedFetchedArray[0])

        let i = 1;

        const intervalID = setInterval(() => {
          this.theMostObjArr.unshift(mutatedFetchedArray[i])
          i++;
          
          if (i === mutatedFetchedArray.length) {
            clearInterval(intervalID)
          }
        }, 2000);

        console.log(fetchedArray);
        this.isLoaderActive = false;
      } catch (error) {
        throw new Error(error)
      }
    },
  }
</script>

<styles lang="scss">
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .loader {
    animation: spin 2s linear infinite;

    &__image {
      height: 200px;
    }
  }
</styles>
