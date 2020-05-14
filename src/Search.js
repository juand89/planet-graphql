import React from 'react'
import styled from '@emotion/styled'
import { Input, Button } from './Form'

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-left: 1rem;
  }
`
const Search = ({ inputVal, onChange, onSearch }) => {
  return (
    <SearchForm>
      <Input
        value={inputVal}
        onChange={onChange}
        onKeyPress={(event) => {
          event.key === 'Enter' && onSearch()
        }}
      />
      <Button onClick={onSearch}>Search</Button>
    </SearchForm>
  )
}
export default Search
