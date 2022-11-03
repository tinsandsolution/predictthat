import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listSharesAction } from '../../../store/market';
const ListSharesForm = ({setShowModal, isYes, availableShares, market}) => {
  // console.log(market_id)
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const market_id = market.id

  const [errors, setErrors] = useState([]);
  const [shares, setShares] = useState()
  const [price, setPrice] = useState()

  const onSubmitMarket = async (e) => {
    e.preventDefault();
    let errors = [];
    // console.log(price)
    if (shares < 1) errors.push("Cannot sell less than one share.")
    if (shares > availableShares) errors.push("Cannot sell more shares than you have.")
    if (price < 1 || price > 99) errors.push("Price must be between 1¢ and 99¢.")
    if (errors.length) setErrors(errors)
    else {
      const data = await dispatch(listSharesAction({isYes, shares, price, market_id}));
      if (data.errors) {
        // console.log(data)
        setErrors(data.errors);
      }
      else setShowModal(false)
      // return history.push('/yourmarkets')
    }
  };

  const updateShares = (e) => {
    setShares(e.target.value);
  };

  const updatePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <form className="modal-form" onSubmit={onSubmitMarket}>
      <div className='form-title'> List Your {isYes ? "\"Yes\"" : "\"No\""} Shares </div>
      <div className='form-explanation'>
        The minimum listing price is 1¢. The maximum is 99¢. <br />
        When you list your shares:
        <ul>
          <li>The order book for this market will display your open offer</li>
          <li>You are able to modify or delete the offer afterwards</li>
        </ul>
        When a market resolves, any remaining shares that you have listed will be removed and you will be credited appropriately. <br />
      </div>
      <div className='modal-errors'>
        {errors.map((error, ind) => (
          <div className="modal-form-error" key={ind}>{error}</div>
        ))}
      </div>
      <div className='form-single-data'>
        <label htmlFor='shares'>Shares To List (Max. {availableShares})</label>
        <input
          name='shares'
          type='number'
          min="1"
          max={availableShares}
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

      { Math.floor(parseInt(availableShares)) >= 1
              ?
                <button className="black-button button-margin" type='submit'>Confirm Transaction</button>
              :
                <div className='form-explanation out-of-funds'> You have no shares available to list. Cancel or modify existing orders to free up shares. </div>
      }
    </form>
  );
};

export default ListSharesForm;
