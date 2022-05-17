import { useState } from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import Menu from "./Menu";

function Favourites(props) {
  let user = props.user;

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
          <Button type="primary">Редактировать</Button>
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

  return (
    <div style={{ width: "1200px", margin: "10px auto" }}>
      <Menu />
      {favouritesRender}
    </div>
  );
}
export default Favourites;
