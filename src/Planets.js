import React from 'react'
import { useQuery, gql } from '@apollo/client'

const PLANETS = gql`
  {
    planets {
      id
      name
      description
    }
  }
`
const Planets = ({ newPlanets }) => {
  const { loading, error, data } = useQuery(PLANETS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( </p>
  return data.planets.map(({ id, name, description }) => (
    <div key={id}>
      <p>
        {name} | {description}
      </p>
    </div>
  ))
}
export default Planets
