import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSharesAction} from '../../../store/market'
import { makeProperCents } from '../../../utils/properPrice';

const BuySharesForm = ({setShowModal, order}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  let available = order.quantity - order.quantity_filled


  const [errors, setErrors] = useState([]);
  const [pairs, setPairs] = useState(1)

  const onSubmitMarket = async (e) => {
    e.preventDefault();
    let errors = [];
    if (parseInt(pairs) <= 0) errors.push("You cannot create less than one pair.")
    if (parseInt(pairs) > Math.floor(parseInt(sessionUser.funds))) errors.push("You do not have enough money in your account.")

    if (errors.length) setErrors(errors)
    else {
      // const data = await dispatch(createSharesAction({pairs,market_id}));
      setShowModal(false)
      // return history.push('/yourmarkets')
    }
  };

  const updatePairs = (e) => {
    setPairs(e.target.value);
  };


  return (
    <form className="modal-form create-shares-modal-form" onSubmit={onSubmitMarket}>
      <div className='form-title'> Purchase {order.is_yes ? "\"Yes\"" : "\"No\""} Shares</div>
      <div className='form-explanation'>
        {/* When you create a pair of shares: */}
        <ul>
          <li>{available} {order.is_yes ? "\"Yes\"" : "\"No\""} shares are available at $.{makeProperCents(order.price)} each.</li>
          <li>You have enough funds to purchase _____ </li>
        </ul>
      </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        {/*  - {"Max. " + Math.floor(parseInt(sessionUser.funds)) +" Shares"} */}
        <label htmlFor='pairs'>{order.is_yes ? "\"Yes\"" : "\"No\""} Shares To Purchase</label>
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

      <button className="black-button button-margin" type='submit'>Confirm Transaction</button>
    </form>
  );
};

export default BuySharesForm;
