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
    // let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`;
    console.log("Next is axios run");
    // axios асинхронный запрос, как закончится, так и отработает.
    let videosList = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
      )
      .then((res) => {
        console.log(res);
      });

    let videoStatistic = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=leiXBeRHGcE&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
      )
      .then((res) => {
        console.log(res);
      });
    console.log("Axios run finished");
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
