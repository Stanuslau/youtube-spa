import { useState } from "react";
import { Button, Row, Col, Form } from "antd";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import FavouritesForm from "./FavouritesForm";

function Favourites(props) {
  let user = props.user;
  const [storageItemId, setStorageItemId] = useState(0);
  const [formFieldsChangeble, setFormFildsChangeble] = useState(true);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (searchValue, name, itemID) => {
    // how to render Form.item https://github.com/ant-design/ant-design/issues/22421#issuecomment-778403975
    console.log("itemID = ", itemID);
    setStorageItemId(itemID);
    form.setFieldsValue({
      name: name,
      request: searchValue,
      sortBy: "default",
      maxAmount: 12,
    });
    setIsModalVisible(true);
  };

  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem(user)).favourites
  );

  let favouritesRender = favourites.map((item) => {
    console.log("item = ", item);
    return (
      <Row key={item.uniqueID} justify="space-between">
        <Col span={4}>
          <h2>{item.name}</h2>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => showModal(item.request, item.name, item.uniqueID)}
          >
            Редактировать
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={() => removeFavourite(item.uniqueID)}>
            Удалить
          </Button>
        </Col>
        <Col span={4}>
          <Button type="primary">
            <Link to={`/youtube-spa/?q=${item.request}`}>Выполнить</Link>
          </Button>
        </Col>
      </Row>
    );
  });

  function removeFavourite(id) {
    let favouritesUdate = favourites.filter((item) => item.uniqueID != id);
    let currentStorage = JSON.parse(localStorage.getItem(user));
    currentStorage.favourites = favouritesUdate;
    localStorage.setItem(user, JSON.stringify(currentStorage));
    setFavourites(favouritesUdate);
  }

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const getUser = () => {
    let user = "";
    Object.keys(localStorage).forEach((item) => {
      if (item.startsWith("user")) {
        user = item;
      }
    });
    return user !== "" ? user : null;
  };

  // const getCounter = () => {
  //   let user = getUser();
  //   let counter = 0;
  //   JSON.parse(localStorage.getItem(user)).favourites.forEach((item, index) => {
  //     if (item.uniqueID > counter) {
  //       counter = item.uniqueID;
  //     }
  //   });
  //   return counter;
  // };

  const onFinish = (values, id = storageItemId) => {
    let user = getUser();
    // let counter = getCounter();
    let localStorageValues = JSON.parse(localStorage.getItem(user));
    let favouritesValues = localStorageValues.favourites.map((item, index) => {
      if (item.uniqueID == id) {
        let newItem = Object.assign(values, { uniqueID: id });
        return values;
      }
      return item;
    });
    localStorageValues.favourites = favouritesValues;
    localStorage.setItem(user, JSON.stringify(localStorageValues));
    form.resetFields();
    setIsModalVisible(false);
    setFavourites(favouritesValues);
  };

  return (
    <div style={{ width: "1200px", margin: "10px auto" }}>
      <Menu />
      <FavouritesForm
        formFieldsChangeble={formFieldsChangeble}
        form={form}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        onFinish={onFinish}
      />
      {favouritesRender}
    </div>
  );
}
export default Favourites;
