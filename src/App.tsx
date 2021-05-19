import React, { VFC } from 'react';

import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import Routes from 'Routes';
import client from 'apollo';

const App: VFC = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default App;
