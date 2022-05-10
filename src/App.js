import YoutubeSPA from "./components/YoutubeSPA";
import Auth from "./components/Auth";
import { useState } from "react";
import "antd/dist/antd.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("user_admin"));
  console.log("token: ", token);

  function checkToken() {
    if (localStorage.getItem("user_admin") !== null) {
      if (JSON.parse(localStorage.getItem("user_admin")).token !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (!checkToken()) {
    console.log("Please authorize!");
    return <Auth setToken={setToken} />;
  }

  return (
    <div className="App">
      <YoutubeSPA user={'user_admin'}/>
    </div>
  );
}

export default App;
