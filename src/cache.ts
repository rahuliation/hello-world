// import Dexie from "dexie";

import { makeVar, TypePolicies } from "@apollo/client";
import { GetToDoListCollection_todoListCollections } from "src/fetch/generatedType/GetToDoListCollection";

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
};
