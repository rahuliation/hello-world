// import Dexie from "dexie";

import { makeVar, TypePolicies } from "@apollo/client";
import { GetToDoListCollection_todoListCollections } from "./operations/query/generatedType/GetToDoListCollection";

export const todoListCollectionsVar = makeVar<GetToDoListCollection_todoListCollections[]>([])

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      todoListCollections: {
        read: () => {
          return todoListCollectionsVar();
        },
      },
    },
  },
  Mutation: {
    fields: {
      createTodoListCollections: {
        read: (...args) => {
          console.log(args);
          return todoListCollectionsVar();
        },
      },
    },
  },
};
