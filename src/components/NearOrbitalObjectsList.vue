<template>
  <!-- ADD DIALOG WINDOW FOR ERRORS -->
  <div v-show="isLoaderActive" class="loader">
    <img class="loader__image" src="../assets/images/icone-chargement-grise.png" alt="loader">
  </div>
  <section v-if="biggestObject && closestObject && fastestObject">
    <!-- REMIND HOW TO USE ASYNC COMPONENTS AND CHANGE THAT V-IF -->
    <NearOrbitalObject
      :biggest="biggestObject"
      :closest="closestObject"
      :fastest="fastestObject"
      :hazardousAmount="hazardousCounter"
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
        currentDate: '',
        isLoaderActive: true,
      }
    },

    methods: {},
    
    async beforeMount() {
      const payload = getPayload()

      this.isLoaderActive = true;
  
      try {
        await loadOrbitalObjects(payload, this.orbitalObjects)
  
        this.biggestObject = this.orbitalObjects[0];
        this.closestObject = this.orbitalObjects[0];
        this.fastestObject = this.orbitalObjects[0];

        this.orbitalObjects.forEach(el => {
          if (+this.biggestObject.estimatedDiameterMax < +el.estimatedDiameterMax) {
            this.biggestObject = el;
          }

          if (+this.closestObject.missDistance > +el.missDistance) {
            this.closestObject = el;
          }

          if (+this.fastestObject.relativeVelocity < +el.relativeVelocity) {
            this.fastestObject = el;
          }

          if (el.isPotentiallyHazardousAsteroid) {
            this.hazardousCounter++;
          }

          this.isLoaderActive = false;
        })
      } catch (error) {
        throw new Error(error)
      }
    }
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
