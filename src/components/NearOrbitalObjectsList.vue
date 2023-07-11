<template>
  <!-- ADD DIALOG WINDOW FOR ERRORS -->
  <div v-show="isLoaderActive" class="loader">
    <img class="loader__image" src="../assets/images/icone-chargement-grise.png" alt="loader">
  </div>
  <section v-if="biggestObject && closestObject && fastestObject">
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
  import getPayload from '../core/helpers'
  import loadOrbitalObjects from '../core/requests'

  export default {
    name: 'NearOrbitalObjectsList',
    components: {
      NearOrbitalObject,
    },

    data() {
      return {
        orbitalObjects: [],
        biggestObject: null,
        closestObject: null,
        fastestObject: null,
        hazardousCounter: 0,
        isLoaderActive: true,
        currentDate: '',
        theMostObjArr: [],
      }
    },

    methods: {},
    
    async beforeMount() {
      const payload = getPayload()

      this.isLoaderActive = true;
  
      try {
        await loadOrbitalObjects(payload, this.orbitalObjects)

        this.orbitalObjects.forEach(el => {
          this.biggestObject = el.nearObjects[0]
          this.closestObject = el.nearObjects[0];
          this.fastestObject = el.nearObjects[0];

          el.nearObjects.forEach(currentEl => {
            if (+this.biggestObject.estimatedDiameterMax < +currentEl.estimatedDiameterMax) {
              this.biggestObject = currentEl;
            }
  
            if (+this.closestObject.missDistance > +currentEl.missDistance) {
              this.closestObject = currentEl;
            }
  
            if (+this.fastestObject.relativeVelocity < +currentEl.relativeVelocity) {
              this.fastestObject = currentEl;
            }
  
            if (currentEl.isPotentiallyHazardousAsteroid) {
              this.hazardousCounter++;
            }
          })
          
          this.theMostObjArr.push({
            biggestObject: { ...this.biggestObject },
            closestObject: { ...this.closestObject },
            fastestObject: { ...this.fastestObject },
            hazardousAmount: this.hazardousCounter,
            date: el.date,
          })

          this.hazardousCounter = 0;
        })
        
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
