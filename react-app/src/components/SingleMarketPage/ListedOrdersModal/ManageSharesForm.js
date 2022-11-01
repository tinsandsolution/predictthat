import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteOrderAction, modifyOrderAction } from '../../../store/market'
import { makeProperCents } from '../../../utils/properPrice';

const ManageSharesForm = ({setShowModal, order, sharesAvailable}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false)

  const is_yes = order.isYes
  const order_id = order.id
  console.log(order)

  let availableShares = sharesAvailable


  const [errors, setErrors] = useState([]);
  const [shares, setShares] = useState(order.quantity)
  const [price, setPrice] = useState(order.price*100)

  const updateShares = (e) => {
    setShares(e.target.value);
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };


  const [pairs, setPairs] = useState(1)

  const onSubmitEditOrder = async (e) => {
    e.preventDefault();
    let errors = [];
    // console.log(price)
    // let adjustedPrice = price/100
    if (shares < 1) errors.push("Cannot sell less than one share.")
    if (shares > sharesAvailable + order.quantity) errors.push("Cannot sell more shares than you have.")
    if (price < 1 || price > 99) errors.push("Price must be between 1¢ and 99¢.")
    if (errors.length) setErrors(errors)
    else {
      const quantity = shares
      const data = await dispatch(modifyOrderAction({quantity, price},order_id));
      setShowModal(false)
      // return history.push('/yourmarkets')
    }
  };

  const onDeleteOrder = async (e) => {
    // e.preventDefault();
    let order_id = order.id
    const data = await dispatch(deleteOrderAction(order_id));
    setShowModal(false)
  };

  let formData = <></>
  if (order.quantity_filled === 0) {
    formData = (
      <>
      <div className='form-explanation'>
        <ul>
          <li>You have listed {order.quantity} {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) at $.{makeProperCents(order.price)} each. All are unsold.</li>
          <li>
              {
                order.quantity_filled === 0
                  ?
                    "You are able to modify and delete this order."
                  :
                    "This order is partially filled. You are able to delete the rest of the order."
              }
           </li>
           <li> Upon deleting, you will be credited with <span className='green'>{order.quantity - order.quantity_filled}</span> {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) to your account. You will immediately be able to re-list them.</li>

        </ul>
      </div>
      <div className='modal-errors'>
      {errors.map((error, ind) => (
        <div className="modal-form-error" key={ind}>{error}</div>
      ))}
    </div>
    <div className='form-single-data'>
        <label htmlFor='shares'>Shares To List (Max. {sharesAvailable + order.quantity})</label>
        <input
          id='input-price'
          name='shares'
          type='number'
          min="1"
          max={sharesAvailable + order.quantity}
          placeholder="0"
          value={shares}
          onChange={updateShares}
          required={true}
        />
      </div>
      <div className='form-single-data'>
        <label htmlFor='price'>Price (¢)</label>
        <div className='input-price-wrapper'>
          <input
            id='input-price'
            name='price'
            type='number'
            min="1"
            max="99"
            placeholder="19"
            value={price}
            onChange={updatePrice}
            required={true}
          />
          <span className='price-cents-input-add'>¢</span>
        </div>
      </div>
    <button className="black-button button-margin-3" type='submit'>Confirm Change</button>
    </>
    )

  }
  else {
    formData = (
      <>
      <div className='form-explanation'>
        <ul>
          <li>You have listed {order.quantity} {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) at $.{makeProperCents(order.price)} each. <span className='green'>{order.quantity_filled}</span> are unsold.</li>
          <li>
            This order is partially filled. You are able to delete the rest of the order.
           </li>
          <li> Upon deleting, you will be credited with <span className='green'>{order.quantity - order.quantity_filled}</span> {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) to your account. You will immediately be able to re-list them.</li>
        </ul>
      </div>
      <div className='modal-errors'>
      {errors.map((error, ind) => (
        <div className="modal-form-error" key={ind}>{error}</div>
      ))}
    </div>
    </>
    )
  }


  return (
    <form className="modal-form create-shares-modal-form" onSubmit={onSubmitEditOrder}>
      <div className='form-title'> Manage Your Open Order</div>
      {formData}
      {
        !confirmDelete ?
                       <div className='black-button button-margin div-modifier-button' type='notsubmit' onClick={()=>setConfirmDelete(true)}> Delete Order </div>
                       :
                       <div className='red-button button-margin div-modifier-button' type='notsubmit' onClick={()=>onDeleteOrder()}> Confirm Delete </div>
      }
    </form>
  );
};

export default ManageSharesForm;
