import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import PlanetSearch from './PlanetSearch'
import Planet from './Planet'
import { getMainDefinition } from '@apollo/client/utilities'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
const GRAPHQL_ENDPOINT = 'ylp-hasura.herokuapp.com/v1/graphql'

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
})

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/planet/:id" component={Planet} />
        <Route path="/" component={PlanetSearch} />
      </Switch>
      {/* <PlanetSearch /> */}
    </ApolloProvider>
  </BrowserRouter>
)

render(<App />, document.getElementById('root'))
