import { useState } from "react";
import { Card, Row, Col } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

const { Meta } = Card;

const VideoCards = (props) => {
  // почему не работает const [videos, setVideos] = useState(props.videos);
  const [styleSpan, setStyleSpan] = useState(6);
  const searchValue = props.searchValue;
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

  const viewList = () => {
    setStyleSpan(24);
  };
  const viewCards = () => {
    setStyleSpan(6);
  };

  return (
    <div>
      <div>Видео по запросу {searchValue}</div>
      <MenuOutlined onClick={viewList} />
      <AppstoreOutlined onClick={viewCards} />

      <Row>{arrayToRender}</Row>
    </div>
  );
};
export default VideoCards;
