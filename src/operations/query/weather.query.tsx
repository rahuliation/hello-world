import { gql } from "@apollo/client";

export  const GET_WEATHER = gql`
  query GetWeather($city: String!) {
    weathers(city: $city)
      @rest(type: "WeatherPayload", path: "q={args.city}", endpoint: "weather") {
        base
        name
        weather {
          description
          icon
          id
          main
        }
    }
  }
`;