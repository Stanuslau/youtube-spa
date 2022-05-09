import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import data from "./data";

function Auth(props) {
  const onFinish = (values) => {
    let user = data.find(
      (item) => values.username === item.name && values.password === item.pass
    );
    if (user) {
      if (localStorage.getItem(`user_${user.name}`) === null){
        localStorage.setItem(`user_${user.name}`, JSON.stringify({
          favourites:[],
          token:`${user.name}_super_token`,
        })); 
      } else {
        let x = JSON.parse(localStorage.getItem(`user_${user.name}`));
        x.token = `${user.name}_super_token`;
        localStorage.setItem(`user_${user.name}`, JSON.stringify(x));
      }
      props.setToken(`${user.name}_super_token`);
    } else {
      console.log("Enter correct Username and Password!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }} // make sure that row takes all the page size
    >
      <Col span={4}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {/* 
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Auth;
