import axios from 'axios'

export default async function loadOrbitalObjects (payload, resultArr) {
  const { startDate, endDate, apiKey } = payload;

  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=` + apiKey);

  const responseData = response.data.near_earth_objects[startDate]

  for (const key in responseData) {
    const newOrbitalObject = {
      id: responseData[key].id,
      isPotentiallyHazardousAsteroid: responseData[key].is_potentially_hazardous_asteroid,
      name: responseData[key].name,

      estimatedDiameterMax: responseData[key]
        .estimated_diameter
        .kilometers
        .estimated_diameter_max,

      missDistance: responseData[key]
        .close_approach_data[0]
        .miss_distance
        .kilometers,

      relativeVelocity: responseData[key]
        .close_approach_data[0]
        .relative_velocity
        .kilometers_per_hour,
    }

    resultArr.push(newOrbitalObject)
  }
}
