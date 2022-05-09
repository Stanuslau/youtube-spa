import { useState } from "react";
import { Card, Row, Col, Button, Modal, Form, Input } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { getConfirmLocale } from "antd/lib/modal/locale";

const { Meta } = Card;

const VideoCards = (props) => {
  // почему не работает const [videos, setVideos] = useState(props.videos);
  const [counter, setCounter] = useState(0);
  const [form] = Form.useForm();
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
    form.setFieldsValue({
      request: searchValue,
      sortBy: "default",
      maxAmount: 12,
    }); // how to render Form.item https://github.com/ant-design/ant-design/issues/22421#issuecomment-778403975
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const getUser = () => {
    let user = "";
    Object.keys(localStorage).forEach((item) => {
      if (item.startsWith("user")) {
        console.log("user is = ", item);
        //  let user = `user_${item}`;
        user = item;
      }
    });
    return user !== "" ? user : null;
  };

  const onFinish = (values) => {
    let admin = {
      favourites: [
        {
          request: "request",
          name: "How I want to name it",
          sortBy: "default",
          maxAmount: 12,
          uniqueID: counter,
        },
      ],
      token: "token_string",
    };

    // Логика добавления запросов в избранное
    let user = getUser();
    console.log("user = ", user);
    // Если мы тут, то юзер уже должен быть, по этому проверка не нужна и сразу берм данные из localstorage
    let localStorageValues = JSON.parse(localStorage.getItem(user));
    let clone = Object.assign(values, { uniqueID: counter });
    console.log("clone = ", clone);
    console.log("localStorageValues = ", localStorageValues);
    // localStorageValues.favourites.push(clone);

    // console.log("Form values = ", values);

    // setCounter((prevValue) => prevValue + 1);

    // Логика добавления запросов в избранное
    form.resetFields();
    setIsModalVisible(false);
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
          onOk={form.submit}
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
      </div>

      <MenuOutlined onClick={viewList} />
      <AppstoreOutlined onClick={viewCards} />

      <Row>{arrayToRender}</Row>
    </div>
  );
};
export default VideoCards;
