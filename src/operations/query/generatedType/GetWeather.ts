/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWeather
// ====================================================

export interface GetWeather_weathers_current_weather {
  __typename: "Weather";
  description: string | null;
  icon: string | null;
  id: number | null;
  main: string | null;
}

export interface GetWeather_weathers_current {
  __typename: "WeatherStatus";
  clouds: number | null;
  dew_point: number | null;
  dt: number | null;
  humidity: number | null;
  visibility: number | null;
  sunset: number | null;
  feels_like: number | null;
  temp: number | null;
  wind_deg: number | null;
  wind_speed: number | null;
  uvi: number | null;
  pressure: number | null;
  weather: (GetWeather_weathers_current_weather | null)[] | null;
}

export interface GetWeather_weathers_daily_weather {
  __typename: "Weather";
  description: string | null;
  icon: string | null;
  id: number | null;
  main: string | null;
}

export interface GetWeather_weathers_daily {
  __typename: "WeatherStatus";
  clouds: number | null;
  dew_point: number | null;
  dt: number | null;
  humidity: number | null;
  visibility: number | null;
  sunset: number | null;
  feels_like: number | null;
  temp: number | null;
  wind_deg: number | null;
  wind_speed: number | null;
  uvi: number | null;
  pressure: number | null;
  weather: (GetWeather_weathers_daily_weather | null)[] | null;
}

export interface GetWeather_weathers {
  __typename: "WeatherData";
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: GetWeather_weathers_current | null;
  daily: (GetWeather_weathers_daily | null)[] | null;
}

export interface GetWeather {
  weathers: GetWeather_weathers;
}

export interface GetWeatherVariables {
  lat?: number | null;
  lon?: number | null;
}
