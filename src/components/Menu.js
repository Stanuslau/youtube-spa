import React from "react";

function Menu() {
  function logOut(){
    
  }

  return (
    <div>
      <div>
        <a href="/youtube-spa/">Поиск</a>
      </div>
      <div>
        <a href="/youtube-spa/favourites/">Избранное</a>
      </div>
      <div>
      <a href="/youtube-spa/favourites/" onClick={logOut}>Log out</a></div>
    </div>
  );
}
export default Menu;
