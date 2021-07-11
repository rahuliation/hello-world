import { gql } from "@apollo/client";

export const GET_TODO_LIST_COLLECTIONS = gql`
  query GetToDoListCollection {
    todoListCollections @client {
      id
      name
      tasks  {
        id
        name
        done
      }
    }
  }
`;