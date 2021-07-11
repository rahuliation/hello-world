/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWeather
// ====================================================

export interface GetWeather_weather {
  __typename: "Weather";
  name: string;
  base: string;
}

export interface GetWeather {
  weather: GetWeather_weather;
}

export interface GetWeatherVariables {
  city: string;
}
