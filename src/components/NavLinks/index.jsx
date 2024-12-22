/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = ({
  handleClick,
  active,
  dropdown,
  handleDrop,
  isOpen,
  navbar,
}) => {
  return (
    <li className="nav-links-container">
      {navbar?.map((nav, index) => (
        <NavLink
          key={index}
          to={nav.route}
          onClick={() => handleClick(nav.route, nav.dropdown)}
          className={`${
            active === nav.route ? 'sidebar-route-active ' : 'sidebar-route'
          }`}
        >
          <span
            className={`sidebar-icon ${
              active === nav.route
                ? 'sidebar-icon-active'
                : 'sidebar-icon-inactive'
            }`}
          >
            {React.createElement(nav.Icon, { fontSize: 25 })}
          </span>
          <span className="badge rounded-pill bg-success float-end"></span>
          <span
            style={{ marginLeft: '1.5rem' }}
            className={`${
              active === nav.route ? 'isActive ms-3' : 'isInactive ms-3'
            } ${isOpen ? '' : 'display-none'}`}
          >
            {nav.title}
          </span>
        </NavLink>
      ))}
      {dropdown && active === active && (
        <>
          {dropdown.map((dropdownItem, subIndex) => (
            <NavLink
              key={subIndex}
              to={dropdownItem.route}
              onClick={() => handleDrop(dropdownItem.route)}
              className={`${
                active === dropdownItem.route
                  ? 'sidebar-route-active '
                  : 'sidebar-route'
              }`}
            >
              <span
                className={`sidebar-icon ${
                  active === dropdownItem.route
                    ? 'sidebar-icon-active'
                    : 'sidebar-icon-inactive'
                }`}
              ></span>
              <span className="badge rounded-pill bg-success float-end"></span>
              <span
                style={{ marginLeft: '1.5rem' }}
                className={`${
                  active === dropdownItem.route
                    ? 'isActive ms-3'
                    : 'isInactive ms-3'
                } ${isOpen ? '' : 'display-none'}`}
              >
                {dropdownItem.title}
              </span>
            </NavLink>
          ))}
        </>
      )}
    </li>
  );
};

export default NavLinks;
