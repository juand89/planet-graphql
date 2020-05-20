import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { List, ListItemWithLink } from './List'

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
        <ListItemWithLink key={id}>
          <Link to={`/planet/${id}`}>
            {name} | {description}
          </Link>
        </ListItemWithLink>
      ))
    } else {
      return data.planets.map(({ id, name, description }) => (
        <ListItemWithLink key={id}>
          <Link to={`/planet/${id}`}>
            {name} | {description}
          </Link>
        </ListItemWithLink>
      ))
    }
  }

  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error :(</p>

  return <List>{renderPlanets(newPlanets)}</List>
}
export default Planets
