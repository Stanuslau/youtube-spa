import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./Favourites";
import Main from "./Main";
import "antd/dist/antd.css";

function YoutubeSPA(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="favourites" element={<Favourites user={props.user}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default YoutubeSPA;
