import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import Search from './Search'
import Planets from './Planets'

const SEARCH = gql`
  query Search($match: String) {
    planets(order_by: { name: asc }, where: { name: { _ilike: $match } }) {
      name
      description
      id
    }
  }
`
const PlanetSearch = () => {
  const [inputVal, setInputVal] = useState('')
  const [search, { loading, error, data }] = useLazyQuery(SEARCH)
  return (
    <div>
      <Search
        inputVal={inputVal}
        onChange={(event) => setInputVal(event.target.value)}
        onSearch={() => search({ variables: `%${inputVal}%` })}
      />
      <Planets newPlanets={data ? data.planets : null} />
    </div>
  )
}
export default PlanetSearch
