import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.GRAPH_CMS_ENDPOINT,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export default client;