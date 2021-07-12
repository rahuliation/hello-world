import {  useQuery } from "@apollo/client";
import _ from "lodash";
import TodoListCollactionForm from "src/components/todo/TodoListCollactionForm";
import TodoListCollaction from "src/components/todo/TodoListCollection";
import { GET_TODO_LIST_COLLECTIONS } from "src/operations/query/todo.query";
import myLayoutHOC from "src/layouts/MyLayout";
import {
  GetToDoListCollection,
  GetToDoListCollection_todoListCollections,
} from "src/operations/query/generatedType/GetToDoListCollection";
import { createTodosCollections } from "src/operations/mutations/todo.mutation";

const Todo = () => {
  const { loading, error, data } = useQuery<GetToDoListCollection>(
    GET_TODO_LIST_COLLECTIONS
  );

  const todoListCollections = _.get(data, "todoListCollections", []);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <div className="f7 h-100">
      <span className="db f1 lh-title bb mb4">Todo APP</span>

      <TodoListCollactionForm
        placeholder="Title of List"
        onFinish={(fields) => {
          createTodosCollections(fields.name);
        }}
      />
      <div className="fl w-100">
        {todoListCollections.map((collection) => (
          <div className="fl w-100 w-50-ns pa2">
            <TodoListCollaction
              {...(collection as GetToDoListCollection_todoListCollections)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
const TodoPage = myLayoutHOC(Todo);

TodoPage.displayName = "WeatherPage";

export default TodoPage;
