import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { List, ListItem } from './List'

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
  const renderPlanets = (planets) => {
    if (planets) {
      return planets.map(({ id, name, description }) => (
        <ListItem key={id}>
          {name} | {description}
        </ListItem>
      ))
    } else {
      return data.planets.map(({ id, name, description }) => (
        <ListItem key={id}>
          {name} | {description}
        </ListItem>
      ))
    }
  }

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error :(</p>

  return <List>{renderPlanets(newPlanets)}</List>
}
export default Planets
