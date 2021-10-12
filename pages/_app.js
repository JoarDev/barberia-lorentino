import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp
