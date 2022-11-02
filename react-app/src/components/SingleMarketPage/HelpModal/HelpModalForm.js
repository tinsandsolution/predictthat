import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import SuggestedTransactions from './SuggestedTransactions';
const HelpForm = ({setShowModal, market_id}) => {
  // console.log(market_id)
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const history = useHistory();

//   const [errors, setErrors] = useState([]);
    const [odds, setOdds] = useState(50)


  const updateOdds = (e) => {
    setOdds(parseInt(e.target.value));
  };


  return (
    <form className="modal-form create-shares-modal-form" >
      <div className='form-title'> How To Make Money </div>
      <div className='form-explanation'>
        The first step is to estimate the odds of this market resolving to yes.

      </div>
      <div className='form-single-data'>
        {/* <input type="range"
               className='odds-range-slider'
               name="odds"
               value={odds}
               onChange={updateOdds}
                min="0" max="100" list="ticks"/>
        <datalist id="ticks">
            <option value="0" label="0%"></option>
            <option value="100" label="100%"></option>
        </datalist> */}
        <div className='input-odds-wrapper'>
            <div className='input-odds'>
                <input
                    id='input-price'
                    name='odds'
                    type='number'
                    min="0"
                    max="100"
                    placeholder="19"
                    value={odds}
                    onChange={updateOdds}
                    required={true}
                />
                <span className='price-cents-input-add'>%</span>
            </div>
        </div>
      </div>
      <div className='form-explanation'>
        {
            odds < 0 || odds > 100 || isNaN(odds)
                ?
                    <span className='red'>Please enter odds between 0 and 100.</span>
                :
                    <SuggestedTransactions odds={odds}/>
        }

      </div>
    </form>
  );
};

export default HelpForm;
