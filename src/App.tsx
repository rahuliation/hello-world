import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";
import { RestLink } from "apollo-link-rest";
import { BrowserRouter as Router } from "react-router-dom";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import "./App.css";
import Routes from "./Routes";
import "tachyons/css/tachyons.min.css";
import { typePolicies } from "./cache";
import { typeDefs } from "./typeDefs";

const App = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      const httpLink = createHttpLink({ uri: "server.com/graphql" });

      const cache = new InMemoryCache({
        typePolicies,
      });

      const restLink = new RestLink({
        endpoints: {
          weather: `${process.env.REACT_APP_WEATHER_API}?appid=${process.env.REACT_APP_OPENMAP_TOKEN}&`,
          onecall: `${process.env.REACT_APP_ONECALL_API}?appid=${process.env.REACT_APP_OPENMAP_TOKEN}&`,
        },
        typePatcher: {
          WeatherPayload: (
            data: any,
            outerType: string,
            patchDeeper: RestLink.FunctionalTypePatcher
          ): any => {
            console.log(data);
            return {
              __typename: "WeatherData",
              ...data,
            };
          }
        },
      });

      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage) as any,
      });
      setClient(
        new ApolloClient({
          link: ApolloLink.from([restLink, httpLink]),
          cache,
          typeDefs,
          connectToDevTools: true,
        })
      );
    }

    init().catch(console.error);
  }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;
