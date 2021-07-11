import { Card} from "antd";
import { TodoListCollectionsType } from "src/cache";


const TodoListCollaction = ({ id, name }: TodoListCollectionsType) => {
  return <Card title={name}>Something</Card>;
};

export default TodoListCollaction;
