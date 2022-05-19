import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [bio, setBio] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [frontErr, setFrontErr] = useState([]);
  const [hasUsed, setHasUsed] = useState(false);

  useEffect(() => {
    const validateErrors = [];

    if(!username) validateErrors.push("Please type in a username.")
    if(!email) validateErrors.push("Please type in an email.")
    if(!password) validateErrors.push("Please type in your password.")
    if(!repeatPassword) validateErrors.push("Please confirm your password")
    if(!bio) validateErrors.push("Please enter a bio for your account. front err")

    if(username.length > 40) validateErrors.push(`Username cannot exceed 40 characters. You have used ${username.length} characters`)
    if(email.length > 255) validateErrors.push(`Email address cannot exceed 255 characters. You have used ${email.length} characters.`)
    if(bio.length > 255) validateErrors.push(`Bio cannot exceed 255 characters. You have used ${bio.length} characters.`)
    if(password.length > 255) validateErrors.push(`Password address cannot exceed 255 characters. You have used ${password.length} characters.`)
    if(repeatPassword.length > 255) validateErrors.push(`Password address cannot exceed 255 characters. You have used ${repeatPassword.length} characters.`)
    if(password !== repeatPassword) validateErrors.push("Passwords must be matching.")


    setFrontErr(validateErrors)
  }, [username, email, password, repeatPassword, bio])

  const onSignUp = async (e) => {
    e.preventDefault();

    setHasUsed(true)
    if(frontErr.length > 0) return

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, bio));
      if (data) {
        setErrors(data)
      }
    }
    setHasUsed(false)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/construction' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {frontErr && hasUsed && frontErr.map((error, ind) => (
            <div key={ind} style={{color: 'red'}}>{error}</div>
        ))}
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind} style={{color: 'red'}}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}

        ></input>
      </div>
      <div>
        <label>Bio</label>
        <textarea
          type='text'
          name='bio'
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
