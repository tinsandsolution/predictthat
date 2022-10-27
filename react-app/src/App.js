import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import ManageMarkets from './components/ManageMarkets/ManageMarkets';
import SingleMarketPage from './components/SingleMarketPage/SingleMarketPage';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllMarkets } from './store/market';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllMarkets());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/fdsfsdf' >
          <h1>fdgsdg</h1>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/yourmarkets' exact={true} >
          <ManageMarkets />
        </ProtectedRoute>
        <Route path='/markets/:marketId' exact={true}>
          <SingleMarketPage />
        </Route>
        <Route path='/' >
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
