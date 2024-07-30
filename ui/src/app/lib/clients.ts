import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { Network } from "@/app/hooks/useUIStore";

export const goldenTokenClient = () => {
  return new ApolloClient({
    uri: process.env.TOKENS_API_URL!,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};

export const gameClient = (network: Network) => {
  const httpLink = createHttpLink({
    uri: `/api/graphql-proxy?api=${network}`,
    fetchOptions: {
      next: { revalidate: 0 },
    },
  });

  return new ApolloClient({
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};
