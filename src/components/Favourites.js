import { useState } from "react";
import { Button, Row, Col } from "antd";
import { Navigate } from "react-router-dom";
import Menu from "./Menu";

function Favourites(props) {
  let user = props.user;
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem(user)).favourites
  );
  let favouritesRender = favourites.map((item) => {
    return (
      <Row key={item.uniqueID} justify="space-between">
        <Col span={4}>
          <h2>{item.name}</h2>
        </Col>
        <Col span={4}>
          <Button type="primary">Редактировать</Button>
        </Col>
        <Col span={4}>
          <Button type="primary">Удалить</Button>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={runRequest}>
            Выполнить
          </Button>
        </Col>
      </Row>
    );
  });

  function runRequest(id) {
    console.log("navigate to main page");
    return <Navigate replace={true} to="/" />;
  }

  return (
    <div style={{ width: "1200px", margin: "10px auto" }}>
      <Menu />
      {favouritesRender}
    </div>
  );
}
export default Favourites;
