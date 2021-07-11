import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {
  addTaskInList,
  deleteCollection,
  deleteTask,
  toggleDone,
} from "src/operations/mutations/todo.mutation";
import { GetToDoListCollection_todoListCollections } from "src/operations/query/generatedType/GetToDoListCollection";
import TodoListCollactionForm from "./TodoListCollactionForm";
import { DeleteOutlined } from "@ant-design/icons";

const TodoListCollaction = ({
  id,
  name,
  tasks,
}: GetToDoListCollection_todoListCollections) => {
  return (
    <Card
      title={name}
      extra={
        <DeleteOutlined
          onClick={() => deleteCollection(id)}
          className="pointer"
        />
      }
    >
      <TodoListCollactionForm
        placeholder="Task Name"
        onFinish={(fields) => {
          addTaskInList(id, fields.name);
        }}
      />
      {tasks.map((task: any) => (
        <div className="pv2 w-100" key={task.id}>
          <div className="fl w-90">
            <Checkbox
              checked={task?.done ?? false}
              onChange={() => toggleDone(task.id)}
            >
              <span className={`${task.done && "strike"}`}>{task?.name}</span>
            </Checkbox>
          </div>
          <div className="fl w-10">
            <DeleteOutlined
              onClick={() => deleteTask(task.id)}
              className="pointer"
            />
          </div>
        </div>
      ))}
    </Card>
  );
};

export default TodoListCollaction;
