import { gql } from "@apollo/client";


export const GET_WEATHER = gql`
  query GetWeather($lat: Float, $lon: Float) {
    weathers(lat: $lat, lon: $lon)
      @rest(
        type: "WeatherPayload"
        path: "lat={args.lat}&lon={args.lon}&exclude=minutely,hourly&units=metric"
        endpoint: "onecall"
        method: "GET"
      ) {
      lat
      lon
      timezone
      timezone_offset
      current {
        clouds
        dew_point
        dt
        humidity
        visibility
        sunset
        sunset
        feels_like
        temp
        wind_deg
        wind_speed
        uvi
        dt
        pressure
        weather {
          description
          icon
          id
          main
        }
      }
      daily {
        clouds
        dew_point
        dt
        humidity
        visibility
        sunset
        sunset
        feels_like
        temp
        wind_deg
        wind_speed
        uvi
        dt
        pressure
        weather {
          description
          icon
          id
          main
        }
      }
    }
  }
`;
