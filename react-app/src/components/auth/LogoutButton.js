import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";
import '../NavBar.css'

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return <buttonc className="nav-logout-btn" onClick={onLogout}>Logout</buttonc>;
};

export default LogoutButton;
