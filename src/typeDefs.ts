import { gql } from "@apollo/client";

const todo = gql`
  type Task {
    id: Int!
    name: String!
    done: Boolean!
    taskListId: Int!
  }

  type TaskList {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  extend type Query {
    todoListCollections: [TaskList]!
  }
`;

const weathers = gql`
  type Weather {
    description: String
    icon: String
    id: Int
    main: String
  }
  type WeatherStatus {
    clouds: Int
    dt: Int
    dew_point: Float
    visibility: Int
    humidity: Int
    temp: Float
    feels_like: Float
    sunrise: Int
    sunset: Int
    wind_deg: Int
    wind_speed: Int
    weather: [Weather]
    pressure: Int
    uvi: Int
  }

  type WeatherData {
    current: WeatherStatus
    daily: [WeatherStatus]
    timezone: String!
    timezone_offset: Int!
    lat: Float!
    lon: Float!
  }

  extend type Query {
    weathers(city: String!): WeatherData!
  }
`;

export const typeDefs = [todo, weathers];
