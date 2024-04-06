
import { Stack } from 'expo-router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const RootLayout = () => {

  const client = new ApolloClient({
    uri: process.env.EXPO_PUBLIC_NEON_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${process.env.EXPO_PUBLIC_NEON_API_KEY}`
    }
  });

    return (
       <ApolloProvider client={client}>
        <Stack />
       </ApolloProvider>
    )
}

export default RootLayout;