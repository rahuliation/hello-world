import { Form, Input, Button } from "antd";
import _ from "lodash";
import { useState } from "react";


interface TodoListCollactionFormPropsType {
  onFinish: (data: any) => void;
  placeholder: string;
}

const TodoListCollactionForm = ({
  onFinish,
  placeholder,
}: TodoListCollactionFormPropsType) => {
  const [formValues, setFormValues] = useState({});

  const [form] = Form.useForm();
  return (
    <Form
      className="fl w-100"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={(data) => {
        onFinish(data);
        form.resetFields();
        setFormValues({});
      }}
      onValuesChange={(values) => setFormValues(values)}
      form={form}
    >
      <Form.Item name="name" className="fl w-80">
        <Input size="small" className="w-100" placeholder={placeholder} />
      </Form.Item>
      <Form.Item className="fl pl3 w-20">
        <Button
          disabled={_.isEmpty(_.get(formValues, "name"))}
          type="primary"
          size="small"
          htmlType="submit"
        >
          create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoListCollactionForm;
