import { ReactiveVar } from "@apollo/client";
import _ from "lodash";
import { todoListCollectionsVar } from "src/cache";
import { createID } from "src/utils/helper";
import { GetToDoListCollection_todoListCollections, GetToDoListCollection_todoListCollections_tasks } from "../query/generatedType/GetToDoListCollection";

function createTodosCollectionMuatation(
  todosCollectionVar: ReactiveVar<GetToDoListCollection_todoListCollections[]>
) {
  return (text: string) => {
    const collections = todosCollectionVar();
    todosCollectionVar([
      ...collections,
      {
        __typename: "TaskList",
        id: createID(collections),
        name: _.capitalize(text),
        tasks: [],
      },
    ]);
  };
}

export const createTodosCollections = createTodosCollectionMuatation(
  todoListCollectionsVar
);

function addTaskInListMuatation(
  todosCollectionVar: ReactiveVar<GetToDoListCollection_todoListCollections[]>
  
) {

  return (listId: number, text: string) => {
    const collections = todosCollectionVar();
    const selectedCollection = (collections ?? []).find(
      (collection) => collection.id === listId
    );
    const task: GetToDoListCollection_todoListCollections_tasks = {
      __typename: "Task",
      id: createID(selectedCollection?.tasks ?? []),
      name: _.capitalize(text),
      done: false,
    };

    todosCollectionVar(
      collections.map((collection) => ({
        ...collection,
        tasks:
          collection.id === listId
            ? collection.tasks.concat([task])
            : collection.tasks,
      }))
    );
  };
}

export const addTaskInList = addTaskInListMuatation(todoListCollectionsVar);
