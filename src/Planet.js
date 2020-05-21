import React from 'react'
import { useSubscription, gql } from '@apollo/client'
import { List, ListItem } from './List'

const PLANET = gql`
  subscription Planet($id: uuid!) {
    planets_by_pk(id: $id) {
      id
      name
      description
      reviews {
        id
        body
      }
    }
  }
`
const Planet = ({
  match: {
    params: { id },
  },
}) => {
  const { loading, error, data } = useSubscription(PLANET, {
    variables: { id },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  const { name, description, reviews } = data.planets_by_pk
  return (
    <div>
      <h3>
        {name} {description}
      </h3>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  )
}
export default Planet
