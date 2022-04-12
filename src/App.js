import YoutubeSPA from "./components/YoutubeSPA";
import Auth from "./components/Auth";
import { useState } from "react";
import "antd/dist/antd.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem('storedToken'));
  console.log("token: ", token);

  if (!token) {
    console.log("Please authorize!");
    return <Auth setToken={setToken} />;
  }

  return (
    <div className="App">
      <YoutubeSPA />
    </div>
  );
}

export default App;
