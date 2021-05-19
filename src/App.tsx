import React, { VFC } from 'react';

import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import Routes from 'Routes';
import { apolloClient } from 'graph';

const App: VFC = () => (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);

export default App;
