<template>
  <!--TASK ADD DIALOG WINDOW FOR ERRORS -->
  <div v-if="isLoaderActive" class="loader">
    <img class="loader__image" src="../assets/images/icone-chargement-grise.png" alt="loader">
  </div>
  <section v-if="theMostObjArr.length">
    <!--TASK REMIND HOW TO USE ASYNC COMPONENTS AND CHANGE THAT V-IF -->
    <NearOrbitalObject
      v-for="dailyInfo in theMostObjArr.slice(0, 5)" :key="dailyInfo.date"
      :date="dailyInfo.date"
      :biggest="dailyInfo.biggestObject"
      :closest="dailyInfo.closestObject"
      :fastest="dailyInfo.fastestObject"
      :hazardousAmount="dailyInfo.hazardousAmount"
      :isHazardous="isHazardous(dailyInfo)"
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
        isLoaderActive: true,
        indexOfTimeoutRun: 0,
        theMostObjArr: [],
        fetchedMutatedArray: [],
        hazardousHighestNumber: 0,
        hazardousSecondNumber: 0,
        hazardousHigherNumberDate: '',
        delay: 2000,
      }
    },

    methods: {
      setIntervalMethod() {
        this.indexOfTimeoutRun = 1;

        if (this.fetchedMutatedArray.length > 1) {
          const intervalID = setInterval(() => {
            this.theMostObjArr.unshift(this.fetchedMutatedArray[this.indexOfTimeoutRun])
            this.indexOfTimeoutRun++;
            
            if (this.indexOfTimeoutRun === this.fetchedMutatedArray.length) {
              clearInterval(intervalID)
            }
          }, this.delay);
        }

      },

      potentiallyHazardousObjects(array) {
        array.forEach(el => {
          if (this.hazardousHighestNumber < el.hazardousAmount) {
            this.hazardousHighestNumber = el.hazardousAmount;
            this.hazardousHigherNumberDate = el.date;
          }
        });

        array.forEach(el => {
          if (this.hazardousSecondNumber <= el.hazardousAmount
          && el.date !== this.hazardousHigherNumberDate
          && el.hazardousAmount > 0) {
            this.hazardousSecondNumber = el.hazardousAmount;
          }
        });
      },

      isHazardous(el) {
        return (this.hazardousHighestNumber === el.hazardousAmount && el.hazardousAmount > 0)
        || (this.hazardousSecondNumber === el.hazardousAmount && el.hazardousAmount > 0)
      }
    },

    watch: {
      theMostObjArr: {
        handler(value) {
          this.hazardousHighestNumber = 0;
          this.hazardousSecondNumber = 0;

          if (value.length === this.fetchedMutatedArray.length) {
            setTimeout(() => {
              const firstDay = value.pop()
              value.length = 0;
              value.push(firstDay);

              this.setIntervalMethod()
            }, this.delay);
          }

          this.potentiallyHazardousObjects(value.slice(0, 5))
        },
        deep: true,
      },
    },
    
    async created() {
      try {
        this.isLoaderActive = true;
        //TASK ADD DEEP COPY FUNCTION FOR RESPONSE ARRAY WITH OBJECTS INSIDE
        const fetchedArray = await loadOrbitalObjects()
        this.fetchedMutatedArray = [...fetchedArray].sort((a, b) => a.date.localeCompare(b.date))

        this.theMostObjArr.push(this.fetchedMutatedArray[0])

        this.setIntervalMethod()

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
