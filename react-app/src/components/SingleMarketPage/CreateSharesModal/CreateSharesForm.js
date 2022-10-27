import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMarket } from '../../../store/market';

const CreateSharesForm = ({setShowModal}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  // title
  const [title, setTitle] = useState('')
  // short_title
  const [short_title, setShort_title] = useState('')
  // image_url
  const [image_url, setImage_url] = useState('')
  // description
  const [description, setDescription] = useState('')
  // date needs filling

  // const user = useSelector(state => state.session.user);
  const onSubmitMarket = async (e) => {
    e.preventDefault();
    let errors = [];
    // title must be between 10 and 100 characters
    if (title.length < 10 || title.length > 100) errors.push("Title must be between 10 and 100 characters.")
    // short title must be between 5 and 25 characters
    if (short_title.length < 5 || short_title.length > 25) errors.push("Short title must be between 5 and 25 characters.")
    // description must be between 10 characters and 250 characters
    if (description.length < 10 || description.length > 250) errors.push("Description must be between 10 and 250 characters.")
    // image url must end with a .jpg, a .jpeg, or a .png
    const imgRegex = /.*\.(jpg|png|jpeg)$/
    if (!image_url.match(imgRegex)) errors.push("Image must end with a .jpg, a .jpeg, or a .png")

    if (errors.length) setErrors(errors)

    //
    else {
      const data = await dispatch(createMarket({title, short_title, description, image_url}));
      setShowModal(false)
      return history.push('/yourmarkets')
    }
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
        <label htmlFor='title'>Market Title </label>
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

export default CreateSharesForm;
