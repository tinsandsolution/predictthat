// constants
const SET_MARKETS = 'session/SET_MARKETS';
// const REMOVE_USER = 'session/REMOVE_USER';

const setMarkets = (markets) => ({
  type: SET_MARKETS,
  payload: markets
});


const initialState = { };

export const getAllMarkets = () => async (dispatch) => {
  const response = await fetch('/api/markets');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setMarkets(data));
    // console.log(data)
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MARKETS:
      console.log(action.payload)
      return action.payload.markets
    default:
      return state;
  }
}
