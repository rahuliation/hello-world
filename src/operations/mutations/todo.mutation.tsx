import { ReactiveVar } from "@apollo/client";
import _ from "lodash";
import { taskListVar, todoListCollectionsVar } from "src/cache";
import { createID } from "src/utils/helper";
import {
  GetToDoListCollection_todoListCollections,
  GetToDoListCollection_todoListCollections_tasks,
} from "../query/generatedType/GetToDoListCollection";

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

function deleteCollectionMutation(
  todosvar: ReactiveVar<GetToDoListCollection_todoListCollections_tasks[]>,
  todosCollectionVar: ReactiveVar<GetToDoListCollection_todoListCollections[]>
) {
  return (id: number) => {
    const collections = todosCollectionVar();
    const list = todosvar();
    todosvar([...list.filter((task) => !_.isEqual(task.taskListId, id))]);
    todosCollectionVar([
      ...collections.filter((task) => !_.isEqual(task.id, id)),
    ]);
  };
}

export const deleteCollection = deleteCollectionMutation(
  taskListVar,
  todoListCollectionsVar
);

function addTaskInListMuatation(
  todosvar: ReactiveVar<GetToDoListCollection_todoListCollections_tasks[]>
) {
  return (listId: number, text: string) => {
    const list = todosvar();
    const task: GetToDoListCollection_todoListCollections_tasks = {
      __typename: "Task",
      id: createID(list),
      name: _.capitalize(text),
      done: false,
      taskListId: listId,
    };

    todosvar([...list, task]);
  };
}

export const addTaskInList = addTaskInListMuatation(taskListVar);

function toggleDoneMutation(
  todosvar: ReactiveVar<GetToDoListCollection_todoListCollections_tasks[]>
) {
  return (id: number) => {
    const list = todosvar();
    todosvar(
      list.map((task) => ({
        ...task,
        done: task.id === id ? !task.done : task.done,
      }))
    );
  };
}

export const toggleDone = toggleDoneMutation(taskListVar);

function deleteTaskMutation(
  todosvar: ReactiveVar<GetToDoListCollection_todoListCollections_tasks[]>
) {
  return (id: number) => {
    const list = todosvar();
    todosvar([...list.filter((task) => !_.isEqual(task.id, id))]);
  };
}

export const deleteTask = deleteTaskMutation(taskListVar);
