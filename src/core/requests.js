import axios from 'axios'

export default async function loadOrbitalObjects (payload, resultArr) {
  const { start_date, end_date, api_key } = payload;

  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=` + api_key);

  const responseData = response.data.near_earth_objects['2023-06-05']

  console.log(responseData);

  for (const key in responseData) {
    const newOrbitalObject = {
      id: responseData[key].id,
      isPotentiallyHazardousAsteroid: responseData[key].is_potentially_hazardous_asteroid,

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
