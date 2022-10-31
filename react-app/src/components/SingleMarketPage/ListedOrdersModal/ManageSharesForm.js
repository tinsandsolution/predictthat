import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteOrderAction } from '../../../store/market'
import { makeProperCents } from '../../../utils/properPrice';

const ManageSharesForm = ({setShowModal, order}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false)

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

  const onDeleteOrder = async (e) => {
    // e.preventDefault();
    let order_id = order.id
    const data = await dispatch(deleteOrderAction(order_id));
    setShowModal(false)
    // return history.push('/yourmarkets')
  };

  let formData = <></>
  if (order.quantity_filled === 0) {
    formData = (
      <>
      <div className='form-explanation'>
        <ul>
          <li>You have listed {order.quantity} {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) at $.{makeProperCents(order.price)} each.</li>
          <li>
              {
                order.quantity_filled === 0
                  ?
                    "You are able to modify and delete this order."
                  :
                    "This order is partially filled. You are able to delete the rest of the order."
              }
           </li>
        </ul>
      </div>
      <div className='modal-errors'>
      {errors.map((error, ind) => (
        <div className="modal-form-error" key={ind}>{error}</div>
      ))}
    </div>
    <div className='form-single-data'>
      {/*  - {"Max. " + Math.floor(parseInt(sessionUser.funds)) +" Shares"} */}
      {/* <label htmlFor='pairs'>{order.is_yes ? "\"Yes\"" : "\"No\""} Shares To Purchase</label>
      <input
        name='pairs'
        type='number'
        min="1"
        max={Math.floor(parseInt(sessionUser.funds))}
        // max="100"
        placeholder=""
        value={pairs}
        onChange={updatePairs}
      /> */}
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
          <li> Upon deleting, you will be credited with <span className='green'>{order.quantity_filled}</span> {order.is_yes ? "\"Yes\"" : "\"No\""} share(s) to your account. You will immediately be able to re-list them.</li>
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
    <form className="modal-form create-shares-modal-form" onSubmit={onSubmitMarket}>
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
