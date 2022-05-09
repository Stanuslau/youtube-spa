import { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import VideoCards from "./VideoCards";
import Menu from "./Menu";

const { Search } = Input;

function Main() {
  const [searchValue, setSearchValue] = useState("");
  const [videosArrayToRender, setVideosArrayToRender] = useState([]);

  function onChangeFunc(event) {
    setSearchValue(event.target.value);
  }

  async function getVideosList(value) {
    let data = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${value}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
      )
      .then((res) => {
        console.log("res = ", res);
        return res.data.items;
      });

    return data;
  }

  async function getVideosParameters(videosID) {
    let videoParameters = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videosID}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
      )
      .then((res) => {
        return res.data.items;
      });
    let videos = videoParameters.map((item) => {
      return {
        id: item.id,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
      };
    });
    return videos;
  }

  const onSearch = async (value) => {
    //q=surfing by default for troubleshooting
    let videosString = "";
    let videosData = await getVideosList(value).then((res) => res);
    videosData.map((item) => {
      videosString += item.id.videoId + "%2C";
    });
    let videos = await getVideosParameters(videosString).then((res) => res);
    console.log("videos = ", videos);
    setVideosArrayToRender(videos);
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "1200px" }}>
      <Menu />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        value={searchValue}
        onChange={onChangeFunc}
        onSearch={onSearch}
      />
      <VideoCards videos={videosArrayToRender} searchV={searchValue} />
    </div>
  );
}
export default Main;
