import React, { useState } from 'react'
import { useSubscription, gql, useMutation } from '@apollo/client'
import { List, ListItem } from './List'
import { Input, Button } from './Form'
import styled from '@emotion/styled'
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
const ADD_REVIEW = gql`
  mutation($body: String!, $id: uuid!) {
    insert_reviews(objects: { body: $body, planet_id: $id }) {
      affected_rows
    }
  }
`
const InputForm = styled.div`
   {
    display: flex;
    align-items: center;
    > button {
      margin-left: 1rem;
    }
  }
`
const Planet = ({
  match: {
    params: { id },
  },
}) => {
  const [inputVal, setInputVal] = useState('')
  const { loading, error, data } = useSubscription(PLANET, {
    variables: { id },
  })
  const [addReview] = useMutation(ADD_REVIEW)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  const { name, description, reviews } = data.planets_by_pk
  function addNewReview() {
    addReview({ variables: { id, body: inputVal } })
      .then(() => setInputVal(''))
      .catch((e) => setInputVal(e.message))
  }
  return (
    <div>
      <h3>
        {name} {description}
      </h3>
      <InputForm>
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyPress={(event) => {
            event.key === 'Enter' && addNewReview()
          }}
        />
        <Button
          onClick={() => {
            addNewReview()
          }}
        >
          Submit
        </Button>
      </InputForm>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>{review.body}</ListItem>
        ))}
      </List>
    </div>
  )
}
export default Planet
