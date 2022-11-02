import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fillOrderAction } from '../../../store/market'
import { makeProperCents } from '../../../utils/properPrice';

const BuySharesForm = ({setShowModal, order}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [quantity, setQuantity] = useState(1)


  let available = order.quantity - order.quantity_filled

  const findMaxPoss = () => {
    // so we have two possible cases
    // the first condition is where it's simply the available amount
    if (sessionUser.funds >= available * order.price) return available
    // the second case is where it's less, in which case we have to do some math
    else {
      // so we're going to find currentfunds, and floor it to the lowest amount
      const floorFunds = Math.floor(parseInt(sessionUser.funds))
      return floorFunds / order.price
    }
  }

  const onSubmitMarket = async (e) => {
    e.preventDefault();
    let errors = [];
    // console.log("fasdfasdf")
    if (errors.length) setErrors(errors)
    else {
      const data = await dispatch(fillOrderAction(order,quantity));
      if (data.errors) {
        // console.log(data)
        setErrors(data.errors);
      }
      else setShowModal(false)
    }
  };

  const updateQuantity = (e) => {
    setQuantity(e.target.value);
  };


  return (
    <form className="modal-form create-shares-modal-form" onSubmit={onSubmitMarket}>
      <div className='form-title'> Purchase {order.is_yes ? "\"Yes\"" : "\"No\""} Shares</div>
      <div className='form-explanation'>
        {/* When you create a pair of shares: */}
        <ul>
          <li>{available} {order.is_yes ? "\"Yes\"" : "\"No\""} shares are available at $.{makeProperCents(order.price)} each.</li>
          <li>You have enough funds to purchase <span className='green'>{findMaxPoss()}</span>. </li>
        </ul>
      </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        {/*  - {"Max. " + Math.floor(parseInt(sessionUser.funds)) +" Shares"} */}
        <label htmlFor='quantity'>{order.is_yes ? "\"Yes\"" : "\"No\""} Shares To Purchase (Max. {findMaxPoss()})</label>
        <input
          name='quantity'
          type='number'
          min="1"
          max={findMaxPoss()}
          placeholder=""
          value={quantity}
          onChange={updateQuantity}
        />
      </div>

      <button className="black-button button-margin" type='submit'>Confirm Transaction</button>
    </form>
  );
};

export default BuySharesForm;
