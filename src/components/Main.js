import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import VideoCards from "./VideoCards";
import Menu from "./Menu";
import {
  useSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const { Search } = Input;

function Main() {
  const searchParams = useLocation().search;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [videosArrayToRender, setVideosArrayToRender] = useState([]);

  useEffect(() => {
    // Обновляем название докуммента, используя API браузера
    // navigate('/?q=good');
    // при изменении searchParams будет отрабатывать componentDidMount и рендерить страницу по урлу
    // Обязательно добавить второй параметр useEffect [], чтобы не было постоянного ререндера
    if (searchParams.length > 3 && searchParams.startsWith("?q=")) {
      console.log("We are here");
      console.log("searchParams.slice(3) = ", searchParams.slice(3));
      setSearchValue(searchParams.slice(3));
      onSearch(searchParams.slice(3));
    }
  }, [searchParams]);

  function onChangeFunc(event) {
    setSearchValue(event.target.value);
  }

  async function getVideosList(value) {
    let data = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${value}&key=AIzaSyAu1EVzXZ7gy-eoV0k3BLmNdnc2vK3xTPg`
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

  async function onSearch(value) {
    let videosString = "";
    let videosData = await getVideosList(value).then((res) => res);
    videosData.map((item) => {
      videosString += item.id.videoId + "%2C";
    });

    let videos = await getVideosParameters(videosString).then((res) => res);
    setVideosArrayToRender(videos);
  }

  function clickSearch(value) {
    navigate(`/?q=${value}`);
  }

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
        onSearch={clickSearch}
      />
      <VideoCards videos={videosArrayToRender} searchV={searchValue} />
    </div>
  );
}
export default Main;
