import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const goldenTokenClient = (GQLURL: string) => {
  return new ApolloClient({
    uri: GQLURL,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getERC721Tokens: {
              merge(existing = [], incoming) {
                const incomingTokenIds = new Set(
                  incoming.map((i: any) => i.token_id)
                );
                const filteredExisting = existing.filter(
                  (e: any) => !incomingTokenIds.has(e.token_id)
                );
                return [...filteredExisting, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
};

export const gameClient = () => {
  const httpLink = createHttpLink({
    uri: "/api/graphql-proxy",
    fetchOptions: {
      next: { revalidate: 0 }, // Disable caching for this route
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
