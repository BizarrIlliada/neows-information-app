import axios from 'axios'

export default async function loadOrbitalObjects (payload, resultArr) {
  const { startDate, endDate, apiKey } = payload;

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
  console.log(resultArr)
}
