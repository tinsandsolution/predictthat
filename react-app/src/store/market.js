import { authenticate } from "./session";

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
  const response = await fetch('/api/markets',{
    method: "GET"
  });
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
  // console.log("dsfsdfsfd")

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

export const modifyMarket = (marketData,market_id) => async (dispatch) => {
  const response = await fetch(`/api/markets/${market_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marketData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    return data
  }
}

export const deleteMarket = (market_id) => async (dispatch) => {
  const response = await fetch(`/api/markets/${market_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    return data
  }
}

export const resolveMarket = (outcome, market_id) => async (dispatch) => {

  let marketData = { "is_open" : "false", "market_id" : market_id}
  if (outcome === "yes") {
    marketData["outcome_yes"] = "true"
  }
  else {
    marketData["outcome_yes"] = "false"
  }

  const response = await fetch('/api/markets/resolve', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marketData),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    dispatch(authenticate())
    return data
  }
  return {"yes" :"yes"}
}

export const createSharesAction = ({pairs,market_id}) => async (dispatch) => {
  // console.log("fasdfasdfsda")
  // console.log("fasdfasdfsda")
  const response = await fetch('/api/markets/makepairs', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "yes_shares" : pairs,
      "no_shares" : pairs,
      "market_id" : market_id
    }),
  });
  if (response.status === 400) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    dispatch(authenticate())
    // console.log(data)
    return data
  }
}

export const listSharesAction = ({isYes, shares, price, market_id}) => async (dispatch) => {

  const response = await fetch(`/api/markets/${market_id}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "market_id" : market_id,
      "quantity" : shares,
      "price" : price/100,
      "is_yes" : isYes
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    // console.log(data)
    return data
  }
}

export const deleteOrderAction = (order_id) => async (dispatch) => {
  const response = await fetch(`/api/orders/${order_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    return data
  }
}

export const modifyOrderAction = ({quantity, price},order_id) => async (dispatch) => {
  const response = await fetch(`/api/orders/${order_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "quantity" : quantity,
      "price" : price/100,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    return data
  }
}

export const fillOrderAction = (order, quantity) => async (dispatch) => {
  const response = await fetch(`/api/orders/${order.id}/fill`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "quantity" : quantity,
      "price" : order.price,
      "user_id" : order.user_id,
      "market_id" : order.market_id,
      "is_yes" : order.is_yes
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllMarkets())
    dispatch(authenticate())

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
