import { useState } from "react";
import { Card, Row, Col, Button, Modal, Form, Input } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

const { Meta } = Card;

const VideoCards = (props) => {
  // почему не работает const [videos, setVideos] = useState(props.videos);
  const [form ] = Form.useForm();
  const [favourites, setFavourites] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [styleSpan, setStyleSpan] = useState(6);
  const searchValue = props.searchV;
  const videos = props.videos;

  const arrayToRender = videos.map((item, index) => {
    if (styleSpan == 6) {
      return (
        <Col key={index} span={styleSpan}>
          <Card
            style={{ width: 295, margin: "10px auto" }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta title={item.title} description={item.channelTitle} />
            <Meta
              description={
                item.viewCount / 1000 < 1
                  ? item.viewCount + " просмотров"
                  : Math.floor(item.viewCount / 1000) + " тыс. просмотров"
              }
            />
          </Card>
        </Col>
      );
    } else if (styleSpan == 24) {
      return (
        <Col key={index} span={styleSpan} style={{ marginBottom: "30px" }}>
          <Card
            style={{ width: 275 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Meta title={item.title} description={item.channelTitle} />
            <Meta
              description={
                item.viewCount / 1000 < 1
                  ? item.viewCount + " просмотров"
                  : Math.floor(item.viewCount / 1000) + " тыс. просмотров"
              }
            />
          </Card>
        </Col>
      );
    }
  });

  const showModal = () => {
    form.setFieldsValue({request:searchValue}); // how to render Form.item https://github.com/ant-design/ant-design/issues/22421#issuecomment-778403975
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // form.resetFields();
    setIsModalVisible(false);
    
  };

  const onFinish = (values) => {
    localStorage.setItem("admin", JSON.stringify({ name: "stan", age: "27" }));
    let x = localStorage.getItem("admin");
    console.log("x = ", JSON.parse(x));
    // form.resetFields();
    // setIsModalVisible(false);
  };

  const viewList = () => {
    setStyleSpan(24);
  };

  const viewCards = () => {
    setStyleSpan(6);
  };

  return (
    <div>
      <div>
        <div>Видео по запросу "{searchValue}"</div>
        <Button onClick={showModal}>Добавить в избранное</Button>
        <Modal
          title="Сохранить запрос"
          visible={isModalVisible}
          // onOk={form.submit}
          onCancel={handleCancel}
          okText="Сохранить"
          okButtonProps={{
            // form: { form },
            key: "submit",
            htmlType: "submit",
          }}
          cancelText="Не Сохранять"
        >
          <Form form={form} onFinish={onFinish}>
          {/* <Form onFinish={onFinish}> */}
            <Form.Item label="Запрос" name="request">
              <Input defaultValue={searchValue} disabled="true" />
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
      </div>

      <MenuOutlined onClick={viewList} />
      <AppstoreOutlined onClick={viewCards} />

      <Row>{arrayToRender}</Row>
    </div>
  );
};
export default VideoCards;
