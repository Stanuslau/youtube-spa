import React from "react";

function Menu() {
  function logOut(){
    
  }

  return (
    <div>
      <div>
        <a href="/">Поиск</a>
      </div>
      <div>
        <a href="/favourites">Избранное</a>
      </div>
      <div>
      <a href="/favourites" onClick={logOut}>Log out</a></div>
    </div>
  );
}
export default Menu;
