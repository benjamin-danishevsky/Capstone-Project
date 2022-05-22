import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm'
import './modals.css'

import { useSelector } from 'react-redux';

function LoginFormModal() {
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='login-button'
        hidden={sessionUser}
        onClick={() => {
            console.log("BUTTON CLICKED")
            setShowModal(true)
        }}
        >Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm showModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
