import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CreateMarketForm = () => {
  const [errors, setErrors] = useState([]);

  // title
  const [title, setTitle] = useState('')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // image_url
  const [image_url, setImage_url] = useState('')
  // short_title
  const [short_title, setShort_title] = useState('')

  // description
  const [description, setDescription] = useState('')
  // date

  // const user = useSelector(state => state.session.user);
  // const dispatch = useDispatch();
  const onLogin = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   console.log(data)
    //   setErrors(data);
    // }
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="modal-form create-market-modal-form" onSubmit={onLogin}>
      <div className='form-title'> Create a Market </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        <label htmlFor='title'>Market Title</label>
        <input
          name='title'
          type='text'
          placeholder='Will Kanye West Run For President In 2028?'
          value={title}
          onChange={updateTitle}
        />
      </div>
      <div className='form-single-data'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          // placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button className="black-button button-margin" type='submit'>Login</button>
    </form>
  );
};

export default CreateMarketForm;
