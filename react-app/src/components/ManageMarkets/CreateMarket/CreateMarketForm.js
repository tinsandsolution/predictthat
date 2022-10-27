import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CreateMarketForm = () => {
  const [errors, setErrors] = useState([]);

  // title
  const [title, setTitle] = useState('')
  // short_title
  const [short_title, setShort_title] = useState('')
  // image_url
  const [image_url, setImage_url] = useState('')
  // description
  const [description, setDescription] = useState('')
  // date
  // needs filling

  // const user = useSelector(state => state.session.user);
  // const dispatch = useDispatch();
  const onSubmitMarket = async (e) => {
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

  const updateShort_title = (e) => {
    setShort_title(e.target.value);
  };

  const updateImage_url = (e) => {
    setImage_url(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };


  return (
    <form className="modal-form create-market-modal-form" onSubmit={onSubmitMarket}>
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
          placeholder='Will Oprah Run For President In 2028?'
          value={title}
          onChange={updateTitle}
        />
      </div>
      <div className='form-single-data'>
        <label htmlFor='short_title'>Short Title</label>
        <input
          name='short_title'
          type='text'
          placeholder='Oprah 2028'
          value={short_title}
          onChange={updateShort_title}
        />
      </div>
      <div className='form-single-data'>
        <label htmlFor='image_url'>Image Url</label>
        <input
          name='image_url'
          type='text'
          placeholder='https://i.imgur.com/jG3tSug.png'
          value={image_url}
          onChange={updateImage_url}
        />
      </div>
      <div className='form-single-data'>
        <label htmlFor='description'>Description</label>
        <input
          name='description'
          type='text'
          placeholder='The WSJ will be used as the defining authority to determine the outcome.'
          value={description}
          onChange={updateDescription}
        />
      </div>
      <button className="black-button button-margin" type='submit'>Create Market</button>
    </form>
  );
};

export default CreateMarketForm;
