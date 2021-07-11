/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetToDoListCollection
// ====================================================

export interface GetToDoListCollection_todoListCollections_tasks {
  __typename: "Task";
  id: string;
  name: string;
  done: boolean;
}

export interface GetToDoListCollection_todoListCollections {
  __typename: "TaskList";
  id: string;
  name: string;
  tasks: (GetToDoListCollection_todoListCollections_tasks | null)[];
}

export interface GetToDoListCollection {
  todoListCollections: (GetToDoListCollection_todoListCollections | null)[];
}
