import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkSmall = ({ handleClick, active, isOpen, navbar }) => {
  return (
    <li className="small-nav-links-container">
      {navbar?.map((nav, index) => (
        <NavLink
          key={index}
          to={nav.route}
          onClick={() => handleClick(nav.route)}
          className={`${
            active === nav.route ? "sidebar-route-active " : "sidebar-route"
          }`}
        >
          <span
            className={`sidebar-icon ${
              active === nav.route
                ? "sidebar-icon-active"
                : "sidebar-icon-inactive"
            }`}
          >
            {React.createElement(nav.Icon, { fontSize: 25 })}
          </span>
          <span className="badge rounded-pill bg-success float-end"></span>
          <span
            style={{ marginLeft: "1.5rem" }}
            className={`${
              active === nav.route ? "isActive ms-3" : "isInactive ms-3"
            } ${isOpen ? "" : "display-none"}`}
          >
            {nav.title}
          </span>
        </NavLink>
      ))}
    </li>
  );
};

export default NavLinkSmall;
