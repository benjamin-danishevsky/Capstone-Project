import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './modals.css'

const LoginForm = ({ showModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [frontErr, setFrontErr] = useState([]);
  const [hasUsed, setHasUsed] = useState(false);

  useEffect(() => {
    const validateErrors = [];
    if(!email) validateErrors.push("Please type in your email.")
    if(!password) validateErrors.push("Please type in your password.")
    setFrontErr(validateErrors)
  }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    setHasUsed(true)
    if(frontErr.length > 0) return
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else{
      //showModal(false)
    }

    setHasUsed(false)
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io','password'));
    if (data) {
      setErrors(data);
    }
    //showModal(false)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onLogin} className='loginForm'>
      <div>
        {frontErr && hasUsed && frontErr.map((error, ind) => (
            <div style={{color: 'red'}} key={ind}>{error}</div>
        ))}
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div className='formButtons'>
          <button type='submit' className='login-btn'>Login</button>
          <button type='submit' className='login-btn' onClick={onDemo}>Demo</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
