import { useState } from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const VideoCards = (props) => {
  // почему не работает const [videos, setVideos] = useState(props.videos);
  let videos = props.videos;
  let arrayToRender = videos.map((item, index) => {
    return (
      <Card
        key={index}
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
    );
  });

  console.log("arrayToRender = ", arrayToRender);

  return arrayToRender;

  // return (
  //   <Card
  //     style={{ width: 300 }}
  //     cover={
  //       <img
  //         alt="example"
  //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
  //       />
  //     }
  //     // actions={[
  //     //   <SettingOutlined key="setting" />,
  //     //   <EditOutlined key="edit" />,
  //     //   <EllipsisOutlined key="ellipsis" />,
  //     // ]}
  //   >
  //     <Meta
  //       // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
  //       title="Card title"
  //       description="Hello"
  //     />
  //     <Meta description="Hello" />
  //   </Card>
  // );
};
export default VideoCards;
