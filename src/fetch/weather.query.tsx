import { gql } from "@apollo/client";

export  const GET_WEATHER = gql`
  query GetWeather($city: String!) {
    weather(city: $city)
      @rest(type: "WeatherPayload", path: "q={args.city}", endpoint: "weather") {
        name
        base
    }
  }
`;