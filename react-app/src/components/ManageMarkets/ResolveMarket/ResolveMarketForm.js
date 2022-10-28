import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMarket } from '../../../store/market';

const ResolveMarketForm = ({setShowModal, market}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [outcome, setOutcome] = useState("neither")

  // const user = useSelector(state => state.session.user);
  const onSubmitMarket = async (e) => {
    e.preventDefault();
    const data = await dispatch(createMarket({}));
    setShowModal(false)
    return history.push('/yourmarkets')
  };

  return (
    <form className="modal-form resolve-market-modal-form" onSubmit={onSubmitMarket}>
      <div className='form-title'> Resolve This Market </div>
      <div className='form-explanation'>
        The name of the market is, <br/>
        <b>"{market.title}"</b><br/>
        <ul>
        <li> If you resolve this market to "yes," users will be credited $1 each "yes" share they hold. </li>
        <li> If you resolve this market to "no," then users will be credited $1 each "no" share they hold. </li>
        </ul>
      </div>
      <div className='resolve-single-data'>
        <div className={outcome === "yes" ?
                        'resolve-market-select resolve-yes yes-selected' :
                        'resolve-market-select resolve-yes'
                        }
                        onClick={()=>setOutcome("yes")}
        >
                          Yes
        </div>
        <div className={outcome === "no" ?
                        'resolve-market-select resolve-no no-selected' :
                        'resolve-market-select resolve-no'
                        }
                        onClick={()=>setOutcome("no")}
        >
                          No
        </div>
      </div>
      {outcome === "neither" ?
                   <br/> :
                   <button className="black-button button-margin" type='submit'>Confirm Market</button>
      }
    </form>
  );
};

export default ResolveMarketForm;
