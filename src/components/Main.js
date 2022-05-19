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
  const apikey = "AIzaSyDG99hsC82j-nENbKmzmzKriwFwHYHRQ3c";
  const searchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [videosArrayToRender, setVideosArrayToRender] = useState([]);

  useEffect(() => {
    // Обновляем название докуммента, используя API браузера
    // navigate('/?q=good');
    // при изменении searchParams будет отрабатывать componentDidMount и рендерить страницу по урлу
    // Обязательно добавить второй параметр useEffect [], чтобы не было постоянного ререндера
    if (searchParams.get("q")) {
      let newSearchValue = searchParams.get("q");
      let maxResults = searchParams.get("maxResults")
        ? searchParams.get("maxResults")
        : 12;
      setSearchValue(newSearchValue);
      onSearch(newSearchValue, maxResults);
    }
  }, []);

  function onChangeFunc(event) {
    setSearchValue(event.target.value);
  }

  async function getVideosList(value, maxResults) {
    let data = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${value}&key=${apikey}`
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
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videosID}&key=${apikey}`
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

  async function onSearch(value, maxResults) {
    let videosString = "";
    let videosData = await getVideosList(value, maxResults).then((res) => res);
    videosData.map((item) => {
      videosString += item.id.videoId + "%2C";
    });

    let videos = await getVideosParameters(videosString).then((res) => res);
    setVideosArrayToRender(videos);
  }

  function clickSearch(value) {
    navigate(`/youtube-spa/?q=${value}`);
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
      <VideoCards videos={videosArrayToRender} searchValue={searchValue} />
    </div>
  );
}
export default Main;
