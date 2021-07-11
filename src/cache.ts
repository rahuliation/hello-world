// import Dexie from "dexie";

import { makeVar, TypePolicies } from "@apollo/client";
import _ from "lodash";
import {
  GetToDoListCollection_todoListCollections,
  GetToDoListCollection_todoListCollections_tasks,
} from "./operations/query/generatedType/GetToDoListCollection";

export const todoListCollectionsVar = makeVar<
  GetToDoListCollection_todoListCollections[]
>(JSON.parse(localStorage.getItem("todoCollection") ?? "[]"));

export const taskListVar = makeVar<GetToDoListCollection_todoListCollections_tasks[]>(
  JSON.parse(localStorage.getItem("taskList") ?? "[]")
);

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      todoListCollections: {
        read: () => {
          todoListCollectionsVar.onNextChange((arg) => {
            localStorage.setItem("todoCollection", JSON.stringify(arg));
          });
          return todoListCollectionsVar();
        },
      },
    },
  },
  TaskList: {
    fields: {
      tasks: {
        read: (parent, args) => {
          const id = args.readField("id");
          const taskLists = taskListVar();
          taskListVar.onNextChange((arg) => {
            localStorage.setItem("taskList", JSON.stringify(arg));
          });
          return taskLists.filter((taskList) =>
            _.isEqual(taskList.taskListId, id)
          );
        },
      },
    },
  },
};
