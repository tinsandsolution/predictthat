// constants
const SET_MARKETS = 'market/SET_MARKETS';
// const CREATE_MARKET = 'market/CREATE_MARKET';

const setMarkets = (markets) => ({
  type: SET_MARKETS,
  payload: markets
});

// const makeMarket = (markets) => ({
//   type: CREATE_MARKET,
//   // payload: market
// });



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

export const createMarket = (marketData) => async (dispatch) => {
  // console.log(marketData)
  console.log("dsfsdfsfd")

  const response = await fetch('/api/markets', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marketData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    return data
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MARKETS:
      // console.log(action.payload)
      return action.payload.markets
    default:
      return state;
  }
}
