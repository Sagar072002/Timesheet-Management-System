import React from "react";
import { slide as Menu } from "react-burger-menu";


const Sidebar = (pageWrapID,outerContainerId) => {
  return (
    <Menu pageWrapID={pageWrapID} outerContainerId={outerContainerId}>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
};

export default Sidebar;
