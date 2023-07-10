<template>
  <section>
    <NearOrbitalObject
      :biggest="biggestObject"
      :closest="closestObject"
      :faster="fasterObject"
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
        fasterObject: null,
        hazardousCounter: 0,
      }
    },

    methods: {},

    async created() {
    },
    
    async mounted() {
      const payload = getPayload()
  
      try {
        await loadOrbitalObjects(payload, this.orbitalObjects)
  
        this.biggestObject = this.orbitalObjects[0];
        this.closestObject = this.orbitalObjects[0];
        this.fasterObject = this.orbitalObjects[0];

        this.orbitalObjects.forEach(el => {
          if (+this.biggestObject.estimatedDiameterMax < +el.estimatedDiameterMax) {
            this.biggestObject = el;
          }

          if (+this.closestObject.missDistance > +el.missDistance) {
            this.closestObject = el;
          }

          if (+this.fasterObject.relativeVelocity < +el.relativeVelocity) {
            this.fasterObject = el;
          }
        })
      } catch (error) {
        throw new Error(error)
      }
    }
  }
</script>
