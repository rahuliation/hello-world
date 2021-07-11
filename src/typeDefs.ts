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

  type WeatherData {
    name: String!
    base: String!
    weather: [Weather]
  }

  extend type Query {
    weathers(city: String!): WeatherData!
  }
`;

export const typeDefs = [todo, weathers];
