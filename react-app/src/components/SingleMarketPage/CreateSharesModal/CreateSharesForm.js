import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSharesAction} from '../../../store/market'

const CreateSharesForm = ({setShowModal, market_id}) => {
  // console.log(market_id)
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [pairs, setPairs] = useState(1)

  const onSubmitMarket = async (e) => {
    e.preventDefault();
    let errors = [];
    if (parseInt(pairs) <= 0) errors.push("You cannot create less than one pair.")
    if (parseInt(pairs) > Math.floor(parseInt(sessionUser.funds))) errors.push("You do not have enough money in your account.")

    if (errors.length) setErrors(errors)
    else {
      const data = await dispatch(createSharesAction({pairs,market_id}));
      if (data.errors) {
        console.log(data)
        setErrors(data.errors);
      }
      else setShowModal(false)
      // return history.push('/yourmarkets')
    }
  };

  const updatePairs = (e) => {
    setPairs(e.target.value);
  };


  return (
    <form className="modal-form create-shares-modal-form" onSubmit={onSubmitMarket}>
      <div className='form-title'> Create Pair Shares </div>
      <div className='form-explanation'>
        When you create a pair of shares:
        <ul>
          <li>$1 is withdrawn from your account</li>
          <li>You are credited with one "yes" and one "no" share.</li>
          <li>Afterwards, you are able list those shares on the market at whatever price you would like.</li>
        </ul>
        When a market resolves to "yes", users are credited $1 for every "yes" share they hold. <br />
        When a market resolves to "no", users are credited $1 for every "no" share they hold.
      </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        <label htmlFor='pairs'>Pair Shares To Create - {"Max. " + Math.floor(parseInt(sessionUser.funds)) +" Shares"}</label>
        <input
          name='pairs'
          type='number'
          min="1"
          max={Math.floor(parseInt(sessionUser.funds))}
          // max="100"
          placeholder=""
          value={pairs}
          onChange={updatePairs}
        />
      </div>

      { Math.floor(parseInt(sessionUser.funds)) >= 1
              ?
                <button className="black-button button-margin" type='submit'>Confirm Transaction</button>
              :
                <div className='form-explanation out-of-funds'> You have no funds. </div>
      }
    </form>
  );
};

export default CreateSharesForm;
