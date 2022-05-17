import React from "react";
import { Card, Row, Col, Button, Modal, Form, Input } from "antd";

function FavouritesForm(props) {
  let form = props.form;
  let isModalVisible = props.isModalVisible;
  let handleCancel = props.handleCancel;
  let onFinish = props.onFinish;

  return (
    <Modal
      title="Сохранить запрос"
      visible={isModalVisible}
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Сохранить"
      okButtonProps={{
        key: "submit",
        htmlType: "submit",
      }}
      cancelText="Не Сохранять"
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Запрос" name="request">
          <Input disabled="true" />
        </Form.Item>
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: "Введите название запроса!" }]}
        >
          <Input placeholder="Укажите название" />
        </Form.Item>
        <Form.Item label="Сортировать по" name="sortBy">
          <Input defaultValue="default" disabled="true" />
        </Form.Item>
        <Form.Item label="Максимальное кол-во" name="maxAmount">
          <Input defaultValue="12" disabled="true" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default FavouritesForm;
