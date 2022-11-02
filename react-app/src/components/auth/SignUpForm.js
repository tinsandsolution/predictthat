import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    let errors = []
    const emailRegex = /^.{1,100}@.{1,100}?\..{1,100}$/
    if (!email.match(emailRegex)) errors.push("Please enter a valid email")
    if (password !== repeatPassword) errors.push(["password : Passwords must match"])
    if (email.length < 10 || email.length > 100) errors.push("Email must be between 10 and 100 characters.")
    if (password.length < 5 || password.length > 60) errors.push("Password must be between 5 and 60 characters.")
    if (username.length < 5 || username.length > 20) errors.push("Username must be between 5 and 20 characters.")

    setErrors(errors)

    if (!errors.length) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log(data)
        setErrors(data)
      }
    }
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
    return <Redirect to='/' />;
  }

  return (
    <form className="modal-form" onSubmit={onSignUp}>
      <div className='form-title'> Sign up in 2 minutes </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='form-single-data'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='form-single-data'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='form-single-data'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='black-button button-margin' type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
