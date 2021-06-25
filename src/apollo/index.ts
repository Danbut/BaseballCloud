import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { ApolloClient } from '@apollo/client/core/ApolloClient';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http/createHttpLink';
import config from 'config';
import storage from 'services/storage';

const httpLink = createHttpLink({
  uri: `${config.API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const data = storage.getCredentials();

  if (data) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        [`access-token`]: data.token,
        uid: data.uid,
        client: data.client,
      },
    };
  }
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers,
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
