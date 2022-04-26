import { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import VideoCards from "./VideoCards";

const { Search } = Input;

function Main() {
  const [searchValue, setSearchValue] = useState("");

  function onChangeFunc(event) {
    setSearchValue(event.target.value);
  }

  const onSearch = async (value) => {
    //q=surfing by default for troubleshooting

    async function getVideosList() {
      let data = await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${value}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
        )
        .then((res) => {
          return res.data.items;
        });
      return data;
    }

    async function getOneVideoStatistic(videoID) {
      let videoStatistic = await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoID}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
        )
        .then((res) => {
          console.log(res);
        });
    }
    let videosArray = await getVideosList().then((res) => res);
    videosArray.map((item) => {
      console.log("item = ", item);
      console.log("item.id.videoId = ", item.id.videoId);
      console.log("item.snippet.title = ", item.snippet.title);
      console.log("----------");
    });
  };

  return (
    <div>
      <h1>Поиск видео</h1>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        value={searchValue}
        onChange={onChangeFunc}
        onSearch={onSearch}
      />
      <VideoCards />
    </div>
  );
}
export default Main;
