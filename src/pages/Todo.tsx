import { useQuery } from "@apollo/client";
import _ from "lodash";
import { todoListCollectionsVar } from "src/cache";
import TodoListCollactionForm from "src/components/todo/TodoListCollactionForm";
import TodoListCollaction from "src/components/todo/TodoListCollection";
import { GetToDoListCollection } from "src/fetch/generatedType/GetToDoListCollection";
import { GET_TODO_LIST_COLLECTIONS } from "src/fetch/todo.query";
import myLayoutHOC from "src/layouts/MyLayout";

const Todo = () => {
  const { loading, error, data } = useQuery<GetToDoListCollection>(
    GET_TODO_LIST_COLLECTIONS
  );

  const todoListCollections = _.get(data, "todoListCollections", []);

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  return (
    <div className="f7">
      <TodoListCollactionForm
        onFinish={(fields) => {
          todoListCollectionsVar([
            ...todoListCollectionsVar(),
            {
              __typename: "TaskList",
              id: _.size(todoListCollections).toString(),
              name: _.capitalize(fields.name),
              tasks: [],
            },
          ]);
        }}
      />
      <div className="fl w-100">
        {todoListCollections.map((collection) => (
          <div className="fl w-20 pa2">
            <TodoListCollaction {...collection} />
          </div>
        ))}
      </div>
    </div>
  );
};
const TodoPage = myLayoutHOC(Todo);

TodoPage.displayName = "WeatherPage";

export default TodoPage;
