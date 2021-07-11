import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { addTaskInList } from "src/operations/mutations/todo.mutation";
import { GetToDoListCollection_todoListCollections } from "src/operations/query/generatedType/GetToDoListCollection";
import TodoListCollactionForm from "./TodoListCollactionForm";

const TodoListCollaction = ({
  id,
  name,
  tasks,
}: GetToDoListCollection_todoListCollections) => {
  return (
    <Card title={name}>
      <TodoListCollactionForm
        placeholder="Task Name"
        onFinish={(fields) => {
          addTaskInList(id, fields.name);
        }}
      />
      {tasks.map((task) => (
        <div className="pv1">
          <Checkbox checked={task?.done ?? false}>{task?.name}</Checkbox>
        </div>
      ))}
    </Card>
  );
};

export default TodoListCollaction;
