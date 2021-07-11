import { gql } from "@apollo/client";


const todo = gql`
  type Task {
    id: Int!
    name: String!
    done: Boolean!
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
    name: String!
    base: String!
  }

  extend type Query {
    weather(city: String!): Weather!
  }
`;



export const typeDefs = [todo, weathers]
