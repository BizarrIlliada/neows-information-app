import axios from 'axios'
import { makeTwoDigitNumber} from './helpers'

export default async function loadOrbitalObjects () {
  const payload = getLoadOrbitalDataPayload();
  const { startDate, endDate, apiKey } = payload;
  const resultArr = [];

  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=` + apiKey);

  const responseData = response.data.near_earth_objects

  const daysArray = [];

  for (const currentDay in responseData) {
    for (const key in responseData[currentDay]) {
      const day = responseData[currentDay]

      const newOrbitalObject = {
        id: day[key].id,
        isPotentiallyHazardousAsteroid: day[key].is_potentially_hazardous_asteroid,
        name: day[key].name,
  
        estimatedDiameterMax: day[key]
          .estimated_diameter
          .kilometers
          .estimated_diameter_max,
  
        missDistance: day[key]
          .close_approach_data[0]
          .miss_distance
          .kilometers,
  
        relativeVelocity: day[key]
          .close_approach_data[0]
          .relative_velocity
          .kilometers_per_hour,
      }
  
      daysArray.push({ ...newOrbitalObject })
    }

    resultArr.push({ date: currentDay, nearObjects: [...daysArray] })
    daysArray.length = 0;
  }

  return formateLoadOrbitalObjectsResponse(resultArr);
}

function getLoadOrbitalDataPayload() {
  const today = new Date();

  const year = today.getFullYear();
  const month = makeTwoDigitNumber(today.getMonth());
  const day = makeTwoDigitNumber(today.getDate());
  const currentDay = makeTwoDigitNumber(today.getDate() - 7);

  return  {
    startDate: `${year}-${month}-${currentDay}`,
    endDate: `${year}-${month}-${day}`,
    apiKey: 'PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx',
  }
}

function formateLoadOrbitalObjectsResponse(response) {
  const resultArr = [];

  response.forEach(el => {
    let biggestObject = el.nearObjects[0]
    let closestObject = el.nearObjects[0];
    let fastestObject = el.nearObjects[0];
    let hazardousAmount = 0;

    el.nearObjects.forEach(currentEl => {
      if (+biggestObject.estimatedDiameterMax < +currentEl.estimatedDiameterMax) {
        biggestObject = currentEl;
      }

      if (+closestObject.missDistance > +currentEl.missDistance) {
        closestObject = currentEl;
      }

      if (+fastestObject.relativeVelocity < +currentEl.relativeVelocity) {
        fastestObject = currentEl;
      }

      if (currentEl.isPotentiallyHazardousAsteroid) {
        hazardousAmount++;
      }
    })
    
    resultArr.push({
      biggestObject,
      closestObject,
      fastestObject,
      hazardousAmount,
      date: el.date,
    })

    hazardousAmount = 0;
  })

  return resultArr;
}
