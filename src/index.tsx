import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { typePolicies } from "./cache";
import { typeDefs } from "./typeDefs";

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
        __typename: "Weather",
        ...data,
      };
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([restLink, httpLink]),
  cache,
  typeDefs,
  connectToDevTools: true,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
