import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
        <p className="nav-home-container">
          <NavLink
            to='/home'
            exact={true}
            activeClassName='active'
            className='nav-home-link'
            >
            Home
          </NavLink>
        </p>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <p>
          <LogoutButton />
        </p>
    </nav>
  );
}

export default NavBar;
