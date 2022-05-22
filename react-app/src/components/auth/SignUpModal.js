import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';
import './modals.css'
import { useSelector } from 'react-redux';


function SignUpFormModal() {
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className='login-button' hidden={sessionUser}  onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm showModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default SignUpFormModal;
