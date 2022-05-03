import { useState } from "react";
import { Card, Row, Col } from "antd";
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons";

const { Meta } = Card;

const VideoCards = (props) => {
  // почему не работает const [videos, setVideos] = useState(props.videos);
  const [styleSpan, setStyleSpan] = useState(6);
  const videos = props.videos;
  const arrayToRender = videos.map((item, index) => {
    return (
      <Col key={index} span={styleSpan}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta title={item.title} description={item.channelTitle} />
          <Meta description={item.viewCount + " просмотров"} />
        </Card>
      </Col>
    );
  });

  const viewList = () => {
    setStyleSpan(24);
  };
  const viewCards = () => {
    setStyleSpan(6);
  };

  return (
    <div>
      <MenuOutlined onClick={viewList} />
      <AppstoreOutlined onClick={viewCards} />

      <Row>{arrayToRender}</Row>
    </div>
  );
};
export default VideoCards;
