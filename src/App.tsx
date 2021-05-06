import React, { VFC } from 'react';

import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import Navigation from 'navigation';
import client from 'apollo';

const App: VFC = () => (
  <ApolloProvider client={client}>
    <Navigation />
  </ApolloProvider>
);

export default App;
